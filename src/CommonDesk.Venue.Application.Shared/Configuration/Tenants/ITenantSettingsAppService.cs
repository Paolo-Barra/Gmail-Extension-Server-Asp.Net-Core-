using System.Threading.Tasks;
using Abp.Application.Services;
using CommonDesk.Venue.Configuration.Tenants.Dto;

namespace CommonDesk.Venue.Configuration.Tenants
{
    public interface ITenantSettingsAppService : IApplicationService
    {
        Task<TenantSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(TenantSettingsEditDto input);

        Task ClearLogo();

        Task ClearCustomCss();
    }
}
