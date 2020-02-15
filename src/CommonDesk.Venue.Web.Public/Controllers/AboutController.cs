using Microsoft.AspNetCore.Mvc;
using CommonDesk.Venue.Web.Controllers;

namespace CommonDesk.Venue.Web.Public.Controllers
{
    public class AboutController : VenueControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}