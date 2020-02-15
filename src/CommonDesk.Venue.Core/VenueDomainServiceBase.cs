using Abp.Domain.Services;

namespace CommonDesk.Venue
{
    public abstract class VenueDomainServiceBase : DomainService
    {
        /* Add your common members for all your domain services. */

        protected VenueDomainServiceBase()
        {
            LocalizationSourceName = VenueConsts.LocalizationSourceName;
        }
    }
}
