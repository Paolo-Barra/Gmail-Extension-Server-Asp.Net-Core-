using System.Collections.Generic;
using CommonDesk.Venue.Authorization.Users.Importing.Dto;
using CommonDesk.Venue.Dto;

namespace CommonDesk.Venue.Authorization.Users.Importing
{
    public interface IInvalidUserExporter
    {
        FileDto ExportToFile(List<ImportUserDto> userListDtos);
    }
}
