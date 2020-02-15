using Abp.AspNetCore.Mvc.Authorization;
using CommonDesk.Venue.Authorization;
using CommonDesk.Venue.Storage;
using Abp.BackgroundJobs;

namespace CommonDesk.Venue.Web.Controllers
{
    [AbpMvcAuthorize(AppPermissions.Pages_Administration_Users)]
    public class UsersController : UsersControllerBase
    {
        public UsersController(IBinaryObjectManager binaryObjectManager, IBackgroundJobManager backgroundJobManager)
            : base(binaryObjectManager, backgroundJobManager)
        {
        }
    }
}