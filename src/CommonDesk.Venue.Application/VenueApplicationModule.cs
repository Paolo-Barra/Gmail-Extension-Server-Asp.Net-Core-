using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using CommonDesk.Venue.Authorization;

namespace CommonDesk.Venue
{
    /// <summary>
    /// Application layer module of the application.
    /// </summary>
    [DependsOn(
        typeof(VenueCoreModule)
        )]
    public class VenueApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            //Adding authorization providers
            Configuration.Authorization.Providers.Add<AppAuthorizationProvider>();

            //Adding custom AutoMapper configuration
            Configuration.Modules.AbpAutoMapper().Configurators.Add(CustomDtoMapper.CreateMappings);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(VenueApplicationModule).GetAssembly());
        }
    }
}