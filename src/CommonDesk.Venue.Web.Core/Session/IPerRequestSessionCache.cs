using System.Threading.Tasks;
using CommonDesk.Venue.Sessions.Dto;

namespace CommonDesk.Venue.Web.Session
{
    public interface IPerRequestSessionCache
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformationsAsync();
    }
}
