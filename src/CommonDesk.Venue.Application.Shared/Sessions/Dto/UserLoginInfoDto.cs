using Abp.Application.Services.Dto;

namespace CommonDesk.Venue.Sessions.Dto
{
    public class UserLoginInfoDto : EntityDto<long>
    {
        public string UserAccountId { get; set; }    // COMMONDESK
  
        public string Name { get; set; }

        public string Surname { get; set; }

        public string UserName { get; set; }

        public string EmailAddress { get; set; }

        public string ProfilePictureId { get; set; }
    }
}
