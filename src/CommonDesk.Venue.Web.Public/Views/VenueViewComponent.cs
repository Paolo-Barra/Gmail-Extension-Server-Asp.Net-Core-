using Abp.AspNetCore.Mvc.ViewComponents;

namespace CommonDesk.Venue.Web.Public.Views
{
    public abstract class VenueViewComponent : AbpViewComponent
    {
        protected VenueViewComponent()
        {
            LocalizationSourceName = VenueConsts.LocalizationSourceName;
        }
    }
}