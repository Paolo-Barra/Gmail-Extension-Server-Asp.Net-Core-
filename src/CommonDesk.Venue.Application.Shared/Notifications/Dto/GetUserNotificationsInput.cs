using Abp.Notifications;
using CommonDesk.Venue.Dto;

namespace CommonDesk.Venue.Notifications.Dto
{
    public class GetUserNotificationsInput : PagedInputDto
    {
        public UserNotificationState? State { get; set; }
    }
}