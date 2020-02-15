using Abp.Dependency;
using Abp.Reflection.Extensions;
using Microsoft.Extensions.Configuration;
using CommonDesk.Venue.Configuration;

namespace CommonDesk.Venue.Test.Base
{
    public class TestAppConfigurationAccessor : IAppConfigurationAccessor, ISingletonDependency
    {
        public IConfigurationRoot Configuration { get; }

        public TestAppConfigurationAccessor()
        {
            Configuration = AppConfigurations.Get(
                typeof(VenueTestBaseModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }
    }
}
