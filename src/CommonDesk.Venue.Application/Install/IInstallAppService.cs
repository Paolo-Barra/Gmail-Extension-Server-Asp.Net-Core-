using System.Threading.Tasks;
using Abp.Application.Services;
using CommonDesk.Venue.Install.Dto;

namespace CommonDesk.Venue.Install
{
    public interface IInstallAppService : IApplicationService
    {
        Task Setup(InstallDto input);

        AppSettingsJsonDto GetAppSettingsJson();

        CheckDatabaseOutput CheckDatabase();
    }
}