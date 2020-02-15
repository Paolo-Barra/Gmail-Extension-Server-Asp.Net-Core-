using System;
using System.Collections.Generic;
using System.Text;

namespace CommonDesk.Venue.Authorization.Users.Dto
{
    public class GetUserByUserAccountIdInput
    {
        public string ProviderId { get; set; }
        public string UserAccountId { get; set; }
    }
}
