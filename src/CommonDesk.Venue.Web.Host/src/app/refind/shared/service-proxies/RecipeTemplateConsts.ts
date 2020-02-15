export enum RecipeTemplateKeyType {
    Values,
    Collections,
    Matrixes,
    Meta
}

export class RecipeTemplateKey {
    Type: RecipeTemplateKeyType;
    Key: string;
    DisplayName: string;

    GetFullyQualifiedKey(): string {
        return `${this.Type}.{this.Key}`;
    }
}


export class RecipeImages {
    public Twitter_Small: string;
    public FolderPerContacts: string;

}

export interface IRecipeTemplateKey {
    Type: RecipeTemplateKeyType;
    Key: string;
    DisplayName: string;
}


export class AedtoValueKeys
{
    public static Name: string = "Name";
    public static FieldToMatch: string = "FieldToMatch";
    public static SearchTimeFrame: string= "SearchTimeFrame";
    public static RecipeType: string= "RecipeType";
    public static RankingGreaterThan: string= "RankingGreaterThan";
    public static RankingThreshold: string= "RankingThreshold";
    public static FolderPerContactSource: string= "FolderPerContactSource";
    public static FPC_UseFullNames: string = "FPC_UseFullNames";
    public static FPC_DisplaySent: string =  "FPC_DisplaySent";
    public static InboxStyle: string =  "InboxStyle";
    public static FPC_GroupByCategory: string =  "FPC_GroupByCategory";
    public static WhitelistMode: string = "WhitelistMode";
    public static PushType: string = "PushType";
    public static MailFoldersBasic: string = "MailFoldersBasic";
    public static Keywords: string = "Keywords";
    public static TemplateName: string = "TemplateName";
   
    public static FPC_UseAllCategories: string = "FPC_UseAllCategories";
    public static VenueTreeByTime: string = "VenueTreeByTime";
    public static ValueToMatch: string = "ValueToMatch";
    public static CookbookTemplateId: string = "CookbookTemplateId";
}

export class AedtoCollectionKeys
{
    public MailAccounts: string = "MailAccounts";
    public CategoryId: string = "CategoryId";
    public UserList: string = "UserList";
    public UserGroup: string = "UserGroup";
    public EmailDomains: string = "EmailDomains";
    public VenuesToSubtract: string = "VenuesToSubtract";
    public FolderPerContactGroups: string = "FolderPerContactGroups";
    public NewsGroups: string = "NewsGroups";
    public BuiltInCategoryList: string = "BuiltInCategoryList";
    public Categories_Included: string = "Categories_Included";
    public Categories_Excluded: string = "Categories_Excluded";
    public IndustryGroup: string = "IndustryGroup";
    public MailFolders: string = "MailFolders";
}

export class RecipeTemplateKeys 
{
    constructor(){}


    public static ValuesPath: string = "Values";
    public static CollectionsPath: string = "Collections";
    public static MatrixesPath: string = "Matrixes";

    public static SearchTimeFrameKey: string = "SearchTimeFrame";
    public static RecipeNameKey: string = "Name";
    public static FieldToMatchKey: string = "FieldToMatch";
    public static ValueToMatchKey: string = "ValueToMatch";
    public static MailAccountsKey: string = "MailAccounts";
    public static MailFoldersAdvancedKey: string = "MailFolders";
    public static UserListKey: string = "UserList";
    public static UserGroupsKey: string = "UserGroups";
    public static EmailDomainsKey: string = "EmailDomains";

    public static NewsGroupsKey: string = "NewsGroups";
    public static MeetupsKey: string = "Meetups";
    public static GoogleGroupsKey: string = "GoogleGroups";
    public static GoogleAlertsKey: string = "GoogleAlerts";
    public static FacebookGroupsKey: string = "FacebookGroups";
    public static SolicitedMessagesKey: string = "SolicitedMessages";
    public static IndustryGroupKey: string = "IndustryGroup";
    public static UpworkNotificationsKey: string = "UpworkNotifications";

    public static RankingKeyKey: string = "RankingKey";
    public static RankingGreaterThanKey: string = "RankingGreaterThan";
    public static RankingThresholdKey: string = "RankingThreshold";
    public static RecipesKey: string = "Recipes";
    public static VenuesToSubtractKey: string = "VenuesToSubtract";
    public static FolderPerContactSourceKey: string = "FolderPerContactSource";
    public static FolderPerContact_GroupsKey: string = "FolderPerContactGroups";
    public static FolderPerContact_DisplaySentFoldersKey: string = "FPC_DisplaySent";
    public static FolderPerContact_UseFullNamesKey: string = "FPC_UseFullNames";
    public static FolderPerContact_CustomDomainKey: string = "FPC_CustomDomain";
    public static FolderPerContact_GroupByCategoryKey: string = "FPC_GroupByCategory";
    public static RecipeTypeKey: string = "RecipeType";
    public static MinimumKey: string = "MinimumType";
    public static UrlLinkKey: string = "UrlLinkKey";
    public static MailFoldersBasicKey: string = "MailFoldersBasic";
    public static VenueTreeByTimeKey: string = "VenueTreeByTime";
    public static CookbookTemplateIdKey: string = "CookbookTemplateId";
    public static CategoryIdKey: string = "CategoryId";
    public static FieldToSearch: string = "FieldToSearch";
    public static FolderSearch: string = "FolderSearch";


    public FolderPerContact_UseAllCategoriesKey: string;



    //         export static List<string> GetKeyList() {
    //             return typeof(RecipeTemplateKeys)
    //                 .GetProperties()
    //                 .Select(property => property.Name)
    //                 .ToList();
    //         }


    static UrlLink : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.UrlLinkKey,
        DisplayName: "Link"
    };

    static SearchTimeFrame : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.SearchTimeFrameKey,
        DisplayName: "Search Time Frame"
    };

    static RecipeName : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.RecipeNameKey,
        DisplayName: "Recipe Name"
    };


    
    static FieldToMatch : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.FieldToMatchKey,
        DisplayName: "Field To Match"
    };

    static ValueToMatch : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.ValueToMatchKey,
        DisplayName: "Value To Match"
    };


    static MailAccounts : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.MailAccountsKey,
        DisplayName: "Mail Accounts"
    };

    static MailFoldersAdvanced : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.MailFoldersAdvancedKey,
        DisplayName: "Mail Folders"
    };

    static UserList : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.UserListKey,
        DisplayName: "User List"
    };

    static UserGroup : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.UserGroupsKey,
        DisplayName: "Groups"
    };

    static NewsGroups : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.NewsGroupsKey,
        DisplayName: "News Groups"
    };

    static IndustryGroup : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.IndustryGroupKey,
        DisplayName: "Industry Group"
    };

    static Domains : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.EmailDomainsKey,
        DisplayName:"Email Domains"
    };

    static Meetups : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.MeetupsKey,
        DisplayName:"Meetups"
    };
    static GoogleAlerts : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.GoogleAlertsKey,
        DisplayName:"Google Alerts"
    };


    static FacebookGroups : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.FacebookGroupsKey,
        DisplayName:"Facebook Groups"
    };

    static UpworkNotifications : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.UpworkNotificationsKey,
        DisplayName:"Upwork"
    };


    static RankingKey : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.RankingKeyKey,
        DisplayName:"Ranking Key"
    };


    static RankingThreshold : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.GoogleAlertsKey,
        DisplayName:"Ranking Threshold"
    };


    static RankingGreaterThan : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.RankingGreaterThanKey,
        DisplayName:"Ranking collects items greater than threshold"
    };



    static Recipes : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.RecipesKey,
        DisplayName:"Recipes"
    };

    static VenuesToSubtract : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.VenuesToSubtractKey,
        DisplayName:  "Venues"
    };

    static FolderPerContactSource : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.FolderPerContactSourceKey,
        DisplayName:"Folder Per Contact"
    };


    static FolderPerContact_GroupByCategory : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.FolderPerContact_GroupByCategoryKey,
        DisplayName: "Group by Category"
    };



    static FolderPerContact_Groups : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.FolderPerContact_GroupsKey,
        DisplayName:  "Contact Groups"
    };

    static FolderPerContact_DisplaySentFolders : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.FolderPerContact_DisplaySentFoldersKey,
        DisplayName:   "Display Sent Folders"
    };

    static FolderPerContact_UseFullNames : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.FolderPerContact_UseFullNamesKey,
        DisplayName:  "Use Full Names"
    };

    static NewsGroupSolicited : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.SolicitedMessagesKey,
        DisplayName:  "Use Full Names"
    };


    //         export static RecipeTemplateKey FolderPerContact_UseFullNames { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = FolderPerContact_UseFullNamesKey,
    //             DisplayName = "Use Full Names"
    //         };

    static RecipeType : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.RecipeTypeKey,
        DisplayName:  "Recipe Type"
    };


    //         export static RecipeTemplateKey Minimum { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = MinimumKey,
    //             DisplayName = "Minimum Count"
    //         };


    //         export static RecipeTemplateKey SolicitedMessages{ get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Collections,
    //             Key = RecipeTemplateKeys.SolicitedMessagesKey,
    //             DisplayName = "Solicated Messaage List"
    //         };


    //         export static RecipeTemplateKey MailFoldersBasic { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = RecipeTemplateKeys.MailFoldersBasicKey,
    //             DisplayName = "Mail Folders"
    //         };

    //         export static RecipeTemplateKey VenueTreeByTime { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = RecipeTemplateKeys.VenueTreeByTimeKey,
    //             DisplayName = "Orgainise By Time"
    //         };

    //         export static RecipeTemplateKey FolderPerContact_CustomDomain { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Collections,
    //             Key = RecipeTemplateKeys.FolderPerContact_CustomDomainKey,
    //             DisplayName = "Custom Domain"
    //         };

    //         export static RecipeTemplateKey CookbookTemplateId { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = RecipeTemplateKeys.CookbookTemplateIdKey,
    //             DisplayName = "Cookbook Template Id"
    //         };

    static CategoryId : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.CategoryIdKey,
        DisplayName: "Category Id"
    };

    //         public BuiltInCategoryListKey: string;

    static BuiltInCategoryListKey : string = "BuiltInCategoryList";
    static BuiltInCategoryList : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Collections,
        Key: RecipeTemplateKeys.BuiltInCategoryListKey,
        DisplayName: "Built-in Category List"
    };

    static FolderCategoryMatrixKey : string = "FolderCategoryMatrix";
    static FolderCategoryMatrix : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Matrixes,
        Key: RecipeTemplateKeys.FolderCategoryMatrixKey,
        DisplayName: "Folder-Category Matrix"
    };


    
    static FolderCategoryNameMatrixKey : string = "FolderCategoryMatrix";
    static FolderCategoryNameMatrix : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Matrixes,
        Key: RecipeTemplateKeys.FolderCategoryNameMatrixKey,
        DisplayName: "Folder-Category Name Matrix"
    };

    static AddressCategoryMatrixKey : string = "FolderCategoryMatrix";
    static AddressCategoryMatrix : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Matrixes,
        Key: RecipeTemplateKeys.AddressCategoryMatrixKey,
        DisplayName: "Address-Category Matrix"
    };


    static OrganizeByTimeKey : string = "OrganizeByTime";
    static OrganizeByTime : IRecipeTemplateKey = 
    {
        Type: RecipeTemplateKeyType.Values,
        Key: RecipeTemplateKeys.OrganizeByTimeKey,
        DisplayName: "Organize By Time"
    };

    // static OrganizeByTimeKey : string = "OrganizeByTime";
    // static OrganizeByExistingFolders : IRecipeTemplateKey = 
    // {
    //     Type: RecipeTemplateKeyType.Values,
    //     Key: RecipeTemplateKeys.OrganizeByTimeKey,
    //     DisplayName: "Organize By Time"
    // };

    //         public OrganizeByExistingFoldersKey: string;
    //         export static RecipeTemplateKey OrganizeByExistingFolders { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = RecipeTemplateKeys.OrganizeByExistingFoldersKey,
    //             DisplayName = "Organize By Existing Folders"
    //         };
    //         public OrganizeByIndustryKey: string;
    //         export static RecipeTemplateKey OrganizeByIndustry { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = RecipeTemplateKeys.OrganizeByIndustryKey,
    //             DisplayName = "Organize By Industry"
    //         };
    //         public OrganizeContactsByCategoryKey: string;
    //         export static RecipeTemplateKey OrganizeContactsByCategory { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = RecipeTemplateKeys.OrganizeContactsByCategoryKey,
    //             DisplayName = "Organize Contacts By Category"
    //         };

    //         public OrganizeContactsByMailingListKey: string;
    //         export static RecipeTemplateKey OrganizeContactsByMailingList { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = RecipeTemplateKeys.OrganizeContactsByMailingListKey,
    //             DisplayName = "Organize Contacts By Mailing List"
    //         };


    //         public YourCompanyKey: string;
    //         export static RecipeTemplateKey YourCompany { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = RecipeTemplateKeys.YourCompanyKey,
    //             DisplayName = "Your Company"
    //         };

    //         public OrganizeAttachmentsKey: string;
    //         export static RecipeTemplateKey OrganizeAttachments { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = RecipeTemplateKeys.OrganizeAttachmentsKey,
    //             DisplayName = "Organize Attachments"
    //         };

    //         public InboxStyleKey: string;
    //         export static RecipeTemplateKey InboxStyle { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = RecipeTemplateKeys.InboxStyleKey,
    //             DisplayName = "Inbox Style"
    //         };

    //         public AttachmentExtractionStyleKey: string;
    //         export static RecipeTemplateKey AttachmentExtractionStyle { get; } = new RecipeTemplateKey() {
    //             Type = RecipeTemplateKeyType.Values,
    //             Key = AttachmentExtractionStyleKey,
    //             DisplayName = "Attachment Extraction Style"
    //         };



    //         public CategoriesWhitelistKey: string;

    //         export static RecipeTemplateKey CategoriesWhitelist { get; } = new RecipeTemplateKey() {
    //             DisplayName = "Categories to Include",
    //             Key = CategoriesWhitelistKey,
    //             Type = RecipeTemplateKeyType.Collections
    //         };

    //         public CategoriesBlacklistKey: string;

    //         export static RecipeTemplateKey CategoriesBlacklist { get; } = new RecipeTemplateKey() {
    //             DisplayName = "Categories to Exclude",
    //             Key = CategoriesBlacklistKey,
    //             Type = RecipeTemplateKeyType.Collections
    //         };

    //         public UseAdvancedSettingsKey: string;

    //         export static RecipeTemplateKey UseAdvancedSettings { get; } = new RecipeTemplateKey() {
    //             DisplayName = "Use Advanced Settings",
    //             Key = UseAdvancedSettingsKey,
    //             Type = RecipeTemplateKeyType.Values
    //         };

    //         public WhitelistModeKey: string;

    //         export static RecipeTemplateKey WhitelistMode { get; } = new RecipeTemplateKey() {
    //             DisplayName = "Include Mode",
    //             Key = WhitelistModeKey,
    //             Type = RecipeTemplateKeyType.Values
    //         };

    //         public TemplateNameKey: string;

    //         export static RecipeTemplateKey TemplateName { get; } = new RecipeTemplateKey() {
    //             DisplayName = "Template Name",
    //             Key = TemplateNameKey,
    //             Type = RecipeTemplateKeyType.Values
    //         };


    //         public SmartPushGroupsKey: string;

    //         export static RecipeTemplateKey SmartPushGroups { get; } = new RecipeTemplateKey() {
    //             DisplayName = "Smart Push Groups",
    //             Key = SmartPushGroupsKey,
    //             Type = RecipeTemplateKeyType.Matrixes
    //         };

    //         export static IEnumerable<RecipeTemplateKey> All {
    //             get
    //             {
    //                 try
    //                 {
    //                     return typeof(RecipeTemplateKeys).GetProperties()
    //                         .Where(prop => prop.PropertyType == typeof(RecipeTemplateKey))
    //                         .Select(x => (RecipeTemplateKey)x.GetValue(null));
    //                 }

    // #pragma warning disable CS0168 // The variable 'e' is declared but never used
    //                 catch (Exception e)
    // #pragma warning restore CS0168 // The variable 'e' is declared but never used
    //                 {
    //                     return new List<RecipeTemplateKey>();
    //                 }
    //             }
    //         }

    //         export static IEnumerable<RecipeTemplateKey> AllCollections {
    //             get
    //             {
    //                 try
    //                 {
    //                     return typeof(RecipeTemplateKeys).GetProperties(BindingFlags.Static)
    //                         .Where(prop => prop.PropertyType == typeof(RecipeTemplateKey))
    //                         .Select(x => (RecipeTemplateKey)x.GetValue(null))
    //                         .Where(x => x.Type == RecipeTemplateKeyType.Collections);
    //                 }

    // #pragma warning disable CS0168 // The variable 'e' is declared but never used
    //                 catch (Exception e)
    // #pragma warning restore CS0168 // The variable 'e' is declared but never used
    //                 {
    //                     return new List<RecipeTemplateKey>();
    //                 }
    //             }
    //         }

    //         public PushTypeKey: string;

    //         export static RecipeTemplateKey PushType { get; } = new RecipeTemplateKey() {
    //             DisplayName = "Push Type",
    //             Key = PushTypeKey,
    //             Type = RecipeTemplateKeyType.Values
    //         };

    //         public KeywordsKey: string;

    //         export static RecipeTemplateKey Keywords { get; } = new RecipeTemplateKey() {
    //             DisplayName = "Keywords",
    //             Key = KeywordsKey,
    //             Type = RecipeTemplateKeyType.Values
    //         };
}
