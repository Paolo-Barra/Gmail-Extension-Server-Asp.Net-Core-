using Abp.AutoMapper;
using CommonDesk.Venue.Organizations.Dto;

namespace CommonDesk.Venue.Models.Users
{
    [AutoMapFrom(typeof(OrganizationUnitDto))]
    public class OrganizationUnitModel : OrganizationUnitDto
    {
        public bool IsAssigned { get; set; }
    }
}