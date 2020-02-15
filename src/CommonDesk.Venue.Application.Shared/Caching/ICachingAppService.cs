using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using CommonDesk.Venue.Caching.Dto;

namespace CommonDesk.Venue.Caching
{
    public interface ICachingAppService : IApplicationService
    {
        ListResultDto<CacheDto> GetAllCaches();

        Task ClearCache(EntityDto<string> input);

        Task ClearAllCaches();
    }
}
