using Microsoft.AspNetCore.Mvc;
using CommonDesk.Venue.Web.Controllers;

namespace CommonDesk.Venue.Web.Public.Controllers
{
    public class HomeController : VenueControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}