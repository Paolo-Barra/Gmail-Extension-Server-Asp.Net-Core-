using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using CommonDesk.Venue.Common.Dto;
using CommonDesk.Venue.Editions.Dto;

namespace CommonDesk.Venue.Common
{
    public interface ICommonLookupAppService : IApplicationService
    {
        Task<ListResultDto<SubscribableEditionComboboxItemDto>> GetEditionsForCombobox(bool onlyFreeItems = false);

        Task<PagedResultDto<NameValueDto>> FindUsers(FindUsersInput input);

        GetDefaultEditionNameOutput GetDefaultEditionName();
    }
}