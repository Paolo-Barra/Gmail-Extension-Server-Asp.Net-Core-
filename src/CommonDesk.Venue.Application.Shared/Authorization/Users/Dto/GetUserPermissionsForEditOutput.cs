using System.Collections.Generic;
using CommonDesk.Venue.Authorization.Permissions.Dto;

namespace CommonDesk.Venue.Authorization.Users.Dto
{
    public class GetUserPermissionsForEditOutput
    {
        public List<FlatPermissionDto> Permissions { get; set; }

        public List<string> GrantedPermissionNames { get; set; }
    }
}