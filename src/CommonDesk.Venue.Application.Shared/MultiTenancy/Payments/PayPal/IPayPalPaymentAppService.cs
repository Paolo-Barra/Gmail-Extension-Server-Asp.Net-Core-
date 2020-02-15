using System.Threading.Tasks;
using Abp.Application.Services;
using CommonDesk.Venue.MultiTenancy.Payments.Dto;
using CommonDesk.Venue.MultiTenancy.Payments.PayPal.Dto;

namespace CommonDesk.Venue.MultiTenancy.Payments.PayPal
{
    public interface IPayPalPaymentAppService : IApplicationService
    {
        Task ConfirmPayment(long paymentId, string paypalPaymentId, string paypalPayerId);

        PayPalConfigurationDto GetConfiguration();

        Task CancelPayment(CancelPaymentDto input);
    }
}
