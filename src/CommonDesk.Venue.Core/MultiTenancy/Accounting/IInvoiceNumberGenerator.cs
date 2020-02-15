using System.Threading.Tasks;
using Abp.Dependency;

namespace CommonDesk.Venue.MultiTenancy.Accounting
{
    public interface IInvoiceNumberGenerator : ITransientDependency
    {
        Task<string> GetNewInvoiceNumber();
    }
}