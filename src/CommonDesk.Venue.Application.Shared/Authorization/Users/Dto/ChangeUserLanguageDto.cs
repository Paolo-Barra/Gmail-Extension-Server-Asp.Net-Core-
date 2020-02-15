using System.ComponentModel.DataAnnotations;

namespace CommonDesk.Venue.Authorization.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}
