using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;

namespace CommonDesk.Venue.Startup
{
    [DependsOn(typeof(VenueCoreModule))]
    public class VenueGraphQLModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(VenueGraphQLModule).GetAssembly());
        }

        public override void PreInitialize()
        {
            base.PreInitialize();

            //Adding custom AutoMapper configuration
            Configuration.Modules.AbpAutoMapper().Configurators.Add(CustomDtoMapper.CreateMappings);
        }
    }
}