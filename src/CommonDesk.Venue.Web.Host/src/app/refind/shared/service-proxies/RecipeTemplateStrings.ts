
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';


export interface IRecipeTemplateBlock {
    title: string;                                           // CDRecipeTemplateResponse Template.Name 
    key: string;                                             // CDRecipeTemplateResponse TemplateId
    recipeType: Rt.RecipeTypes;                     // CDRecipeTemplateResponse Type
    contactSource:  Rt.FolderPerContactSource;      // RecipeCriteria:  SortMailCriteria.Source 
}

export class RecipeTempateData2 {
    constructor() {}
    findByKey(key:string,template:Rt.CdRecipeTemplate,recipe:Rt.RecipeCriteria) : IRecipeTemplateBlock
    {
        let retVar:IRecipeTemplateBlock;
        retVar.title = template.Name;
        retVar.key = key;
        retVar.recipeType = template.Type;
        retVar.contactSource = recipe.SortCriteria.Source;
        return retVar;
    }
    
}

export class RecipeTempateData {
    data: IRecipeTemplateBlock[];
    constructor() {
        this.data = [
            // General Purpose 
            {
                title: "Message Contains",
                key: "I_MessageContains",
                recipeType: Rt.RecipeTypes.MessageContains,
                contactSource: Rt.FolderPerContactSource.None,
            },
            {
                title: "Messages Sent",
                key: "I_MessagesSent",
                recipeType: Rt.RecipeTypes.UserLists,
                contactSource: Rt.FolderPerContactSource.None,
            },
            {
                title: "User List By Category",
                key: "I_UserListCategory",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.UserListByCategory
            },
            {
                title: "User List",
                key: "I_MessageByUserList",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.UserLists
            },

            // Inbox Styles
            {
                title: "CommonDesk Priority Inbox",
                key: "I_CommonDeskPriorityInbox",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.InboxRecipe
            },
            {
                title: "Gmail 'Like' Inbox",
                key: "I_GmailLikeInbox",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.PriorityInbox
            },
            {
                title: "YourInbox",
                key: "Inbox_Style",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.MessageContains
            },
            {
                title: "Inbox-zero Inbox",
                key: "I_InboxZeroInbox",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.InboxRecipe
            },
            {
                title: "Outlook 'Like' Inbox",
                key: "I_OutlookLikeInbox",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.MessageContains
            },
            {
                title: "Push Notifications",
                key: "I_SmartPush",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.MessageContains
            },
            {
                title: "SaneBox 'Like' Inbox",
                key: "ISaneBoxLikeInbox",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.MessageContains
            },

            // Mailing Lists
            {
                title: "Mailing List (Unsolicited)",
                key: "I_NewsGroup_UnSolicited",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.MessageContains
            },
            {
                title: "Promotions",
                key: "I_Promotions",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.MessageContains
            },
            {
                title: "Updates",
                key: "I_Updates",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.MessageContains
            },

            // Orgainize BY
            {
                title: "Organize By Category",
                key: "I_All_Categories",
                contactSource: Rt.FolderPerContactSource.AllCategories,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize By Co-Worker",
                key: "I_MyCompany",
                contactSource: Rt.FolderPerContactSource.MyCompany,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize By All Contacts",
                key: "I_VenueTreeAllContacts",
                contactSource: Rt.FolderPerContactSource.CategoriesThenContacts,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize By Contact With Categories",
                key: "I_CatFromCibtacts",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize By Custom Domain",
                key: "I_VenueTreeCustomDomain",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize By Email Domain",
                key: "I_VenueTreeDomain",
                contactSource: Rt.FolderPerContactSource.ByDomain,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize By Existing Folders",
                key: "I_CatFromFolders",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize By Contact Group",
                key: "I_VenueTreeContactGroup",
                contactSource: Rt.FolderPerContactSource.PeopleFromAContactGroup,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize By Industry",
                key: "I_Industry",
                contactSource: Rt.FolderPerContactSource.ByIndustry,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize by Keywords",
                key: "I_Keywords",
                contactSource: Rt.FolderPerContactSource.Keywords,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize By Mailing List",
                key: "I_NewsGroup_Solicited",
                contactSource: Rt.FolderPerContactSource.NewsGroup,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize By Received Contacts",
                key: "I_VenueTreeReceived",
                contactSource: Rt.FolderPerContactSource.PeopleWhoveSentMeMessages,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize By Sent Contact",
                key: "I_VenueTreeSent",
                contactSource: Rt.FolderPerContactSource.PeopleIveSentMessagesTo,
                recipeType: Rt.RecipeTypes.VenueTree
            },
            {
                title: "Organize By Timeframe",
                key: "I_VenueTreeTime",
                contactSource: Rt.FolderPerContactSource.DateRangeByWeek,
                recipeType: Rt.RecipeTypes.VenueTree
            },

            // social media 
            {
                title: "Facebook Groups",
                key: "I_FacebookGroups",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.MessageContains
            },
            {
                title: "Google Alerts",
                key: "I_GoogleAlerts",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.MessageContains
            },
            {
                title: "Meetup.com",
                key: "I_Meetup",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.MessageContains
            },
            {
                title: "Twitter",
                key: "I_Twitter",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.MessageContains
            },
            // Websites
            {
                title: "Upwork.com",
                key: "I_UpworkNotifications",
                contactSource: Rt.FolderPerContactSource.None,
                recipeType: Rt.RecipeTypes.MessageContains
            },
        ]
    }

    /// get first or default 
    findByType(search:string) : IRecipeTemplateBlock { 
        return this.data.find( r => r.key == search );
    }
}

export class RecipeTemplateNames {
    static OrgainizeByIndustry = "I_Industry";
    static OrganizeByIndustry = "I_NewsGroup_Solicited";
    static OrgainizeByTimeFrame = "I_VenueTreeTime";

    static UserListTemplateId = "I_MessageByUserList";
    static MessagesSentTemplateId = "I_MessagesSent";
    static NewsgroupUnsolicitedTemplateId = "I_NewsGroup_UnSolicited";
    static VenueTreeSentTemplateId = "I_VenueTreeSent";
    static VenueTreeAddressBookTemplateId = "I_VenueTreeAllContacts";
    static VenueTreeContactGroupTemplateId = "I_VenueTreeContactGroup";
    static VenueTreeDomainTemplateId = "I_VenueTreeDomain";
    static VenueTreeReceivedContactsTemplateId = "I_VenueTreeReceived";
    static GoogleAlertsTemplateId = "I_GoogleAlerts";
    static FacebookGroupsTemplateId = "I_FacebookGroups";
    static PromotionsTemplateId = "I_Promotions";
    static UpdatesTemplateId = "I_Updates";
    static OutlookLikeInboxTemplateId = "I_OutlookLikeInbox";
    static InboxZeroInboxTemplateId = "I_InboxZeroInbox";
    static MeetupTemplateId = "I_Meetup";
    static BSPTemplateId = "I_BSP";
    static TwitterTemplateId = "I_Twitter";
    static UserListByCategoryTemplateId = "I_UserListCategory";
    static DefaultCookbook = "I_DefaultCookbook";
    static SubtractInboxTemplateId = "I_SubtractInbox";

}


export class RecipeTemplateStrings {
    static MessageContainsName = "Message Contains";
    static MessageContainsShortDescription = "Collects messages based on the content of a message.";
    static MessageContainsLongDescription = "Collects messages based on the content of a message.You can filter messages based on words, dates and peoples names found as text in any messages field.";
    static MessageContainsIconPath = "/static/RecipeTemplateIcons/MessageContains.png";
    static MessageContainsTemplateId = "I_MessageContains";
    static AccountsPageName = "Accounts";
    static UserListName = "User List";

    static UserListShortDescription = "Collects messages based on who the messages is send to or received from.";

    static UserListIconPath = "/static/RecipeTemplateIcons/UserList.png";
    static UserListLongDescription = "Collects messages based on who the messages is send to or received from. This can be an single name or email address, or a list of names found in your address book or a email group provided by your company.";

    static MessagesSentName = "Messages Sent";
    static MessagesSentShortDescription = "Collects messages based conversation patterns. ";
    static MessagesSentIconPath = "/static/RecipeTemplateIcons/UserList_Small.png";
    static MessagesSentLongDescription = "Collects messages based conversation patterns. Messages captured here will be from people who you sent messages to. This makes it easy to quickmersly find conversations that you are having. ";

    static NewsgroupSolicitedName = "Organize By News Groups";
    static NewsgroupSolicitedShortDescription = "Organize your News Groups into a hierarchy, where each node the name of a the group.";
    static NewsgroupSolicitedIconPath = "/static/RecipeTemplateIcons/MailingListSolicited.png";
    static NewsgroupSolicitedLongDescription = "Organize your News Groups into a hierarchy, where each node the name of a the group.";


    static NewsgroupUnsolicitedName = "Mailing List (Unsolicited)";

    static NewsgroupUnsolicitedShortDescription =
        "Provides a list of all opt-in mailing list you are currently receiving.";
    static NewsgroupUnsolicitedIconPath = "/static/RecipeTemplateIcons/MailingListUnsolicited.png";
    static NewsgroupUnsolicitedLongDescription = "Provides a list of all repetitive mailing list that you most likely did not opt-in for. These include mailing list campaigns, advertisements, sales information or any repetitive email that you did not explicitly sign up for..";

    static VenueTreeSentName = "Organize By Sent Contact";

    static VenueTreeSentShortDescription =
        "Provides a hierarchical tree of Venues, where each node is a person found in your SENT items folder.";

    static VenueTreeSentIconPath = "/static/RecipeTemplateIcons/OrganizeBySent.png";
    static VenueTreeAddressBookName = "Organize By All Contacts";

    static VenueTreeAddressBookShortDescription =
        "Organize your messages into a hierarchy, where each node is a person contained in your Address Book.";

    static VenueTreeAddressBookIconPath = "/static/RecipeTemplateIcons/OrganizeByAll.png";

    VenueTreeTimeFrameName = "Organize By Timeframe";

    VenueTreeTimeFrameShortDescription = "Organize your messages into a hierarchy, where each node is a period of time (week, month, time of day).";

    VenueTreeTimeFrameIconPath = "/static/RecipeTemplateIcons/OrganizeByTime.png";

    VenueTreeCustomDomainName = "Organize By Custom Domain";
    VenueTreeCustomDomainTemplateId = "I_VenueTreeCustomDomain";

    VenueTreeCustomDomainShortDescription =
        "Organize your messages into a hierarchy, based on a custom domain list provided on the server.";


    VenueTreeCustomDomainIconPath = "/static/RecipeTemplateIcons/OrganizeByCustomDomain.png";

    VenueTreeContactGroupName = "Organize By Contact Group";

    VenueTreeContactGroupShortDescription =
        "Organize your messages into a hierarchy, where each node is a member of a contact group.";


    VenueTreeContactGroupIconPath = "/static/RecipeTemplateIcons/OrganizeByGroup.png";

    VenueTreeDomainName = "Organize By Email Domain";

    VenueTreeDomainShortDescription =
        "Provides a hierarchy of Venues, where each node is a domain from which you've received messages.";


    VenueTreeDomainIconPath = "/static/RecipeTemplateIcons/OrganizeByDomain.png";

    VenueTreeReceivedContactsName = "Organize By Received Contacts";

    VenueTreeReceivedContactsShortDescription =
        "Provides a hierarchical tree of Venues," +
        " where each node is a person who you RECEIVED a message from.";

    VenueTreeReceivedContactsIconPath = "/static/RecipeTemplateIcons/OrganizeByReceived.png";

    VenueTreeReceivedContactsLongDescription =
        "Provides a hierarchical tree of venues, where each node is a person found in your sent items folder. Inside each venue will be all of the received messages from that person."
        ;

    GoogleAlertsName = "Google Alerts";

    GoogleAlertsShortDescription =
        "Sort all of your Google Alerts.";


    GoogleAlertsIconPath = "/static/RecipeTemplateIcons/Google.png";

    FacebookGroupsName = "Facebook Groups";

    FacebookGroupsShortDescription =
        "Please select which Facebook Groups you would like to include in this venue.";


    FacebookGroupsIconPath = "/static/RecipeTemplateIcons/Facebook.png";

    PromotionsName = "Promotions";

    PromotionsShortDescription =
        "Filter promotional emails out of your inbox.";


    PromotionsIconPath = "/static/RecipeTemplateIcons/MailingListUnsolicited.png";

    UpdatesName = "Updates";

    UpdatesShortDescription =
        "Filter updates emails out of your inbox.";


    UpdatesIconPath = "/static/RecipeTemplateIcons/MailingListSolicited.png";

    // SubtractInbox 
    SubtractInboxName = "Subtract Inbox";

    SubtractInboxShortDescription =
        "This venue allows to define a venue by choosing other venues whose messages will be exclused from the venue."
        ;

    SubtractInboxIconPath = "/static/RecipeTemplateIcons/BusinessSocialPersonal_Small.png";

    // GmailLikeInbox
    GmailLikeInboxName = "Gmail 'Like' Inbox";

    GmailLikeInboxShortDescription =
        "This recipe creates a Gmail 'Like' Tabed Inbox."
        ;

    GmailLikeInboxIconPath = "/static/RecipeTemplateIcons/GmailInbox.png";

    // OutlookLikeInbox
    OutlookLikeInboxName = "Outlook 'Like' Inbox";

    OutlookLikeInboxShortDescription =
        "This recipe creates a Outlook 'Like' Tabed Inbox."
        ;

    OutlookLikeInboxIconPath = "/static/RecipeTemplateIcons/OutlookInbox.png";

    // InboxZeroInbox
    InboxZeroInboxName = "Inbox-zero Inbox";

    InboxZeroInboxShortDescription =
        "This recipe creates a Inbox-Zero Inbox."
        ;

    InboxZeroInboxIconPath = "/static/RecipeTemplateIcons/InboxZero.png";

    // SaneBoxLikeInbox
    SaneBoxLikeInboxName = "SaneBox 'Like' Inbox";
    SaneBoxLikeInboxTemplateId = "ISaneBoxLikeInbox";

    SaneBoxLikeInboxShortDescription =
        "This recipe creates a SaneBox 'Like' Tabed Inbox."
        ;

    SaneBoxLikeInboxIconPath = "/static/RecipeTemplateIcons/SaneboxInbox.png";


    BSPName = "Business/Social/Personal";

    BSPShortDescription =
        "This venue allows you to categorize messages based on whether they are related to your business, social, or personal activities."
        ;


    BSPIconPath = "/RecipeTemplateIcons/BusinessSocialPersonal_Small.png";


    MeetupName = "Meetup.com";

    MeetupShortDescription = "Organize your Meetup.com messages into a venue.";


    MeetupIconPath = "/RecipeTemplateIcons/Meetup.png";
    MeetupLongDescription = "Organize your Meetup.com messages into a venue. Each Meetup group you are a member of is listed in the 'MEETUPS GROUPS' section.";

    TwitterName = "Twitter";

    TwitterShortDescription = "Create a venue that captures Twitter messages.";


    TwitterIconPath = "/RecipeTemplateIcons/Twitter.png";
    TwitterLongDescription = "Provides the ability to filter twitter notifications.";

    UserListByCategoryName = "User List By Category";

    UserListByCategoryShortDescription = "Create a venue that collects messages based on how you've categorized the recipients.";


    UserListByCategoryIconPath = "/RecipeTemplateIcons/UserListByCategory.png";

    GeneralCookbookDescription =
        "The {0} Cookbook will provide a system for organizing your email that is tailored to your industry.\n\n" +
        "To do this, we will ask a few simple questions and then guide you through several steps.\n\n" +
        "This entire process will take three minutes and you can cancel and stop at any time. If you cancel, nothing about " +
        "your inbox will be affected. If you don't like the results, you canh rease this cookbook and start over." +
        "{1}";

    OrganizeByExistingFolderIconPath =
        "/static/RecipeTemplateIcons/OrganizeByFolder.png";

    OrganizeByContactByCategoryIconPath =
        "/static/RecipeTemplateIcons/OrganizeByContactByCategory.png";

    RealEstateIconPath = "/RecipeTemplateIcons/RealEstate.png";
    LegalIconPath = "/RecipeTemplateIcons/Legal.png";
    VenueTreeOrganizeByCategoryName = "Organize By Category";
    VenueTreeOrganizeByCategoryId = "I_All_Categories";
    VenueTreeOrganizeByCategoryIconPath = "/RecipeTemplateIcons/Legal.png";
    VenueTreeOrganizeByCategoryShortDescription = "Organize your messages into a hierarchy, where each node is a User Category.";
    VenueTreeOrganizeByCategoryDescription =
        "Organize your messages into a hierarchy, where each node is a User Category.";


    FiltersPageDescription =
        "Select User Categories that ether include or exclude groups of users from the resulting recipe. If you want mail from everyone just click Next.";


}