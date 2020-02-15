using System.Collections.Generic;
using CommonDesk.Venue.Chat.Dto;
using CommonDesk.Venue.Dto;

namespace CommonDesk.Venue.Chat.Exporting
{
    public interface IChatMessageListExcelExporter
    {
        FileDto ExportToFile(List<ChatMessageExportDto> messages);
    }
}
