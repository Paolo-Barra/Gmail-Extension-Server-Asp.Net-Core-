using Xamarin.Forms.Internals;

namespace CommonDesk.Venue.Behaviors
{
    [Preserve(AllMembers = true)]
    public interface IAction
    {
        bool Execute(object sender, object parameter);
    }
}