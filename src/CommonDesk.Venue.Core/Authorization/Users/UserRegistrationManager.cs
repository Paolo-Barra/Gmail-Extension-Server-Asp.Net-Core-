using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization.Users;
using Abp.Configuration;
using Abp.IdentityFramework;
using Abp.Linq;
using Abp.Notifications;
using Abp.Runtime.Session;
using Abp.UI;
using Microsoft.AspNetCore.Identity;
using CommonDesk.Venue.Authorization.Roles;
using CommonDesk.Venue.Configuration;
using CommonDesk.Venue.Debugging;
using CommonDesk.Venue.MultiTenancy;
using CommonDesk.Venue.Notifications;

namespace CommonDesk.Venue.Authorization.Users
{
    public class UserRegistrationManager : VenueDomainServiceBase
    {
        public IAbpSession AbpSession { get; set; }
        public IAsyncQueryableExecuter AsyncQueryableExecuter { get; set; }

        private readonly TenantManager _tenantManager;
        private readonly UserManager _userManager;
        private readonly RoleManager _roleManager;
        private readonly IUserEmailer _userEmailer;
        private readonly INotificationSubscriptionManager _notificationSubscriptionManager;
        private readonly IAppNotifier _appNotifier;
        private readonly IUserPolicy _userPolicy;
        

        public UserRegistrationManager(
            TenantManager tenantManager,
            UserManager userManager,
            RoleManager roleManager,
            IUserEmailer userEmailer,
            INotificationSubscriptionManager notificationSubscriptionManager,
            IAppNotifier appNotifier,
            IUserPolicy userPolicy)
        {
            _tenantManager = tenantManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _userEmailer = userEmailer;
            _notificationSubscriptionManager = notificationSubscriptionManager;
            _appNotifier = appNotifier;
            _userPolicy = userPolicy;

            AbpSession = NullAbpSession.Instance;
            AsyncQueryableExecuter = NullAsyncQueryableExecuter.Instance;
        }

		// COMMONDESK
        private List<string> RefindUserDefaultPermissions = new List<string>()
        {
            AppPermissions.Pages_Tenant_Dashboard,
            AppPermissions.Pages_Refind_Dashboard,
            
            AppPermissions.Pages_Refind_Devices,
            AppPermissions.Pages_Refind_DownloadGmail,
            AppPermissions.Pages_Refind_DownloadOutlook,
            AppPermissions.Pages_Refind_Downloads,
            AppPermissions.Pages_Refind_ExternalLogout,
            AppPermissions.Pages_Refind_GroupDetails,
            AppPermissions.Pages_Refind_Groups,
            AppPermissions.Pages_Refind_MailAccounts,
            AppPermissions.Pages_Refind_RecipeCreateEdit,
            AppPermissions.Pages_Refind_RecipeTemplateList,
            AppPermissions.Pages_Refind_Recipes
        };

        public async Task<User> RegisterAsync(string name, string surname, string emailAddress, string userName, string plainPassword, bool isEmailConfirmed, string emailActivationLink, string userAccountId)
        {
            CheckForTenant();
            CheckSelfRegistrationIsEnabled();

            var tenant = await GetActiveTenantAsync();
            var isNewRegisteredUserActiveByDefault = await SettingManager.GetSettingValueAsync<bool>(AppSettings.UserManagement.IsNewRegisteredUserActiveByDefault);

            await _userPolicy.CheckMaxUserCountAsync(tenant.Id);

            
            var user = new User
            {
                // NOTE: User accountId is sent from the frontend, it is the 'sub' value from the oauth response
                UserAccountId = userAccountId,//Guid.NewGuid().ToString(), // COMMONDESK
                TenantId = tenant.Id,
                Name = name,
                Surname = surname,
                EmailAddress = emailAddress,
                IsActive = isNewRegisteredUserActiveByDefault,
                // COMMONDESK
                //UserName = userName,
                UserName = emailAddress,
                IsEmailConfirmed = isEmailConfirmed,
                Roles = new List<UserRole>()
                
            };

            user.SetNormalizedNames();

            var defaultRoles = await AsyncQueryableExecuter.ToListAsync(_roleManager.Roles.Where(r => r.IsDefault));
            foreach (var defaultRole in defaultRoles)
            {
                user.Roles.Add(new UserRole(tenant.Id, user.Id, defaultRole.Id));
            }

            if (user.Name.ToLower() != "admin")
            {
                // COMMONDESK - Set default permissions for users
                user.Permissions = user.Permissions ?? new List<UserPermissionSetting>();
           
                foreach (var refindUserDefaultPermission in RefindUserDefaultPermissions)
                {
                    user.Permissions.Add(new UserPermissionSetting()
                    {
                        CreationTime = DateTime.Now,
                        IsGranted = true,
                        CreatorUserId = user.Id,
                        Name = refindUserDefaultPermission,
                        UserId = user.Id,
                        TenantId = user.TenantId
                    });
                }
            }

            await _userManager.InitializeOptionsAsync(AbpSession.TenantId);
            CheckErrors(await _userManager.CreateAsync(user, plainPassword));
            await CurrentUnitOfWork.SaveChangesAsync();

            if (!user.IsEmailConfirmed)
            {
                user.SetNewEmailConfirmationCode();
                await _userEmailer.SendEmailActivationLinkAsync(user, emailActivationLink);
            }

            //Notifications
            await _notificationSubscriptionManager.SubscribeToAllAvailableNotificationsAsync(user.ToUserIdentifier());
            await _appNotifier.WelcomeToTheApplicationAsync(user);
            await _appNotifier.NewUserRegisteredAsync(user);

            return user;
        }

        private void CheckForTenant()
        {
            if (!AbpSession.TenantId.HasValue)
            {
                throw new InvalidOperationException("Can not register host users!");
            }
        }

        private void CheckSelfRegistrationIsEnabled()
        {
            if (!SettingManager.GetSettingValue<bool>(AppSettings.UserManagement.AllowSelfRegistration))
            {
                throw new UserFriendlyException(L("SelfUserRegistrationIsDisabledMessage_Detail"));
            }
        }

        private bool UseCaptchaOnRegistration()
        {
            if (DebugHelper.IsDebug)
            {
                return false;
            }

            return SettingManager.GetSettingValue<bool>(AppSettings.UserManagement.UseCaptchaOnRegistration);
        }

        private async Task<Tenant> GetActiveTenantAsync()
        {
            if (!AbpSession.TenantId.HasValue)
            {
                return null;
            }

            return await GetActiveTenantAsync(AbpSession.TenantId.Value);
        }

        private async Task<Tenant> GetActiveTenantAsync(int tenantId)
        {
            var tenant = await _tenantManager.FindByIdAsync(tenantId);
            if (tenant == null)
            {
                throw new UserFriendlyException(L("UnknownTenantId{0}", tenantId));
            }

            if (!tenant.IsActive)
            {
                throw new UserFriendlyException(L("TenantIdIsNotActive{0}", tenantId));
            }

            return tenant;
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
