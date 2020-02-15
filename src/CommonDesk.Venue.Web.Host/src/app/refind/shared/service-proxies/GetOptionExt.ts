import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';

export class GetOptionsKey 
{
    RecipeModeKey:string ="RecipeMode";
    RecipeTypes:string ="RecipeTypes";
    CdValidationStyle:string ="CdValidationStyle";
    CdListValidationStyle:string ="CdListValidationStyle";
    RecipeTemplateWidget:string ="RecipeTemplateWidget";
    FieldToSearch:string ="FieldToSearch";
    SearchTimeFrame:string ="SearchTimeFrame";
    FolderPerContactSource:string ="FolderPerContactSource";
    FolderSearch:string ="FolderSearch";
    CategoryItemType:string ="CategoryItemType";
    CategoryItemDataType:string ="CategoryItemDataType";
    VenueTreeByTime:string ="VenueTreeByTime";
    InboxStyle:string ="InboxStyle";
    AttachmentExtractionStyle:string ="AttachmentExtractionStyle";
    PushType:string ="PushType";
    RecipeTemplateKeys:string ="RecipeTemplateKeys";
    RecipeTemplateDataTypes:string ="RecipeTemplateDataTypes";
    CdRecipeTemplateCategory:string ="CdRecipeTemplateCategory";
}
//
// GetOptionsExt - Provides a wrapper around the GetOptions call to the syncservice
//
export class GetOptionsExt
{
     static Keys: GetOptionsKey = new GetOptionsKey();
     Options: { [index: string]: Rt.PortalOption[]; };
     GetList(key:string) : Rt.PortalOption[]  { 
         return this.Options[key];  
        } 

    constructor(parent:Rt.GetOptionsResponse )
    {
        this.Options = parent.Options ? parent.Options : {};
    }
}
