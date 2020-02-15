using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Auditing;
using Abp.Runtime.Session;
using Microsoft.EntityFrameworkCore;
using CommonDesk.Venue.Editions;
using CommonDesk.Venue.Sessions.Dto;
using CommonDesk.Venue.UiCustomization;

namespace CommonDesk.Venue.Sessions
{
    public class SessionAppService : VenueAppServiceBase, ISessionAppService
    {
        private readonly IUiThemeCustomizerFactory _uiThemeCustomizerFactory;

        public SessionAppService(IUiThemeCustomizerFactory uiThemeCustomizerFactory)
        {
            _uiThemeCustomizerFactory = uiThemeCustomizerFactory;
        }

        private string GetGitInfo() {
            // GitInfo - https://github.com/kzu/GitInfo -http://www.cazzulino.com/git-info-from-msbuild-and-code.html
            return $"Branch=[{ThisAssembly.Git.Branch}]    Commit=[{ThisAssembly.Git.Commit}]  RootCommit=[{ThisAssembly.Git.Sha}]";
        }

        [DisableAuditing]
        public async Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations()
        {
            var output = new GetCurrentLoginInformationsOutput
            {
                Application = new ApplicationInfoDto
                {
                    Version = AppVersionHelper.Version,
                    ReleaseDate = AppVersionHelper.ReleaseDate,
                    Features = new Dictionary<string, bool>(),
                    Currency = VenueConsts.Currency,
                    CurrencySign = VenueConsts.CurrencySign,
                    AllowTenantsToChangeEmailSettings = VenueConsts.AllowTenantsToChangeEmailSettings,
                    GitInfo = GetGitInfo(),
                    GitBranch = ThisAssembly.Git.Branch,
                    GitCommit = ThisAssembly.Git.Commit,
                }
            };

            var uiCustomizer = await _uiThemeCustomizerFactory.GetCurrentUiCustomizer();
            output.Theme = await uiCustomizer.GetUiSettings();

            if (AbpSession.TenantId.HasValue)
            {
                output.Tenant = ObjectMapper
                    .Map<TenantLoginInfoDto>(await TenantManager
                        .Tenants
                        .Include(t => t.Edition)
                        .FirstAsync(t => t.Id == AbpSession.GetTenantId()));
            }

            if (AbpSession.UserId.HasValue)
            {
                output.User = ObjectMapper.Map<UserLoginInfoDto>(await GetCurrentUserAsync());
            }

            if (output.Tenant == null)
            {
                return output;
            }

            if (output.Tenant.Edition != null)
            {
                output.Tenant.Edition.IsHighestEdition = IsEditionHighest(output.Tenant.Edition.Id);
            }

            output.Tenant.SubscriptionDateString = GetTenantSubscriptionDateString(output);
            output.Tenant.CreationTimeString = output.Tenant.CreationTime.ToString("d");

            return output;

        }

        private bool IsEditionHighest(int editionId)
        {
            var topEdition = GetHighestEditionOrNullByMonthlyPrice();
            if (topEdition == null)
            {
                return false;
            }

            return editionId == topEdition.Id;
        }

        private SubscribableEdition GetHighestEditionOrNullByMonthlyPrice()
        {
            var editions = TenantManager.EditionManager.Editions;
            if (editions == null || !editions.Any())
            {
                return null;
            }

            return editions.Cast<SubscribableEdition>()
                .OrderByDescending(e => e.MonthlyPrice)
                .FirstOrDefault();
        }

        private string GetTenantSubscriptionDateString(GetCurrentLoginInformationsOutput output)
        {
            return output.Tenant.SubscriptionEndDateUtc == null
                ? L("Unlimited")
                : output.Tenant.SubscriptionEndDateUtc?.ToString("d");
        }

        public async Task<UpdateUserSignInTokenOutput> UpdateUserSignInToken()
        {
            if (AbpSession.UserId <= 0)
            {
                throw new Exception(L("ThereIsNoLoggedInUser"));
            }

            var user = await UserManager.GetUserAsync(AbpSession.ToUserIdentifier());
            user.SetSignInToken();
            return new UpdateUserSignInTokenOutput
            {
                SignInToken = user.SignInToken,
                EncodedUserId = Convert.ToBase64String(Encoding.UTF8.GetBytes(user.Id.ToString())),
                EncodedTenantId = user.TenantId.HasValue
                    ? Convert.ToBase64String(Encoding.UTF8.GetBytes(user.TenantId.Value.ToString()))
                    : ""
            };
        }
    }
}