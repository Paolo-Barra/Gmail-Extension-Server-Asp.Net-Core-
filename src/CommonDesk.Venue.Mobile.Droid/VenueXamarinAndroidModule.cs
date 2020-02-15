using Abp.Modules;
using Abp.Reflection.Extensions;

namespace CommonDesk.Venue
{
    [DependsOn(typeof(VenueXamarinSharedModule))]
    public class VenueXamarinAndroidModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(VenueXamarinAndroidModule).GetAssembly());
        }
    }
}