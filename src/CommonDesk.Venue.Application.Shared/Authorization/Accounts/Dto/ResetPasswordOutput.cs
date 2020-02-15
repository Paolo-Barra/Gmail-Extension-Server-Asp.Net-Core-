namespace CommonDesk.Venue.Authorization.Accounts.Dto
{
    public class ResetPasswordOutput
    {
        public bool CanLogin { get; set; }

        public string UserName { get; set; }
    }
}