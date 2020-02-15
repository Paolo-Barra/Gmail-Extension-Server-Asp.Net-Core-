import { filter } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';
import { Injector, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '@shared/utils/local-storage.service';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindServiceProxyTyped, SoftErrorException, HardErrorException } from '@app/refind/shared/service-proxies/refind-service-proxy-typed';
import { IPortalOptions, DisplaySelectList } from './recipes.interfaces';
import { GetOptionsKey } from '@app/refind/shared/service-proxies/GetOptionExt';
import { RecipeDtoExt } from '@app/refind/shared/service-proxies/RecipeDtoExt';
import { GetOptionsExt } from '@app/refind/shared/service-proxies/GetOptionExt';
import { CdCategoryDtoExt } from '@app/refind/shared/service-proxies/CdCategoryDtoExt';
import { RefindToolsService } from '@app/refind/refind-tools.service';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import { RecipeWizardData } from './RecipeWizardData';
import { IStepperItem } from '@shared/stepper/stepper.component';
import { VenueListItemExt } from '@app/refind/shared/service-proxies/VenueListItemExt';
import { TreeviewItem, TreeviewConfig, TreeItem } from 'ngx-treeview';

@Injectable()
export class RecipeCreateOrEditComponentLogic {
    // Goal is to eliminate all any variables -
    CbRecipeTemplage: any;
    CombinedRecipeModels: any[] = [];
    CookbookRecipetemplate: any;
    ReciepeCnt: any;
    CurrentPage: any;
    CustomDomainList: any[] = [];
    recipeName: any;
    timeFrameStyle: any;

    CategoriesRecipeIncluded: any[] = [];                       // holds choices for checked included categorys in wizard page
    CategoriesRecipeExcluded: any[] = [];                       // holds choices for checked excluded categorys in wizard page

    newsGrouTreeConfig:TreeviewConfig;                          // wizard page news groups - config 
    newsGroupTreeData:TreeviewItem[];                           // wizard page news groups - data 
    newsGroupTreeSelected: number[];                            // wizard page news groups - selected

    private notify: any;
    private addedVenues: any[] = [];
    private marked: any;
    private cookbookRecipeTotalPages: any;
    private PreviousRecipeForNext: any;
    private previousRecipeCnt: any;
    private recipePageNum: any;
    private recipeNum: any;
    private Message: any;
    private containedRecipe: any;

    private IncludedRecipe: any;

    private AREYOUSURE = "Are you sure?";
    //searchTimeFrame: SearchTimeFrameHelper;
    private HeaderName: string;
    private timeFrame = "0: DateRangeByWeek";

    ShowrecipeCurrentPage = false;
    CurrentRecipePage: string;
    CurrentRecipe: string;
    //    FieldToSearch: RefindTypes.PortalOption[] = [];
    ValidationFailedShowErrorMsg: boolean;
    ValidationBlockAdvancePage: boolean;
    SummaryPageTitle: string;
    PageType: string;

    CurrentTemplatePage: Rt.CdRecipeTemplatePage;      // the Template page taken from Tempate.Page[x]
    CurrentCookbookTemplatePage: Rt.CdRecipeTemplatePage;        // the Cookbook Template page taken from Tempate.Page[x]
    Template: Rt.CdRecipeTemplate;                     // the currently selected Recipe Template
    CookBookTemplate: Rt.CdCookbookTemplate;           // the currently selected Cookbook Template
    Accounts: Rt.AccountDto[] = [];                    // the list of all email account for  this users
    DataSetList: IPortalOptions;                                // Holds the result of GetOptions REST call. These are used in the <recipe-wizard-fileds> and saved in the recipe
    DataSetObjectKeys: GetOptionsKey = new GetOptionsKey();
    DataSetObject: GetOptionsExt;

    WizardData: RecipeWizardData;

    DataValuesServerCollection: Rt.VenueServerCollection;

    CookbookMode = false;                              // if  true then we are working with cookbooks, if false working with recipes
    EditMode = false;                                  // if true we are editing a recipe or a cookbook
    ShowButtons = "";
    SummaryMode = false;                               // if we should display a summary page
    RecipeListUrl: string;                                      // the url of this page that list recipes
    RecommendationUrl: string;                                      // the url of this page that list recipes
    DisplaySectionTitle: string;                                // A visual description of the type of screen ie: Add a Reipce, Edit a Recipe etc.
    DisplaySectionType: string;                                 // A visual description of the recipe to be added

    WizardPageNumber = 0;
    RecipeDto: RecipeDtoExt;

    // the loaded recipes

    // Included Excluded - Checkbox data
    CategoriesDataSrv: Array<Rt.CdCategoryDto> = [];   // An Array of all CdCategoryDto's loaded by a REST Call

    CheckBoxTabVisible: string;                                 // Determines which tab is currently selected in in <display-wizard-summary> or <display-wizard-fields> component
    IsExcludedTabVisible: boolean;                              // Determines is the tab Excluded tab is displayed  in <display-wizard-summary> or <display-wizard-fields> component
    IsIncludedTabVisible: boolean;                              // Determines is the tab Included tab is displayed  in <display-wizard-summary> or <display-wizard-fields> component
    ViewMode: string;                                           // contains Included or Excluded depending on the wizard field list of checkbox values
    UseProgressGauge: boolean;                                  // show we display progress indicate guage
    ProgressGuageSteps: IStepperItem[] = [];
    private UserAccountId: string;                              // the UserAccountId used in our SyncService for this user
    private theUrlTemplateId: string;                           // a string that contains the number of the Template in use
    private theUrlItemId: string;                               // the parameter itemId that was passed as an argument to this paage
    private theUrlType: string;                                 // the parameter type that was passed as an argument to this page.  Can be 'recipe' or 'cookbook'
    private SelectedEmailAccount: string;                       // the primary email account to be used
    private SelectedEmailIndex: number;                         // the index of the mail account to be used
    private SelectedMailAccountId: string;
    private SelectedSyncAccountId: number;

    private pActionJson: string;
    private pAction: Rt.EventPostActionDto;

    

    private cookBookModel: {};
    private TotalPages = 0;


    public areCookBooksEnabled(): boolean { return false; }
    public isFieldDebugMode(): boolean {
        return false;
    }
    //
    public isCookBookMode(): boolean { return this.CookbookMode === true; }
    public isNotCookBookMode(): boolean { return this.CookbookMode === false; }

    public isSummaryPage(): boolean { return this.CurrentPage === 'Summary' || this.SummaryMode == true; }
    public isNotSummaryPage(): boolean { return !this.isSummaryPage(); }


    public isFirstPage(): boolean { return this.CurrentPage === 'Page1'; }
    //    public isCancelMode(): boolean { return (this.CurrentPage === 'Summary' && this.EditMode === true) }
    public isCancelMode(): boolean { return false; }
    //    @ViewChild("recipeNameField") theRecipeNameField : ElementRef;
    constructor(
        protected injector: Injector,
        protected _activatedRoute: ActivatedRoute,
        protected _location: Location,
        protected refindServiceProxyTyped: RefindServiceProxyTyped,
        protected router: Router,
        protected _localstorageService: LocalStorageService,
        protected tools: RefindToolsService,
        protected dataService: RefindUserDataService,
    ) {

    }
    // @ViewChildren('recipeNameField') vc;
    // ngAfterViewInit() {vc.first.nativeElement.focus()}

    async ngOnInit() {

        // these are needed to stop runtime errors due to race with async dataloads
        // also they are cleared between reloads of the form with different arguments
        this.WizardData = new RecipeWizardData();
        this.Template = new Rt.CdRecipeTemplate();
        this.CurrentTemplatePage = new Rt.CdRecipeTemplatePage();
        this.CookBookTemplate = new Rt.CdCookbookTemplate();
        this.UserAccountId = this.dataService.getUserAccountId();
        this.ValidationFailedShowErrorMsg = this.ValidationBlockAdvancePage = false;

        this.refindServiceProxyTyped.Init();

        // Transfer urls to variables
        this.theUrlType = this._activatedRoute.snapshot.queryParams["type"];
        this.theUrlTemplateId = this._activatedRoute.snapshot.queryParams["TemplateId"];
        this.theUrlItemId = this._activatedRoute.snapshot.queryParams["itemId"];
        this.SummaryMode = this.tools.stringIsTrue(this._activatedRoute.snapshot.queryParams["summary"]);
        this.pActionJson = this._activatedRoute.snapshot.queryParams["pAction"];
        this.pAction = this.pActionJson ? JSON.parse(this.pActionJson) : "";

        this.CookbookMode = this.theUrlType && this.theUrlType.toLowerCase() === 'cookbooks';

        this.RecipeListUrl = "app/main/recipes";            // the page that lists the recipes. This is where the recipes are edited.
        this.RecommendationUrl = "app/main/recommend";


        this.ViewMode = "Included";
        this.CurrentPage = "Page1";

        this.SelectedEmailIndex = 0;
        this.WizardPageNumber = 0;
        await this.loadEmailAccountsInUse();
        this.selectActiveMailAccount(this.SelectedEmailIndex);

        this.CookbookMode ? this.cookBookSetup() : this.recipeSetup();
    }
    ngOnDestroy() {
        // removed the progress guage so it does not show momentarly
        this.UseProgressGauge = false;
    }

    onFilterChange(value: string) {
        console.log('filter:', value);
    }
    


    private async cookBookSetup() {

        this.UseProgressGauge = (this.EditMode) ? false : true;
        // if itemId is set then we are in editmode. ItemId is the ittem we are editing
        if (this.theUrlItemId) {
            // edit an existing recipe
            this.DisplaySectionTitle = "Edit a Cookbook";
            this.UseProgressGauge = false;
            this.EditMode = true;
            await this.loadCookbookTempate(this.theUrlTemplateId);
            await this.loadCookbook(this.theUrlItemId);
            await this.loadGetOptions();
            this.loadCurrentTemplatePage();
            this.setupWizardDefaultValues(true);
        } else {
            // create a new recipe
            this.DisplaySectionTitle = "Add a Cookbook";
            this.EditMode = false;
            this.UseProgressGauge = true;

            await this.loadCookbookTempate(this.theUrlTemplateId);
            await this.loadCategories();
            await this.loadGetOptions();
            this.loadCurrentTemplatePage();
            this.setupWizardDefaultValues(false);
        }
        console.log(`RCEL:Header=${this.DisplaySectionTitle}:TemplateId=${this.theUrlTemplateId}:ItemId=${this.theUrlItemId}:`);
    }

    private async recipeSetup() {
        // if itemId is set then we are in editmode. ItemId is the ittem we are editing
        if (this.theUrlItemId) {

            if (this.SummaryMode) {
                this.DisplaySectionTitle = "Review Recipe";
                this.EditMode = true;
                this.UseProgressGauge = false;
                this.ShowButtons = "ce";
            } else {
                this.DisplaySectionTitle = "Edit a Recipe";
                // edit an existing recipe
                this.EditMode = true;
                this.ShowButtons = "cnb";
                this.UseProgressGauge = true;
            }

            await this.loadCategories();
            await this.loadGetOptions();

            // Now that we have the default values setup load the custom values from the recipe we are editing
            await this.loadRecipe(this.theUrlItemId);
            if (!this.theUrlTemplateId) {
                this.theUrlTemplateId = this.RecipeDto.TemplateId;
            }

            await this.loadRecipeTemplate(this.theUrlTemplateId);


            this.setupWizardDefaultValues(true);
            this.loadCurrentTemplatePage();
 
        } else {
            // create a new recipe
            this.DisplaySectionTitle = "Add a Recipe";
            this.ShowButtons = "cnb";
            this.UseProgressGauge = true;
            this.EditMode = false;
            this.RecipeDto = new RecipeDtoExt(new Rt.AddOrEditRecipeDto());

            await this.loadGetOptions();
            await this.loadRecipeTemplate(this.theUrlTemplateId);

            await this.loadCategories();
            this.loadCurrentTemplatePage();
            this.setupWizardDefaultValues(false);

        }
        console.log(`RCEL:Header=${this.DisplaySectionTitle}:TemplateId=${this.theUrlTemplateId}:ItemId=${this.theUrlItemId}:`);
    }

    public getDefaultRecipeName(templateId: string): string {
        switch (templateId) {
            case "Organize By Category":            return "By Category";
            case "I_MyCompany":                     return "By CoWorker";
            case "I_VenueTreeAllContacts":          return "By Address Book";
            case "I_CatFromCibtacts":               return "By Contacts";
            case "I_VenueTreeDomain":               return "By Email Domain";
            case "I_CatFromFolders":                return "By Existing Folder";
            case "I_VenueTreeContactGroup":         return "By Contact Group";
            case "I_Industry":                      return "By Industry";
            case "I_Keywords":                      return "By Keyword";
            case "I_NewsGroup_Solicited":           return "By NewsGroup";
            case "I_VenueTreeReceived":             return "By Received Users";
            case "I_VenueTreeSent":                 return "By Sent Users";
            case "I_VenueTreeTime":                 return "By TimeFrame";
            case "I_CommonDeskPriorityInbox":       return "Priority Inbox";
            case "I_GmailLikeInbox":                return "Gmail Line Inbox";
            case "I_InboxZeroInbox":                return "Inbox Zero";
            case "I_OutlookLikeInbox":              return "Outlook Inbox";
            case "ISaneBoxLikeInbox":               return "SaneBox Like Inbox";
            case "I_VenueTreeCustomDomain":         return "By Custom Domain";
            default:                                return "";
        }

    }
    

    setNewsGroupTreeData(data:Rt.VenueServerCollection,checkList:string[])   {

            this.newsGrouTreeConfig =  TreeviewConfig.create({
            hasAllCheckBox: false,
            hasFilter: true,
            hasCollapseExpand: false,
            decoupleChildFromParent: false,
            // maxHeight: 600
          });
          // create a list of unique group names 
          let groupList = Array.from(new Set(data.ItemNames.map((item: string) => {
              let pa = item.split("-").map(row => row.trim());
              return pa[0];
          })));

          let tvlist: Array<TreeviewItem> = [];

          // add a TreeviewItem for each unique group name 
          for(let gName of groupList) {
              // collect all the rows for this  group 
            let selectedRow = data.Items.filter(aItems => {
                if(aItems.Name.includes(gName)) {
                    return aItems;
                }
            });
            // build a list of TreeItem's of the childern 
            let chlist: Array<TreeItem> = [];
            for(let vli of selectedRow) {

                let isChecked = checkList.includes(vli.Key);
                let g = vli.Name.split("-").map(row => row.trim())[1];
                let mitem = {
                    text: g,
                    value: +vli.Key,
                    collapsed: false,
                    checked: isChecked,
                } as TreeItem;
                chlist.push(mitem);
            }

            // build the main TreeviewItem that incldues the children list 
            let mitem = new TreeviewItem({
                text: gName,
                value: "",
                collapsed: false,
                checked: true,
                children: chlist
            }
            );
            tvlist.push(mitem);

        }
        this.newsGroupTreeData =  tvlist;
    }
    getCheckBoxData(): CdCategoryDtoExt[] {
        return this.WizardData.CheckboxDataSet;
    }

    public async setupWizardDefaultValues(isEditMode: boolean) {

        // the variables DataSetList,DataValues and CollectionData are dictionarys where the html can read the default values
        //
        this.tools.assert(this.DataSetObject, `RCEL:setupWizardDefaultValues:DataSetObject==null`);

        try {

            this.WizardData = isEditMode ?
                this.RecipeDto.toWizardData() :
                this.RecipeDto.templateToWizardData(this.Template);

            // Validate all data was loaded correctly by RecipeDto.toWizardData
            this.tools.assert(this.WizardData, `RCEL:setupWizardDefaultValues:WizardData==null`);
            this.tools.assert(this.WizardData.DataValues, `RCEL:setupWizardDefaultValues:DataValues==null`);
            this.tools.assert(this.WizardData.CollectionData, `RCEL:setupWizardDefaultValues:CollectionData==null`);

            // When we are on edit mode, these values come from the existing dto
            // For new recipes, we need to provide some defaults since the template doesn't know what these values should be
            if (isEditMode === false) {


                this.WizardData.DataValues.Name = this.getDefaultRecipeName(this.Template.TemplateId);

                // select inbox and sent items
                this.WizardData.DataValues.FolderSearch = this.DataSetObject.GetList(this.DataSetObjectKeys.FolderSearch)[2].Value;

                // select the email account
                this.WizardData.DataValues.MailAccounts = this.Accounts[this.SelectedEmailIndex].MailAccountId;
                this.WizardData.CollectionData.MailAccounts = [this.Accounts[this.SelectedEmailIndex].MailAccountId];
                this.WizardData.CollectionData.MailFolders = ["INBOX"];
            } else {

                // We need to find the selected mail account and set the mail account id as the data model for the dropdown

                let dtoMid = this.WizardData.CollectionData.MailAccounts[0];
                let selectedDtoAccount = this.Accounts.find(a =>
                    a.MailAccountId === dtoMid
                );

                if (!selectedDtoAccount) {
                    // Did not find the account the existing recipe is referencing
                    // TODO: This is a critical error, how to handle it?
                    this.tools.error(`Did not find account ${dtoMid} for recipe ${this.WizardData.DataValues.Name}`);
                }
                this.WizardData.DataValues.MailAccounts = selectedDtoAccount.MailAccountId;
            }

            this.setupWizardRemoteOptions(this.Template, this.WizardData, isEditMode);
            this.populateWizardProgressSteps();
            this.calulateCheckMarks();
        } catch (e) {
            this.tools.warn("RCEL:setupWizardDefaultValues:Error=" + e);
        }
    }

    private getServerCollectionArgument(tComp: Rt.CdRecipeTemplateComponent): string {

        // Currently we only have these cases
        // The argument is a mail account, in this case we return the selected mail account instead of the arg name
        if (tComp.OptionsArgument === "Collections.MailAccounts") {
            return this.WizardData.DataValues.MailAccounts;
        }

        // If the argument is not a mail account, we need to return the value as it is on the template with no replacement
        if (tComp.OptionsArgument !== "") {
            return tComp.OptionsArgument;
        }

        // If none of the above, the argument is an empty string
        return "";
    }

    private setupWizardRemoteOptions(template: Rt.CdRecipeTemplate, wizardData: RecipeWizardData, isEditMode: boolean) {

        // parses collections for MailAccounts,MailFolders,NewsGroups
        template.Pages.forEach(page => {
            page.Components.filter(r => r.Widget.indexOf("_RemoteOptions") > 0).map(async (templateComponent) => {

                let key = templateComponent.Key;
                let sList = key.split('.');

                let optionArgument = this.getServerCollectionArgument(templateComponent);
                let collection = await this.refindServiceProxyTyped.GetVenueServerCollectionAsync(templateComponent.OptionsPath, optionArgument);

                this.tools.ifDebug();
                {
                    console.log(`RDE:RemoteOption:Key=[${key}]`);
                }

                if (!isEditMode) {
                    this.RecipeDto.Collections[sList[1]] = collection.Items.map(item => item.Key);
                }

                wizardData.RemoteCollectionData[sList[1]] = collection.Items.map(item => {

                    let theRow = new VenueListItemExt(item);

                    theRow.IsItemSelected = this.RecipeDto.Collections[sList[1]].indexOf(theRow.Key) > 0;

                    return theRow;
                });
                if(sList[1] === "NewsGroups") {

                    let  checkList = this.RecipeDto.Collections[sList[1]];
                    this.setNewsGroupTreeData(collection,checkList);
                }

            });
        });
    }

    private populateWizardProgressSteps() {

        // https://nigelotoole.github.io/progress-tracker/

        this.ProgressGuageSteps = [
            {
                active: false,
                completed: false,
                title: "Step 1",
                description: "Set name and basic settings"
            },
            {
                active: false,
                completed: false,
                title: "Step 2",
                description: "Select the email account"
            },
            {
                active: false,
                completed: false,
                title: "Step 3",
                description: "Filter users based on category"
            },
            {
                active: false,
                completed: false,
                title: "Step 4",
                description: "Verify and Save your selection"
            }
        ];

    }

    private async loadRecipe(itemId: string) {

        this.tools.assert(this.UserAccountId, `RCEL:loadRecipe:Invalid UserAccountId=${this.UserAccountId}:ItemId=${itemId} `);
        this.tools.assert(itemId, `RCEL:loadRecipe:Invalid ItemId`);
        try {
            let response = await this.refindServiceProxyTyped.ListRecipeAsync(itemId);
            if (response.Success) {
                this.RecipeDto = new RecipeDtoExt(response.TheRecipes[0]);
                this.SummaryPageTitle = this.RecipeDto.Values.TemplateName;
            }
        } catch (error) {
            this.tools.error("RCEL:loadRecipe:Error=" + error.Message);
        }
    }

    private async loadCookbook(itemId: string) {
        this.tools.assert(this.UserAccountId, `RCEL:loadCookbook=Invalid UserAccountId=${this.UserAccountId} `);
        this.tools.assert(this.theUrlItemId, `RCEL:loadCookbook=Invalid theUrlItemId=${this.theUrlItemId}`);

        this.IsIncludedTabVisible = false;
        this.IsExcludedTabVisible = false;

        try {
            let response = await this.refindServiceProxyTyped.GetCookbookAsync(this.theUrlItemId);
            if (response.Success) {
                let cookbook = response.Cookbook;
                this.WizardData.DataValues = this.RecipeDto.Values;
                this.CbRecipeTemplage = this.RecipeDto;
                this.CategoriesRecipeIncluded = this.CbRecipeTemplage.Metadata.Collections.Categories_Included,
                    this.CategoriesRecipeExcluded = this.CbRecipeTemplage.Metadata.Collections.Categories_Excluded;

                this.calculateIncludeExcludedHeaderSection();
            }
        } catch (error) {
            this.tools.error("RCEL:GetItems:GetCookbook:Error=" + error.Message);
        }
    }

    public nextButton() {

        // pages go from 0 to TotalPages
        // when your at total page you goto summary mode
        if (this.ValidationBlockAdvancePage) {
            this.tools.errorFast("Please make required changes before proceeding.");
            return;
        }
        if (this.WizardPageNumber == 0 && this.WizardData.DataValues.Name == false) {
            this.ValidationFailedShowErrorMsg = true;
            return;
        }
        this.WizardPageNumber++;
        this.loadCurrentTemplatePage();

        if (this.WizardPageNumber === 3) {
            this.PageType = "Summary";
            this.CurrentPage = "Summary";
            this.ShowButtons = this.ShowButtons.replace('n', 's');
            return;
        }

        if (this.WizardPageNumber <= this.TotalPages) {
            this.PageType = "Normal";
            this.CurrentPage = `Page${this.WizardPageNumber}`;
        }

    }

    public loadCurrentTemplatePage() {
        if (this.isCookBookMode()) {
            this.CurrentCookbookTemplatePage = this.CookBookTemplate.Meta.Pages[this.WizardPageNumber];
        } else {
            this.CurrentTemplatePage = this.Template.Pages[this.WizardPageNumber];
        }
    }

    public backButton() {

        if (this.WizardPageNumber !== 0) {
            this.WizardPageNumber--;
            this.PageType = "Normal";
            this.CurrentPage = `Page${this.WizardPageNumber}`;
            this.ShowButtons = this.ShowButtons.replace('s', 'n');
        }
        this.loadCurrentTemplatePage();
    }

    public editButton() {

        this.WizardPageNumber = 0;
        this.PageType = "Normal";
        this.CurrentPage = "Page1";
        this.CurrentRecipePage = this.CurrentRecipe = "Recipe1";
        this.SummaryMode = false;
        this.EditMode = true;
        this.CookbookMode ? this.cookBookSetup() : this.recipeSetup();
    }


    private async verifyEnvironment() {

        if (this.tools.isItEmpty(this.SelectedEmailAccount)) {
            await this.loadEmailAccountsInUse();
            console.warn("RCEL:verifyEnvironment:Needed to loadAccountsOnDevice to set Accounts list");
        }
        this.tools.assert(this.UserAccountId, `RCEL:verifyEnvironment:UserAccountId==null`);
        this.tools.assert(this.SelectedEmailAccount, `RCEL:verifyEnvironment:Account.SelectedEmailAccount==null`);
        this.tools.assert(this.SelectedSyncAccountId, `RCEL:verifyEnvironment:Account.SelectedSyncAccountId==null`);
        this.tools.assert(this.theUrlTemplateId, `RCEL:verifyEnvironment:theUrlTemplateId==null`);
    }

    async saveRecipe() {
        try {
            this.verifyEnvironment();

            // update the RecipeDto with what was set by the Wizard
            this.RecipeDto.fromWizardData(this.UserAccountId, this.WizardData, this.Template,this);

            try {

                if (this.EditMode) {
                    let response = await this.refindServiceProxyTyped.MakeRecipeCriteriaAsync(this.RecipeDto, this.SelectedMailAccountId);
                    if (response.Success == false) {
                        this.tools.warn("Unable to save. MakeRecipeCriteria failed");
                        return;
                    }

                    response.Criteria.UserAccountId = this.UserAccountId;
                    response.Criteria.MailAccountId = this.SelectedMailAccountId;
                    response.Criteria.SyncAccountId = this.SelectedSyncAccountId;
                    response.Criteria.RecipeId = this.RecipeDto.RecipeId;
                    response.Criteria.Name = this.RecipeDto.Name;
                    response.Criteria.TemplateId = this.theUrlTemplateId;
                    response.Criteria.RecipeType = Rt.RecipeTypes[this.RecipeDto.RecipeType];
                    response.Criteria.HistoryProcessingEnabled = true;

                    let modifyRecipeResponse = await this.refindServiceProxyTyped.ModifyRecipeAsync(this.RecipeDto, this.SelectedMailAccountId, response.Criteria);
                    this.tools.success("Recipe Edited Successfully");
                } else {

                    let mrcResponse = await this.refindServiceProxyTyped.MakeRecipeCriteriaAsync(this.RecipeDto, this.SelectedMailAccountId);
                    if (mrcResponse.Success == false) {
                        this.tools.warn("Unable to save. MakeRecipeCriteria failed");
                        return;
                    }

                    mrcResponse.Criteria.UserAccountId = this.UserAccountId;
                    mrcResponse.Criteria.MailAccountId = this.SelectedMailAccountId;
                    mrcResponse.Criteria.SyncAccountId = this.SelectedSyncAccountId;
                    mrcResponse.Criteria.TemplateId = this.theUrlTemplateId;
                    mrcResponse.Criteria.RecipeType = Rt.RecipeTypes[this.RecipeDto.RecipeType];
                    mrcResponse.Criteria.HistoryProcessingEnabled = true;


                    // let fmsg1 = "Unable to GetSequenceAsync";
                    // const seqResponse = await this.refindServiceProxyTyped.AutoWarning(fmsg1).GetSequenceAsync(RefindTypes.GetSequenceType.GetRecipeId);
                    // const sid = seqResponse.SequenceValue;
                    // this.tools.assert(sid, `RCEL:saveRecipe:SequenceValue==null`);
                    // mrcResponse.Criteria.RecipeId = sid;


                    let tlv = this.createTopLevelVenue(mrcResponse.Criteria);
                    tlv.OwnerId = mrcResponse.Criteria.RecipeId;
                    let vba: Array<Rt.VenueBlock> = [tlv];
                    mrcResponse.Criteria.Venues = vba;

                    let fmsg2 = "Unable to AddVenuesAsync";
                    let addVenueResponse = await this.refindServiceProxyTyped.ErrorHandelThrow().AddVenuesAsync(vba, mrcResponse.Criteria);

                    let addRecipeResponse = await this.refindServiceProxyTyped.ErrorHandelThrow().AddRecipeAsync(mrcResponse.Criteria, this.SelectedMailAccountId, this.pAction);
                    if (addRecipeResponse.Success) {
                        this.tools.success("Recipe Created Successfully");
                    } else {

                        // Recipe creation failed, delete all venues that may have been created
                        //let venuesToDelete = await this.refindServiceProxyTyped.DeleteVenues(mrcResponse.Criteria.RecipeId);
                        await this.refindServiceProxyTyped.DeleteVenues(mrcResponse.Criteria.RecipeId);

                        if (addRecipeResponse.Message == "Duplicate") {
                            this.tools.error("You attempted to save the recipe with an existing name. Please change the name");

                            return;
                        } else {
                            this.tools.error("AddRecipe Failed with a strange error=" + addRecipeResponse.Message + " In SaveRecipeDataAdd");
                            return;
                        }

                        // var venuesToDelete = Access.MailAccounts.AccountsDal.GetVenuesByRecipeId (criteriaRecipeId);
                        // var deleteVenues = new DeleteVenues () {
                        //     DeletedVenues = venuesToDelete.Select (v => v.ConvertToVenueBlock (Access.DataModel.UserAccountId)).ToList (),
                        //     UserAccountId = Access.DataModel.UserAccountId,
                        //     DeviceId = CurrentDevice.UniqueIdentifier,
                        // };
                        // var response = Send<DeleteVenues, DeleteVenuesResponse> (deleteVenues);
                    }
                }
                // if we have a post action then redirect to the RecommendationUrl
                let destination = (this.pAction) ? this.RecommendationUrl : this.RecipeListUrl;
                this.router.navigate([destination], { queryParams: { userAccountId: this.UserAccountId } });

                return;
            } catch (eAdd) {

                if (eAdd instanceof HardErrorException) {
                    throw eAdd;
                }
                if (eAdd instanceof SoftErrorException) {
                    this.tools.error("SaveRecipe:Unknown Soft error=" + eAdd.Message);
                } else {
                    this.tools.error("AddRecipe Unknown Error:" + eAdd.Message);
                }
                return;
            }
        } catch (e) {
            this.tools.error("SaveRecipe:Cant create a recipe at this time.  Error=" + e.Message);
        }
    }

    private async loadGetOptions() {
        const response = await this.refindServiceProxyTyped.GetOptionsAsync();

        if (response.Success) {
            this.DataSetObject = new GetOptionsExt(response);
            this.DataSetList = response.Options;
        }
    }

    private async loadCookbookTempate(tid: string) {
        try {
            const response = await this.refindServiceProxyTyped.GetCookbookTemplateAsync(tid);
            if (response.Success) {

                this.CookBookTemplate = response.CookbookTemplate;

                this.TotalPages = response.CookbookTemplate.Meta.Pages.length + 1;
                this.CurrentTemplatePage = response.CookbookTemplate.Meta.Pages[0];
                this.SummaryPageTitle = response.CookbookTemplate.Name;
                this.CookbookRecipetemplate = response.CookbookTemplate.Templates;

                let count = 0;
                for (let i of response.CookbookTemplate.Templates) {
                    count = i.Pages.length;
                }

                this.CookbookRecipetemplate = count;

                this.CurrentRecipe = 'Recipe1';
                this.ReciepeCnt = this.CookBookTemplate.Templates.length;
            }
        } catch (error) {
            this.tools.error("RCELT:loadCookbookTempate:Error=" + error.message);
        }
    }

    private async  loadRecipeTemplate(tid: string) {
        try {

            const response = await this.refindServiceProxyTyped.GetCdRecipeTemplateAsync(tid);
            if (response.Success) {
                this.Template = response.Template;
                this.TotalPages = response.Template.Pages.length;
                this.CurrentTemplatePage = response.Template.Pages[0];

                this.SummaryPageTitle = response.Template.Name;
            }
        } catch (error) {
            this.tools.error("RCOEL:loadRecipeTemplate" + error.Message);
        }
    }


    private async loadEmailAccountsInUse() {
        console.log("loading accounts on device");
        try {
            const response = await this.refindServiceProxyTyped.GetAccountsOnDeviceAsync();
            if (response.Success) {
                this.Accounts = response.Result;
            } else {
                this.tools.error("RCEL:GetAccountsOnDevice:SoftError=" + response.Message);

            }
        } catch (error) {
            this.tools.error("RCEL:GetAccountsOnDevice:Error=" + error.Message);
        }
    }

    private selectActiveMailAccount(index: number) {
        this.tools.assert(this.Accounts[index].Email, "RCEL:loadAccountsOnDevice:primaryEmail == null");
        this.tools.assertplain(this.Accounts[index].SyncAccountId != 0, "RCEL:loadAccountsOnDevice:SyncAccountId == 0");
        this.tools.assert(this.Accounts[index].MailAccountId, "RCEL:loadAccountsOnDevice:MailAccountId == null");
        this.SelectedEmailAccount = this.Accounts[index].Email;
        this.SelectedMailAccountId = this.Accounts[index].MailAccountId;
        this.SelectedSyncAccountId = this.Accounts[index].SyncAccountId;
        this.SelectedEmailIndex = index;
    }

    private async loadCategories(includeStats: boolean = false) {
        /// load the group categorys such as Machines,MailingList,People etc
        /// and check checkboxes in CategoriesData object
        ///
        try {

            const response = await this.refindServiceProxyTyped.ListCategoriesAsync(
                this.SelectedMailAccountId,
                Rt.CategoryItemSourceOptions.All,
                includeStats
            );
            if (response.Success) {
                this.CategoriesDataSrv = response.Categories;
            }
        } catch (error) {
            this.tools.error("RCEL:GetListCategories:Error=" + error.Message);
        }
    }

    private createTopLevelVenue(rc: Rt.RecipeCriteria): Rt.VenueBlock {

        this.tools.assert(rc.RecipeId, "RCEL:createTopLevelVenue:recipeId=null");
        this.tools.assert(rc.Name, "RCEL:createTopLevelVenue:Name=null");

        let topLevelVenue = new Rt.VenueBlock();
        topLevelVenue.Name = rc.Name;
        topLevelVenue.ParentVenueId = "TopLevel";
        topLevelVenue.OwnerId = rc.RecipeId;
        topLevelVenue.UserAccountId = this.UserAccountId;
        topLevelVenue.VenueSource = Rt.VSource.UserGenerated;
        topLevelVenue.VenueType = Rt.VTypes.Standard;
        topLevelVenue.Command = Rt.VCommand.AddVenue;
        topLevelVenue.Owner = Rt.VOwnerType.Recipe;
        topLevelVenue.ColorStyle = Rt.VenueStandardColor.Green;
        return topLevelVenue;
    }


    private async getServerSequence(stype: Rt.GetSequenceType = Rt.GetSequenceType.GetRecipeId): Promise<string> {
        let retVar = "";

        const response = await this.refindServiceProxyTyped.GetSequenceAsync(stype);

        if (response.Success) {
            retVar = response.SequenceValue;
            return retVar;
        }
        this.tools.warn("Get Sequence Failed" + response.Message);
    }


    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> HTML Callbacks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    public cancelButton() {
        this.router.navigate([this.RecipeListUrl], { queryParams: { userAccountId: this.UserAccountId } });
    }

    public async deleteRecipe() {

        await this.tools.warningDialogLong(
            'Do you really want to delete this Recipe?',
            'The recipe will be removed from all of your devices?',
            'Delete')
            .then(async (isConfirmed) => { if (isConfirmed) { this.goDeleteRecipe(); } });
    }



    private async goDeleteRecipe() {

        this.refindServiceProxyTyped.DeleteRecipe(this.theUrlItemId, this.pAction,
            (response) => {

                if (response.Success == true) {
                    this.tools.success('The recipe was successfully deleted.');
                    this.router.navigate([this.RecipeListUrl], { queryParams: { userAccountId: this.UserAccountId } });

                } else {
                    this.tools.warn("Delete Recipe:SoftError=" + response.Message);
                }

            },
            (error) => {
                this.tools.error("Delete Recipe:Error=" + error.Message);
            });
    }


    public async deleteCookbook() {

        await this.tools.warningDialogLong(
            'Do you really want to delete this cookbook?',
            'All of the recipes on this device will be removed? ',
            'Delete')
            .then(async (isConfirmed) => { if (isConfirmed) { this.goDeleteCookbook(); } });
    }

    private async goDeleteCookbook() {
        const cookbookId = this.theUrlItemId;
        const getCookbooksResponse = await this.refindServiceProxyTyped.GetCookbookAsync(cookbookId);
        this.containedRecipe = getCookbooksResponse.Cookbook.Recipes;

        let deleteRecipeResponse = await this.refindServiceProxyTyped.DeleteCookbookAsync(cookbookId);
        if (deleteRecipeResponse.Success) {

            this.tools.success(`Successfully deleted Cookbook`);

            await this.tools.warningDialog(
                'Do you want to delete the recipes for this cookbook?',
                'Delete')
                .then(async (isConfirmed) => { if (isConfirmed) { this.goDeleteCookbookRecipes(); } });
        }
    }

    private async goDeleteCookbookRecipes() {
        let deletedCookbooks = 0;
        for (let recipeData of this.containedRecipe) {
            const response = await this.refindServiceProxyTyped.DeleteRecipeAsync(recipeData.RecipeId);
            if (response.Success) {
                deletedCookbooks = deletedCookbooks + 1;
            } else {
                this.tools.error(response.Message);
            }
        }

        this.tools.success(`${deletedCookbooks} cookbooks successfully deleted`);
        this.router.navigate([this.RecipeListUrl], { queryParams: { userAccountId: this.UserAccountId } });
    }



    private isEmpty(value): boolean {
        return (typeof value === "undefined" || value === null);
    }
    public isDisplayPageValueValid(): boolean {
        return this.CurrentTemplatePage != null && this.CurrentTemplatePage.Components != null && this.CurrentTemplatePage.Components.length > 0;
    }
    public change_filter(): any {

        //this.Account = this.Accounts.filter(x => x.MailAccountId === this.CollectionData.MailAccounts[0])[0];
    }


    public onCatListchange(cat: string, isChecked: boolean) {
        console.log(`cat=[${cat}]:checked=[${isChecked}]`);

    }

    public onCustomListChange(listSelected: string, isChecked: boolean) {

        if (isChecked) {
            this.CustomDomainList.push(listSelected);
        } else {
            let index = this.CustomDomainList.findIndex(x => x == listSelected);
            this.CustomDomainList.splice(index, 1);
        }

    }

    public checkLength(fieldText: string, minSize: number) {
        if (fieldText) {
            if (fieldText.length >= minSize) {
                this.ValidationFailedShowErrorMsg = false;
                this.ValidationBlockAdvancePage = false;
            } else {
                this.ValidationFailedShowErrorMsg = true;
                this.ValidationBlockAdvancePage = true;
            }
        } else {
            this.ValidationFailedShowErrorMsg = false;
            this.ValidationBlockAdvancePage = true;
        }
    }


    /// >>>>>>>>>>>>>>>>>>>>>>>>  Exclude/Include category >>>>>>>>>>>>>>>>>>>>>>>>>>>>

    private async calulateCheckMarks() {
        /// load the group categorys as CdCategoryDto such as Machines,MailingList,People etc
        /// The basic informaion is retrieved from a REST call and stored in CategoriesDataSrv.
        /// Then an any object called CategoriesData is created and dymaically defined fields are set
        /// This is used in the checkbox wizard page
        this.CategoriesRecipeIncluded = (this.EditMode) ? this.RecipeDto.Collections.Categories_Included : [];
        this.CategoriesRecipeExcluded = (this.EditMode) ? this.RecipeDto.Collections.Categories_Excluded : [];
        this.calculateIncludeExcludedHeaderSection();
    }


    private calculateIncludeExcludedHeaderSection() {

        this.populateCategoryCheckBoxes();

        if (this.CategoriesRecipeIncluded.length == 0 && this.CategoriesRecipeExcluded.length == 0) {
            this.includedCheckBoxTabSelected();                 // default condition
        } else if (this.CategoriesRecipeIncluded.length > 0) {     // potential override
            this.includedCheckBoxTabSelected();
        } else if (this.CategoriesRecipeExcluded.length > 0) {     // potential override
            this.excludedCheckBoxTabSelected();
        }
    }

    private populateCategoryCheckBoxes() {
        // get a clean list of categorys and assign it to datastructure html reads

        this.WizardData.CheckboxDataSet = this.CategoriesDataSrv.map(r => new CdCategoryDtoExt(r));

        // onlyl in editmode will we upate the xorCheckmark field to whats included in the recipe
        if (this.EditMode) {

            for (let available of this.WizardData.CheckboxDataSet) {
                for (let checked of this.CategoriesRecipeIncluded) {
                    if (available.CategoryId == checked) {
                        available.IsItemSelected = true;
                    }
                }
                // for (let excluded of this.CategoriesRecipeExcluded) {
                //     if (available.Category == excluded) {
                //         available.IsItemSelected = "E";
                //     }
                // }
                for (let customDomainList of this.CustomDomainList) {
                    if (available.Category == customDomainList) {
                        available.IsCustomListChecked = true;
                    }
                }
            }
        } else {
            // To start include all
            for (let available of this.WizardData.CheckboxDataSet) {
                available.IsItemSelected = true;
            }
        }
    }

    public includedCheckBoxTabSelected() {
        // called by html for ListEditor_RemoteOptions control wheck exclude/include tab is changes

        this.IsIncludedTabVisible = true;                   // Determines is the tab Include is displayed
        this.IsExcludedTabVisible = false;                  // Determines is the tab Excluded is displayed
        this.CheckBoxTabVisible = "Included";               // Determines which tab is currently selected
    }
    public excludedCheckBoxTabSelected() {
        // called by html for ListEditor_RemoteOptions control wheck exclude/include tab is changes
        this.IsIncludedTabVisible = false;                   // Determines is the tab Include is displayed
        this.IsExcludedTabVisible = true;                  // Determines is the tab Excluded is displayed
        this.CheckBoxTabVisible = "Excluded";               // Determines which tab is currently selected
    }

    public onListChange(type: string, key: string, checked: boolean) {
        console.log(`RCEL:onListChange:Type=${type}:Key=${key}:checked=${checked}`);

        const itemIndex = this.WizardData.RemoteCollectionData[type].findIndex(x => x.Key === key);
        // let item = this.WizardData.RemoteCollectionData[type].find(x => x.Key == key);
        this.WizardData.RemoteCollectionData[type][itemIndex].IsItemSelected = checked;

    }

    //
    // not used
    //
    public onSelectListChange(listName: string, category: string, isChecked: boolean) {

        // called when a checkbox selection is changed
        console.log(`RCEL:onSelectListChange:listName=${listName}:category=${category}:isChecked=${isChecked}`);
        switch (listName) {
            case 'Industry Group': {
                    let lst = this.WizardData.DataValues.IndustryGroup as DisplaySelectList[];
                    let fnd = lst.find(r => r.value == category);
                    fnd.selected = isChecked;
                }
            case 'User List': {

                }
            case 'User Groups': {

                }
        }
    }


    private stripNonPrinting(input: string): string {
        return input.replace(/"/g, '').replace('[', '').replace(']', '');
    }

    //
    // not used
    //
    public onCategoryChange(category: string, isChecked: boolean, type: string) {

        // called when a checkbox selection is changed
        console.log(`RCEL:onCategoryChange:category=${category}:isChecked=${isChecked}:type=${type}`);

        if (type == "Included") {
            if (isChecked) {
                this.CategoriesRecipeIncluded.push(category);
                let index = this.CategoriesRecipeExcluded.findIndex(x => x == category);
                if (index > -1) { this.CategoriesRecipeExcluded.splice(index, 1); }
            } else {
                let index = this.CategoriesRecipeIncluded.findIndex(x => x == category);
                this.CategoriesRecipeIncluded.splice(index, 1);
            }
        }
        if (type == "Excluded") {
            if (isChecked) {
                this.CategoriesRecipeExcluded.push(category);
                let index = this.CategoriesRecipeIncluded.findIndex(x => x == category);
                if (index > -1) { this.CategoriesRecipeIncluded.splice(index, 1); }

            } else {
                let index = this.CategoriesRecipeExcluded.findIndex(x => x == category);
                this.CategoriesRecipeExcluded.splice(index, 1);
            }
        }
    }

    /// <<<<<<<<<<<<<<<<<<<<<<<<<<<  Exclude/Include category <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


    // -------------------- Needs to be rewritten ---------------------------
    // private nextPageCookBookMode(curPage
    //     // , curRecipe, curPageForRecipe
    // ) {

    //     if (this.EditMode && curPage == 'Page1' && this.CurrentRecipe == 'Recipe1') {
    //         this.CombinedRecipeModels = [];
    //     }

    //     let recipeCnt = this.CurrentRecipe.match(/\d+/).toString();
    //     this.theCurrentPageNumber = curPage.match(/\d+/).toString();

    //     if (recipeCnt == "1") {
    //         let values: Values = {
    //             FPC_DisplaySent: false,
    //             FPC_UseFullNames: false,
    //             FPC_UseAllCategories: false,
    //             MailFoldersBasic: "Inbox",
    //             Name: "",
    //             SearchTimeFrame: "Everything",
    //             VenueTreeByTime: undefined,
    //             WhitelistMode: true,
    //             FPC_GroupByCategory: undefined,
    //             ValueToMatch: undefined,
    //             FieldToMatch: undefined,
    //             CookbookTemplateId: this.theUrlTemplateId
    //         }

    //         let collections: Collections = {
    //             FolderPerContactGroups: "",
    //             FPC_CustomDomain: this.CustomDomainList,
    //             Categories_Included: this.CategoriesRecipeIncluded,
    //             Categories_Excluded: this.CategoriesRecipeExcluded,
    //             MailAccounts: this.CollectionData.MailAccounts,
    //             IndustryGroup: "",
    //         }


    //         let model: CookBookModel = {
    //             RecipeType: "0",
    //             TemplateId: this.theUrlTemplateId,
    //             UserAccountId: this.UserAccountId,
    //             Values: values,
    //             Collections: collections
    //         }

    //         this.cookBookModel = model;
    //     }
    //     else {
    //         let values: Values = {
    //             FPC_DisplaySent: this.DataValues.FPC_DisplaySent,
    //             FPC_UseFullNames: this.DataValues.FPC_UseFullNames,
    //             FPC_UseAllCategories: this.DataValues.FPC_UseAllCategories,
    //             MailFoldersBasic: "Inbox",
    //             Name: this.DataValues.Name,
    //             SearchTimeFrame: "Everything",
    //             VenueTreeByTime: this.DataValues.VenueTreeByTime,
    //             WhitelistMode: true,
    //             FPC_GroupByCategory: this.DataValues.FPC_GroupByCategory,
    //             ValueToMatch: this.DataValues.ValueToMatch,
    //             FieldToMatch: this.DataValues.FieldToMatch,
    //             CookbookTemplateId: undefined
    //         }

    //         let collections: Collections = {
    //             FolderPerContactGroups: "",
    //             FPC_CustomDomain: this.CustomDomainList,
    //             Categories_Included: this.CategoriesRecipeIncluded,
    //             Categories_Excluded: this.CategoriesRecipeExcluded,
    //             MailAccounts: this.CollectionData.MailAccounts,
    //             IndustryGroup: "",
    //         }


    //         let model: ReceipeModel = {
    //             CookbookId: "",
    //             RecipeType: "VenueTree",
    //             TemplateId: this.theUrlTemplateId,
    //             UserAccountID: this.UserAccountId,
    //             RecipeId: "",
    //             Values: values,
    //             Collections: collections
    //         }

    //         this.RecipeModel = model;
    //         if (this.previousRecipeCnt != this.CurrentRecipe) {
    //             this.CombinedRecipeModels.push(this.RecipeModel);
    //             this.CategoriesRecipeIncluded = [];
    //             this.CategoriesRecipeExcluded = [];
    //             this.DataValues.Name = "";
    //             this.RecipeModel = "";
    //         }

    //         else {

    //         }

    //     }

    //     this.recipeNum = this.CurrentRecipe.match(/\d+/);
    //     if (this.CurrentRecipePage != null || this.CurrentRecipePage != undefined) {
    //         this.recipePageNum = this.CurrentRecipePage.match(/\d+/);
    //     }

    //     if (curPage == "Page1") {
    //         if (this.TotalPages > this.theCurrentPageNumber) {
    //             this.theCurrentPageNumber++;
    //             this.CurrentTemplatePage = this.CookBookTemplate.Meta.Pages[this.theCurrentPageNumber - 1];
    //             this.PageType = this.CurrentPage = "Page" + this.theCurrentPageNumber;
    //         }
    //         else if (this.TotalPages == this.theCurrentPageNumber) {
    //             this.DisplaySectionTitle = this.DataValues.Name;
    //             this.PageType = this.CurrentPage = "Summary";

    //         }
    //     }

    //     if (curPage != "Page1" && this.IsEditClicked) {
    //         if (this.TotalPages > this.theCurrentPageNumber) {
    //             this.theCurrentPageNumber++;
    //             this.CurrentTemplatePage = this.CookBookTemplate.Meta.Pages[this.theCurrentPageNumber - 1];
    //             this.CurrentPage = this.PageType = "Page" + this.theCurrentPageNumber;
    //         }
    //         else {
    //             if (this.TotalPages == this.theCurrentPageNumber) {
    //                 if (this.CurrentRecipe == "Recipe1") {
    //                     this.ShowrecipeCurrentPage = true;
    //                     this.CurrentTemplatePage = this.CookBookTemplate.Templates[this.recipeNum - 1].Pages[this.recipePageNum - 1];
    //                     this.recipeNum++;
    //                     this.CurrentRecipe = "Recipe" + this.recipeNum;
    //                     this.CurrentRecipePage = "Page" + this.recipePageNum;
    //                 }
    //                 else {
    //                     let tempRecipePageCnt = this.recipePageNum; //1
    //                     let temprecipeCnt = this.recipeNum;  //2

    //                     this.ShowrecipeCurrentPage = true;
    //                     let recipeLength = this.CookBookTemplate.Templates.length;

    //                     if (recipeLength >= temprecipeCnt) {

    //                         let tempcurrentRecipe = +this.CurrentRecipe.match(/\d+/);
    //                         let checkPagesCnt = this.CookBookTemplate.Templates[tempcurrentRecipe - 2].Pages.length;

    //                         if (checkPagesCnt > this.recipePageNum) {
    //                             this.recipePageNum++;

    //                             this.CurrentTemplatePage = this.CookBookTemplate.Templates[tempcurrentRecipe - 2].Pages[this.recipePageNum - 1];
    //                             this.CurrentRecipe = "Recipe" + tempcurrentRecipe;
    //                             this.CurrentRecipePage = "Page" + this.recipePageNum;

    //                         }
    //                         else {
    //                             this.recipeNum++;

    //                             let templet = 1;
    //                             this.CurrentTemplatePage = this.CookBookTemplate.Templates[this.recipeNum - 2].Pages[templet - 1];
    //                             this.CurrentRecipe = "Recipe" + this.recipeNum;
    //                             this.CurrentRecipePage = "Page" + tempvar;
    //                         }
    //                     }
    //                     else {
    //                         this.ShowrecipeCurrentPage = false;
    //                         this.CurrentPage = "Summary";
    //                         this.DisplaySectionTitle = this.DataValues.Name;
    //                         this.PageType = "Summary";
    //                     }

    //                 }
    //                 this.PreviousRecipeForNext = this.CurrentRecipe;
    //             }
    //         }
    //     }
    //     if (curPage != "Page1" && !this.IsEditClicked) {
    //         if (this.TotalPages > this.theCurrentPageNumber) {
    //             this.theCurrentPageNumber++;
    //             this.CurrentPage = "Page" + this.theCurrentPageNumber;
    //             this.CurrentTemplatePage = this.CookBookTemplate.Meta.Pages[this.theCurrentPageNumber - 1];
    //             this.PageType = "Page" + this.theCurrentPageNumber;
    //         }
    //         else if (this.TotalPages == this.theCurrentPageNumber) {
    //             this.CurrentPage = "Summary";
    //             this.DisplaySectionTitle = this.DataValues.Name;
    //             this.PageType = "Summary";
    //         }
    //     }

    //     // fro getting values for edit

    //     if (this.EditMode && this.CookbookMode) {
    //         this.CbRecipeTemplage.Recipes = this.CbRecipeTemplage.Recipes.sort((a, b) => a.RecipeId.localeCompare(b.RecipeId));


    //         let tempcookbookPagesCnt = this.CookBookTemplate.Meta.Pages.length;
    //         let tempcurPage = curPage.match(/\d+/);
    //         let temprecipe = +this.CurrentRecipe.match(/\d+/);
    //         let tempcurrecipePage = +this.CurrentRecipePage.match(/\d+/);

    //         if (this.CurrentRecipe == 'Recipe1') {
    //             if (tempcurPage < tempcookbookPagesCnt) {

    //                 if (this.CbRecipeTemplage != undefined || this.CbRecipeTemplage != null) {

    //                     this.CollectionData.MailAccounts = this.CbRecipeTemplage.Metadata.Collections.MailAccounts[0];

    //                     this.DataValues.MailFoldersBasic = this.CbRecipeTemplage.Metadata.Values.MailFoldersBasic;
    //                     this.DataValues.FPC_DisplaySent = this.CbRecipeTemplage.Metadata.Values.FPC_DisplaySent;
    //                     this.DataValues.FPC_UseFullNames = this.CbRecipeTemplage.Metadata.Values.FPC_UseFullNames;
    //                     this.DataValues.FPC_UseAllCategories = this.CbRecipeTemplage.Metadata.Values.FPC_UseAllCategories;
    //                     this.DataValues.WhitelistMode = this.CbRecipeTemplage.Metadata.Values.MailFoldersBasic;
    //                     this.DataValues.VenueTreeByTime = this.CbRecipeTemplage.Metadata.Values.VenueTreeByTime;

    //                     this.CategoriesRecipeIncluded = this.CbRecipeTemplage.Metadata.Collections.Categories_Included;
    //                     this.CategoriesRecipeExcluded = this.CbRecipeTemplage.Metadata.Collections.Categories_Excluded;

    //                 }

    //             }
    //             else {
    //                 if (this.CbRecipeTemplage != undefined || this.CbRecipeTemplage != null) {

    //                     this.DataValues.Name = this.CbRecipeTemplage.Recipes[temprecipe - 1].Values.Name;

    //                     this.CollectionData.MailAccounts = this.CbRecipeTemplage.Recipes[temprecipe - 1].Collections.MailAccounts[0];

    //                     this.DataValues.MailFoldersBasic = this.CbRecipeTemplage.Recipes[temprecipe - 1].Values.MailFoldersBasic;
    //                     this.DataValues.FPC_DisplaySent = this.CbRecipeTemplage.Recipes[temprecipe - 1].Values.FPC_DisplaySent;
    //                     this.DataValues.FPC_UseFullNames = this.CbRecipeTemplage.Recipes[temprecipe - 1].Values.FPC_UseFullNames;
    //                     this.DataValues.FPC_UseAllCategories = this.CbRecipeTemplage.Recipes[temprecipe - 1].Values.FPC_UseAllCategories;
    //                     this.DataValues.WhitelistMode = this.CbRecipeTemplage.Recipes[temprecipe - 1].Values.MailFoldersBasic;
    //                     this.DataValues.VenueTreeByTime = this.CbRecipeTemplage.Recipes[temprecipe - 1].Values.VenueTreeByTime;


    //                     this.CategoriesRecipeIncluded = this.CbRecipeTemplage.Recipes[temprecipe - 1].Collections.Categories_Included;
    //                     this.CategoriesRecipeExcluded = this.CbRecipeTemplage.Recipes[temprecipe - 1].Collections.Categories_Excluded;

    //                 }
    //             }
    //         }

    //         else {
    //             let temprecipePagesCnt = this.CookBookTemplate.Templates[temprecipe - 2].Pages.length;

    //             if (this.CbRecipeTemplage != undefined || this.CbRecipeTemplage != null) {
    //                 let recipeCntforEdit = +this.CurrentRecipe.match(/\d+/);

    //                 if (tempcurrecipePage < temprecipePagesCnt) {

    //                     this.DataValues.Name = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 2].Values.Name;

    //                     this.CollectionData.MailAccounts = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 2].Collections.MailAccounts[0];

    //                     this.DataValues.MailFoldersBasic = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 2].Values.MailFoldersBasic;
    //                     this.DataValues.FPC_DisplaySent = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 2].Values.FPC_DisplaySent;
    //                     this.DataValues.FPC_UseFullNames = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 2].Values.FPC_UseFullNames;
    //                     this.DataValues.FPC_UseAllCategories = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 2].Values.FPC_UseAllCategories;
    //                     this.DataValues.WhitelistMode = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 2].Values.MailFoldersBasic;
    //                     this.DataValues.VenueTreeByTime = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 2].Values.VenueTreeByTime;

    //                     this.CategoriesRecipeIncluded = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 2].Collections.Categories_Included;
    //                     this.CategoriesRecipeExcluded = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 2].Collections.Categories_Excluded;
    //                 }

    //                 else {
    //                     this.DataValues.Name = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 1].Values.Name;

    //                     this.CollectionData.MailAccounts = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 1].Collections.MailAccounts[0];

    //                     this.DataValues.MailFoldersBasic = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 1].Values.MailFoldersBasic;
    //                     this.DataValues.FPC_DisplaySent = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 1].Values.FPC_DisplaySent;
    //                     this.DataValues.FPC_UseFullNames = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 1].Values.FPC_UseFullNames;
    //                     this.DataValues.FPC_UseAllCategories = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 1].Values.FPC_UseAllCategories;
    //                     this.DataValues.WhitelistMode = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 1].Values.MailFoldersBasic;
    //                     this.DataValues.VenueTreeByTime = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 1].Values.VenueTreeByTime;

    //                     this.CategoriesRecipeIncluded = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 1].Collections.Categories_Included;
    //                     this.CategoriesRecipeExcluded = this.CbRecipeTemplage.Recipes[recipeCntforEdit - 1].Collections.Categories_Excluded;
    //                 }
    //             }
    //         }
    //     }
    // }

    // -------------------- Unused ?? ---------------------------
    // public saveRecipeSync() {
    //     this.verifyEnvironment();

    //     let mid = this.Account.MailAccountId;

    //     this.refindServiceProxyTyped.MakeRecipeCriteria(this.populateRecipeDto(), mid, new RefindTypes.AddOrEditRecipeDto(),
    //         (response) => {
    //             if (response.Success) {
    //                 response.Criteria.RecipeType = "VenueTree";
    //                 response.Criteria.UserAccountId = this.UserAccountId;
    //                 response.Criteria.TemplateId = this.theUrlTemplateId;

    //                 let modifyRecipeResponse = this.EditMode ? this.saveRecipeDataModify(response) : this.saveRecipeDataAdd(response);

    //             }
    //         },
    //         (makeRecipeError) => {
    //             this.tools.warn("Add Recipe failed" + makeRecipeError.message);
    //         }
    //     )
    // }

    // private saveRecipeAddRecipe(makeRecipeResponse: RefindTypes.MakeRecipeCriteriaResponse) {

    //     this.refindServiceProxyTyped.AddRecipe(makeRecipeResponse.Criteria, this.Account.MailAccountId,

    //         (response) => {

    //             let tresponse = response as RefindTypes.AddRecipeResponse;
    //             if (response.Success) {
    //                 this.tools.success("Recipe Created Successfully");
    //                 this.router.navigate([this.RecipeListUrl], { queryParams: { userAccountId: this.UserAccountId } });
    //             }
    //             else {
    //                 if (response.Message === "Duplicate") {
    //                     let rname = makeRecipeResponse.Criteria.Name;

    //                     this.tools.error("A recipe With the name '" + rname + "' already exists.  Select a different name");
    //                 } else {
    //                     this.tools.warn("AddRecipe Failed with a strange error=" + tresponse.Message + " In SaveRecipeDataAdd");
    //                 }
    //             }
    //         },
    //         (error) => {
    //             this.tools.warn("saveRecipeAddRecipe:AddRecipe: Failed with a strange error=" + error.Message + " In SaveRecipeDataAdd");
    //         }
    //     );
    // }
    // private saveRecipeDataAdd(makeRecipeResponse: RefindTypes.MakeRecipeCriteriaResponse) {
    //     this.refindServiceProxyTyped.GetSequence(RefindTypes.GetSequenceType.GetRecipeId,
    //         (response) => {
    //             if (response.Success) {
    //                 let sid = response.SequenceValue;
    //                 let tlv = this.createTopLevelVenue(makeRecipeResponse.Criteria);
    //                 tlv.OwnerId = sid;
    //                 tlv.Owner = RefindTypes.VOwnerType.Recipe;
    //                 let vba: Array<RefindTypes.VenueBlock> = [tlv];

    //                 makeRecipeResponse.Criteria.Venues = vba;
    //                 makeRecipeResponse.Criteria.RecipeId = sid;
    //                 makeRecipeResponse.Criteria.HistoryProcessingEnabled = true;
    //                 makeRecipeResponse.Criteria.UserAccountId = this.UserAccountId;
    //                 makeRecipeResponse.Criteria.SyncAccountId = this.Account.SyncAccountId;

    //                 // Process VenueChanges
    //                 this.refindServiceProxyTyped.AddVenues(vba, makeRecipeResponse.Criteria,
    //                     (addVenueResponse) => {

    //                         if (addVenueResponse.Success) {
    //                             this.saveRecipeAddRecipe(makeRecipeResponse);
    //                         }
    //                         else {
    //                             if (addVenueResponse.Message === "Duplicate") {
    //                                 this.tools.warn("A recipe With the name " + addVenueResponse.Criteria.Name + " already exists: In SaveRecipeDataAdd");
    //                             } else {
    //                                 this.tools.warn("AddVenues Failed with a strange error=" + addVenueResponse.Message + " In SaveRecipeDataAdd");
    //                             }
    //                             this.refindServiceProxyTyped.DeleteVenues(addVenueResponse.Criteria.Venues,
    //                                 (DeleteVenueReponse) => { },
    //                                 (DeleteVenueError) => {
    //                                     this.tools.warn("DeleteVenueCleanup Failed" + DeleteVenueError.Message);
    //                                 }
    //                             );

    //                         }
    //                     },
    //                     (addVenueError) => {
    //                         this.tools.warn("AddVenues Failed" + addVenueError.Message);
    //                     }
    //                 );
    //             }
    //         },
    //         (error) => {
    //             this.tools.warn("Get Sequence Failed" + error.message);
    //         }
    //     )
    // }
    // private saveRecipeDataModify(response: RefindTypes.MakeRecipeCriteriaResponse) {
    //     this.refindServiceProxyTyped.ModifyRecipeCriteria(response.Criteria,
    //         (response) => {
    //             if (response.Success) {
    //                 this.addedVenues = [];
    //                 this.tools.success("Recipe Updated Successfully");
    //                 this.router.navigate([this.RecipeListUrl], { queryParams: { userAccountId: this.UserAccountId } });
    //             }
    //             else {
    //                 if (response.Message === "Duplicate") {
    //                     this.tools.warn("A recipe With the name " + response.Criteria.Name + " already exists");
    //                 }
    //                 else {
    //                     this.tools.warn("AddVenues Failed with a strange error=" + response.Message);
    //                 }

    //                 this.refindServiceProxyTyped.DeleteVenues(response.Criteria.Venues,
    //                     (DeleteVenueReponse) => { },
    //                     (DeleteVenueError) => {
    //                         this.tools.warn("DeleteVenueCleanup Failed" + DeleteVenueError.Message);
    //                     }
    //                 );
    //             }
    //             return response;
    //         },
    //         (error) => {
    //             this.tools.warn("Modify Recipe failed" + error.message);
    //             return null;
    //         });
    // }



    public saveCookbookDataOld(a, b, c, d = "") {
        return;
    }
    public async saveCookbookData() {

        this.IncludedRecipe = this.CookBookTemplate.Templates;
        if (this.EditMode) {

            let ma = this.WizardData.CollectionData.MailAccounts[0];
            const updateCookbookResponse = await this.refindServiceProxyTyped.UpdateCookbookAsync(this.theUrlTemplateId, this.theUrlItemId, ma, this.cookBookModel);
            if (updateCookbookResponse.Success) {
                let CookBookID = updateCookbookResponse.UpdateCookbookCommand.Cookbook.CookbookId;

                if (this.CombinedRecipeModels.length > 0) {
                    for (let i = 0; i < this.CombinedRecipeModels.length; i++) {
                        this.saveCookbookDataOld(this.CombinedRecipeModels[i], CookBookID, i, this.CbRecipeTemplage.Recipes[i].RecipeId);
                    }
                } else {
                    for (let recipe of this.IncludedRecipe) {
                        this.saveCookbookDataOld(recipe, CookBookID, undefined, undefined);
                    }
                }

                this.tools.success("Cookbook Updated Successfully");
                this.router.navigate([
                    this.RecipeListUrl
                ], {
                    queryParams: {
                        userAccountId: this.UserAccountId,
                        viewTYpe: "Cookbooks"

                    }
                });
            }

            // Implemented async function for Cookbook update

            // let request = this.dsbuilder.getUpdateCookbookRequest(this.theUrlTemplateId, this.theUrlItemId, this.CollectionData.MailAccounts, this.cookBookModel);
            // this.refindServiceProxy.Recipe(request, "UpdateCookbook", response => {
            //     if (response.Success) {
            //         let tempType = "Cookbooks";

            //         let CookBookID = response.UpdateCookbookCommand.Cookbook.CookbookId;

            //         if (this.CombinedRecipeModels.length > 0) {
            //             for (let i = 0; i < this.CombinedRecipeModels.length; i++) {
            //                 this.saveCookbookDataOld(this.CombinedRecipeModels[i], CookBookID, i, this.CbRecipeTemplage.Recipes[i].RecipeId);
            //             }
            //         }
            //         else {
            //             for (let recipe of this.IncludedRecipe) {
            //                 this.saveCookbookDataOld(recipe, CookBookID, undefined, undefined);
            //             }
            //         }

            //         this.tools.success("Cookbook Updated Successfully");
            //         this.router.navigate([this.RecipeListUrl], {
            //             queryParams: {
            //                 userAccountId: this.UserAccountId,
            //                 viewType: tempType
            //             }
            //         });
            //     }
            // });
        } else {

            // let request = this.dsbuilder.getAddCookbookRequest(this.theUrlTemplateId, this.CollectionData.MailAccounts, this.cookBookModel);

            let ma = this.WizardData.CollectionData.MailAccounts[0];
            const response = await this.refindServiceProxyTyped.AddCookbookAsync(this.theUrlTemplateId, ma, this.cookBookModel);

            if (response.Success) {
                let tempType = "Cookbooks";
                let CookBookID = response.AddCookbookCommand.Cookbook.CookbookId;

                if (this.CombinedRecipeModels.length > 0) {
                    for (let i = 0; i < this.CombinedRecipeModels.length; i++) {

                        // Question: this.saveCookbokDataOld has an empty body...?
                        this.saveCookbookDataOld(this.CombinedRecipeModels[i], CookBookID, i, undefined);
                    }
                } else {
                    for (let recipe of this.IncludedRecipe) {
                        this.saveCookbookDataOld(recipe, CookBookID, undefined, undefined);
                    }
                }

                this.tools.success("Cookbook created successfully");
                this.router.navigate([this.RecipeListUrl], {
                    queryParams: {
                        userAccountId: this.UserAccountId,
                        viewType: tempType
                    }
                });
            }

            // Converted AddCookbookRequest to async function
            // this.refindServiceProxy.Recipe(request, "AddCookbook", response => {

            //     if (response.Success) {
            //         let tempType = "Cookbooks";

            //         let CookBookID = response.AddCookbookCommand.Cookbook.CookbookId;

            //         if (this.CombinedRecipeModels.length > 0) {
            //             for (let i = 0; i < this.CombinedRecipeModels.length; i++) {


            //                 this.saveCookbookDataOld(this.CombinedRecipeModels[i], CookBookID, i, undefined);
            //             }
            //         }
            //         else {
            //             for (let recipe of this.IncludedRecipe) {
            //                 this.saveCookbookDataOld(recipe, CookBookID, undefined, undefined);
            //             }
            //         }

            //         this.tools.success("CookBook Created Successfully");
            //         this.router.navigate([this.RecipeListUrl], {
            //             queryParams: {
            //                 userAccountId: this.UserAccountId,
            //                 viewType: tempType
            //             }
            //         });
            //     }
            // });

        }


    }

}

   //
   // private async getItem() {

    //     if (this.CookbookMode) {

    //         try {
    //             let response = await this.refindServiceProxyTyped.GetCookbookAsync(this.theUrlItemId);
    //             if (response.Success) {
    //                 let cookbook = response.Cookbook;
    //                 this.Items = cookbook;
    //                 this.DataValues = this.Items.Values;
    //                 this.CookbookRecipetemplatevalues = this.Items;

    //                 let categoriesIncluded = this.CookbookRecipetemplatevalues.Metadata.Collections.Categories_Included;
    //                 let categoriesExcluded = this.CookbookRecipetemplatevalues.Metadata.Collections.Categories_Excluded;
    //                 if (categoriesIncluded && categoriesIncluded.length > 0) {
    //                     this.IsIncluded = true; this.ViewMode = 'Included';
    //                 }
    //                 else if (categoriesExcluded && categoriesExcluded.length > 0) {
    //                     this.IsExcluded = true; this.ViewMode = 'Excluded';
    //                 }

    //                 if (categoriesIncluded && categoriesIncluded.length == 0 && (categoriesExcluded && categoriesExcluded.length == 0)) {
    //                     this.IsIncluded = true;
    //                 }

    //                 this.getTemplate(this.Items);
    //                 this.CurrentPage = "Summary";
    //                 //this.HeaderName = this.DataValues.Name;
    //                 this.HeaderName = this.DataValues ? this.DataValues.Name : "";

    //             }
    //         } catch (error) {
    //             this.tools.error("RCEL:GetItems:GetCookbook:Error=" + error.Message);
    //         }




    //         // let request = this.dsbuilder.getCookbookRequest(this.theUrlItemId);
    //         // this.refindServiceProxy.Recipe(request, 'GetCookbook', response => {

    //         //     let cookbook = response.Cookbook;
    //         //     this.Items = cookbook;
    //         //     this.DataValues = this.Items.Values;
    //         //     this.CookbookRecipetemplatevalues = this.Items;

    //         //     let categoriesIncluded = this.CookbookRecipetemplatevalues.Metadata.Collections.Categories_Included;
    //         //     let categoriesExcluded = this.CookbookRecipetemplatevalues.Metadata.Collections.Categories_Excluded;
    //         //     if (categoriesIncluded && categoriesIncluded.length > 0) {
    //         //         this.IsIncluded = true; this.ViewMode = 'Included';
    //         //     }
    //         //     else if (categoriesExcluded && categoriesExcluded.length > 0) {
    //         //         this.IsExcluded = true; this.ViewMode = 'Excluded';
    //         //     }

    //         //     if (categoriesIncluded && categoriesIncluded.length == 0 && (categoriesExcluded && categoriesExcluded.length == 0)) {
    //         //         this.IsIncluded = true;
    //         //     }

    //         //     this.getTemplate(this.Items);
    //         //     this.CurrentPage = "Summary";
    //         //     //this.HeaderName = this.DataValues.Name;
    //         //     this.HeaderName = this.DataValues ? this.DataValues.Name : "";

    //         // });
    //     }
    //     else {

    //         if (!this.UserAccountId || !this.theUrlItemId) {
    //             let message = `ListRecipe=Invalid UserAccountId=${this.UserAccountId} or ItemId=${this.theUrlItemId} `;
    //             this.tools.error(message);
    //             this.tools.warn(message);
    //             return;

    //         }
    //         const listRecipeReponse = await this.refindServiceProxyTyped.GetListRecipeAsync(this.theUrlItemId) as any;
    //         if (listRecipeReponse.Success) {

    //             let recipe = listRecipeReponse.TheRecipes[0];
    //             this.Items = recipe;
    //             this.Template = this.Items;

    //             this.SummaryPageTitle = this.Items.Values.TemplateName;

    //             this.DataValues = this.Items.Values;
    //             if (listRecipeReponse.TheRecipes[0].Values.FPC_DisplaySent == 'true') { this.DataValues.FPC_DisplaySent = true; } else { this.DataValues.FPC_DisplaySent = false; }
    //             if (listRecipeReponse.TheRecipes[0].Values.FPC_UseAllCategories == 'true') { this.DataValues.FPC_UseAllCategories = true; } else { this.DataValues.FPC_UseAllCategories = false; }
    //             if (listRecipeReponse.TheRecipes[0].Values.FPC_UseFullNames == 'true') { this.DataValues.FPC_UseFullNames = true; } else { this.DataValues.FPC_UseFullNames = false; }
    //             if (listRecipeReponse.TheRecipes[0].Values.FPC_GroupByCategory == 'true') { this.DataValues.FPC_GroupByCategory = true; } else { this.DataValues.FPC_GroupByCategory = false; }

    //             this.CollectionData.MailAccounts = this.Items.Collections.MailAccounts[0];
    //             this.CategoriesIncluded = this.Items.Collections.Categories_Included;
    //             this.CategoriesExcluded = this.Items.Collections.Categories_Excluded;

    //             if (this.CategoriesIncluded.length > 0) { this.IsIncluded = true; this.ViewMode = 'Included'; } else if (this.CategoriesExcluded.length > 0) { this.IsExcluded = true; this.ViewMode = 'Excluded'; }
    //             if (this.CategoriesIncluded.length == 0 && this.CategoriesExcluded.length == 0) { this.IsIncluded = true; }

    //             this.getTemplate(this.Items);
    //             this.CurrentPage = "Summary";
    //             this.HeaderName = this.DataValues ? this.DataValues.Name : "";


    //             let responseAOD = await this.refindServiceProxyTyped.GetAccountsOnDeviceAsync();
    //             if (responseAOD.Success) {
    //                 this.Accounts = listRecipeReponse.Result;
    //             }


    //         }
    //     }
    //     this.checkListsValues();
    // }
    // public backToPageOld() {
    //     // Wizard Back Button was clicked
    //     if (this.CurrentPage == "Summary" && this.EditMode == true) {
    //         this.router.navigate([this.RecipeListUrl], { queryParams: { userAccountId: this.UserAccountId } });
    //         return;
    //     }
    //     if (this.CurrentPage == "Page1") {
    //         this.router.navigate([this.RecipeListUrl], { queryParams: { userAccountId: this.UserAccountId } });
    //     }
    //     let tt = this.isCookBookMode() ? this.CookBookTemplate : this.Template;
    //     this.backToPageTemplateOld(this.CurrentPage, this.Template);
    // }

    // private backToPageTemplateOld(curPage, aTemplate) {
    //     if (curPage != "Page1") {
    //         if (curPage == "Summary") {
    //             this.DisplaySectionTitle = this.DataValues.Name;
    //             this.CurrentPage = this.PageType = "Page" + aTemplate.Pages.length;
    //             this.CurrentTemplatePage = aTemplate.Pages[aTemplate.Pages.length - 1];
    //         }
    //         else {
    //             this.theCurrentPageNumber = curPage.match(/\d+/);
    //             if (this.TotalPages >= this.theCurrentPageNumber) {
    //                 this.theCurrentPageNumber--;
    //                 this.CurrentTemplatePage = aTemplate.Pages[this.theCurrentPageNumber - 1];
    //                 this.CurrentPage = this.PageType = "Page" + this.theCurrentPageNumber;
    //             }
    //         }
    //     }
    // }


    // public nextPageOld(curPage) {

    //     if (this.ValidationBlockAdvancePage) {
    //         this.tools.errorFast("Please make required changes before proceeding.");
    //         return;

    //     }
    //     this.tools.assert(curPage, "RCEL:nextPage:curPage is not set");
    //     this.isCookBookMode() ? this.nextPageCookBookMode(curPage) : this.nextPageRecipeModeOld(curPage);
    // }

    // private nextPageRecipeModeOld(curPage) {

    //     // for getting the next page
    //     this.theCurrentPageNumber = curPage.match(/\d+/);
    //     this.ShowrecipeCurrentPage = false;
    //     if (curPage == "Page1") {

    //         if (this.DataValues.Name == undefined || this.DataValues.Name == null || this.DataValues.Name == "") {
    //             this.ValidationFailedShowErrorMsg = true;
    //         }
    //         else {
    //             if (this.TotalPages > this.theCurrentPageNumber) {
    //                 this.theCurrentPageNumber++;
    //                 this.CurrentTemplatePage = this.Template.Pages[this.theCurrentPageNumber - 1];
    //                 this.CurrentPage = this.PageType = "Page" + this.theCurrentPageNumber;
    //             }
    //             else if (this.TotalPages == this.theCurrentPageNumber) {
    //                 this.DisplaySectionTitle = this.DataValues.Name;
    //                 this.PageType = this.CurrentPage = "Summary";
    //             }
    //         }
    //     }
    //     else {
    //         if (this.TotalPages > this.theCurrentPageNumber) {
    //             this.theCurrentPageNumber++;
    //             this.CurrentTemplatePage = this.Template.Pages[this.theCurrentPageNumber - 1];
    //             this.PageType = this.CurrentPage = "Page" + this.theCurrentPageNumber;
    //         }
    //         else if (this.TotalPages == this.theCurrentPageNumber) {
    //             this.DisplaySectionTitle = this.DataValues.Name;
    //             this.PageType = this.CurrentPage = "Summary";
    //         }

    //     }
    // }
