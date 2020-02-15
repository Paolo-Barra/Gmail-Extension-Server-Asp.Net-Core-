using Abp.AspNetCore.Mvc.Views;

namespace CommonDesk.Venue.Web.Views
{
    public abstract class VenueRazorPage<TModel> : AbpRazorPage<TModel>
    {
        protected VenueRazorPage()
        {
            LocalizationSourceName = VenueConsts.LocalizationSourceName;
        }
    }
}
