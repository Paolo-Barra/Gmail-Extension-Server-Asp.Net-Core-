using System.ComponentModel.DataAnnotations;

namespace CommonDesk.Venue.Authorization.Accounts.Dto
{
    public class SendEmailActivationLinkInput
    {
        [Required]
        public string EmailAddress { get; set; }
    }
}