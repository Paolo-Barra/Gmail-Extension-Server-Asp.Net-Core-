using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using CommonDesk.Venue.Authorization.Users.Dto;

namespace CommonDesk.Venue.Authorization.Users
{
    public interface IUserLoginAppService : IApplicationService
    {
        Task<ListResultDto<UserLoginAttemptDto>> GetRecentUserLoginAttempts();
    }
}
