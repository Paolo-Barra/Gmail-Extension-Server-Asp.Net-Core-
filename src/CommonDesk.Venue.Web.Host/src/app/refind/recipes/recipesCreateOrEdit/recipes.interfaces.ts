import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { VenueListItemExt } from '@app/refind/shared/service-proxies/VenueListItemExt';


export interface AccountsOnDevice {

    AccountRecordId: number,
    AppVersion: string,
    AreCredentialsValid: boolean,
    AuthCredentials: string,
    DeviceId: string,
    DeviceToken: string,
    DeviceType: string,
    ExpiresOn: string,
    Id: number,
    LastContactDate: string,
    MailAccountId: string,
    RefreshToken: String,
    SyncState: string,
    SyncStateData: string,
    UserAccountId: string

}

export interface IMailAccountData {

    AccountStats: {
        PercentageComplete: number,
        TotalMessages: string
    },
    AccountsOnDevice: AccountsOnDevice[],
    CompanyId: number,
    ConvertEmailAddress: string,
    CookbookId: string,
    Email: string,
    HasFullCredentials: boolean,
    id: number,
    IsMainAccount: boolean,
    MailAccountId: string,
    OAuthUniqueId: string,
    ServerVersion: string,
    ServiceUrl: string,
    SyncAccountId: number,
    SyncAccountType: string,
    TheMailAccountType: string,
    UserAccountId: string,
    UserAccountType: string,
    UtcOffset: string
}

export interface Collections {
    FolderPerContactGroups: any,
    FPC_CustomDomain: any,
    Categories_Included: any,
    Categories_Excluded: any,
    MailAccounts: any,
    IndustryGroup: any,
}
export interface Values {
    FPC_DisplaySent: boolean,
    FPC_UseFullNames: boolean,
    FPC_UseAllCategories: boolean,
    MailFoldersBasic: string,
    Name: string,
    SearchTimeFrame: string,
    VenueTreeByTime: string,
    WhitelistMode: boolean,
    FPC_GroupByCategory: boolean,
    ValueToMatch: string,
    FieldToMatch: string,
    CookbookTemplateId: string
}

export interface ReceipeModel {
    CookbookId: string,
    RecipeType: string,
    TemplateId: string,
    UserAccountID: string,
    RecipeId: string,
    Values: Values,
    Collections: Collections
}

export interface InputRecipeModel {
    Data: ReceipeModel,
    Cookbook: CookBookModel,
    UserAccountId: string,
    DeviceId: string
}

export interface InputCookBookModel {
    CookbookTemplateId: string,
    DeviceId: string,
    Force: true,
    MailAccountId: any,
    Metadata: CookBookModel,
    UserAccountId: string
}

export interface CookBookModel {
    RecipeType: "0",
    TemplateId: any,
    UserAccountId: string,
    Values: Values,
    Collections: Collections
}

export interface CdRecipeTemplate {
    Id: number,
    TemplateId: string,
    CdCookbookTemplateId: number,
    CdRecipeTemplateCategoryId: number,
    Category: number, // CdRecipeTemplateCategory	No	
    Name: string,
    Description: string,
    IconPath: string,
    Pages: any, // List<CdRecipeTemplatePage>	No	
    Type: any, // RecipeTypes	No	
    Keywords: any, // List<string>	No	
    RecipeDescriptionTemplate: string,
    Enabled: string,

    Widget: string,
}


export interface IDictionaryOfString {
    [index: string]: string;
}

export interface IDictionaryOfAny {
    [index: string]: any;
}

export interface IDictionary<T> {
    [index: string]: T;
}

export interface IDictionaryOfStringArray {
    [index: string]: string[];
}


export interface IDictionaryOfVenueListItemsArray {
    [index: string]: VenueListItemExt[];
}

export interface IDictionaryOfAnyArray {
    [index: string]: any[];
}

export interface IVenueBlockArray {
    array: Rt.IVenueBlock[];
}


export interface IPortalOptions {
    [index: string]: Rt.PortalOption[];
}
export interface IDisplayCategoryDto extends Rt.CdCategoryDto {
    IsExcludedChecked: boolean;
    IsIncludedChecked: boolean;
    IsCustomListChecked: boolean;
}

export interface IUserAccountDto {

    userId: string,
    fname: string,
    lname: string,
    atype: string,
    numAccount: string,
    emailProblems: string[]
}

export class DisplaySelectList {
    selected: boolean;
    value: string;
    constructor(v: string, select: boolean) {
        this.selected = select;
        this.value = v;

    }

}
