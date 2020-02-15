using Abp.AspNetCore.Mvc.Authorization;
using CommonDesk.Venue.Storage;

namespace CommonDesk.Venue.Web.Controllers
{
    [AbpMvcAuthorize]
    public class ProfileController : ProfileControllerBase
    {
        public ProfileController(ITempFileCacheManager tempFileCacheManager) :
            base(tempFileCacheManager)
        {
        }
    }
}