using System.Threading.Tasks;
using Abp.Authorization.Users;
using CommonDesk.Venue.Authorization.Users;

namespace CommonDesk.Venue.Authorization
{
    public static class UserManagerExtensions
    {
        public static async Task<User> GetAdminAsync(this UserManager userManager)
        {
            return await userManager.FindByNameAsync(AbpUserBase.AdminUserName);
        }
    }
}
