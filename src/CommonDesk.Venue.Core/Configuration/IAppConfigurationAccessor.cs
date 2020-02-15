using Microsoft.Extensions.Configuration;

namespace CommonDesk.Venue.Configuration
{
    public interface IAppConfigurationAccessor
    {
        IConfigurationRoot Configuration { get; }
    }
}
