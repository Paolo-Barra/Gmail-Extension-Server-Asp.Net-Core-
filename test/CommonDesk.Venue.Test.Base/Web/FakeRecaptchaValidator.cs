using System.Threading.Tasks;
using CommonDesk.Venue.Security.Recaptcha;

namespace CommonDesk.Venue.Test.Base.Web
{
    public class FakeRecaptchaValidator : IRecaptchaValidator
    {
        public Task ValidateAsync(string captchaResponse)
        {
            return Task.CompletedTask;
        }
    }
}
