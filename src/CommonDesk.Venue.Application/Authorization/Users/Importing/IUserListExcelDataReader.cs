using System.Collections.Generic;
using CommonDesk.Venue.Authorization.Users.Importing.Dto;
using Abp.Dependency;

namespace CommonDesk.Venue.Authorization.Users.Importing
{
    public interface IUserListExcelDataReader: ITransientDependency
    {
        List<ImportUserDto> GetUsersFromExcel(byte[] fileBytes);
    }
}
