/* Options:
Date: 2020-01-28 20:01:15
Version: 5.50
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:5172

//GlobalNamespace: 
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: IRequest,IResponse,IRequestPreferences,HttpResult,CDNLogEvent,GetStaticFileResponse
//DefaultImports: 
*/


export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export class VenueServerEvent
{
    public constructor(init?:Partial<VenueServerEvent>) { (<any>Object).assign(this, init); }
    public UserAccountId: string;
    public MailAccountId: string;
}

export class ServerEventWithMessage extends VenueServerEvent
{
    public constructor(init?:Partial<ServerEventWithMessage>) { super(init); (<any>Object).assign(this, init); }
    public Message: string;
}

export enum ServerStatusCommand
{
    None = 'None',
    AccountCreationPhease1Complete = 'AccountCreationPhease1Complete',
    AccountCreationPhease2Complete = 'AccountCreationPhease2Complete',
    Channel1Message = 'Channel1Message',
    Channel2Message = 'Channel2Message',
}

export class StatsUpdatedServerEvent extends ServerEventWithMessage
{
    public constructor(init?:Partial<StatsUpdatedServerEvent>) { super(init); (<any>Object).assign(this, init); }
    public Refresh: boolean;
    public Command: ServerStatusCommand;
}

export class AccountCreationProgressGuageEvent extends ServerEventWithMessage
{
    public constructor(init?:Partial<AccountCreationProgressGuageEvent>) { super(init); (<any>Object).assign(this, init); }
    public PercentComplete: number;
    public MessageCount: number;
}

export enum RecDisplayActionWidgetType
{
    None = 'None',
    Button = 'Button',
    Checkbox = 'Checkbox',
    Toggle = 'Toggle',
    DropDown = 'DropDown',
    StatusBar1 = 'StatusBar1',
    StatusBar2 = 'StatusBar2',
    QuickPopulateCheck = 'QuickPopulateCheck',
}

export enum RecDisplayActionTypes
{
    None = 'None',
    InstallRecipe = 'InstallRecipe',
    AddAccount = 'AddAccount',
    DismissRecomendation = 'DismissRecomendation',
    HideRecommendationAndRefresh = 'HideRecommendationAndRefresh',
    JumpToLink = 'JumpToLink',
    Minimize = 'Minimize',
    LoadAccountPhase1 = 'LoadAccountPhase1',
    LoadAccountPhase2 = 'LoadAccountPhase2',
    HideProgressPhase1 = 'HideProgressPhase1',
    HideProgressPhase2 = 'HideProgressPhase2',
    LoadHistoryDuration = 'LoadHistoryDuration',
    LoadHistoryBodys = 'LoadHistoryBodys',
}

export class RecDisplayDropDownElement
{
    public constructor(init?:Partial<RecDisplayDropDownElement>) { (<any>Object).assign(this, init); }
    public Message: string;
    public Action: string;
}

export enum RestPostAction
{
    None = 'None',
    InitApplicationState = 'InitApplicationState',
    SetApplicationState = 'SetApplicationState',
    SetRecommendationState = 'SetRecommendationState',
}

export enum RestPostActionSubType
{
    None = 'None',
    PrimaryMailAccountCreated = 'PrimaryMailAccountCreated',
    DefaultMailboxRecipeInstalled = 'DefaultMailboxRecipeInstalled',
    PluginRegistered = 'PluginRegistered',
    MobileDeviceRegistered = 'MobileDeviceRegistered',
    MailAccountCreationState = 'MailAccountCreationState',
    HideRecommendation = 'HideRecommendation',
    MinimizeRecommendation = 'MinimizeRecommendation',
    DeleteRecommendation = 'DeleteRecommendation',
}

export class EventPostActionDto
{
    public constructor(init?:Partial<EventPostActionDto>) { (<any>Object).assign(this, init); }
    public ActionType: RestPostAction;
    public ActionSubType: RestPostActionSubType;
    public TrueAction: string;
    public FalseAction: string;
    public ElementId: string;
}

export class RecDisplayActionField
{
    public constructor(init?:Partial<RecDisplayActionField>) { (<any>Object).assign(this, init); }
    public Title: string;
    public DefaultValue: string;
    public Css: string;
    public Footer: string;
    public ActionField: RecDisplayActionWidgetType;
    public ActionType: RecDisplayActionTypes;
    public DropDownList: RecDisplayDropDownElement[];
    public Enabled: boolean;
    public ShortPost: EventPostActionDto;
    public Arg: string[];
}

export class RecDisplayField
{
    public constructor(init?:Partial<RecDisplayField>) { (<any>Object).assign(this, init); }
    public Header: string;
    public Message: string;
    public ActionFields: RecDisplayActionField[];
}

export enum UserTypeTypes
{
    None = 'None',
    RecommendationBlock = 'RecommendationBlock',
    ProgressBlock = 'ProgressBlock',
    RecommendationBlockChart = 'RecommendationBlockChart',
    AccountCreationState = 'AccountCreationState',
    AccountCreationAnalysis = 'AccountCreationAnalysis',
    AccountStatistics = 'AccountStatistics',
    Messages = 'Messages',
    UserDashboard = 'UserDashboard',
}

export enum UserTypesSubTypes
{
    None = 'None',
    WelcomeMessages = 'WelcomeMessages',
    InboxRecommended = 'InboxRecommended',
    MailingListRecommended = 'MailingListRecommended',
    AddressBookRecommended = 'AddressBookRecommended',
    GmailPluginRecommended = 'GmailPluginRecommended',
    Organize = 'Organize',
    OrganizeMailingListRecommended = 'OrganizeMailingListRecommended',
    OrganizeTimeframeRecommended = 'OrganizeTimeframeRecommended',
    OrganizeAddressbookRecomended = 'OrganizeAddressbookRecomended',
    OrganizeRecievedRecomended = 'OrganizeRecievedRecomended',
    OrganizeSentRecommended = 'OrganizeSentRecommended',
    UserDashboardRecommended = 'UserDashboardRecommended',
    Statistics = 'Statistics',
    OrganizeByCoworker = 'OrganizeByCoworker',
    ImportAccountPhase1 = 'ImportAccountPhase1',
    ImportAccountPhase2 = 'ImportAccountPhase2',
    ProgressAccountPhase1 = 'ProgressAccountPhase1',
    ProgressAccountPhase2 = 'ProgressAccountPhase2',
    AccountCreationPhase0 = 'AccountCreationPhase0',
    AccountCreationPhase1 = 'AccountCreationPhase1',
    AccountCreationPhase2 = 'AccountCreationPhase2',
    AccountCreationPhase3 = 'AccountCreationPhase3',
    ImportPhase2 = 'ImportPhase2',
}

export enum Tristate
{
    Null = 'Null',
    True = 'True',
    False = 'False',
}

export class UserDataRecord
{
    public constructor(init?:Partial<UserDataRecord>) { (<any>Object).assign(this, init); }
    public Id: number;
    public UserAccountId: string;
    public MailAccountId: string;
    public RecordId: string;
    public Message: string;
    public SubMessage: string;
    public Type: UserTypeTypes;
    public SubType: UserTypesSubTypes;
    public Visible: Tristate;
    public Minimized: Tristate;
    public Dismissed: Tristate;
    public DatePosted: string;
    public DateToDisplay: string;
    public DeviceId: string;
    // @StringLength(4096)
    public FieldsJson: string;

    // @StringLength(4096)
    public TagsJson: string;
}

export class AnalysisUserDataRecord extends UserDataRecord
{
    public constructor(init?:Partial<AnalysisUserDataRecord>) { super(init); (<any>Object).assign(this, init); }
}

export class RecDisplayTag
{
    public constructor(init?:Partial<RecDisplayTag>) { (<any>Object).assign(this, init); }
    public Message: string;
    public CssStyle: string;
}

export class MessageUserDataRecord extends UserDataRecord
{
    public constructor(init?:Partial<MessageUserDataRecord>) { super(init); (<any>Object).assign(this, init); }
    public Fields: RecDisplayField[];
    public TagsList: RecDisplayTag[];
}

export class RecDisplayBlock extends UserDataRecord
{
    public constructor(init?:Partial<RecDisplayBlock>) { super(init); (<any>Object).assign(this, init); }
    public Fields: RecDisplayField[];
    public TagsList: RecDisplayTag[];
}

export enum PortalCompletionSettings
{
    PortalInitallLoginCompleted = 'PortalInitallLoginCompleted',
    DefaultEmailAccountInstalled = 'DefaultEmailAccountInstalled',
    DefaultInboxInstalled = 'DefaultInboxInstalled',
    DefaultCoworkerRecipeInstalled = 'DefaultCoworkerRecipeInstalled',
    DefaultMailinglistRecipe = 'DefaultMailinglistRecipe',
}

export enum AccountCreationState
{
    None = 'None',
    OauthAdded = 'OauthAdded',
    BasicProfile = 'BasicProfile',
    PortalAdded = 'PortalAdded',
    MailImported = 'MailImported',
}

export enum MailAccountCreationStates
{
    None = 'None',
    InitialCreation = 'InitialCreation',
    BasicMailImporting = 'BasicMailImporting',
    BasicMailImported = 'BasicMailImported',
    FullMailImporting = 'FullMailImporting',
    FullMailImported = 'FullMailImported',
}

export class ResourceData
{
    public constructor(init?:Partial<ResourceData>) { (<any>Object).assign(this, init); }
    public Id: string;
    public ODataEtag: string;
    public ODataId: string;
    public ODataType: string;
}

export class Notification
{
    public constructor(init?:Partial<Notification>) { (<any>Object).assign(this, init); }
    public changeType: string;
    public clientState: string;
    public resource: string;
    public subscriptionExpirationDateTime: string;
    public subscriptionId: string;
    public resourceData: ResourceData;
}

export class Command_History
{
    public constructor(init?:Partial<Command_History>) { (<any>Object).assign(this, init); }
    public Id: number;
    // @StringLength(20)
    public What: string;

    public Time: string;
    public Direction: string;
    // @StringLength(255)
    public UserAccountId: string;

    // @StringLength(40)
    public MailAccountId: string;

    // @StringLength(40)
    public Src: string;

    // @StringLength(40)
    public Dest: string;

    // @StringLength(1024)
    public MsgDescribe: string;

    public RestCall: string;
    // @StringLength(128)
    public Details: string;

    public JsonRawData: Uint8Array;
    // @Ignore()
    public JsonText: string;

    public JsonLen: number;
}

export enum MsgDetectedAs
{
    None = 'None',
    NewsGroup = 'NewsGroup',
    UnSubscribeHeader = 'UnSubscribeHeader',
    MailingList = 'MailingList',
    ReturnPath = 'ReturnPath',
    ReturnNoReply = 'ReturnNoReply',
    DKIMSignature = 'DKIMSignature',
    SourceEmailAddress = 'SourceEmailAddress',
    XtRule = 'XtRule',
    HostInt = 'HostInt',
    HostHex = 'HostHex',
    MailParserRule = 'MailParserRule',
    ListId = 'ListId',
    AntispamTriggered = 'AntispamTriggered',
    DifferentReturnPath = 'DifferentReturnPath',
    AddressBanned = 'AddressBanned',
    UndesclosedRecipients = 'UndesclosedRecipients',
    UnSubscribeBody = 'UnSubscribeBody',
    ManyAttributes = 'ManyAttributes',
}

export class QueryBase
{
    public constructor(init?:Partial<QueryBase>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public Skip: number;

    // @DataMember(Order=2)
    public Take: number;

    // @DataMember(Order=3)
    public OrderBy: string;

    // @DataMember(Order=4)
    public OrderByDesc: string;

    // @DataMember(Order=5)
    public Include: string;

    // @DataMember(Order=6)
    public Fields: string;

    // @DataMember(Order=7)
    public Meta: { [index:string]: string; };
}

export class QueryDb_1<T> extends QueryBase
{
    public constructor(init?:Partial<QueryDb_1<T>>) { super(init); (<any>Object).assign(this, init); }
}

export class DiscoveredMessageCategory implements IDiscoveredMessageCategory
{
    public constructor(init?:Partial<DiscoveredMessageCategory>) { (<any>Object).assign(this, init); }
    public Id: number;
    // @StringLength(255)
    public UserAccountId: string;

    public MailAccountId: string;
    public SyncAccountId: number;
    // @StringLength(30)
    public DetectedAs: MsgDetectedAs;

    public RuleName: string;
    // @StringLength(255)
    public Host: string;

    // @StringLength(255)
    public MsgCategory: string;

    // @StringLength(255)
    public MsgSubCategory: string;

    // @StringLength(255)
    public MsgSubSubCategory: string;

    public EmailFrom: string;
    public Frequency: number;
    public MailingList: string;
    public MailingListService: string;
    // @StringLength(255)
    public ItemId: string;

    // @StringLength(255)
    public Subject: string;

    // @StringLength(512)
    public UnSubscribe: string;

    public HasDiffernetReturnPath: number;
    public HasBannedSource: number;
    public HasAbuse: number;
    public HasDifferentReplyTo: number;
    public IsRead: number;
    public IsImportant: number;
    public IsReply: number;
    public IsFromMe: number;
    public HasThreadIndex: number;
    public HasThreadTopic: number;
    public HasReferences: number;
    public HasUndesclosed: number;
}

// @DataContract
export class ResponseError
{
    public constructor(init?:Partial<ResponseError>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1, EmitDefaultValue=false)
    public ErrorCode: string;

    // @DataMember(Order=2, EmitDefaultValue=false)
    public FieldName: string;

    // @DataMember(Order=3, EmitDefaultValue=false)
    public Message: string;

    // @DataMember(Order=4, EmitDefaultValue=false)
    public Meta: { [index:string]: string; };
}

// @DataContract
export class ResponseStatus
{
    public constructor(init?:Partial<ResponseStatus>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public ErrorCode: string;

    // @DataMember(Order=2)
    public Message: string;

    // @DataMember(Order=3)
    public StackTrace: string;

    // @DataMember(Order=4)
    public Errors: ResponseError[];

    // @DataMember(Order=5)
    public Meta: { [index:string]: string; };
}

export class HistoyFolderQueryResult
{
    public constructor(init?:Partial<HistoyFolderQueryResult>) { (<any>Object).assign(this, init); }
    public Catgory: string;
    public count: string;
    public email: string;
}

export enum TestMessageDestination
{
    Rules = 'Rules',
    History = 'History',
}

export enum TestMessageCleanOwner
{
    None = 'None',
    MatchFrom = 'MatchFrom',
    MatchTo = 'MatchTo',
    MatchEither = 'MatchEither',
}

export class TestMessageCleaningBehavior
{
    public constructor(init?:Partial<TestMessageCleaningBehavior>) { (<any>Object).assign(this, init); }
    public Owner: TestMessageCleanOwner;
    public DaysBack: number;
}

export class StandardRequest implements IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<StandardRequest>) { (<any>Object).assign(this, init); }
    public UserAccountId: string;
    public MailAccountId: string;
    public DeviceId: string;
    public CacheKeyRoot: string;
    public CacheKey: string;
}

export interface IStandardRequest
{
    UserAccountId: string;
    MailAccountId: string;
    DeviceId: string;
}

export interface ICacheRequest
{
    CacheKey: string;
}

export class StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<StandardResponse>) { (<any>Object).assign(this, init); }
    public Cached: boolean;
    public Message: string;
    public Success: boolean;
}

export interface IStandardResponse
{
    Message: string;
    Success: boolean;
}

export interface ICacheableResponse
{
    Cached: boolean;
}

export enum SyncMessageType
{
    None = 'None',
    Email = 'Email',
    Link = 'Link',
    File = 'File',
}

export class RecipeCriteriaEmail
{
    public constructor(init?:Partial<RecipeCriteriaEmail>) { (<any>Object).assign(this, init); }
    public Name: string;
    public Email: string;
}

export class LocalSyncMessageBody
{
    public constructor(init?:Partial<LocalSyncMessageBody>) { (<any>Object).assign(this, init); }
    public Id: number;
    public LocalSyncMessageId: number;
    public Size: number;
    public BodyRaw: Uint8Array;
}

export enum EmailSentType
{
    Nothing = 'Nothing',
    ISentToSomeone = 'ISentToSomeone',
    SomeoneSentToMeAsTo = 'SomeoneSentToMeAsTo',
    SomeoneSentToMeAsCc = 'SomeoneSentToMeAsCc',
    SomeoneSentToMeAsBcc = 'SomeoneSentToMeAsBcc',
    SomeoneSentToMeDontKnow = 'SomeoneSentToMeDontKnow',
    SentToSelfTo = 'SentToSelfTo',
    SentToSelfCc = 'SentToSelfCc',
    SentToSelfBcc = 'SentToSelfBcc',
    DontKnow = 'DontKnow',
}

export enum MailAccountType
{
    None = 'None',
    Exchange = 'Exchange',
    Gmail = 'Gmail',
    Imap = 'Imap',
    Pop = 'Pop',
    EnterpriseVault = 'EnterpriseVault',
    Office365 = 'Office365',
    ManualSetup = 'ManualSetup',
    Test = 'Test',
}

export enum EmailMessageSource
{
    None = 'None',
    Email = 'Email',
    History = 'History',
}

export interface ILocalSyncMessage
{
    Id: number;
    CacheMessageId: string;
    GmailMessageId: number;
    RemoteMsgId: string;
    GmailIndex: number;
    RecordType: SyncMessageType;
    RecordUrl: string;
    From: RecipeCriteriaEmail;
    To: RecipeCriteriaEmail[];
    CC: RecipeCriteriaEmail[];
    Bcc: RecipeCriteriaEmail[];
    Subject: string;
    Summary: string;
    Body: string;
    TheBody: LocalSyncMessageBody;
    Size: number;
    HasAttachments: boolean;
    DateSent: string;
    DateReceived: string;
    Headers: { [index:string]: string; };
    IsRead: boolean;
    IsImportant: boolean;
    IsReply: boolean;
    IsForward: boolean;
    IsFromMe: boolean;
    IsToMe: boolean;
    SentType: EmailSentType;
    FolderId: string;
    DbFolderId: string;
    ConversationIndex: string;
    ConversationTopic: string;
    ConversationId: string;
    ReplyTo: RecipeCriteriaEmail[];
    DiscoveredCategory: DiscoveredMessageCategory;
    MessageType: MailAccountType;
    MsgSource: EmailMessageSource;
    DetectedAs: MsgDetectedAs;
    Categories: string;
    MapiEntryId: string;
    AllTos: RecipeCriteriaEmail[];
    AllAddresses: RecipeCriteriaEmail[];
    GmailThreadId: number;
    ReceivedAsTo: boolean;
    ReceivedAsCc: boolean;
    ReceivedAsBcc: boolean;
    ReceivedAsAny: boolean;
}

export class LocalSyncMessage implements ILocalSyncMessage
{
    public constructor(init?:Partial<LocalSyncMessage>) { (<any>Object).assign(this, init); }
    public Id: number;
    public CacheMessageId: string;
    public GmailMessageId: number;
    public RemoteMsgId: string;
    public GmailIndex: number;
    public RecordType: SyncMessageType;
    public RecordUrl: string;
    public From: RecipeCriteriaEmail;
    public To: RecipeCriteriaEmail[];
    public CC: RecipeCriteriaEmail[];
    public Bcc: RecipeCriteriaEmail[];
    public Subject: string;
    public Summary: string;
    public TheBody: LocalSyncMessageBody;
    // @Ignore()
    public Body: string;

    public Size: number;
    public HasAttachments: boolean;
    public DateSent: string;
    public DateReceived: string;
    public Headers: { [index:string]: string; };
    public IsRead: boolean;
    public IsImportant: boolean;
    public IsReply: boolean;
    public IsForward: boolean;
    public IsFromMe: boolean;
    public IsToMe: boolean;
    public SentType: EmailSentType;
    public FolderId: string;
    public DbFolderId: string;
    public ConversationIndexData: Uint8Array;
    // @Ignore()
    public ConversationIndex: string;

    public ConversationTopic: string;
    public ConversationId: string;
    public ReplyTo: RecipeCriteriaEmail[];
    // @Ignore()
    public DiscoveredCategory: DiscoveredMessageCategory;

    public MessageType: MailAccountType;
    // @Ignore()
    public MsgSource: EmailMessageSource;

    public DetectedAs: MsgDetectedAs;
    public Categories: string;
    public MapiEntryId: string;
    // @Ignore()
    public AllTos: RecipeCriteriaEmail[];

    // @Ignore()
    public AllAddresses: RecipeCriteriaEmail[];

    public GmailThreadId: number;
    public ReceivedAsTo: boolean;
    public ReceivedAsCc: boolean;
    public ReceivedAsBcc: boolean;
    public ReceivedAsAny: boolean;
}

export enum FooRole
{
    Employee = 'Employee',
    Supervisor = 'Supervisor',
    Manager = 'Manager',
}

export class Foo
{
    public constructor(init?:Partial<Foo>) { (<any>Object).assign(this, init); }
    public Id: number;
    public Role: FooRole;
    public FirstName: string;
    public LastName: string;
    public JobTitle: string;
    public Age: number;
}

export class Response
{
    public constructor(init?:Partial<Response>) { (<any>Object).assign(this, init); }
    public Success: boolean;
    public Message: string;
}

export enum HistoryDownloadType
{
    None = 'None',
    Headers = 'Headers',
    HeadersAndBodys = 'HeadersAndBodys',
    Everything = 'Everything',
}

export enum OAuthAccessTokenType
{
    None = 'None',
    AccessToken = 'AccessToken',
    AccessCode = 'AccessCode',
}

export enum VenueDeviceType
{
    None = 'None',
    Mobile = 'Mobile',
    Outlook = 'Outlook',
    Web = 'Web',
    Tests = 'Tests',
}

export class DeviceDetailsRequestBase extends StandardRequest implements IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<DeviceDetailsRequestBase>) { super(init); (<any>Object).assign(this, init); }
    public SyncAccountId: number;
    public HasFullCredentials: boolean;
    public DeviceToken: string;
    public OAuthUniqueId: string;
    public AuthToken: string;
    public RefreshToken: string;
    public ExpiresOn: string;
    public ServerVersion: string;
    public Email: string;
    public AppVersion: string;
    public SyncAccountType: string;
    public ServiceUrl: string;
    public DeviceModel: string;
    public DeviceOsVersion: string;
    public DeviceName: string;
    public DeviceType: VenueDeviceType;
    public ResponseStatus: ResponseStatus;
    public UtcOffset: string;
}

export enum RequestResult
{
    Added = 'Added',
    Removed = 'Removed',
    NotFound = 'NotFound',
    Updated = 'Updated',
    Failed = 'Failed',
}

export class RequestStatus
{
    public constructor(init?:Partial<RequestStatus>) { (<any>Object).assign(this, init); }
    public UserAccountId: string;
    public SyncAccountId: number;
    public DeviceId: string;
    public Success: boolean;
    public CommandsQueueName: string;
    public Result: RequestResult;
    public Message: string;
}

export enum SyncAccountTypes
{
    None = '1',
    Exchange = '2',
    Gmail = '3',
    Imap = '4',
    Pop = '5',
    EnterpriseVault = '6',
    Office365 = '7',
    ManualSetup = '8',
    Test = '9',
}

export enum UserAccountTypes
{
    Plain = '1',
    EmailRuleProcessor = '2',
}

export class AccountDeviceRecord
{
    public constructor(init?:Partial<AccountDeviceRecord>) { (<any>Object).assign(this, init); }
    public Id: number;
    public UserAccountId: string;
    public MailAccountId: string;
    public DeviceId: string;
    public AccountRecordId: number;
    // @StringLength(2048)
    public DeviceToken: string;

    // @StringLength(2048)
    public AuthCredentials: string;

    // @StringLength(2048)
    public RefreshToken: string;

    public ExpiresOn: string;
    public LastContactDate: string;
    // @Ignore()
    public AreCredentialsValid: boolean;

    public SyncStateData: Uint8Array;
    // @Ignore()
    public SyncState: string;

    public AppVersion: string;
    public DeviceType: VenueDeviceType;
}

export class AccountCreationStatistics
{
    public constructor(init?:Partial<AccountCreationStatistics>) { (<any>Object).assign(this, init); }
    public PercentComplete: number;
    public TotalMessages: string;
}

export class AccountRecord implements IAccountRecord
{
    public constructor(init?:Partial<AccountRecord>) { (<any>Object).assign(this, init); }
    public Id: number;
    public UserAccountId: string;
    public MailAccountId: string;
    public SyncAccountId: number;
    public Email: string;
    public CreationState: AccountCreationState;
    public TimeSlideBase: string;
    public SyncAccountType: SyncAccountTypes;
    public UserAccountType: UserAccountTypes;
    // @StringLength(1024)
    public ServiceUrl: string;

    public ServerVersion: string;
    public AccountsOnDevices: AccountDeviceRecord[];
    // @Ignore()
    public AccountForMailSync: AccountDeviceRecord;

    public HasFullCredentials: boolean;
    public IsMainAccount: boolean;
    public OAuthUniqueId: string;
    public AccountStats: AccountCreationStatistics;
    public CompanyId: number;
    public UtcOffset: string;
    public GivenName: string;
    public FamilyName: string;
    public DisplayName: string;
    public CookbookId: string;
    // @Ignore()
    public TheMailAccountType: MailAccountType;

    // @Ignore()
    public ConvertEmailAddress: string;
}

export enum OAuthLoginTypes
{
    None = 'None',
    Login = 'Login',
    Consent = 'Consent',
}

export enum OAuthTokenTypes
{
    None = 'None',
    Office365 = 'Office365',
    Gmail = 'Gmail',
    MsGraph = 'MsGraph',
}

export class OAuthTokenResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<OAuthTokenResponse>) { super(init); (<any>Object).assign(this, init); }
    public AuthToken: string;
    public IdToken: string;
    public RefreshToken: string;
    public ExpirationDate: string;
    public AccountEmail: string;
    public OAuthUniqueId: string;
}

export class DeviceRecord
{
    public constructor(init?:Partial<DeviceRecord>) { (<any>Object).assign(this, init); }
    public Id: number;
    public UserAccountId: string;
    public DeviceId: string;
    public DeviceModel: string;
    public DeviceType: VenueDeviceType;
    public DeviceName: string;
    public DeviceOSVersion: string;
    public LastContactDate: string;
    public CommandsQueueName: string;
}

export class AccountDto
{
    public constructor(init?:Partial<AccountDto>) { (<any>Object).assign(this, init); }
    public Email: string;
    public TheMailAccountType: MailAccountType;
    public UserAccountId: string;
    public MailAccountId: string;
    public SyncAccountId: number;
    public SyncAccountType: SyncAccountTypes;
    public UserAccountType: UserAccountTypes;
}

export enum CDStandardFolderTypes
{
    Calendar = 'Calendar',
    Contacts = 'Contacts',
    DeletedItems = 'DeletedItems',
    Drafts = 'Drafts',
    Inbox = 'Inbox',
    Journal = 'Journal',
    Notes = 'Notes',
    Outbox = 'Outbox',
    SentItems = 'SentItems',
    Tasks = 'Tasks',
    MailboxRoot = 'MailboxRoot',
    PublicFoldersRoot = 'PublicFoldersRoot',
    Root = 'Root',
    JunkEmail = 'JunkEmail',
    SearchFolders = 'SearchFolders',
    VoiceMail = 'VoiceMail',
    ArchiveDeletedItems = 'ArchiveDeletedItems',
    ArchiveMessageFolderRoot = 'ArchiveMessageFolderRoot',
    ArchiveRecoverableItemsDeletions = 'ArchiveRecoverableItemsDeletions',
    ArchiveRecoverableItemsPurges = 'ArchiveRecoverableItemsPurges',
    ArchiveRecoverableItemsRoot = 'ArchiveRecoverableItemsRoot',
    ArchiveRecoverableItemsVersions = 'ArchiveRecoverableItemsVersions',
    ArchiveRoot = 'ArchiveRoot',
    RecoverableItemsDeletions = 'RecoverableItemsDeletions',
    RecoverableItemsPurges = 'RecoverableItemsPurges',
    RecoverableItemsRoot = 'RecoverableItemsRoot',
    RecoverableItemsVersions = 'RecoverableItemsVersions',
    SyncIssues = 'SyncIssues',
    Conflicts = 'Conflicts',
    LocalFailures = 'LocalFailures',
    ServerFailures = 'ServerFailures',
    RecipientCache = 'RecipientCache',
    QuickContacts = 'QuickContacts',
    ConversationHistory = 'ConversationHistory',
    AdminAuditLogs = 'AdminAuditLogs',
    ToDoSearch = 'ToDoSearch',
    MyContacts = 'MyContacts',
    Directory = 'Directory',
    IMContactList = 'IMContactList',
    PeopleConnect = 'PeopleConnect',
    None = 'None',
}

export class CDFolder
{
    public constructor(init?:Partial<CDFolder>) { (<any>Object).assign(this, init); }
    public FolderId: string;
    public ParentFolderId: string;
    public FolderTitle: string;
    public ChildFolderCount: number;
    public UnreadCount: number;
    public TotalCount: number;
    public DownloadCount: number;
    public MapiRecordId: string;
    public MapiEntryId: string;
    public FirstMessageReceived: string;
    public OldestMessageReceived: string;
    public WellKnown: CDStandardFolderTypes;
}

// @Flags()
export enum CacheControl
{
    None = 0,
    Public = 1,
    Private = 2,
    MustRevalidate = 4,
    NoCache = 8,
    NoStore = 16,
    NoTransform = 32,
    ProxyRevalidate = 64,
}

export interface IContentTypeWriter
{
}

export class GetUserInfoRanking
{
    public constructor(init?:Partial<GetUserInfoRanking>) { (<any>Object).assign(this, init); }
    public Category: string;
    public SubCategory: string;
    public SubSubCategory: string;
    public Ranking: number;
    public FilePath: string;
    public Reasons: { [index:string]: number; };
}

export class UserSetting
{
    public constructor(init?:Partial<UserSetting>) { (<any>Object).assign(this, init); }
    public Id: number;
    public UserAccountId: string;
    public Key: string;
    public Value: string;
}

export class RestCmdDto
{
    public constructor(init?:Partial<RestCmdDto>) { (<any>Object).assign(this, init); }
    public Name: string;
    public Time: string;
    public JsonDataFile: string;
}

export class NewsGroupDescription
{
    public constructor(init?:Partial<NewsGroupDescription>) { (<any>Object).assign(this, init); }
    public Host: string;
    public ItemId: string;
    public Description: string;
    public Unsubscribe: string;
    public MailingList: string;
}

export class RemoteValidatorField
{
    public constructor(init?:Partial<RemoteValidatorField>) { (<any>Object).assign(this, init); }
    public Key: string;
    public DisplayName: string;
}

export enum CategoryItemDataType
{
    String = 'String',
    Domain = 'Domain',
    EmailAddress = 'EmailAddress',
    Meta = 'Meta',
    Category = 'Category',
}

export enum GetSequenceType
{
    None = 'None',
    AccountCreation = 'AccountCreation',
    GetRecipeId = 'GetRecipeId',
    GetTemplateId = 'GetTemplateId',
}

export enum AccountCreationReportType
{
    None = 'None',
    AccountAnalysis = 'AccountAnalysis',
    AccountRecomend = 'AccountRecomend',
}

export class AccountRecommendItem
{
    public constructor(init?:Partial<AccountRecommendItem>) { (<any>Object).assign(this, init); }
    public Title: string;
    public Recommendations: string;
    public RecipeTitle: string;
    public HelpUrl: string;
}

export class AccountAnalysisItem
{
    public constructor(init?:Partial<AccountAnalysisItem>) { (<any>Object).assign(this, init); }
    public Title: string;
    public Finding: string;
    public Action: string;
    public Importance: string;
    public HelpUrl: string;
}

export class ApplicationStateDto implements IApplicationState
{
    public constructor(init?:Partial<ApplicationStateDto>) { (<any>Object).assign(this, init); }
    public Id: number;
    public UserAccountId: string;
    public MailAccountId: string;
    public StateKey: RestPostActionSubType;
    public StateValue: string;
}

export enum CategoryItemType
{
    None = 'None',
    Global = 'Global',
    User = 'User',
}

export interface IAddCategories
{
    Categories: string[];
    Type: CategoryItemType;
    UserAccountId: string;
    MailAccountId: string;
    DeviceId: string;
    CacheKeyRoot: string;
    CacheKey: string;
}

export interface IAddCategoryItem
{
    Category: string;
    Value: string;
    Type: CategoryItemType;
    DataType: CategoryItemDataType;
    Rank: number;
    UserAccountId: string;
    MailAccountId: string;
    DeviceId: string;
    CacheKeyRoot: string;
    CacheKey: string;
}

export enum CategoryItemSource
{
    User = 'User',
    Venue = 'Venue',
}

export class CdCategoryItem implements IHasCategoryId
{
    public constructor(init?:Partial<CdCategoryItem>) { (<any>Object).assign(this, init); }
    public Id: number;
    public UserAccountId: string;
    public Category: string;
    public Value: string;
    public Type: CategoryItemType;
    public Rank: number;
    public ReadOnly: boolean;
    public DataType: CategoryItemDataType;
    public Description: string;
    public Source: CategoryItemSource;
    public ArchivedCategory: string;
    public CategoryId: string;
}

export interface IEditCategoryItem
{
    Id: number;
    Category: string;
    Value: string;
    Type: CategoryItemType;
    DataType: CategoryItemDataType;
    UserAccountId: string;
    MailAccountId: string;
    DeviceId: string;
    CacheKeyRoot: string;
    CacheKey: string;
    Rank: number;
}

export interface IEditCategoryItems
{
    UserAccountId: string;
    MailAccountId: string;
    DeviceId: string;
    CacheKeyRoot: string;
    CacheKey: string;
}

export enum CategoryItemTypeOptions
{
    All = 'All',
    JustGlobal = 'JustGlobal',
    JustUser = 'JustUser',
    Admin = 'Admin',
    JustEmail = 'JustEmail',
}

export enum CategoryItemDataTypeOptions
{
    All = 'All',
    JustStrings = 'JustStrings',
    JustDomains = 'JustDomains',
    JustEmailAddresses = 'JustEmailAddresses',
    JustCategories = 'JustCategories',
    JustMetas = 'JustMetas',
    JustFrequencys = 'JustFrequencys',
    JustTags = 'JustTags',
    JustName = 'JustName',
    Admin = 'Admin',
}

export enum ChartDataQuerys
{
    None = 'None',
    Basic = 'Basic',
}

export class CdCategoryDto implements IHasCategoryId
{
    public constructor(init?:Partial<CdCategoryDto>) { (<any>Object).assign(this, init); }
    public Id: number;
    public UserAccountId: string;
    public Category: string;
    public Type: CategoryItemType;
    public DataType: CategoryItemDataType;
    public CategoryId: string;
    public Count: number;
    public SortOrder: number;
    public Description: string;
    public TotalMessages: number;
    public PercentOfTotal: number;
    public Rank: number;
}

export class AccountCreationChartData
{
    public constructor(init?:Partial<AccountCreationChartData>) { (<any>Object).assign(this, init); }
    public StartDateRange: string;
    public EndDateRange: string;
    public TotalMessagsCount: number;
    public TotalSenders: number;
    public SentMessages: number;
    public ReceivedMessages: number;
    public MessagesPerGroupJson: string;
    public MessagesPerDayJson: string;
    public UniqueSendersPerGroupJson: string;
    public GroupList: CdCategoryDto[];
}

export enum Status
{
    Start = '1',
    Middle = '2',
    End = '3',
}

export class AddOrEditRecipeDto
{
    public constructor(init?:Partial<AddOrEditRecipeDto>) { (<any>Object).assign(this, init); }
    public Id: number;
    public UserAccountId: string;
    public RecipeId: string;
    public TemplateId: string;
    public Values: { [index:string]: string; };
    public Collections: { [index:string]: string[]; };
    public Matrixes: { [index:string]: { [index:string]: string[]; }; };
    public CompletionStatus: Status;
    public Name: string;
    public RecipeType: string;
    public CookbookId: string;
    public IsPushRecipe: boolean;
}

export class StandardMQMessage
{
    public constructor(init?:Partial<StandardMQMessage>) { (<any>Object).assign(this, init); }
    public MessageId: string;
    public MQSequqnce: number;
    public Priority: number;
}

export class StandardMobileMQMessage extends StandardMQMessage
{
    public constructor(init?:Partial<StandardMobileMQMessage>) { super(init); (<any>Object).assign(this, init); }
    public MailAccountId: string;
    public Deviceid: string;
}

export class CdCookbookSection
{
    public constructor(init?:Partial<CdCookbookSection>) { (<any>Object).assign(this, init); }
    public Name: string;
    public VenueId: string;
    public Keywords: string[];
}

export class CdCookbook
{
    public constructor(init?:Partial<CdCookbook>) { (<any>Object).assign(this, init); }
    public Id: number;
    public UserAccountId: string;
    public MailAccountId: string;
    public CookbookTemplateId: string;
    public Sections: CdCookbookSection[];
    public Metadata: AddOrEditRecipeDto;
    public CookbookId: string;
    // @Ignore()
    public Name: string;

    // @Ignore()
    public Description: string;

    // @Ignore()
    public Recipes: AddOrEditRecipeDto[];
}

export class MobileNotifyAddCookbook extends StandardMobileMQMessage
{
    public constructor(init?:Partial<MobileNotifyAddCookbook>) { super(init); (<any>Object).assign(this, init); }
    public Cookbook: CdCookbook;
}

export enum VTypes
{
    None = 'None',
    Standard = 'Standard',
    ReadOnly = 'ReadOnly',
    Advanced = 'Advanced',
    TopLevelVisable = 'TopLevelVisable',
    TopLevelHidden = 'TopLevelHidden',
}

export enum VSource
{
    None = 'None',
    UserGenerated = 'UserGenerated',
    MachineGenerated = 'MachineGenerated',
}

export enum TreeNodeSortingStyle
{
    Alphanumeric = 'Alphanumeric',
    ReverseAlphanumeric = 'ReverseAlphanumeric',
    DateAscending = 'DateAscending',
    DateDescending = 'DateDescending',
    Custom = 'Custom',
    FolderType = 'FolderType',
}

export enum VOwnerType
{
    Recipe = 'Recipe',
    Cookbook = 'Cookbook',
}

export enum VCommand
{
    None = 'None',
    AddAssoc = 'AddAssoc',
    RemoveAssoc = 'RemoveAssoc',
    AddVenue = 'AddVenue',
    RemoveVenue = 'RemoveVenue',
    UpdateVenue = 'UpdateVenue',
}

export enum VenueStandardColor
{
    Yellow = 'Yellow',
    Red = 'Red',
    Green = 'Green',
    Blue = 'Blue',
    Gray = 'Gray',
    Purple = 'Purple',
    Pink = 'Pink',
    Orange = 'Orange',
    Indigo = 'Indigo',
    Brown = 'Brown',
    Custom = 'Custom',
}

export enum VenueStandardIcon
{
    Standard = 'Standard',
    Custom = 'Custom',
}

export class VenueBlockDto
{
    public constructor(init?:Partial<VenueBlockDto>) { (<any>Object).assign(this, init); }
    public Id: number;
    // @StringLength(255)
    public VenueId: string;

    // @StringLength(255)
    public OwnerId: string;

    // @StringLength(40)
    public Name: string;

    public SpecialDescription: string;
    // @StringLength(255)
    public ParentVenueId: string;

    public VenueType: VTypes;
    public VenueSource: VSource;
    public ChildSortingStyle: TreeNodeSortingStyle;
    public SortingRank: number;
    public Hidden: boolean;
    public UnreadMessageCount: number;
    public TotalMessageCount: number;
    public Owner: VOwnerType;
    public Command: VCommand;
    public ColorStyle: VenueStandardColor;
    public CustomColor: string;
    public OpenIconStyle: VenueStandardIcon;
    public ClosedIconStyle: VenueStandardIcon;
    public CustomOpenIcon: string;
    public CustomClosedIcon: string;
}

export class MobileNotifyAddVenue extends StandardMobileMQMessage
{
    public constructor(init?:Partial<MobileNotifyAddVenue>) { super(init); (<any>Object).assign(this, init); }
    public VenueList: VenueBlockDto[];
}

export class MobileNotifyUpdateCookbook extends StandardMobileMQMessage
{
    public constructor(init?:Partial<MobileNotifyUpdateCookbook>) { super(init); (<any>Object).assign(this, init); }
    public Cookbook: CdCookbook;
}

export class MobileNotifyDeleteVenue extends StandardMobileMQMessage
{
    public constructor(init?:Partial<MobileNotifyDeleteVenue>) { super(init); (<any>Object).assign(this, init); }
    public VenueList: VenueBlockDto[];
}

export class CdRecipeTemplateCategory
{
    public constructor(init?:Partial<CdRecipeTemplateCategory>) { (<any>Object).assign(this, init); }
    public Id: number;
    public Name: string;
    public Rank: number;
    public Templates: CdRecipeTemplate[];
}

export enum RecipeTemplateWidget
{
    TextInput = 'TextInput',
    LongTextInput = 'LongTextInput',
    SingleSelect_Enum = 'SingleSelect_Enum',
    SingleSelect_RemoteOptions = 'SingleSelect_RemoteOptions',
    ListEditor_RemoteOptions = 'ListEditor_RemoteOptions',
    Text = 'Text',
    Hidden = 'Hidden',
    Switch = 'Switch',
    Number = 'Number',
    Color = 'Color',
    Columns = 'Columns',
    RenameList = 'RenameList',
    Image = 'Image',
    DropDownList = 'DropDownList',
}

export enum OptionsArgumentType
{
    Static = 'Static',
    Dynamic = 'Dynamic',
    Cookbook = 'Cookbook',
}

export enum CdValidationStyle
{
    Required = 'Required',
    MaxLength = 'MaxLength',
    MinLength = 'MinLength',
    Regex = 'Regex',
    Remote = 'Remote',
}

// @Flags()
export enum CdListValidationStyle
{
    ListItself,
    EveryItem,
    AtLeastOneItem,
}

export enum CdValidationDisposition
{
    All = 'All',
    AddOnly = 'AddOnly',
    EditOnly = 'EditOnly',
}

export class CdRecipeTemplateValidationRule
{
    public constructor(init?:Partial<CdRecipeTemplateValidationRule>) { (<any>Object).assign(this, init); }
    public Id: number;
    public Style: CdValidationStyle;
    public ListStyle: CdListValidationStyle;
    public Argument: string;
    public Field: RemoteValidatorField;
    public Disposition: CdValidationDisposition;
}

export class CdRecipeTemplateComponent
{
    public constructor(init?:Partial<CdRecipeTemplateComponent>) { (<any>Object).assign(this, init); }
    public Name: string;
    public Description: string;
    public Key: string;
    public Value: string;
    public DataType: string;
    public Widget: RecipeTemplateWidget;
    public ArgumentType: OptionsArgumentType;
    public OptionsPath: string;
    public OptionsArgument: string;
    public ValidationRules: CdRecipeTemplateValidationRule[];
    public Error: string;
    public SummaryTemplate: string;
    public Enabled: string;
    public Link: string;
    public Icon: string;
    public OptionsPath2: string;
    public OptionsArgument2: string;
    public ArgumentType2: OptionsArgumentType;
    public Name2: string;
    public HideInCookbook: boolean;
    public HideNotInCookbook: boolean;
}

export class CdRecipeTemplatePage
{
    public constructor(init?:Partial<CdRecipeTemplatePage>) { (<any>Object).assign(this, init); }
    public Title: string;
    public Components: CdRecipeTemplateComponent[];
    public Enabled: string;
    public SummaryTemplate: string;
    public HideInCookbook: boolean;
    public HideNotInCookbook: boolean;
    public CanSkip: boolean;
}

export enum RecipeTypes
{
    None = '1',
    System = '2',
    SubjectContains = '3',
    MessageContains = '4',
    MessageSchedule = '5',
    MailingList = '6',
    UserLists = '7',
    NewsGroupCollector = '8',
    ContactListCollector = '9',
    TwitterRecipe = '10',
    MeetUpDotCom = '11',
    VenueTree = '12',
    FaceBookRecipe = '13',
    GoogleGroupsRecipe = '14',
    GoogleAlertsRecipe = '15',
    SubtractInbox = '16',
    Rankings = '17',
    UserListByCategory = '18',
    UserListByExistingFolderCategory = '19',
    UserListByAddressBookCategory = '20',
    InboxRecipe = '21',
    PushNotifications = '22',
    UpworkRecipe = '23',
    FileSystem = '24',
    FileSystemTimeFrame = '25',
    PriorityInbox = '26',
}

export enum RecipeTemplateStatus
{
    None = 'None',
    Enabled = 'Enabled',
    Disabled = 'Disabled',
    ComingSoon = 'ComingSoon',
    RequiresBodys = 'RequiresBodys',
}

export class CdRecipeTemplate
{
    public constructor(init?:Partial<CdRecipeTemplate>) { (<any>Object).assign(this, init); }
    public Id: number;
    public TemplateId: string;
    public CdCookbookTemplateId: number;
    public CdRecipeTemplateCategoryId: number;
    // @Ignore()
    public Category: CdRecipeTemplateCategory;

    public Name: string;
    // @StringLength(1024)
    public Description: string;

    // @StringLength(2048)
    public IconPath: string;

    public Pages: CdRecipeTemplatePage[];
    public Type: RecipeTypes;
    public Keywords: string[];
    public RecipeDescriptionTemplate: string;
    public Enabled: string;
    public Status: RecipeTemplateStatus;
}

export class CdCookbookTemplate
{
    public constructor(init?:Partial<CdCookbookTemplate>) { (<any>Object).assign(this, init); }
    public Id: number;
    public Templates: CdRecipeTemplate[];
    public Name: string;
    public Description: string;
    public CookbookTemplateId: string;
    public Sections: CdCookbookSection[];
    public Categories: string[];
    public Meta: CdRecipeTemplate;
    public IconPath: string;
}

export class MobileNotifyRecipeUpdated extends StandardMobileMQMessage
{
    public constructor(init?:Partial<MobileNotifyRecipeUpdated>) { super(init); (<any>Object).assign(this, init); }
    public UpdatedRecipe: AddOrEditRecipeDto;
}

export class MobileNotifyModifyVenue extends StandardMobileMQMessage
{
    public constructor(init?:Partial<MobileNotifyModifyVenue>) { super(init); (<any>Object).assign(this, init); }
    public VenueList: VenueBlockDto[];
}

export class MobileNotifyDeleteCookbook extends StandardMobileMQMessage
{
    public constructor(init?:Partial<MobileNotifyDeleteCookbook>) { super(init); (<any>Object).assign(this, init); }
    public CookbookId: string;
}

export enum OrderByTypes
{
    None = 'None',
    PersonName = 'PersonName',
    EmailAddress = 'EmailAddress',
    Domain = 'Domain',
    OpenCount = 'OpenCount',
    SentCount = 'SentCount',
    InAddressBook = 'InAddressBook',
    ReceivedCount = 'ReceivedCount',
}

export class CdGroupItemDto
{
    public constructor(init?:Partial<CdGroupItemDto>) { (<any>Object).assign(this, init); }
    public PersonName: string;
    public EmailAddress: string;
    public Domain: string;
    public UserCategory: string;
    public DetectedAs: string;
    public OpenCount: number;
    public SentCount: number;
    public ReceivedCount: number;
    public InAddressBook: number;
    public InAddressBookGroup: number;
    public InWhiteList: number;
    public InBlackList: number;
}

export class RankingCriteria
{
    public constructor(init?:Partial<RankingCriteria>) { (<any>Object).assign(this, init); }
    public Key: string;
    public Threshold: number;
    public GreaterThanThreshold: boolean;
}

export enum FieldToSearch
{
    None = 'None',
    From = 'From',
    To = 'To',
    CC = 'CC',
    Bcc = 'Bcc',
    Subject = 'Subject',
    Body = 'Body',
    AllAddressFields = 'AllAddressFields',
    Conversation = 'Conversation',
}

export enum SearchWays
{
    None = 'None',
    Contains = 'Contains',
    StartsWith = 'StartsWith',
    Regex = 'Regex',
    People = 'People',
    Domain = 'Domain',
    Groups = 'Groups',
    PeopleAll = 'PeopleAll',
}

export enum NotifyWays
{
    None = 'None',
    Never = 'Never',
    Immediately = 'Immediately',
    BusinessHours = 'BusinessHours',
    NonBusinessHours = 'NonBusinessHours',
    WorkHours = 'WorkHours',
    EveryHour = 'EveryHour',
    Every4Hours = 'Every4Hours',
}

export enum MessageSearchWays
{
    None = 'None',
    SubjectField = 'SubjectField',
    BodyField = 'BodyField',
    BodySubjectField = 'BodySubjectField',
}

export enum NewsGroupFilterType
{
    None = 'None',
    WordInSubject = 'WordInSubject',
    WordInBody = 'WordInBody',
    BracketedWordInSubject = 'BracketedWordInSubject',
    ParensWordInSubject = 'ParensWordInSubject',
}

export class RecipeCriteriaProcessFolder
{
    public constructor(init?:Partial<RecipeCriteriaProcessFolder>) { (<any>Object).assign(this, init); }
    public Id: number;
    public FolderId: string;
    public Folder: string;
    public UserAccountId: string;
    public Name: string;
    public FolderType: CDStandardFolderTypes;
    public RecipeCriteriaId: number;
}

export class RecipeCriteriaNewsGroup
{
    public constructor(init?:Partial<RecipeCriteriaNewsGroup>) { (<any>Object).assign(this, init); }
    public Id: number;
    // @StringLength(1024)
    public Description: string;

    public Host: string;
    // @StringLength(1024)
    public ItemId: string;

    public MsgCategory: string;
    public MsgSubCategory: string;
    public MsgSubSubCategory: string;
    public RuleName: string;
    public MailingList: string;
    // @StringLength(1024)
    public Unsubscribe: string;

    public RecipeCriteriaId: number;
    public CategoryId: number;
}

export enum ContactGroupSource
{
    UserGenerated = 'UserGenerated',
    AdminGenerate = 'AdminGenerate',
    ExistsInUserAccount = 'ExistsInUserAccount',
    LdapGroup = 'LdapGroup',
}

export enum CompanyGroupAccessScope
{
    IndividualUsers = 'IndividualUsers',
    Administrators = 'Administrators',
    AllUsers = 'AllUsers',
}

export class RecipeCriteriaContactsGroup
{
    public constructor(init?:Partial<RecipeCriteriaContactsGroup>) { (<any>Object).assign(this, init); }
    public Id: number;
    public GroupName: string;
    public RecipeCriteriaId: number;
    public GroupMemberList: RecipeCriteriaEmail[];
    public Source: ContactGroupSource;
    public Scope: CompanyGroupAccessScope;
    public DiscoveredGroupId: string;
}

// @Flags()
export enum EmailMatchRuleAction
{
    None = 0,
    MatchFrom = 1,
    IgnoreFrom = 2,
    MatchTo = 4,
    IgnoreTo = 8,
    MatchCC = 16,
    IgnoreCC = 32,
    MatchBcc = 64,
    MatchAny = 85,
    IgnoreBcc = 128,
    IgnoreAny = 170,
}

export class RecipeCriteriaEmailDomain
{
    public constructor(init?:Partial<RecipeCriteriaEmailDomain>) { (<any>Object).assign(this, init); }
    public Id: number;
    public DomainName: string;
    public MatchRule: EmailMatchRuleAction;
    public RecipeCriteriaId: number;
}

export class VenueBlock implements IVenueBlock, IBackGroundConsumerElement, IComparableVenueNode
{
    public constructor(init?:Partial<VenueBlock>) { (<any>Object).assign(this, init); }
    public Id: number;
    // @StringLength(255)
    public UserAccountId: string;

    // @StringLength(100)
    public VenueId: string;

    // @StringLength(100)
    public OwnerId: string;

    public SpecialDescription: string;
    // @StringLength(100)
    public Name: string;

    // @Ignore()
    public Title: string;

    public Command: VCommand;
    public ParentVenueId: string;
    public VenueType: VTypes;
    public VenueSource: VSource;
    public Misc: string;
    public ChildSortingStyle: TreeNodeSortingStyle;
    public SortingRank: number;
    public Hash: number;
    // @Ignore()
    public FolderType: CDStandardFolderTypes;

    // @Ignore()
    public Ranking: number;

    public Hidden: boolean;
    public Owner: VOwnerType;
    public UnreadMessageCount: number;
    // @Ignore()
    public TotalMessageCount: number;

    public ColorStyle: VenueStandardColor;
    public CustomColor: string;
    public OpenIconStyle: VenueStandardIcon;
    public ClosedIconStyle: VenueStandardIcon;
    public CustomOpenIcon: string;
    public CustomClosedIcon: string;
}

export class RecipeCriteriaMiscArgument
{
    public constructor(init?:Partial<RecipeCriteriaMiscArgument>) { (<any>Object).assign(this, init); }
    public Id: number;
    public Key: string;
    public Value: string;
    public RecipeCriteriaId: number;
}

export enum FolderPerContactSource
{
    None = 'None',
    AnyoneIveEmailed = 'AnyoneIveEmailed',
    PeopleInMyAddressBook = 'PeopleInMyAddressBook',
    PeopleFromAContactGroup = 'PeopleFromAContactGroup',
    PeopleIveSentMessagesTo = 'PeopleIveSentMessagesTo',
    PeopleWhoveSentMeMessages = 'PeopleWhoveSentMeMessages',
    DateRangeByWeek = 'DateRangeByWeek',
    DateRangeByMonth = 'DateRangeByMonth',
    ByDomain = 'ByDomain',
    CustomDomainList = 'CustomDomainList',
    NewsGroup = 'NewsGroup',
    CategoriesThenContacts = 'CategoriesThenContacts',
    CategoriesFromFolders = 'CategoriesFromFolders',
    AllCategories = 'AllCategories',
    MyCompany = 'MyCompany',
    ByIndustry = 'ByIndustry',
    Keywords = 'Keywords',
}

export class SortMailCriteria
{
    public constructor(init?:Partial<SortMailCriteria>) { (<any>Object).assign(this, init); }
    public Source: FolderPerContactSource;
    public GroupIds: string[];
    public UseFullNames: boolean;
    public DisplaySentMessages: boolean;
    public CategoryIds: string[];
    public AllCategorys: boolean;
    public JustGroupByCategories: boolean;
    public IndustryGroups: string[];
    public Keywords: string[];
}

export class RecipeCriteriaFilterCriteria
{
    public constructor(init?:Partial<RecipeCriteriaFilterCriteria>) { (<any>Object).assign(this, init); }
    public UseAdvancedSettings: boolean;
    public Whitelist: string[];
    public Blacklist: string[];
    public DomainMode: boolean;
    public WhitelistMode: boolean;
}

export enum InboxStyle
{
    Gmail = 'Gmail',
    Sanebox = 'Sanebox',
    Outlook = 'Outlook',
    InboxZero = 'InboxZero',
    CdPrioirtyInbox = 'CdPrioirtyInbox',
}

export class PushSound
{
    public constructor(init?:Partial<PushSound>) { (<any>Object).assign(this, init); }
    public FileName: string;
    public FriendlyName: string;
}

export enum PushType
{
    Normal = 'Normal',
    Smart = 'Smart',
}

export class RecipeCriteriaPushSettings
{
    public constructor(init?:Partial<RecipeCriteriaPushSettings>) { (<any>Object).assign(this, init); }
    public IsPushRecipe: boolean;
    public GroupsToNotify: string[];
    public NotificationSounds: { [index:string]: PushSound; };
    public PushStyle: PushType;
}

export class RecipeCriteria
{
    public constructor(init?:Partial<RecipeCriteria>) { (<any>Object).assign(this, init); }
    public Id: number;
    public Name: string;
    public UserAccountId: string;
    public MailAccountId: string;
    public CookbookId: string;
    public SyncAccountId: number;
    public RecipeId: string;
    public Disabled: boolean;
    public StartTime: string;
    public EndTime: string;
    public ValueToMatch: string;
    public RecipeType: RecipeTypes;
    public RankingCriteria: RankingCriteria;
    public TemplateId: string;
    public FieldToMatch: FieldToSearch;
    public WaysToSearch: SearchWays;
    public HistoryProcessingEnabled: boolean;
    public HistoryDaysBack: number;
    public HistoryTotalMessages: number;
    public MoveToFolderBeforeRead: string;
    public MoveToFolderAfterRead: string;
    public NotificationWays: NotifyWays;
    public MessageSearch: MessageSearchWays;
    public CategoryIds: string[];
    public CreateMonthDigest: boolean;
    public NewsGroupSearchType: NewsGroupFilterType;
    public ProcessedFolders: RecipeCriteriaProcessFolder[];
    public UserList: RecipeCriteriaEmail[];
    public NewsGroups: RecipeCriteriaNewsGroup[];
    public UserGroups: RecipeCriteriaContactsGroup[];
    public EmailDomain: RecipeCriteriaEmailDomain[];
    // @Ignore()
    public Venues: VenueBlock[];

    public MiscArgument: RecipeCriteriaMiscArgument[];
    public UniqueId: string;
    public LastCriteriaUpdate: string;
    public VenuesToSubtract: string[];
    public SortCriteria: SortMailCriteria;
    public FilterCriteria: RecipeCriteriaFilterCriteria;
    // @Ignore()
    public TheMailAccountType: MailAccountType;

    public FolderCategoryMatrix: { [index:string]: string[]; };
    public FolderCategoryNameMatrix: { [index:string]: string[]; };
    public AddressCategoryMatrix: { [index:string]: string[]; };
    public BuiltInCategoryList: string;
    public InboxStyle: InboxStyle;
    // @Ignore()
    public StateIsDirty: boolean;

    public PushSettings: RecipeCriteriaPushSettings;
}

export class MobileNotifyRecipeCreated extends StandardMobileMQMessage
{
    public constructor(init?:Partial<MobileNotifyRecipeCreated>) { super(init); (<any>Object).assign(this, init); }
    public NewRecipe: AddOrEditRecipeDto;
    public NewVenues: VenueBlockDto[];
}

export class MobileNotifyRecipeDeleted extends StandardMobileMQMessage
{
    public constructor(init?:Partial<MobileNotifyRecipeDeleted>) { super(init); (<any>Object).assign(this, init); }
    public DeleteRecipeId: string;
}

export class DiscoveredEmailStatistics
{
    public constructor(init?:Partial<DiscoveredEmailStatistics>) { (<any>Object).assign(this, init); }
    public Id: number;
    public UserAccountId: string;
    public MailAccountId: string;
    public Name: string;
    public EmailAddress: string;
    public FirstMessageDate: string;
    public LastMessageDate: string;
    public ReceivedCount: number;
    public ReceivedAsFrom: number;
    public ReceivedAsTo: number;
    public ReceivedAsCc: number;
    public ReceivedAsBcc: number;
    public SentCount: number;
    public SentCountAsTo: number;
    public SentCountAsFrom: number;
    public SentCountAsCc: number;
    public SentCountAsBcc: number;
    public ImportantCount: number;
    public InAddressBook: boolean;
    public InAddressBookGroup: boolean;
    public InWhiteList: boolean;
    public InBlackList: boolean;
    public OpenCount: number;
    public DeleteCount: number;
    // @Ignore()
    public RecievedOpenRatio: number;
}

export class GroupStatistics extends DiscoveredEmailStatistics
{
    public constructor(init?:Partial<GroupStatistics>) { super(init); (<any>Object).assign(this, init); }
    public DetectedAs: string;
    public RuleName: string;
    public MsgCategory: string;
    public MsgSubCategory: string;
    public MailingList: string;
    public MailingListService: string;
}

export enum CategoryItemSourceOptions
{
    All = 'All',
    MachineOnly = 'MachineOnly',
    ManualOnly = 'ManualOnly',
}

export class ReassignCategoryItem
{
    public constructor(init?:Partial<ReassignCategoryItem>) { (<any>Object).assign(this, init); }
    public Id: number;
    public NewCategory: string;
}

export enum ServicesToRun
{
    None = 'None',
    UpdateContacts = 'UpdateContacts',
    UpdateGroups = 'UpdateGroups',
    MarkAllAsRead = 'MarkAllAsRead',
}

export enum ContactSource
{
    None = 'None',
    All = 'All',
    InBoxDiscovery = 'InBoxDiscovery',
    AddressBook = 'AddressBook',
    AddressBookGroup = 'AddressBookGroup',
}

export enum CollectDirection
{
    None = 'None',
    All = 'All',
    WeSent = 'WeSent',
    TheySent = 'TheySent',
}

export enum CollectLevel
{
    None = 'None',
    All = 'All',
    From = 'From',
    To = 'To',
    Cc = 'Cc',
    Bcc = 'Bcc',
}

export class DiscoveredMailingListDto
{
    public constructor(init?:Partial<DiscoveredMailingListDto>) { (<any>Object).assign(this, init); }
    public HeaderName: string;
    public HeaderValue: string;
    public MailingListName: string;
}

export class MobileNotifyUserSettingSet extends StandardMobileMQMessage
{
    public constructor(init?:Partial<MobileNotifyUserSettingSet>) { super(init); (<any>Object).assign(this, init); }
    public Setting: UserSetting;
}

export class LocalSummaryMessageDto
{
    public constructor(init?:Partial<LocalSummaryMessageDto>) { (<any>Object).assign(this, init); }
    public From: RecipeCriteriaEmail;
    public To: RecipeCriteriaEmail[];
    public CC: RecipeCriteriaEmail[];
    public Bcc: RecipeCriteriaEmail[];
    public Body: string;
    public Subject: string;
    public DateSent: string;
    public DateReceived: string;
    public IsRead: boolean;
    public IsReply: boolean;
    public IsForward: boolean;
    public DbFolderId: string;
    public ConversationIndex: string;
    public ConversationTopic: string;
    public ConversationId: string;
    public Size: number;
    public HasAttachments: boolean;
    public IsImportant: boolean;
    public MessageId: string;
    public FolderId: string;
}

export class VenueMembershipDto
{
    public constructor(init?:Partial<VenueMembershipDto>) { (<any>Object).assign(this, init); }
    public Id: number;
    // @StringLength(255)
    public VenueId: string;

    // @StringLength(255)
    public MessageId: string;

    // @StringLength(20)
    public RecipeId: string;

    public SyncAccountId: number;
    public DbFolderId: number;
    // @StringLength(40)
    public VenueName: string;

    // @StringLength(255)
    public MapiMessageId: string;

    public GmailThreadId: string;
    public MessageDate: string;
    public Summary: LocalSummaryMessageDto;
    public InsertDate: string;
}

export class DiscoveredFolderDto
{
    public constructor(init?:Partial<DiscoveredFolderDto>) { (<any>Object).assign(this, init); }
    public Id: number;
    public MailAccountId: string;
    public SyncAccountId: number;
    // @StringLength(255)
    public FolderId: string;

    // @StringLength(40)
    public FolderTitle: string;

    // @StringLength(255)
    public MapiEntryId: string;

    public ServerDbFolderId: number;
    public ParentFolderId: string;
    public ChildFolderCount: number;
    public UnreadMessageCount: number;
    public TotalMessageCount: number;
    public WellKnown: CDStandardFolderTypes;
}

export class ReturnedVenueMembers
{
    public constructor(init?:Partial<ReturnedVenueMembers>) { (<any>Object).assign(this, init); }
    public PageOffset: number;
    public CacheMessageId: string;
    public AddVenues: VenueBlockDto[];
    public RemoveVenues: VenueBlockDto[];
    public UpdatedVenues: VenueBlockDto[];
    public AddAssoc: VenueMembershipDto[];
    public RemoveAssoc: VenueMembershipDto[];
    public UsedFolders: DiscoveredFolderDto[];
}

export class VenueMembershipExtendedDto extends VenueMembershipDto
{
    public constructor(init?:Partial<VenueMembershipExtendedDto>) { super(init); (<any>Object).assign(this, init); }
    public Subject: string;
    public From: string;
    public FromDisplayName: string;
    public DateReceived: string;
    public DateSent: string;
}

export class DeviceState
{
    public constructor(init?:Partial<DeviceState>) { (<any>Object).assign(this, init); }
    public SelectedMailAccount: string;
}

export enum VenueListItemMediaType
{
    None = 'None',
    Sound = 'Sound',
    Group = 'Group',
}

export class VenueListItem
{
    public constructor(init?:Partial<VenueListItem>) { (<any>Object).assign(this, init); }
    public Name: string;
    public Description: string;
    public Key: string;
    public Rank: number;
    public ParentKey: string;
    public Icon: string;
    public MediaType: VenueListItemMediaType;
}

export class VenueServerCollection
{
    public constructor(init?:Partial<VenueServerCollection>) { (<any>Object).assign(this, init); }
    public Items: VenueListItem[];
    public ItemNames: string[];
    public DefaultValues: string[];
    public Count: number;
}

export class QueryData<T> extends QueryBase
{
    public constructor(init?:Partial<QueryData<T>>) { super(init); (<any>Object).assign(this, init); }
}

export class LocalSummaryMessage implements ILocalSummaryMessage
{
    public constructor(init?:Partial<LocalSummaryMessage>) { (<any>Object).assign(this, init); }
    public From: RecipeCriteriaEmail;
    public To: RecipeCriteriaEmail[];
    public CC: RecipeCriteriaEmail[];
    public Bcc: RecipeCriteriaEmail[];
    public Body: string;
    public Subject: string;
    public DateSent: string;
    public DateReceived: string;
    public IsRead: boolean;
    public IsReply: boolean;
    public IsForward: boolean;
    public DbFolderId: string;
    public ConversationIndex: string;
    public ConversationTopic: string;
    public ConversationId: string;
    public Size: number;
    public HasAttachments: boolean;
    public IsImportant: boolean;
}

export class VenueMembership implements IBackGroundConsumerElement, IDbVenueMembershipServer
{
    public constructor(init?:Partial<VenueMembership>) { (<any>Object).assign(this, init); }
    public Id: number;
    // @StringLength(255)
    public UserAccountId: string;

    public SyncAccountId: number;
    // @StringLength(40)
    public VenueId: string;

    public MessageId: string;
    // @StringLength(40)
    public RecipeId: string;

    public Hash: number;
    // @StringLength(20)
    public Command: VCommand;

    public InsertDate: string;
    public DbFolderId: number;
    public VenueName: string;
    public MapiMessageId: string;
    // @Ignore()
    public Summary: LocalSummaryMessage;

    public GmailThreadId: string;
    public MessageDate: string;
}

export class DbSequence
{
    public constructor(init?:Partial<DbSequence>) { (<any>Object).assign(this, init); }
    public sequence_name: string;
    public sequence_cur_value: number;
    public sequence_increment: number;
    public sequence_data: number;
    public sequence_min_value: number;
    public sequence_max_value: number;
    public sequence_cycle: boolean;
}

export class QueryDb_2<From, Into> extends QueryBase
{
    public constructor(init?:Partial<QueryDb_2<From, Into>>) { super(init); (<any>Object).assign(this, init); }
}

// @AutoQueryViewer(DefaultFields="Id,Time,What,Src,Dest,RestCall,Url:30,JsonLen,MsgDescribe:5000", DefaultSearchField="UserAccountId", DefaultSearchText="", DefaultSearchType="=", Description="", Title="Venue System Events")
export class Command_History_OverRide
{
    public constructor(init?:Partial<Command_History_OverRide>) { (<any>Object).assign(this, init); }
    public Id: number;
    public What: string;
    public Direction: string;
    public Time: string;
    public RestCall: string;
    public Details: string;
    public Src: string;
    public Dest: string;
    public MsgDescribe: string;
    public JsonLen: number;
    public Url: string;
}

export class CategoryByDomainIab
{
    public constructor(init?:Partial<CategoryByDomainIab>) { (<any>Object).assign(this, init); }
    public Id: number;
    public CategoryByDomainId: number;
    public Domain: string;
    public Confident: boolean;
    public IabId: string;
    public Label: string;
    public Parent: string;
    public Score: string;
}

export interface IDiscoveredMessageCategory
{
    Id: number;
    DetectedAs: MsgDetectedAs;
    Host: string;
    MsgCategory: string;
    MsgSubCategory: string;
    MsgSubSubCategory: string;
    Frequency: number;
    EmailFrom: string;
    RuleName: string;
    MailingListService: string;
    IsRead: number;
    IsImportant: number;
    IsReply: number;
    IsFromMe: number;
    ItemId: string;
    Subject: string;
    UnSubscribe: string;
    MailingList: string;
    UserAccountId: string;
    MailAccountId: string;
    SyncAccountId: number;
}

export enum Purpose
{
    None = 'None',
    AddAccount = 'AddAccount',
    RecipeUpdate = 'RecipeUpdate',
    CacheDateAdjustment = 'CacheDateAdjustment',
    AddDevice = 'AddDevice',
    FullAccountCreation = 'FullAccountCreation',
    PlaybackFromFiles = 'PlaybackFromFiles',
    RecordToFiles = 'RecordToFiles',
    LoadAccount = 'LoadAccount',
}

// @Flags()
export enum ProcessHistoryTaskType
{
    Nothing = 0,
    ScanSentItemsForPeople = 1,
    CollectRecieveStatistics = 2,
    SendToRulesEngine = 4,
    CollectSendItemStatistics = 8,
    CollectNewsGroups = 16,
    StandardRecipeProcessing = 22,
    CollectNewsGroupsTest = 32,
    UseAllFolders = 64,
    SaveResults = 128,
    AccountCreation = 210,
    CleanCats = 256,
    DumpMessageId = 512,
    ShowSummary = 1024,
}

export enum Flag
{
    NotSet = 'NotSet',
    False = 'False',
    True = 'True',
}

export enum LogicalOperator
{
    And = 'And',
    Or = 'Or',
}

export class EmailHistoryCommand implements IStandardMessageUidMid
{
    public constructor(init?:Partial<EmailHistoryCommand>) { (<any>Object).assign(this, init); }
    public Name: string;
    public UserAccountId: string;
    public MailAccountId: string;
    public SyncAccountId: number;
    public RecipeId: string;
    public MsgPurpose: Purpose;
    public FoldersToProcess: CDFolder[];
    public PageSize: number;
    public TotalItems: number;
    public StartDate: string;
    public EndDate: string;
    public QueryString: string;
    public SortAscending: boolean;
    public Commands: ProcessHistoryTaskType;
    public UseCache: boolean;
    public ProcessAllFolders: boolean;
    public wasRead: Flag;
    public isImportant: Flag;
    public Boolean: LogicalOperator;
    public TheAccountRecord: AccountRecord;
    public TheDeviceRecord: DeviceRecord;
    public LoadBody: boolean;
    public Criteria: RecipeCriteria;
    public RecipeTargetIds: string[];
    public ShortAction: EventPostActionDto;
    public DownloadWhat: HistoryDownloadType;
    public DownloadCountInitalPass: number;
    public DownloadCountSecondPass: number;
    public RecordPlaybackSize: number;
    public RecordPlaybackPath: string;
}

export interface IAccountRecord
{
    Id: number;
    UserAccountId: string;
    MailAccountId: string;
    SyncAccountId: number;
    OAuthUniqueId: string;
    Email: string;
    CookbookId: string;
    SyncAccountType: SyncAccountTypes;
    UserAccountType: UserAccountTypes;
    ServiceUrl: string;
    ServerVersion: string;
    AccountsOnDevices: AccountDeviceRecord[];
    AccountForMailSync: AccountDeviceRecord;
    HasFullCredentials: boolean;
    IsMainAccount: boolean;
    CompanyId: number;
    UtcOffset: string;
    TheMailAccountType: MailAccountType;
    ConvertEmailAddress: string;
    TimeSlideBase: string;
}

// @Flags()
export enum RequestAttributes
{
    None = 0,
    Localhost = 1,
    LocalSubnet = 2,
    External = 4,
    Secure = 8,
    InSecure = 16,
    AnySecurityMode = 24,
    HttpHead = 32,
    HttpGet = 64,
    HttpPost = 128,
    HttpPut = 256,
    HttpDelete = 512,
    HttpPatch = 1024,
    HttpOptions = 2048,
    HttpOther = 4096,
    AnyHttpMethod = 8160,
    OneWay = 8192,
    Reply = 16384,
    AnyCallStyle = 24576,
    Soap11 = 32768,
    Soap12 = 65536,
    Xml = 131072,
    Json = 262144,
    Jsv = 524288,
    ProtoBuf = 1048576,
    Csv = 2097152,
    Html = 4194304,
    Wire = 8388608,
    MsgPack = 16777216,
    FormatOther = 33554432,
    AnyFormat = 67076096,
    Http = 67108864,
    MessageQueue = 134217728,
    Tcp = 268435456,
    EndpointOther = 536870912,
    AnyEndpoint = 1006632960,
    InProcess = 1073741824,
    InternalNetworkAccess = 1073741827,
    AnyNetworkAccessType = 1073741831,
    Any = 2147483647,
}

export interface IHttpFile
{
    Name: string;
    FileName: string;
    ContentLength: number;
    ContentType: string;
}

export class PortalOption
{
    public constructor(init?:Partial<PortalOption>) { (<any>Object).assign(this, init); }
    public Value: string;
    public DisplayName: string;
    public IntValue: number;
}

export interface IApplicationState
{
    Id: number;
    UserAccountId: string;
    MailAccountId: string;
    StateKey: RestPostActionSubType;
    StateValue: string;
}

export interface IHasCategoryId
{
    Category: string;
    UserAccountId: string;
    Type: CategoryItemType;
    Rank: number;
}

export interface IVenueBlock
{
    Id: number;
    UserAccountId: string;
    VenueId: string;
    OwnerId: string;
    Name: string;
    ParentVenueId: string;
    VenueType: VTypes;
    Command: VCommand;
    Misc: string;
    VenueSource: VSource;
    UnreadMessageCount: number;
    ChildSortingStyle: TreeNodeSortingStyle;
    SortingRank: number;
    Hidden: boolean;
    TotalMessageCount: number;
}

export interface IBackGroundConsumerElement
{
}

export interface IComparableVenueNode
{
    Ranking: number;
    Title: string;
    FolderType: CDStandardFolderTypes;
}

export interface IDbVenueMembershipServer
{
    Id: number;
    Hash: number;
    UserAccountId: string;
    Command: VCommand;
    VenueId: string;
    MessageId: string;
    RecipeId: string;
    SyncAccountId: number;
    InsertDate?: string;
    DbFolderId: number;
    VenueName: string;
    MapiMessageId: string;
    Summary: LocalSummaryMessage;
    GmailThreadId: string;
}

export interface IStandardMessageUidMid
{
    MailAccountId: string;
    UserAccountId: string;
}

export class MobileNotifyRecipeStatus extends StandardMobileMQMessage implements IStandardMessageUidMid
{
    public constructor(init?:Partial<MobileNotifyRecipeStatus>) { super(init); (<any>Object).assign(this, init); }
    public Completion: Status;
    public Messages: string;
    public Criteria: RecipeCriteria;
    public MailAccountId: string;
    public UserAccountId: string;
}

export interface ILocalSummaryMessage
{
    From: RecipeCriteriaEmail;
    To: RecipeCriteriaEmail[];
    CC: RecipeCriteriaEmail[];
    Bcc: RecipeCriteriaEmail[];
    Body: string;
    Subject: string;
    DateSent: string;
    DateReceived: string;
    IsRead: boolean;
    IsReply: boolean;
    DbFolderId: string;
    ConversationIndex: string;
    ConversationTopic: string;
    ConversationId: string;
    Size: number;
    IsImportant: boolean;
    HasAttachments: boolean;
}

export class AwsEmailMessageResponse
{
    public constructor(init?:Partial<AwsEmailMessageResponse>) { (<any>Object).assign(this, init); }
}

export class AliveGetResponse
{
    public constructor(init?:Partial<AliveGetResponse>) { (<any>Object).assign(this, init); }
    public TheTime: string;
}

export class ServiceInfoResponse
{
    public constructor(init?:Partial<ServiceInfoResponse>) { (<any>Object).assign(this, init); }
    public ServiceDetails: string;
    public HostName: string;
    public IpAddress: string;
    public CommandLineArguments: string[];
    public AppConfiguration: any;
    public EnvironmentVariables: any;
}

export class MSGraphNotificationResponse
{
    public constructor(init?:Partial<MSGraphNotificationResponse>) { (<any>Object).assign(this, init); }
}

export class SignalTestResponse
{
    public constructor(init?:Partial<SignalTestResponse>) { (<any>Object).assign(this, init); }
    public CurrentServerTime: string;
    public Message: string;
}

export class RestLogCommandDetailResponse
{
    public constructor(init?:Partial<RestLogCommandDetailResponse>) { (<any>Object).assign(this, init); }
    public ToDisplay: string;
    public History: Command_History;
}

// @DataContract
export class QueryResponse<T>
{
    public constructor(init?:Partial<QueryResponse<T>>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public Offset: number;

    // @DataMember(Order=2)
    public Total: number;

    // @DataMember(Order=3)
    public Results: T[];

    // @DataMember(Order=4)
    public Meta: { [index:string]: string; };

    // @DataMember(Order=5)
    public ResponseStatus: ResponseStatus;
}

export class UploadTestDatasetResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<UploadTestDatasetResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class TestRunHistoryResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<TestRunHistoryResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class GetTestHistoryResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetTestHistoryResponse>) { super(init); (<any>Object).assign(this, init); }
    public Messages: ILocalSyncMessage[];
}

export class ClearTestHistoryResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ClearTestHistoryResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class SendTestMessageResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<SendTestMessageResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class GetEmlFileResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetEmlFileResponse>) { super(init); (<any>Object).assign(this, init); }
    public FileInfo: string;
}

export class ClearForTestingResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ClearForTestingResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class AddFooResponse extends Response
{
    public constructor(init?:Partial<AddFooResponse>) { super(init); (<any>Object).assign(this, init); }
    public Foo: Foo;
}

export class EditFooResponse extends Response
{
    public constructor(init?:Partial<EditFooResponse>) { super(init); (<any>Object).assign(this, init); }
    public Foo: Foo;
}

export class FindFoosResponse extends Response
{
    public constructor(init?:Partial<FindFoosResponse>) { super(init); (<any>Object).assign(this, init); }
    public Foos: Foo[];
}

export class DeleteFooResponse extends Response
{
    public constructor(init?:Partial<DeleteFooResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class GetFooResponse extends Response
{
    public constructor(init?:Partial<GetFooResponse>) { super(init); (<any>Object).assign(this, init); }
    public Foo: Foo;
}

export class AddAccountResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<AddAccountResponse>) { super(init); (<any>Object).assign(this, init); }
    public HasPortalAccount: boolean;
    public UserAccountId: string;
    public CommandsQueueLocation: string;
    public CommandsQueueName: string;
    public MqConnectionString: string;
    public Status: RequestStatus;
}

export class LoadAccountResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<LoadAccountResponse>) { super(init); (<any>Object).assign(this, init); }
    public HasPortalAccount: boolean;
    public UserAccountId: string;
}

export class DeleteAccountResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<DeleteAccountResponse>) { super(init); (<any>Object).assign(this, init); }
    public UserAccountId: string;
    public Result: string;
    public Status: RequestStatus;
}

export class UpdateAccountResponse extends AddAccountResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<UpdateAccountResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class IsAccountConsentGrantedResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<IsAccountConsentGrantedResponse>) { super(init); (<any>Object).assign(this, init); }
    public IsConsentGranted: boolean;
}

export class UserAccountExistsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<UserAccountExistsResponse>) { super(init); (<any>Object).assign(this, init); }
    public AccountExists: boolean;
    public CreationState: AccountCreationState;
    public TheAccountRecord: AccountRecord;
}

export class PortalAccountWasAddedResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<PortalAccountWasAddedResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class GetAccountsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetAccountsResponse>) { super(init); (<any>Object).assign(this, init); }
    public Result: AccountRecord[];
}

export class GetUserIdForMailAccountResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetUserIdForMailAccountResponse>) { super(init); (<any>Object).assign(this, init); }
    public UserAccountId: string;
}

export class CreateOAuthProfileResponse extends OAuthTokenResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<CreateOAuthProfileResponse>) { super(init); (<any>Object).assign(this, init); }
    public GivenName: string;
    public FamilyName: string;
    public DisplayName: string;
}

export class RefreshOAuthTokenResponse extends OAuthTokenResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<RefreshOAuthTokenResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class GetClientAccessTokenResponse extends OAuthTokenResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetClientAccessTokenResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class RemoveOAuthTokenResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<RemoveOAuthTokenResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class UpdateDeviceResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<UpdateDeviceResponse>) { super(init); (<any>Object).assign(this, init); }
    public Status: RequestStatus;
}

export class DeleteAccountOnDeviceResponse extends DeleteAccountResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<DeleteAccountOnDeviceResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class GetDeviceResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetDeviceResponse>) { super(init); (<any>Object).assign(this, init); }
    public Device: DeviceRecord;
}

export class ListDevicesResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListDevicesResponse>) { super(init); (<any>Object).assign(this, init); }
    public Devices: DeviceRecord[];
}

export class GetAccountsOnDeviceResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetAccountsOnDeviceResponse>) { super(init); (<any>Object).assign(this, init); }
    public Result: AccountDto[];
}

export class SyncTokenResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<SyncTokenResponse>) { super(init); (<any>Object).assign(this, init); }
    public AuthToken: string;
    public RefreshToken: string;
    public ExpiresOn: string;
}

export class GetFolderIdResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetFolderIdResponse>) { super(init); (<any>Object).assign(this, init); }
    public Assoc: CDFolder;
}

export class GetFileResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetFileResponse>) { super(init); (<any>Object).assign(this, init); }
    public Name: string;
    public Time: string;
    public Data: string;
}

export class GetUserInfoResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetUserInfoResponse>) { super(init); (<any>Object).assign(this, init); }
    public Info: { [index:string]: string; };
    public Rankings: GetUserInfoRanking[];
}

export class GetUserSettingsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetUserSettingsResponse>) { super(init); (<any>Object).assign(this, init); }
    public Settings: UserSetting[];
}

export class FindUserAccountResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<FindUserAccountResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class RestLogListResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<RestLogListResponse>) { super(init); (<any>Object).assign(this, init); }
    public CmdList: RestCmdDto[];
}

export class GetCachedMessagesResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetCachedMessagesResponse>) { super(init); (<any>Object).assign(this, init); }
    public CachedMessagesList: LocalSyncMessage[];
}

export class ListNewsGroupsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListNewsGroupsResponse>) { super(init); (<any>Object).assign(this, init); }
    public NewsGroupList: NewsGroupDescription[];
}

export class PingResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<PingResponse>) { super(init); (<any>Object).assign(this, init); }
    public TheTime: string;
}

export class SetCategoriesForValueResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<SetCategoriesForValueResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class ReprocessTransactionsForDeviceResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ReprocessTransactionsForDeviceResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class GetSequenceResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetSequenceResponse>) { super(init); (<any>Object).assign(this, init); }
    public SequenceName: string;
    public SequenceValue: string;
}

export class GetOptionsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetOptionsResponse>) { super(init); (<any>Object).assign(this, init); }
    public Options: { [index:string]: PortalOption[]; };
}

export class GetAccountCreationResultsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetAccountCreationResultsResponse>) { super(init); (<any>Object).assign(this, init); }
    public rList: AccountRecommendItem[];
    public aList: AccountAnalysisItem[];
}

export class InsertWizardAccountResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<InsertWizardAccountResponse>) { super(init); (<any>Object).assign(this, init); }
    public Id: number;
}

export class UpdateWizardAccountResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<UpdateWizardAccountResponse>) { super(init); (<any>Object).assign(this, init); }
    public Id: number;
}

export class ReadApplicationStateResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ReadApplicationStateResponse>) { super(init); (<any>Object).assign(this, init); }
    public Results: ApplicationStateDto[];
}

export class CreateApplicationStateResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<CreateApplicationStateResponse>) { super(init); (<any>Object).assign(this, init); }
    public Id: number;
}

export class AddCategoriesResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<AddCategoriesResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class AddCategoryItemResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<AddCategoryItemResponse>) { super(init); (<any>Object).assign(this, init); }
    public Id: number;
}

export class AddCategoryItemsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<AddCategoryItemsResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class DeleteCategoryResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<DeleteCategoryResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class ChangeCategoryItemsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ChangeCategoryItemsResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class DeleteCategoryItemResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<DeleteCategoryItemResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class EditCategoryItemResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<EditCategoryItemResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class EditCategoryItemsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<EditCategoryItemsResponse>) { super(init); (<any>Object).assign(this, init); }
    public SuccessfullyUpdated: number[];
    public FailedToUpdate: number[];
}

export class ListCategoryItemsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListCategoryItemsResponse>) { super(init); (<any>Object).assign(this, init); }
    public Items: CdCategoryItem[];
}

export class ListCategoryItemsCleanResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListCategoryItemsCleanResponse>) { super(init); (<any>Object).assign(this, init); }
    public Items: CdCategoryItem[];
}

export class ListCategoryItemsAdvancedResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListCategoryItemsAdvancedResponse>) { super(init); (<any>Object).assign(this, init); }
    public Items: CdCategoryItem[];
}

export class ListChartDataResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListChartDataResponse>) { super(init); (<any>Object).assign(this, init); }
    public Results: AccountCreationChartData;
}

export class AddCookbookResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<AddCookbookResponse>) { super(init); (<any>Object).assign(this, init); }
    public AddCookbookCommand: MobileNotifyAddCookbook;
    public AddVenuesCommand: MobileNotifyAddVenue;
}

export class UpdateCookbookResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<UpdateCookbookResponse>) { super(init); (<any>Object).assign(this, init); }
    public UpdateCookbookCommand: MobileNotifyUpdateCookbook;
    public AddVenuesCommand: MobileNotifyAddVenue;
    public DeleteVenuesCommand: MobileNotifyDeleteVenue;
}

export class ListCookbookTemplatesResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListCookbookTemplatesResponse>) { super(init); (<any>Object).assign(this, init); }
    public CookbookTemplates: CdCookbookTemplate[];
}

export class GetCookbookTemplateResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetCookbookTemplateResponse>) { super(init); (<any>Object).assign(this, init); }
    public CookbookTemplate: CdCookbookTemplate;
}

export class ListCookbooksResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListCookbooksResponse>) { super(init); (<any>Object).assign(this, init); }
    public Cookbooks: CdCookbook[];
}

export class GetCookbookResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetCookbookResponse>) { super(init); (<any>Object).assign(this, init); }
    public Cookbook: CdCookbook;
}

export class DeleteCookbookResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<DeleteCookbookResponse>) { super(init); (<any>Object).assign(this, init); }
    public RecipeUpdatedCommands: MobileNotifyRecipeUpdated[];
    public OrphanedRecipeIds: string[];
    public DeleteVenueCommand: MobileNotifyDeleteVenue;
    public ModifyVenueCommand: MobileNotifyModifyVenue;
    public DeleteCookbookCommand: MobileNotifyDeleteCookbook;
}

export class ListGroupItemsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListGroupItemsResponse>) { super(init); (<any>Object).assign(this, init); }
    public Results: CdGroupItemDto[];
}

export class AddRecipeResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<AddRecipeResponse>) { super(init); (<any>Object).assign(this, init); }
    public MobileCommand: MobileNotifyRecipeCreated;
}

export class DeleteRecipeResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<DeleteRecipeResponse>) { super(init); (<any>Object).assign(this, init); }
    public MobileCommand: MobileNotifyRecipeDeleted;
    public Deleted: string;
}

export class ModifyRecipeResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ModifyRecipeResponse>) { super(init); (<any>Object).assign(this, init); }
    public MobileCommand: MobileNotifyRecipeUpdated;
}

export class ListRecipeResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListRecipeResponse>) { super(init); (<any>Object).assign(this, init); }
    public TheRecipes: AddOrEditRecipeDto[];
}

export class MakeRecipeCriteriaResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<MakeRecipeCriteriaResponse>) { super(init); (<any>Object).assign(this, init); }
    public Criteria: RecipeCriteria;
}

export class AddOrUpdateCdRecipeTemplateResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<AddOrUpdateCdRecipeTemplateResponse>) { super(init); (<any>Object).assign(this, init); }
    public TemplateId: string;
}

export class DeleteCdRecipeTemplateResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<DeleteCdRecipeTemplateResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class GetCdRecipeTemplateResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetCdRecipeTemplateResponse>) { super(init); (<any>Object).assign(this, init); }
    public Template: CdRecipeTemplate;
}

export class ListCdRecipeTemplatesResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListCdRecipeTemplatesResponse>) { super(init); (<any>Object).assign(this, init); }
    public Templates: CdRecipeTemplate[];
}

export class GetStatisticsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetStatisticsResponse>) { super(init); (<any>Object).assign(this, init); }
    public Statistics: GroupStatistics[];
}

export class GetTestEventsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetTestEventsResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class ListCategoriesResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListCategoriesResponse>) { super(init); (<any>Object).assign(this, init); }
    public Categories: CdCategoryDto[];
}

export class ReassignCategoryResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ReassignCategoryResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class ReassignCategoryListResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ReassignCategoryListResponse>) { super(init); (<any>Object).assign(this, init); }
    public SuccessfullChanged: ReassignCategoryItem[];
}

export class GetCategoryItemResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetCategoryItemResponse>) { super(init); (<any>Object).assign(this, init); }
    public Item: CdCategoryItem;
}

export class RunServiceResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<RunServiceResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class CreateUserMessageResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<CreateUserMessageResponse>) { super(init); (<any>Object).assign(this, init); }
    public newId: number;
}

export class ReadUserMessageResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ReadUserMessageResponse>) { super(init); (<any>Object).assign(this, init); }
    public Results: UserDataRecord[];
}

export class UpdateUserMessageResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<UpdateUserMessageResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class DeleteUserMessageResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<DeleteUserMessageResponse>) { super(init); (<any>Object).assign(this, init); }
}

export class ListEmailContactsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListEmailContactsResponse>) { super(init); (<any>Object).assign(this, init); }
    public UserList: RecipeCriteriaEmail[];
}

export class ListDiscoveredEmailDomainsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListDiscoveredEmailDomainsResponse>) { super(init); (<any>Object).assign(this, init); }
    public DomainList: string[];
}

export class ListUserGroupsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ListUserGroupsResponse>) { super(init); (<any>Object).assign(this, init); }
    public DiscoveredMailingLists: DiscoveredMailingListDto[];
}

export class GetContactGroupsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetContactGroupsResponse>) { super(init); (<any>Object).assign(this, init); }
    public ContactsGroups: RecipeCriteriaContactsGroup[];
}

export class AddVenuesResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<AddVenuesResponse>) { super(init); (<any>Object).assign(this, init); }
    public Command: MobileNotifyAddVenue;
}

export class DeleteVenuesResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<DeleteVenuesResponse>) { super(init); (<any>Object).assign(this, init); }
    public Command: MobileNotifyDeleteVenue;
}

export class ModifyVenueResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<ModifyVenueResponse>) { super(init); (<any>Object).assign(this, init); }
    public Command: MobileNotifyModifyVenue;
}

export class MoveVenue extends StandardRequest implements IReturn<MoveVenueResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<MoveVenue>) { super(init); (<any>Object).assign(this, init); }
    public VenueId: string;
    public NewPosition: number;
    public createResponse() { return new MoveVenueResponse(); }
    public getTypeName() { return 'MoveVenue'; }
}

export class MoveVenueResponse extends ModifyVenueResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<MoveVenueResponse>) { super(init); (<any>Object).assign(this, init); }
    public UpdateSettingCommand: MobileNotifyUserSettingSet;
}

export class GetVenuesResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetVenuesResponse>) { super(init); (<any>Object).assign(this, init); }
    public Venues: VenueBlockDto[];
}

export class GetVenueItemsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetVenueItemsResponse>) { super(init); (<any>Object).assign(this, init); }
    public CorrilationId: string;
    public Results: ReturnedVenueMembers;
}

export class GetAllVenueItemsResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetAllVenueItemsResponse>) { super(init); (<any>Object).assign(this, init); }
    public Items: VenueMembershipDto[];
    public Total: number;
}

export class GetAllVenueItemsExtendedResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetAllVenueItemsExtendedResponse>) { super(init); (<any>Object).assign(this, init); }
    public Items: VenueMembershipExtendedDto[];
    public Total: number;
}

export class GetVenueServerCollectionResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<GetVenueServerCollectionResponse>) { super(init); (<any>Object).assign(this, init); }
    public Collection: VenueServerCollection;
    public DefaultValues: string[];
}

export class SearchInVenueResponse extends StandardResponse implements IStandardResponse, ICacheableResponse
{
    public constructor(init?:Partial<SearchInVenueResponse>) { super(init); (<any>Object).assign(this, init); }
    public Results: VenueMembershipDto[];
    public Total: number;
}

export class ExportTypes
{
    public constructor(init?:Partial<ExportTypes>) { (<any>Object).assign(this, init); }
    public ServerEventWithMessage: ServerEventWithMessage;
    public StatsUpdatedServerEvent: StatsUpdatedServerEvent;
    public AccountCreationProgressGuageEvent: AccountCreationProgressGuageEvent;
    public MessageRowTemplate: RecDisplayField;
    public UserDataRecord: UserDataRecord;
    public UserTypeTypes: UserTypeTypes;
    public AnalysisUserDataRecord: AnalysisUserDataRecord;
    public MessageUserDataRecord: MessageUserDataRecord;
    public RecommendationUserDataRecord: RecDisplayBlock;
    public RecomendationActionFieldWidget: RecDisplayActionWidgetType;
    public RecomendationActionTypes: RecDisplayActionTypes;
    public RecomendationActionField: RecDisplayActionField;
    public PortalCompleteFeelds: PortalCompletionSettings;
    public AccountCreationState: AccountCreationState;
    public MailAccountCreationStates: MailAccountCreationStates;
}

// @Route("/AwsEmailMessage")
export class AwsEmailMessage implements IReturn<AwsEmailMessageResponse>
{
    public constructor(init?:Partial<AwsEmailMessage>) { (<any>Object).assign(this, init); }
    public Source: string;
    public to: string[];
    public cc: string[];
    public bcc: string[];
    public subject: string;
    public htmlbody: string;
    public txtbody: string;
    public createResponse() { return new AwsEmailMessageResponse(); }
    public getTypeName() { return 'AwsEmailMessage'; }
}

// @Route("/HealthCheck", "GET")
export class HealthCheck implements IReturn<AliveGetResponse>
{
    public constructor(init?:Partial<HealthCheck>) { (<any>Object).assign(this, init); }
    public createResponse() { return new AliveGetResponse(); }
    public getTypeName() { return 'HealthCheck'; }
}

// @Route("/ServiceInfo")
export class ServiceInfo implements IReturn<ServiceInfoResponse>
{
    public constructor(init?:Partial<ServiceInfo>) { (<any>Object).assign(this, init); }
    public createResponse() { return new ServiceInfoResponse(); }
    public getTypeName() { return 'ServiceInfo'; }
}

// @Route("/MSGraphNotification")
export class MSGraphNotification implements IReturn<MSGraphNotificationResponse>
{
    public constructor(init?:Partial<MSGraphNotification>) { (<any>Object).assign(this, init); }
    public value: Notification[];
    public createResponse() { return new MSGraphNotificationResponse(); }
    public getTypeName() { return 'MSGraphNotification'; }
}

// @Route("/SignalMessage")
export class SignalMessage implements IReturn<SignalTestResponse>
{
    public constructor(init?:Partial<SignalMessage>) { (<any>Object).assign(this, init); }
    public createResponse() { return new SignalTestResponse(); }
    public getTypeName() { return 'SignalMessage'; }
}

// @Route("/Alive3", "GET")
export class Alive3 implements IReturn<AliveGetResponse>
{
    public constructor(init?:Partial<Alive3>) { (<any>Object).assign(this, init); }
    public createResponse() { return new AliveGetResponse(); }
    public getTypeName() { return 'Alive3'; }
}

// @Route("/RestLogCommandDetail/{DbRow}")
export class RestLogCommandDetail implements IReturn<RestLogCommandDetailResponse>
{
    public constructor(init?:Partial<RestLogCommandDetail>) { (<any>Object).assign(this, init); }
    public DbRow: number;
    public createResponse() { return new RestLogCommandDetailResponse(); }
    public getTypeName() { return 'RestLogCommandDetail'; }
}

// @Route("/MailLists")
// @AutoQueryViewer(DefaultFields="Id,MsgCategory,MsgSubCategory,MsgSubSubCategory,RuleName,MailingList,ItemId,Frequency,Subject", DefaultSearchField="", DefaultSearchText="", DefaultSearchType="=", Title="Venue MailingList")
export class SystemMailingList extends QueryDb_1<DiscoveredMessageCategory> implements IReturn<QueryResponse<DiscoveredMessageCategory>>
{
    public constructor(init?:Partial<SystemMailingList>) { super(init); (<any>Object).assign(this, init); }
    public DetectedAs: MsgDetectedAs;
    public createResponse() { return new QueryResponse<DiscoveredMessageCategory>(); }
    public getTypeName() { return 'SystemMailingList'; }
}

// @Route("/HistoryFolderQuery")
// @AutoQueryViewer(DefaultFields="", DefaultSearchField="", DefaultSearchText="", DefaultSearchType="=", Title="Venue Email Folders and counts")
export class HistoryFolderQuery extends QueryDb_1<HistoyFolderQueryResult> implements IReturn<QueryResponse<HistoyFolderQueryResult>>
{
    public constructor(init?:Partial<HistoryFolderQuery>) { super(init); (<any>Object).assign(this, init); }
    public DetectedAs: MsgDetectedAs;
    public email: string;
    public createResponse() { return new QueryResponse<HistoyFolderQueryResult>(); }
    public getTypeName() { return 'HistoryFolderQuery'; }
}

export class UploadTestDataset extends StandardRequest implements IReturn<UploadTestDatasetResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<UploadTestDataset>) { super(init); (<any>Object).assign(this, init); }
    public Destination: TestMessageDestination;
    public Cleaning: TestMessageCleaningBehavior;
    public createResponse() { return new UploadTestDatasetResponse(); }
    public getTypeName() { return 'UploadTestDataset'; }
}

export class TestRunHistory extends StandardRequest implements IReturn<TestRunHistoryResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<TestRunHistory>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new TestRunHistoryResponse(); }
    public getTypeName() { return 'TestRunHistory'; }
}

export class GetTestHistory extends StandardRequest implements IReturn<GetTestHistoryResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetTestHistory>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new GetTestHistoryResponse(); }
    public getTypeName() { return 'GetTestHistory'; }
}

export class ClearTestHistory extends StandardRequest implements IReturn<ClearTestHistoryResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ClearTestHistory>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new ClearTestHistoryResponse(); }
    public getTypeName() { return 'ClearTestHistory'; }
}

export class SendTestMessage extends StandardRequest implements IReturn<SendTestMessageResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<SendTestMessage>) { super(init); (<any>Object).assign(this, init); }
    public TheMessage: LocalSyncMessage;
    public Destination: TestMessageDestination;
    public createResponse() { return new SendTestMessageResponse(); }
    public getTypeName() { return 'SendTestMessage'; }
}

export class GetEmlFile implements IReturn<GetEmlFileResponse>
{
    public constructor(init?:Partial<GetEmlFile>) { (<any>Object).assign(this, init); }
    public FilePath: string;
    public createResponse() { return new GetEmlFileResponse(); }
    public getTypeName() { return 'GetEmlFile'; }
}

// @Route("/ClearForTesting", "GET")
export class ClearForTesting implements IReturn<ClearForTestingResponse>
{
    public constructor(init?:Partial<ClearForTesting>) { (<any>Object).assign(this, init); }
    public RequestedBy: string;
    public MobileNotificationCollectionEnabled: boolean;
    public createResponse() { return new ClearForTestingResponse(); }
    public getTypeName() { return 'ClearForTesting'; }
}

export class AddFoo implements IReturn<AddFooResponse>
{
    public constructor(init?:Partial<AddFoo>) { (<any>Object).assign(this, init); }
    public FirstName: string;
    public LastName: string;
    public Age: number;
    public JobTitle: string;
    public createResponse() { return new AddFooResponse(); }
    public getTypeName() { return 'AddFoo'; }
}

export class EditFoo implements IReturn<EditFooResponse>
{
    public constructor(init?:Partial<EditFoo>) { (<any>Object).assign(this, init); }
    public Id: number;
    public FirstName: string;
    public LastName: string;
    public Age: number;
    public JobTitle: string;
    public Role: FooRole;
    public createResponse() { return new EditFooResponse(); }
    public getTypeName() { return 'EditFoo'; }
}

export class FindFoos implements IReturn<FindFoosResponse>
{
    public constructor(init?:Partial<FindFoos>) { (<any>Object).assign(this, init); }
    public SearchString: string;
    public createResponse() { return new FindFoosResponse(); }
    public getTypeName() { return 'FindFoos'; }
}

export class DeleteFoo implements IReturn<DeleteFooResponse>
{
    public constructor(init?:Partial<DeleteFoo>) { (<any>Object).assign(this, init); }
    public Id: number;
    public createResponse() { return new DeleteFooResponse(); }
    public getTypeName() { return 'DeleteFoo'; }
}

export class GetFoo implements IReturn<GetFooResponse>
{
    public constructor(init?:Partial<GetFoo>) { (<any>Object).assign(this, init); }
    public Id: number;
    public createResponse() { return new GetFooResponse(); }
    public getTypeName() { return 'GetFoo'; }
}

// @Route("/AddAccount", "POST")
export class AddAccount extends DeviceDetailsRequestBase implements IReturn<AddAccountResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<AddAccount>) { super(init); (<any>Object).assign(this, init); }
    public GivenName: string;
    public FamilyName: string;
    public DisplayName: string;
    public StartRange: string;
    public EndRange: string;
    public MessageType: HistoryDownloadType;
    public TimeShiftBase: string;
    public ScanHistoryForAccounts: boolean;
    public RunMailSyncTask: boolean;
    public HasPortalId: boolean;
    public AccessTokenType: OAuthAccessTokenType;
    public ShortAction: EventPostActionDto;
    public createResponse() { return new AddAccountResponse(); }
    public getTypeName() { return 'AddAccount'; }
}

// @Route("/LoadAccount", "POST")
export class LoadAccount extends DeviceDetailsRequestBase implements IReturn<LoadAccountResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<LoadAccount>) { super(init); (<any>Object).assign(this, init); }
    public StartRange: string;
    public EndRange: string;
    public MessageType: HistoryDownloadType;
    public ShortAction: EventPostActionDto;
    public createResponse() { return new LoadAccountResponse(); }
    public getTypeName() { return 'LoadAccount'; }
}

// @Route("/DeleteAccount", "POST")
export class DeleteAccount extends StandardRequest implements IReturn<DeleteAccountResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<DeleteAccount>) { super(init); (<any>Object).assign(this, init); }
    public DeleteCachedData: boolean;
    public ShortAction: EventPostActionDto;
    public createResponse() { return new DeleteAccountResponse(); }
    public getTypeName() { return 'DeleteAccount'; }
}

// @Route("/UpdateAccount", "POST")
export class UpdateAccount extends DeviceDetailsRequestBase implements IReturn<UpdateAccountResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<UpdateAccount>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new UpdateAccountResponse(); }
    public getTypeName() { return 'UpdateAccount'; }
}

// @Route("/IsAccountConsentGranted", "POST")
export class IsAccountConsentGranted extends StandardRequest implements IReturn<IsAccountConsentGrantedResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<IsAccountConsentGranted>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new IsAccountConsentGrantedResponse(); }
    public getTypeName() { return 'IsAccountConsentGranted'; }
}

// @Route("/UserAccountExists", "POST")
export class UserAccountExists extends StandardRequest implements IReturn<UserAccountExistsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<UserAccountExists>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new UserAccountExistsResponse(); }
    public getTypeName() { return 'UserAccountExists'; }
}

// @Route("/PortalAccountWasAdded", "POST")
export class PortalAccountWasAdded extends StandardRequest implements IReturn<PortalAccountWasAddedResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<PortalAccountWasAdded>) { super(init); (<any>Object).assign(this, init); }
    public Email: string;
    public createResponse() { return new PortalAccountWasAddedResponse(); }
    public getTypeName() { return 'PortalAccountWasAdded'; }
}

// @Route("/GetAccounts", "POST")
export class GetAccounts extends StandardRequest implements IReturn<GetAccountsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetAccounts>) { super(init); (<any>Object).assign(this, init); }
    public MailAccountIds: string[];
    public createResponse() { return new GetAccountsResponse(); }
    public getTypeName() { return 'GetAccounts'; }
}

// @Route("/GetUserIdForMailAccount", "POST")
export class GetUserIdForMailAccount extends StandardRequest implements IReturn<GetUserIdForMailAccountResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetUserIdForMailAccount>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new GetUserIdForMailAccountResponse(); }
    public getTypeName() { return 'GetUserIdForMailAccount'; }
}

// @Route("/CreateOAuthProfile", "POST")
export class CreateOAuthProfile extends StandardRequest implements IReturn<CreateOAuthProfileResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<CreateOAuthProfile>) { super(init); (<any>Object).assign(this, init); }
    public AuthenticationToken: string;
    public RedirectUri: string;
    public LoginType: OAuthLoginTypes;
    public TokenType: OAuthTokenTypes;
    public SyncAccountType: SyncAccountTypes;
    public DeviceType: VenueDeviceType;
    public createResponse() { return new CreateOAuthProfileResponse(); }
    public getTypeName() { return 'CreateOAuthProfile'; }
}

// @Route("/RefreshOAuthToken", "POST")
export class RefreshOAuthToken extends StandardRequest implements IReturn<RefreshOAuthTokenResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<RefreshOAuthToken>) { super(init); (<any>Object).assign(this, init); }
    public OAuthUniqueId: string;
    public createResponse() { return new RefreshOAuthTokenResponse(); }
    public getTypeName() { return 'RefreshOAuthToken'; }
}

export class GetClientAccessToken extends StandardRequest implements IReturn<GetClientAccessTokenResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetClientAccessToken>) { super(init); (<any>Object).assign(this, init); }
    public Caller: string;
    public createResponse() { return new GetClientAccessTokenResponse(); }
    public getTypeName() { return 'GetClientAccessToken'; }
}

// @Route("/RemoveOAuthToken", "POST")
export class RemoveOAuthToken extends StandardRequest implements IReturn<RemoveOAuthTokenResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<RemoveOAuthToken>) { super(init); (<any>Object).assign(this, init); }
    public AccountEmail: string;
    public createResponse() { return new RemoveOAuthTokenResponse(); }
    public getTypeName() { return 'RemoveOAuthToken'; }
}

// @Route("/UpdateDevice", "POST")
export class UpdateDevice extends DeviceDetailsRequestBase implements IReturn<UpdateDeviceResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<UpdateDevice>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new UpdateDeviceResponse(); }
    public getTypeName() { return 'UpdateDevice'; }
}

// @Route("/DeleteAccountOnDevice", "POST")
export class DeleteAccountOnDevice extends StandardRequest implements IReturn<DeleteAccountOnDeviceResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<DeleteAccountOnDevice>) { super(init); (<any>Object).assign(this, init); }
    public Email: string;
    public createResponse() { return new DeleteAccountOnDeviceResponse(); }
    public getTypeName() { return 'DeleteAccountOnDevice'; }
}

// @Route("/GetDevices", "POST")
export class GetDevice extends StandardRequest implements IReturn<GetDeviceResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetDevice>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new GetDeviceResponse(); }
    public getTypeName() { return 'GetDevice'; }
}

// @Route("/GetAllDevices", "POST")
export class ListDevices extends StandardRequest implements IReturn<ListDevicesResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListDevices>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new ListDevicesResponse(); }
    public getTypeName() { return 'ListDevices'; }
}

// @Route("/GetAccountsOnDevice", "POST")
export class GetAccountsOnDevice extends StandardRequest implements IReturn<GetAccountsOnDeviceResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetAccountsOnDevice>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new GetAccountsOnDeviceResponse(); }
    public getTypeName() { return 'GetAccountsOnDevice'; }
}

// @Route("/SyncToken", "POST")
export class SyncTokenRequest implements IReturn<SyncTokenResponse>
{
    public constructor(init?:Partial<SyncTokenRequest>) { (<any>Object).assign(this, init); }
    public AuthToken: string;
    public RefreshToken: string;
    public ExpiresOn: string;
    public DeviceId: string;
    public AccountId: string;
    public ResponseStatus: ResponseStatus;
    public createResponse() { return new SyncTokenResponse(); }
    public getTypeName() { return 'SyncTokenRequest'; }
}

// @Route("/Alive", "GET")
export class Alive implements IReturn<AliveGetResponse>
{
    public constructor(init?:Partial<Alive>) { (<any>Object).assign(this, init); }
    public createResponse() { return new AliveGetResponse(); }
    public getTypeName() { return 'Alive'; }
}

// @Route("/GetFolderAssocIdRequest", "POST")
export class GetFolderIdRequest extends StandardRequest implements IReturn<GetFolderIdResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetFolderIdRequest>) { super(init); (<any>Object).assign(this, init); }
    public SyncAccountId: number;
    public ServerFolderId: number;
    public DeviceType: VenueDeviceType;
    public createResponse() { return new GetFolderIdResponse(); }
    public getTypeName() { return 'GetFolderIdRequest'; }
}

// @Route("/GetDiscoveredFolders", "POST")
export class GetDiscoveredFolders extends StandardRequest implements IReturn<GetFolderIdResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetDiscoveredFolders>) { super(init); (<any>Object).assign(this, init); }
    public SyncAccountId: number;
    public ServerFolderIds: number[];
    public DeviceType: VenueDeviceType;
    public createResponse() { return new GetFolderIdResponse(); }
    public getTypeName() { return 'GetDiscoveredFolders'; }
}

// @Route("/GetFileRequest", "POST")
export class GetFileRequest extends StandardRequest implements IReturn<GetFileResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetFileRequest>) { super(init); (<any>Object).assign(this, init); }
    public FilePath: string;
    public createResponse() { return new GetFileResponse(); }
    public getTypeName() { return 'GetFileRequest'; }
}

// @Route("/static/{Filename*}")
export class GetStaticFile
{
    public constructor(init?:Partial<GetStaticFile>) { (<any>Object).assign(this, init); }
    public Filename: string;
}

export class GetUserInfo extends StandardRequest implements IReturn<GetUserInfoResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetUserInfo>) { super(init); (<any>Object).assign(this, init); }
    public Args: { [index:string]: number; };
    public createResponse() { return new GetUserInfoResponse(); }
    public getTypeName() { return 'GetUserInfo'; }
}

export class GetUserSettings extends StandardRequest implements IReturn<GetUserSettingsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetUserSettings>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new GetUserSettingsResponse(); }
    public getTypeName() { return 'GetUserSettings'; }
}

export class FindUserAccount implements IReturn<FindUserAccountResponse>
{
    public constructor(init?:Partial<FindUserAccount>) { (<any>Object).assign(this, init); }
    public SearchString: string;
    public createResponse() { return new FindUserAccountResponse(); }
    public getTypeName() { return 'FindUserAccount'; }
}

// @Route("/MessageStatisticsRequest", "POST")
export class MessageStatisticsRequest extends StandardRequest implements IReturn<RestLogListResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<MessageStatisticsRequest>) { super(init); (<any>Object).assign(this, init); }
    public MapiMessageId: string[];
    public createResponse() { return new RestLogListResponse(); }
    public getTypeName() { return 'MessageStatisticsRequest'; }
}

// @Route("/GetCachedMessages", "POST")
export class GetCachedMessages extends StandardRequest implements IReturn<GetCachedMessagesResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetCachedMessages>) { super(init); (<any>Object).assign(this, init); }
    public RemoteMessageIdList: string[];
    public createResponse() { return new GetCachedMessagesResponse(); }
    public getTypeName() { return 'GetCachedMessages'; }
}

// @Route("/ListNewsGroups", "POST")
export class ListNewsGroups extends StandardRequest implements IReturn<ListNewsGroupsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListNewsGroups>) { super(init); (<any>Object).assign(this, init); }
    public HostFilter: string;
    public createResponse() { return new ListNewsGroupsResponse(); }
    public getTypeName() { return 'ListNewsGroups'; }
}

export class RemoteValidationRequest extends StandardRequest implements IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<RemoteValidationRequest>) { super(init); (<any>Object).assign(this, init); }
    public Field: RemoteValidatorField;
    public Value: string;
}

// @Route("/Alive2", "GET")
export class Alive2 implements IReturn<AliveGetResponse>
{
    public constructor(init?:Partial<Alive2>) { (<any>Object).assign(this, init); }
    public createResponse() { return new AliveGetResponse(); }
    public getTypeName() { return 'Alive2'; }
}

// @Route("/Ping", "POST")
export class PingRequest extends StandardRequest implements IReturn<PingResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<PingRequest>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new PingResponse(); }
    public getTypeName() { return 'PingRequest'; }
}

export class SetCategoriesForValue extends StandardRequest implements IReturn<SetCategoriesForValueResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<SetCategoriesForValue>) { super(init); (<any>Object).assign(this, init); }
    public Keys: string[];
    public Value: string;
    public DataType: CategoryItemDataType;
    public createResponse() { return new SetCategoriesForValueResponse(); }
    public getTypeName() { return 'SetCategoriesForValue'; }
}

// @Route("/ReprocessTransactionsForDevice", "POST")
export class ReprocessTransactionsForDevice extends StandardRequest implements IReturn<ReprocessTransactionsForDeviceResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ReprocessTransactionsForDevice>) { super(init); (<any>Object).assign(this, init); }
    public SpecificMailAccounts: string[];
    public createResponse() { return new ReprocessTransactionsForDeviceResponse(); }
    public getTypeName() { return 'ReprocessTransactionsForDevice'; }
}

// @Route("/RestLogListRequest", "POST")
export class RestLogListRequest extends StandardRequest implements IReturn<RestLogListResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<RestLogListRequest>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new RestLogListResponse(); }
    public getTypeName() { return 'RestLogListRequest'; }
}

// @Route("/GetSequence", "POST")
export class GetSequence extends StandardRequest implements IReturn<GetSequenceResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetSequence>) { super(init); (<any>Object).assign(this, init); }
    public SequenceName: string;
    public Type: GetSequenceType;
    public createResponse() { return new GetSequenceResponse(); }
    public getTypeName() { return 'GetSequence'; }
}

export class GetOptions extends StandardRequest implements IReturn<GetOptionsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetOptions>) { super(init); (<any>Object).assign(this, init); }
    public CacheKey: string;
    public createResponse() { return new GetOptionsResponse(); }
    public getTypeName() { return 'GetOptions'; }
}

// @Route("/GetAccountRecomendations", "POST")
export class GetAccountCreationResultsRequest extends StandardRequest implements IReturn<GetAccountCreationResultsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetAccountCreationResultsRequest>) { super(init); (<any>Object).assign(this, init); }
    public Type: AccountCreationReportType;
    public createResponse() { return new GetAccountCreationResultsResponse(); }
    public getTypeName() { return 'GetAccountCreationResultsRequest'; }
}

// @Route("/InsertWizardAccount", "POST")
export class InsertWizardAccount extends StandardRequest implements IReturn<InsertWizardAccountResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<InsertWizardAccount>) { super(init); (<any>Object).assign(this, init); }
    public FirstName: string;
    public LastName: string;
    public AccountType: string;
    public NumberOfEmailAccounts: string;
    public EmailProblems: string[];
    public createResponse() { return new InsertWizardAccountResponse(); }
    public getTypeName() { return 'InsertWizardAccount'; }
}

// @Route("/UpdateWizardAccount", "POST")
export class UpdateWizardAccount extends StandardRequest implements IReturn<UpdateWizardAccountResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<UpdateWizardAccount>) { super(init); (<any>Object).assign(this, init); }
    public Id: number;
    public FirstName: string;
    public LastName: string;
    public AccountType: string;
    public NumberOfEmailAccounts: string;
    public EmailProblems: string[];
    public createResponse() { return new UpdateWizardAccountResponse(); }
    public getTypeName() { return 'UpdateWizardAccount'; }
}

// @Route("/ReadApplicationState", "POST")
export class ReadApplicationState extends StandardRequest implements IReturn<ReadApplicationStateResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ReadApplicationState>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new ReadApplicationStateResponse(); }
    public getTypeName() { return 'ReadApplicationState'; }
}

// @Route("/CreateApplicationState", "POST")
export class CreateApplicationState extends StandardRequest implements IReturn<CreateApplicationStateResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<CreateApplicationState>) { super(init); (<any>Object).assign(this, init); }
    public Input: ApplicationStateDto[];
    public createResponse() { return new CreateApplicationStateResponse(); }
    public getTypeName() { return 'CreateApplicationState'; }
}

export class AddCategories extends StandardRequest implements IReturn<AddCategoriesResponse>, IStandardRequest, ICacheRequest, IAddCategories
{
    public constructor(init?:Partial<AddCategories>) { super(init); (<any>Object).assign(this, init); }
    public Categories: string[];
    public Type: CategoryItemType;
    public createResponse() { return new AddCategoriesResponse(); }
    public getTypeName() { return 'AddCategories'; }
}

export class AddCategoryItem extends StandardRequest implements IReturn<AddCategoryItemResponse>, IStandardRequest, ICacheRequest, IAddCategoryItem
{
    public constructor(init?:Partial<AddCategoryItem>) { super(init); (<any>Object).assign(this, init); }
    public Category: string;
    public Value: string;
    public Type: CategoryItemType;
    public DataType: CategoryItemDataType;
    public Rank: number;
    public createResponse() { return new AddCategoryItemResponse(); }
    public getTypeName() { return 'AddCategoryItem'; }
}

export class AddCategoryItems extends StandardRequest implements IReturn<AddCategoryItemsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<AddCategoryItems>) { super(init); (<any>Object).assign(this, init); }
    public Items: AddCategoryItem[];
    public createResponse() { return new AddCategoryItemsResponse(); }
    public getTypeName() { return 'AddCategoryItems'; }
}

export class DeleteCategory extends StandardRequest implements IReturn<DeleteCategoryResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<DeleteCategory>) { super(init); (<any>Object).assign(this, init); }
    public CategoryId: string;
    public createResponse() { return new DeleteCategoryResponse(); }
    public getTypeName() { return 'DeleteCategory'; }
}

export class ChangeCategoryItems extends StandardRequest implements IReturn<ChangeCategoryItemsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ChangeCategoryItems>) { super(init); (<any>Object).assign(this, init); }
    public Items: CdCategoryItem[];
    public createResponse() { return new ChangeCategoryItemsResponse(); }
    public getTypeName() { return 'ChangeCategoryItems'; }
}

export class DeleteCategoryItem extends StandardRequest implements IReturn<DeleteCategoryItemResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<DeleteCategoryItem>) { super(init); (<any>Object).assign(this, init); }
    public Id: number;
    public createResponse() { return new DeleteCategoryItemResponse(); }
    public getTypeName() { return 'DeleteCategoryItem'; }
}

export class EditCategoryItem extends StandardRequest implements IReturn<EditCategoryItemResponse>, IStandardRequest, ICacheRequest, IEditCategoryItem
{
    public constructor(init?:Partial<EditCategoryItem>) { super(init); (<any>Object).assign(this, init); }
    public Id: number;
    public Category: string;
    public Value: string;
    public Type: CategoryItemType;
    public DataType: CategoryItemDataType;
    public Rank: number;
    public createResponse() { return new EditCategoryItemResponse(); }
    public getTypeName() { return 'EditCategoryItem'; }
}

export class EditCategoryItems extends StandardRequest implements IReturn<EditCategoryItemsResponse>, IStandardRequest, ICacheRequest, IEditCategoryItems
{
    public constructor(init?:Partial<EditCategoryItems>) { super(init); (<any>Object).assign(this, init); }
    public EditRequests: EditCategoryItem[];
    public createResponse() { return new EditCategoryItemsResponse(); }
    public getTypeName() { return 'EditCategoryItems'; }
}

export class ListCategoryItems extends StandardRequest implements IReturn<ListCategoryItemsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListCategoryItems>) { super(init); (<any>Object).assign(this, init); }
    public Category: string;
    public Options: string;
    public createResponse() { return new ListCategoryItemsResponse(); }
    public getTypeName() { return 'ListCategoryItems'; }
}

export class ListCategoryItemsClean extends StandardRequest implements IReturn<ListCategoryItemsCleanResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListCategoryItemsClean>) { super(init); (<any>Object).assign(this, init); }
    public Category: string;
    public TypeOptions: CategoryItemTypeOptions;
    public DataTypeOptions: CategoryItemDataTypeOptions;
    public createResponse() { return new ListCategoryItemsCleanResponse(); }
    public getTypeName() { return 'ListCategoryItemsClean'; }
}

export class ListCategoryItemsAdvanced extends StandardRequest implements IReturn<ListCategoryItemsAdvancedResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListCategoryItemsAdvanced>) { super(init); (<any>Object).assign(this, init); }
    public Category: string;
    public Offset: number;
    public Max: number;
    public Options: string;
    public TagList: string;
    public createResponse() { return new ListCategoryItemsAdvancedResponse(); }
    public getTypeName() { return 'ListCategoryItemsAdvanced'; }
}

export class ListChartData extends StandardRequest implements IReturn<ListChartDataResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListChartData>) { super(init); (<any>Object).assign(this, init); }
    public Query: ChartDataQuerys;
    public createResponse() { return new ListChartDataResponse(); }
    public getTypeName() { return 'ListChartData'; }
}

export class AddCookbook extends StandardRequest implements IReturn<AddCookbookResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<AddCookbook>) { super(init); (<any>Object).assign(this, init); }
    public CookbookTemplateId: string;
    public Force: boolean;
    public Metadata: AddOrEditRecipeDto;
    public createResponse() { return new AddCookbookResponse(); }
    public getTypeName() { return 'AddCookbook'; }
}

export class UpdateCookbook extends StandardRequest implements IReturn<UpdateCookbookResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<UpdateCookbook>) { super(init); (<any>Object).assign(this, init); }
    public CookbookId: string;
    public CookbookTemplateId: string;
    public Metadata: AddOrEditRecipeDto;
    public createResponse() { return new UpdateCookbookResponse(); }
    public getTypeName() { return 'UpdateCookbook'; }
}

export class ListCookbookTemplates extends StandardRequest implements IReturn<ListCookbookTemplatesResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListCookbookTemplates>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new ListCookbookTemplatesResponse(); }
    public getTypeName() { return 'ListCookbookTemplates'; }
}

export class GetCookbookTemplate extends StandardRequest implements IReturn<GetCookbookTemplateResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetCookbookTemplate>) { super(init); (<any>Object).assign(this, init); }
    public CookbookTemplateId: string;
    public createResponse() { return new GetCookbookTemplateResponse(); }
    public getTypeName() { return 'GetCookbookTemplate'; }
}

export class ListCookbooks extends StandardRequest implements IReturn<ListCookbooksResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListCookbooks>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new ListCookbooksResponse(); }
    public getTypeName() { return 'ListCookbooks'; }
}

export class GetCookbook extends StandardRequest implements IReturn<GetCookbookResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetCookbook>) { super(init); (<any>Object).assign(this, init); }
    public CookbookId: string;
    public createResponse() { return new GetCookbookResponse(); }
    public getTypeName() { return 'GetCookbook'; }
}

export class DeleteCookbook extends StandardRequest implements IReturn<DeleteCookbookResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<DeleteCookbook>) { super(init); (<any>Object).assign(this, init); }
    public CookbookId: string;
    public createResponse() { return new DeleteCookbookResponse(); }
    public getTypeName() { return 'DeleteCookbook'; }
}

export class ListGroupItems extends StandardRequest implements IReturn<ListGroupItemsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListGroupItems>) { super(init); (<any>Object).assign(this, init); }
    public UserCategory: string;
    public Take: number;
    public Skip: number;
    public Total: number;
    public OrderByDescending: boolean;
    public OrderBy: OrderByTypes;
    public createResponse() { return new ListGroupItemsResponse(); }
    public getTypeName() { return 'ListGroupItems'; }
}

// @Route("/AddRecipe", "POST")
export class AddARecipe extends StandardRequest implements IReturn<AddRecipeResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<AddARecipe>) { super(init); (<any>Object).assign(this, init); }
    public Type: RecipeTypes;
    public RecipeId: string;
    public NoVenues: boolean;
    public CriteriaJson: string;
    public VenueListJson: string;
    public ShortAction: EventPostActionDto;
    public Criteria: RecipeCriteria;
    public createResponse() { return new AddRecipeResponse(); }
    public getTypeName() { return 'AddARecipe'; }
}

// @Route("/DeleteRecipe", "POST")
export class DeleteRecipe extends StandardRequest implements IReturn<DeleteRecipeResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<DeleteRecipe>) { super(init); (<any>Object).assign(this, init); }
    public DeletedVenues: VenueBlock[];
    public RecipeId: string;
    public ShortAction: EventPostActionDto;
    public RunAsync: boolean;
    public createResponse() { return new DeleteRecipeResponse(); }
    public getTypeName() { return 'DeleteRecipe'; }
}

// @Route("/ModifyRecipe", "POST")
export class ModifyRecipe extends StandardRequest implements IReturn<ModifyRecipeResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ModifyRecipe>) { super(init); (<any>Object).assign(this, init); }
    public RecipeId: string;
    public Type: RecipeTypes;
    public Criteria: RecipeCriteria;
    public CriteriaJson: string;
    public VenueListJson: string;
    public FolderIdsToProcess: string[];
    public NewVenues: VenueBlock[];
    public ExistingVenues: VenueBlock[];
    public DeletedVenues: VenueBlock[];
    public ChangedVenues: VenueBlock[];
    public createResponse() { return new ModifyRecipeResponse(); }
    public getTypeName() { return 'ModifyRecipe'; }
}

// @Route("/ListRecipe", "POST")
export class ListRecipe extends StandardRequest implements IReturn<ListRecipeResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListRecipe>) { super(init); (<any>Object).assign(this, init); }
    public RecipeId: string;
    public SpecificMailAccounts: string[];
    public createResponse() { return new ListRecipeResponse(); }
    public getTypeName() { return 'ListRecipe'; }
}

export class MakeRecipeCriteria extends StandardRequest implements IReturn<MakeRecipeCriteriaResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<MakeRecipeCriteria>) { super(init); (<any>Object).assign(this, init); }
    public Data: AddOrEditRecipeDto;
    public Cookbook: AddOrEditRecipeDto;
    public createResponse() { return new MakeRecipeCriteriaResponse(); }
    public getTypeName() { return 'MakeRecipeCriteria'; }
}

// @Route("/2.0/AddOrUpdateRecipeTemplate")
export class AddOrUpdateCdRecipeTemplate extends StandardRequest implements IReturn<AddOrUpdateCdRecipeTemplateResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<AddOrUpdateCdRecipeTemplate>) { super(init); (<any>Object).assign(this, init); }
    public Template: CdRecipeTemplate;
    public createResponse() { return new AddOrUpdateCdRecipeTemplateResponse(); }
    public getTypeName() { return 'AddOrUpdateCdRecipeTemplate'; }
}

// @Route("/2.0/DeleteRecipeTemplate")
export class DeleteCdRecipeTemplate extends StandardRequest implements IReturn<DeleteCdRecipeTemplateResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<DeleteCdRecipeTemplate>) { super(init); (<any>Object).assign(this, init); }
    public TemplateId: string;
    public createResponse() { return new DeleteCdRecipeTemplateResponse(); }
    public getTypeName() { return 'DeleteCdRecipeTemplate'; }
}

// @Route("/2.0/GetRecipeTemplate")
export class GetCdRecipeTemplate extends StandardRequest implements IReturn<GetCdRecipeTemplateResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetCdRecipeTemplate>) { super(init); (<any>Object).assign(this, init); }
    public TemplateId: string;
    public createResponse() { return new GetCdRecipeTemplateResponse(); }
    public getTypeName() { return 'GetCdRecipeTemplate'; }
}

// @Route("/2.0/ListRecipeTemplates")
export class ListCdRecipeTemplates extends StandardRequest implements IReturn<ListCdRecipeTemplatesResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListCdRecipeTemplates>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new ListCdRecipeTemplatesResponse(); }
    public getTypeName() { return 'ListCdRecipeTemplates'; }
}

export class GetStatistics extends StandardRequest implements IReturn<GetStatisticsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetStatistics>) { super(init); (<any>Object).assign(this, init); }
    public EmailAddresses: string[];
    public createResponse() { return new GetStatisticsResponse(); }
    public getTypeName() { return 'GetStatistics'; }
}

export class GetTestEvents extends StandardRequest implements IReturn<GetTestEventsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetTestEvents>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new GetTestEventsResponse(); }
    public getTypeName() { return 'GetTestEvents'; }
}

export class ListCategories extends StandardRequest implements IReturn<ListCategoriesResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListCategories>) { super(init); (<any>Object).assign(this, init); }
    public TypeOptions: CategoryItemTypeOptions;
    public SourceOptions: CategoryItemSourceOptions;
    public IncludeStatistics: boolean;
    public createResponse() { return new ListCategoriesResponse(); }
    public getTypeName() { return 'ListCategories'; }
}

export class ReassignCategory extends StandardRequest implements IReturn<ReassignCategoryResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ReassignCategory>) { super(init); (<any>Object).assign(this, init); }
    public Id: number;
    public Reset: boolean;
    public NewCategory: string;
    public createResponse() { return new ReassignCategoryResponse(); }
    public getTypeName() { return 'ReassignCategory'; }
}

export class ReassignCategoryList extends StandardRequest implements IReturn<ReassignCategoryListResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ReassignCategoryList>) { super(init); (<any>Object).assign(this, init); }
    public RequestToChange: ReassignCategoryItem[];
    public createResponse() { return new ReassignCategoryListResponse(); }
    public getTypeName() { return 'ReassignCategoryList'; }
}

export class GetCategoryItem extends StandardRequest implements IReturn<GetCategoryItemResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetCategoryItem>) { super(init); (<any>Object).assign(this, init); }
    public Id: number;
    public createResponse() { return new GetCategoryItemResponse(); }
    public getTypeName() { return 'GetCategoryItem'; }
}

// @Route("/RunService", "POST")
export class RunService extends StandardRequest implements IReturn<RunServiceResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<RunService>) { super(init); (<any>Object).assign(this, init); }
    public Arg1: string;
    public Arg2: string;
    public Enum1: string;
    public Enum2: string;
    public Type: ServicesToRun;
    public createResponse() { return new RunServiceResponse(); }
    public getTypeName() { return 'RunService'; }
}

// @Route("/CreateUserMessage", "POST")
export class CreateUserMessage extends StandardRequest implements IReturn<CreateUserMessageResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<CreateUserMessage>) { super(init); (<any>Object).assign(this, init); }
    public DatePosted: string;
    public DateToDisplay: string;
    public Type: UserTypeTypes;
    public SubType: UserTypesSubTypes;
    public Visible: Tristate;
    public Minimized: Tristate;
    public Dismissed: Tristate;
    public Message: string;
    public FieldsJson: string;
    public TagsJson: string;
    public RecordId: string;
    public createResponse() { return new CreateUserMessageResponse(); }
    public getTypeName() { return 'CreateUserMessage'; }
}

// @Route("/ReadUserMessage", "POST")
export class ReadUserMessage extends StandardRequest implements IReturn<ReadUserMessageResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ReadUserMessage>) { super(init); (<any>Object).assign(this, init); }
    public Id: number;
    public RecordId: string;
    public DatePosted: string;
    public DateToDisplay: string;
    public Type: UserTypeTypes;
    public SubType: UserTypesSubTypes;
    public Visible: Tristate;
    public Minimized: Tristate;
    public Dismissed: Tristate;
    public Message: string;
    public FieldsJson: string;
    public TagsJson: string;
    public createResponse() { return new ReadUserMessageResponse(); }
    public getTypeName() { return 'ReadUserMessage'; }
}

// @Route("/UpdateUserMessage", "POST")
export class UpdateUserMessage extends StandardRequest implements IReturn<UpdateUserMessageResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<UpdateUserMessage>) { super(init); (<any>Object).assign(this, init); }
    public Id: number;
    public RecordId: string;
    public DatePosted: string;
    public DateToDisplay: string;
    public Type: UserTypeTypes;
    public SubType: UserTypesSubTypes;
    public Visible: Tristate;
    public Minimized: Tristate;
    public Dismissed: Tristate;
    public Message: string;
    public FieldsJson: string;
    public TagsJson: string;
    public createResponse() { return new UpdateUserMessageResponse(); }
    public getTypeName() { return 'UpdateUserMessage'; }
}

// @Route("/DeleteUserMessage", "POST")
export class DeleteUserMessage extends StandardRequest implements IReturn<DeleteUserMessageResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<DeleteUserMessage>) { super(init); (<any>Object).assign(this, init); }
    public Rid: number;
    public createResponse() { return new DeleteUserMessageResponse(); }
    public getTypeName() { return 'DeleteUserMessage'; }
}

// @Route("/ListDiscoveredNames", "POST")
export class ListEmailContacts extends StandardRequest implements IReturn<ListEmailContactsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListEmailContacts>) { super(init); (<any>Object).assign(this, init); }
    public Source: ContactSource;
    public Direction: CollectDirection;
    public Level: CollectLevel;
    public createResponse() { return new ListEmailContactsResponse(); }
    public getTypeName() { return 'ListEmailContacts'; }
}

// @Route("/ListDiscoveredEmailDomains", "POST")
export class ListDiscoveredEmailDomains extends StandardRequest implements IReturn<ListDiscoveredEmailDomainsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListDiscoveredEmailDomains>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new ListDiscoveredEmailDomainsResponse(); }
    public getTypeName() { return 'ListDiscoveredEmailDomains'; }
}

// @Route("/ListDiscoveredUserGroups", "POST")
export class ListUserGroups extends StandardRequest implements IReturn<ListUserGroupsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ListUserGroups>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new ListUserGroupsResponse(); }
    public getTypeName() { return 'ListUserGroups'; }
}

// @Route("/GetContactGroups", "POST")
export class GetContactGroups extends StandardRequest implements IReturn<GetContactGroupsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetContactGroups>) { super(init); (<any>Object).assign(this, init); }
    public Source: ContactSource;
    public createResponse() { return new GetContactGroupsResponse(); }
    public getTypeName() { return 'GetContactGroups'; }
}

// @Route("/AddVenues", "POST")
export class AddVenues extends StandardRequest implements IReturn<AddVenuesResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<AddVenues>) { super(init); (<any>Object).assign(this, init); }
    public AddedVenues: VenueBlock[];
    public createResponse() { return new AddVenuesResponse(); }
    public getTypeName() { return 'AddVenues'; }
}

// @Route("/DeleteVenue", "POST")
export class DeleteVenues extends StandardRequest implements IReturn<DeleteVenuesResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<DeleteVenues>) { super(init); (<any>Object).assign(this, init); }
    public RecipeId: string;
    public DeletedVenues: VenueBlock[];
    public createResponse() { return new DeleteVenuesResponse(); }
    public getTypeName() { return 'DeleteVenues'; }
}

// @Route("/ModifyVenue", "POST")
export class ModifyVenue extends StandardRequest implements IReturn<ModifyVenueResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<ModifyVenue>) { super(init); (<any>Object).assign(this, init); }
    public ModifiedVenue: VenueBlock;
    public createResponse() { return new ModifyVenueResponse(); }
    public getTypeName() { return 'ModifyVenue'; }
}

export class GetVenues extends StandardRequest implements IReturn<GetVenuesResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetVenues>) { super(init); (<any>Object).assign(this, init); }
    public RecipeId: string;
    public createResponse() { return new GetVenuesResponse(); }
    public getTypeName() { return 'GetVenues'; }
}

// @Route("/GetVenueItems", "POST")
export class GetVenueItems extends StandardRequest implements IReturn<GetVenueItemsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetVenueItems>) { super(init); (<any>Object).assign(this, init); }
    public Offset: number;
    public Limit: number;
    public RecipeIdList: string[];
    public VenueIdList: string[];
    public UserType: VenueDeviceType;
    public createResponse() { return new GetVenueItemsResponse(); }
    public getTypeName() { return 'GetVenueItems'; }
}

export class GetAllVenueItems extends StandardRequest implements IReturn<GetAllVenueItemsResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetAllVenueItems>) { super(init); (<any>Object).assign(this, init); }
    public VenueId: string;
    public Offset: number;
    public Max: number;
    public createResponse() { return new GetAllVenueItemsResponse(); }
    public getTypeName() { return 'GetAllVenueItems'; }
}

export class GetAllVenueItemsExtended extends StandardRequest implements IReturn<GetAllVenueItemsExtendedResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetAllVenueItemsExtended>) { super(init); (<any>Object).assign(this, init); }
    public VenueId: string;
    public Offset: number;
    public Max: number;
    public createResponse() { return new GetAllVenueItemsExtendedResponse(); }
    public getTypeName() { return 'GetAllVenueItemsExtended'; }
}

// @Route("/Collections")
export class GetVenueServerCollection extends StandardRequest implements IReturn<GetVenueServerCollectionResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<GetVenueServerCollection>) { super(init); (<any>Object).assign(this, init); }
    public Path: string;
    public Argument: string;
    public DeviceState: DeviceState;
    public CacheKey: string;
    public createResponse() { return new GetVenueServerCollectionResponse(); }
    public getTypeName() { return 'GetVenueServerCollection'; }
}

export class SearchInVenue extends StandardRequest implements IReturn<SearchInVenueResponse>, IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<SearchInVenue>) { super(init); (<any>Object).assign(this, init); }
    public VenueId: string;
    public SearchTerm: string;
    public Offset: number;
    public Max: number;
    public createResponse() { return new SearchInVenueResponse(); }
    public getTypeName() { return 'SearchInVenue'; }
}

export class MarkVenueItemsAsRead extends StandardRequest implements IStandardRequest, ICacheRequest
{
    public constructor(init?:Partial<MarkVenueItemsAsRead>) { super(init); (<any>Object).assign(this, init); }
    public VenueId: string;
}

// @Route("/ViewAccounts")
// @AutoQueryViewer(DefaultSearchField="UserAccountId", DefaultSearchText="", DefaultSearchType="=", Description="", Title="Accounts")
export class ViewAccounts extends QueryData<VenueMembership> implements IReturn<QueryResponse<VenueMembership>>
{
    public constructor(init?:Partial<ViewAccounts>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new QueryResponse<VenueMembership>(); }
    public getTypeName() { return 'ViewAccounts'; }
}

// @Route("/Alive4", "GET")
export class Alive4 implements IReturn<AliveGetResponse>
{
    public constructor(init?:Partial<Alive4>) { (<any>Object).assign(this, init); }
    public createResponse() { return new AliveGetResponse(); }
    public getTypeName() { return 'Alive4'; }
}

// @Route("/ViewDbSeqences")
// @AutoQueryViewer(Description="", Title="DB Sequences")
export class ViewSequences extends QueryDb_1<DbSequence> implements IReturn<QueryResponse<DbSequence>>
{
    public constructor(init?:Partial<ViewSequences>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new QueryResponse<DbSequence>(); }
    public getTypeName() { return 'ViewSequences'; }
}

// @Route("/System_Events")
// @AutoQueryViewer(DefaultFields="Id,Time,What,Src,Dest,RestCall,Url:30,JsonLen,MsgDescribe:5000", Title="Venue All System Events")
export class System_Events extends QueryDb_2<Command_History, Command_History_OverRide> implements IReturn<QueryResponse<Command_History_OverRide>>
{
    public constructor(init?:Partial<System_Events>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new QueryResponse<Command_History_OverRide>(); }
    public getTypeName() { return 'System_Events'; }
}

// @Route("/System_Query_Domain")
// @AutoQueryViewer(DefaultFields="", Title="Venue Queryed domains")
export class System_Query_Domain extends QueryDb_1<CategoryByDomainIab> implements IReturn<QueryResponse<CategoryByDomainIab>>
{
    public constructor(init?:Partial<System_Query_Domain>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new QueryResponse<CategoryByDomainIab>(); }
    public getTypeName() { return 'System_Query_Domain'; }
}

// @Route("/System_Events_MQ")
// @AutoQueryViewer(DefaultFields="Id,Time,Src,Dest,RestCall,Url:30,JsonLen,MsgDescribe:5000", DefaultSearchField="What", DefaultSearchText="MQ", DefaultSearchType="=", Title="Venue MQ Events")
export class System_Events_MQ extends QueryDb_2<Command_History, Command_History_OverRide> implements IReturn<QueryResponse<Command_History_OverRide>>
{
    public constructor(init?:Partial<System_Events_MQ>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new QueryResponse<Command_History_OverRide>(); }
    public getTypeName() { return 'System_Events_MQ'; }
}

// @Route("/System_Events_REST")
// @AutoQueryViewer(DefaultFields="Id,Time,Src,Dest,RestCall,Url:30,JsonLen,MsgDescribe:5000", DefaultSearchField="What", DefaultSearchText="REST", DefaultSearchType="=", Title="Venue Rest calls")
export class System_Events_REST extends QueryDb_2<Command_History, Command_History_OverRide> implements IReturn<QueryResponse<Command_History_OverRide>>
{
    public constructor(init?:Partial<System_Events_REST>) { super(init); (<any>Object).assign(this, init); }
    public createResponse() { return new QueryResponse<Command_History_OverRide>(); }
    public getTypeName() { return 'System_Events_REST'; }
}

