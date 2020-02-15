using System.Threading.Tasks;
using Abp.Application.Services;
using CommonDesk.Venue.Editions.Dto;
using CommonDesk.Venue.MultiTenancy.Dto;

namespace CommonDesk.Venue.MultiTenancy
{
    public interface ITenantRegistrationAppService: IApplicationService
    {
        Task<RegisterTenantOutput> RegisterTenant(RegisterTenantInput input);

        Task<EditionsSelectOutput> GetEditionsForSelect();

        Task<EditionSelectDto> GetEdition(int editionId);
    }
}