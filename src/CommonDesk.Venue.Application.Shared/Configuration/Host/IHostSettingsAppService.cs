using System.Threading.Tasks;
using Abp.Application.Services;
using CommonDesk.Venue.Configuration.Host.Dto;

namespace CommonDesk.Venue.Configuration.Host
{
    public interface IHostSettingsAppService : IApplicationService
    {
        Task<HostSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(HostSettingsEditDto input);

        Task SendTestEmail(SendTestEmailInput input);
    }
}
