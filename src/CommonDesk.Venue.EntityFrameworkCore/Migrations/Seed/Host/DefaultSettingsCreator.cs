using System.Linq;
using Abp.Configuration;
using Abp.Localization;
using Abp.MultiTenancy;
using Abp.Net.Mail;
using Microsoft.EntityFrameworkCore;
using CommonDesk.Venue.EntityFrameworkCore;

namespace CommonDesk.Venue.Migrations.Seed.Host
{
    public class DefaultSettingsCreator
    {
        private readonly VenueDbContext _context;

        public DefaultSettingsCreator(VenueDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            int? tenantId = null;

            if (VenueConsts.MultiTenancyEnabled == false)
            {
                // var defaultTenant = _context.Tenants.IgnoreQueryFilters().FirstOrDefault(t => t.TenancyName == MultiTenancy.Tenant.DefaultTenantName);
                // tenantId = defaultTenant.Id;

                tenantId = MultiTenancyConsts.DefaultTenantId;

            }

            //Emailing
            AddSettingIfNotExists(EmailSettingNames.DefaultFromAddress, "admin@mydomain.com", tenantId);
            AddSettingIfNotExists(EmailSettingNames.DefaultFromDisplayName, "mydomain.com mailer", tenantId);

            //Languages
            AddSettingIfNotExists(LocalizationSettingNames.DefaultLanguage, "en", tenantId);
        }

        private void AddSettingIfNotExists(string name, string value, int? tenantId = null)
        {
            if (_context.Settings.IgnoreQueryFilters().Any(s => s.Name == name && s.TenantId == tenantId && s.UserId == null))
            {
                return;
            }

            _context.Settings.Add(new Setting(tenantId, null, name, value));
            _context.SaveChanges();
        }
    }
}
