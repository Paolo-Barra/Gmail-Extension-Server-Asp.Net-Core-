using Abp.Modules;
using Abp.Reflection.Extensions;

namespace CommonDesk.Venue
{
    [DependsOn(typeof(VenueXamarinSharedModule))]
    public class VenueXamarinIosModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(VenueXamarinIosModule).GetAssembly());
        }
    }
}