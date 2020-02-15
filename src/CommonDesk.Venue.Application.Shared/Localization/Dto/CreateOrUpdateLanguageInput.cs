using System.ComponentModel.DataAnnotations;

namespace CommonDesk.Venue.Localization.Dto
{
    public class CreateOrUpdateLanguageInput
    {
        [Required]
        public ApplicationLanguageEditDto Language { get; set; }
    }
}