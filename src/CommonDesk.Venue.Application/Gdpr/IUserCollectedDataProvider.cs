using System.Collections.Generic;
using System.Threading.Tasks;
using Abp;
using CommonDesk.Venue.Dto;

namespace CommonDesk.Venue.Gdpr
{
    public interface IUserCollectedDataProvider
    {
        Task<List<FileDto>> GetFiles(UserIdentifier user);
    }
}
