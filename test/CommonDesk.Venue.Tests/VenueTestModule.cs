using Abp.Modules;
using CommonDesk.Venue.Test.Base;

namespace CommonDesk.Venue.Tests
{
    [DependsOn(typeof(VenueTestBaseModule))]
    public class VenueTestModule : AbpModule
    {
       
    }
}
