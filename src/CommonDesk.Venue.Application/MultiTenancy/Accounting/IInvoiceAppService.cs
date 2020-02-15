using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using CommonDesk.Venue.MultiTenancy.Accounting.Dto;

namespace CommonDesk.Venue.MultiTenancy.Accounting
{
    public interface IInvoiceAppService
    {
        Task<InvoiceDto> GetInvoiceInfo(EntityDto<long> input);

        Task CreateInvoice(CreateInvoiceDto input);
    }
}
