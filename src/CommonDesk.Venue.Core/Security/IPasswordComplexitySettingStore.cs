using System.Threading.Tasks;

namespace CommonDesk.Venue.Security
{
    public interface IPasswordComplexitySettingStore
    {
        Task<PasswordComplexitySetting> GetSettingsAsync();
    }
}
