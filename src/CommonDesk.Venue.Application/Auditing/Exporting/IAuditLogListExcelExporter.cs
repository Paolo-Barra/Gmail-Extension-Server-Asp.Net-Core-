using System.Collections.Generic;
using CommonDesk.Venue.Auditing.Dto;
using CommonDesk.Venue.Dto;

namespace CommonDesk.Venue.Auditing.Exporting
{
    public interface IAuditLogListExcelExporter
    {
        FileDto ExportToFile(List<AuditLogListDto> auditLogListDtos);

        FileDto ExportToFile(List<EntityChangeListDto> entityChangeListDtos);
    }
}
