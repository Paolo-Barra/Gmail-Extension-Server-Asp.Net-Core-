using System.Threading.Tasks;

namespace CommonDesk.Venue.Net.Sms
{
    public interface ISmsSender
    {
        Task SendAsync(string number, string message);
    }
}