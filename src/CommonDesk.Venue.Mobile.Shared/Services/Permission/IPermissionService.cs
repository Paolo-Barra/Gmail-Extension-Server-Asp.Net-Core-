namespace CommonDesk.Venue.Services.Permission
{
    public interface IPermissionService
    {
        bool HasPermission(string key);
    }
}