using Abp.Application.Services;
using CommonDesk.Venue.Dto;
using CommonDesk.Venue.Logging.Dto;

namespace CommonDesk.Venue.Logging
{
    public interface IWebLogAppService : IApplicationService
    {
        GetLatestWebLogsOutput GetLatestWebLogs();

        FileDto DownloadWebLogs();
    }
}
