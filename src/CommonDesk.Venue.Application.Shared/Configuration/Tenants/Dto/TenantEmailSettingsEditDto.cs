using Abp.Auditing;
using CommonDesk.Venue.Configuration.Dto;

namespace CommonDesk.Venue.Configuration.Tenants.Dto
{
    public class TenantEmailSettingsEditDto : EmailSettingsEditDto
    {
        public bool UseHostDefaultEmailSettings { get; set; }
    }
}