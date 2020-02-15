using System.Collections.Generic;
using CommonDesk.Venue.Authorization.Users.Dto;
using CommonDesk.Venue.Dto;

namespace CommonDesk.Venue.Authorization.Users.Exporting
{
    public interface IUserListExcelExporter
    {
        FileDto ExportToFile(List<UserListDto> userListDtos);
    }
}