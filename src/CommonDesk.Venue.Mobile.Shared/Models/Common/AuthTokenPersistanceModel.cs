using System;
using Abp.AutoMapper;
using CommonDesk.Venue.Sessions.Dto;

namespace CommonDesk.Venue.Models.Common
{
    [AutoMapFrom(typeof(ApplicationInfoDto)),
     AutoMapTo(typeof(ApplicationInfoDto))]
    public class ApplicationInfoPersistanceModel
    {
        public string Version { get; set; }

        public DateTime ReleaseDate { get; set; }
    }
}