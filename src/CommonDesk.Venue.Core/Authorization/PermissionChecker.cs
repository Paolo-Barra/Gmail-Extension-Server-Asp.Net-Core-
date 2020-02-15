using Abp.Authorization;
using CommonDesk.Venue.Authorization.Roles;
using CommonDesk.Venue.Authorization.Users;

namespace CommonDesk.Venue.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
