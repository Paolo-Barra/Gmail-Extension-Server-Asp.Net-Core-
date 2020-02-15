using Abp.Modules;
using Abp.Reflection.Extensions;
using Castle.Windsor.MsDependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using CommonDesk.Venue.Configure;
using CommonDesk.Venue.Startup;
using CommonDesk.Venue.Test.Base;

namespace CommonDesk.Venue.GraphQL.Tests
{
    [DependsOn(
        typeof(VenueGraphQLModule),
        typeof(VenueTestBaseModule))]
    public class VenueGraphQLTestModule : AbpModule
    {
        public override void PreInitialize()
        {
            IServiceCollection services = new ServiceCollection();
            
            services.AddAndConfigureGraphQL();

            WindsorRegistrationHelper.CreateServiceProvider(IocManager.IocContainer, services);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(VenueGraphQLTestModule).GetAssembly());
        }
    }
}