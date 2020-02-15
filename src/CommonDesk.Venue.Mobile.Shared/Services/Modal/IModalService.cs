using System.Threading.Tasks;
using CommonDesk.Venue.Views;
using Xamarin.Forms;

namespace CommonDesk.Venue.Services.Modal
{
    public interface IModalService
    {
        Task ShowModalAsync(Page page);

        Task ShowModalAsync<TView>(object navigationParameter) where TView : IXamarinView;

        Task<Page> CloseModalAsync();
    }
}
