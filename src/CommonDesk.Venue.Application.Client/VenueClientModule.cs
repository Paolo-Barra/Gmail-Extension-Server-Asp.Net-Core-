using Abp.Modules;
using Abp.Reflection.Extensions;

namespace CommonDesk.Venue
{
    public class VenueClientModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(VenueClientModule).GetAssembly());
        }
    }
}
