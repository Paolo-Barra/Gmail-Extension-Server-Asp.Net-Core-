using System.Threading.Tasks;
using Abp.Domain.Policies;

namespace CommonDesk.Venue.Authorization.Users
{
    public interface IUserPolicy : IPolicy
    {
        Task CheckMaxUserCountAsync(int tenantId);
    }
}
