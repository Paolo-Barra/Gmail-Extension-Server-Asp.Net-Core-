using System.Threading.Tasks;
using Abp.Application.Services;
using CommonDesk.Venue.Sessions.Dto;

namespace CommonDesk.Venue.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();

        Task<UpdateUserSignInTokenOutput> UpdateUserSignInToken();
    }
}
