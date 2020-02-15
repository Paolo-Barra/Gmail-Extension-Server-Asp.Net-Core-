using System.Threading.Tasks;

namespace CommonDesk.Venue.Security.Recaptcha
{
    public interface IRecaptchaValidator
    {
        Task ValidateAsync(string captchaResponse);
    }
}