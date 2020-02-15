using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;

namespace CommonDesk.Venue
{
    [DependsOn(typeof(VenueClientModule), typeof(AbpAutoMapperModule))]
    public class VenueXamarinSharedModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Localization.IsEnabled = false;
            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(VenueXamarinSharedModule).GetAssembly());
        }
    }
}