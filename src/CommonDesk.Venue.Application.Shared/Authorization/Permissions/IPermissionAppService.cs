using Abp.Application.Services;
using Abp.Application.Services.Dto;
using CommonDesk.Venue.Authorization.Permissions.Dto;

namespace CommonDesk.Venue.Authorization.Permissions
{
    public interface IPermissionAppService : IApplicationService
    {
        ListResultDto<FlatPermissionWithLevelDto> GetAllPermissions();
    }
}
