using System.Collections.Generic;
using MvvmHelpers;
using CommonDesk.Venue.Models.NavigationMenu;

namespace CommonDesk.Venue.Services.Navigation
{
    public interface IMenuProvider
    {
        ObservableRangeCollection<NavigationMenuItem> GetAuthorizedMenuItems(Dictionary<string, string> grantedPermissions);
    }
}