using Abp.Configuration;

namespace CommonDesk.Venue.Timing.Dto
{
    public class GetTimezonesInput
    {
        public SettingScopes DefaultTimezoneScope { get; set; }
    }
}
