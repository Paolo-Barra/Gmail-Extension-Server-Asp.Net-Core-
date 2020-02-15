import { OnInit, Injector, ViewChild, Injectable, OnChanges, OnDestroy, AfterViewInit, AfterContentChecked, AfterContentInit } from '@angular/core';
import { CreateGroupDto } from '@shared/service-proxies/shared-proxies';
import { Paginator } from 'primeng/components/paginator/paginator';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindToolsService } from '../../refind-tools.service';
import { RefindServiceProxyTyped } from '@app/refind/shared/service-proxies/refind-service-proxy-typed';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import { LocalStorageService } from "@shared/utils/local-storage.service";
import { forEach } from '@angular/router/src/utils/collection';
import { toDate } from "@servicestack/client";

export class CategoryStatsUnion {
    categoryItem: Rt.CdCategoryItem;
    emailStat: Rt.DiscoveredEmailStatistics;
    personName:string;
    emailAddress: string;
    viewEmailUrl: string;

    listedGroup: string;        // group used to list items for display
    loadedGroup: string;        // group name used when was loaded
    checkedGroup: string;       // group used to calculate checkmark
    sendMessagesCount:number;
    receivedMessagesCount:number;
    openedMessagesCount:number;
    moving: boolean;
    reset: boolean;
    detectedAs: string;
    ruleName: string;
    firstMessageDate: string;
    lastMessageDate: string;
}

@Injectable()
export class GroupsDetailsLogicComponent {

    public searchTerm= "";
    public groupName = "";                     // the group that was parsed from the groupId url parm
    public neverOpened = false;
    public neverSent = false;
    public selectedColumnList:string[] = [];           // bound to each pulldown over the three columns

    userAccountId: string;
    moveItemData: CategoryStatsUnion;
    groupId: string;
    input: CreateGroupDto;
    groupsInCategory = 0;

    // used by checkbox items
    selectColumnMessage = "Select...";
    selectedCategory: string[] = [];

    // used by list of groups
    downloadedGroupTitles: string[] = [];                           // The downloaded list of all group titles
    downloadedGroupItems: CategoryStatsUnion[] = [];                // The downloaded list of all user information - not limited by group
    changesList: CategoryStatsUnion[] =[];                          // The list of changes that were made
    theLastSortedFilteredListResult:CategoryStatsUnion[]  = [];     // cache of sorted filtered groups rows

    groups: any;
    orderBy = "opened";
    reverse = true;
    private AREYOUSURE = "Are you sure?";

    @ViewChild('paginator') paginator: Paginator;

    // urls to get to this page
    public groupDetailsUrl: string;
    public groupsListUrl: string;

    // constrcutor arguments
    private activatedRoute: ActivatedRoute;
    public refindServiceProxyTyped: RefindServiceProxyTyped;
    public tools: RefindToolsService;
    public dataService: RefindUserDataService;
    private router: Router;
    private localStorage:LocalStorageService;

    constructor(injector: Injector) {

        this.activatedRoute = injector.get(ActivatedRoute);
        this.refindServiceProxyTyped = injector.get(RefindServiceProxyTyped);
        this.tools = injector.get(RefindToolsService);
        this.dataService = injector.get(RefindUserDataService);
        this.router = injector.get(Router);
        this.localStorage = injector.get(LocalStorageService);

        this.groupDetailsUrl  = 'app/main/groupDetails';
        this.groupsListUrl = 'app/main/groupslist';
    }

    ngOnInit() {
        this.refindServiceProxyTyped.Init();
        this.userAccountId = this.dataService.getUserAccountId();
        this.groupId = this.activatedRoute.snapshot.queryParams["groupId"];

        this.firstTimeInit();
        this.load(this.groupId);

    }

    ngOnDestroy() {
        console.log("------------------------form has been destroyed---------------------");
    }

    private firstTimeInit() {
        this.reset();
        // will be overwritten if requred
        this.selectedColumnList[0] = this.selectColumnMessage;
        this.selectedColumnList[1] = this.selectColumnMessage;
        this.selectedColumnList[2] = this.selectColumnMessage;
    }

    private reset() {
        this.selectedCategory = [];
        this.selectedColumnList= [];
        this.downloadedGroupTitles = [];
        this.downloadedGroupItems = [];
        this.theLastSortedFilteredListResult = [];
        this.changesList = [];
        this.searchTerm = "";
        this.neverOpened = false;
        this.neverSent = false;
    }


    private load(groupinfo:string) {
        this.loadGroupTitles();  // fornow this sets the person list.
        if(groupinfo) {
            // parse this url InterestingPeople_User_116342098561566205553
            let parts = groupinfo.split('_');
            this.groupName = parts[0];
            // change the first column to be the default group and the default column for the rest
            this.selectedColumnList[0] = parts[0];
            this.selectedCategory[0] = this.groupId;
            this.loadGroupItems("");    // get everything time
        } else {
            // the page was called without a groupId. So, ask user to select column
            this.groupName = this.selectColumnMessage;
            // change the first column to be the default group
            this.selectedColumnList[0] = this.selectColumnMessage;
            this.selectedColumnList[1] = this.selectColumnMessage;
            this.selectedColumnList[2] = this.selectColumnMessage;
            this.tools.warn("Please select a group to display.");
        }
        this.theLastSortedFilteredListResult = [];
    }
    private isEmpty(value): boolean {
        return (typeof value === "undefined" || value == null);
    }

    public consolelog(msg:string) {
        console.log(msg);
    }

    public isColumnValid(column:number): boolean {
        return  (this.selectedColumnList[column] !== this.selectColumnMessage);
    }


    public cbModelSetter(column:number,displayedRow:CategoryStatsUnion) {
        let thisColGroup = this.selectedColumnList[column];
        if(column === 0) {
            if(displayedRow.checkedGroup !== thisColGroup) {
                console.log(`set:${column}:email=${displayedRow.emailAddress}:${displayedRow.checkedGroup} => ${thisColGroup} `);
                displayedRow.checkedGroup = thisColGroup;
            } else {
                console.log(`set:${column}:email=${displayedRow.emailAddress}:unchanged `);
            }
        } else {
            if(displayedRow.checkedGroup !== thisColGroup) {
                console.log(`set:${column}:email=${displayedRow.emailAddress}:${displayedRow.checkedGroup} => ${thisColGroup} `);
                displayedRow.checkedGroup = thisColGroup;
            } else {
                console.log(`set:${column}:email=${displayedRow.emailAddress}:unchanged`);

            }
        }

    }


    public cbModelTester(column:number,displayedRow:CategoryStatsUnion): boolean {
        return displayedRow.checkedGroup ===  this.selectedColumnList[column];
    }

    public getDefaultGroupByRow(index:number,column:string): boolean {

        let retVar =  (column === this.selectedColumnList[index]);
//        console.log("getDefaultGroupByRow="+index+":column="+column+":value="+retVar)
        return retVar;

    }
    public theLastGroupItemsFilteredSorted(): CategoryStatsUnion[] {
        console.log(`theLastGroupItemsFilteredSorted:neverReplyed=[${this.neverSent}]:neverOpened=[${this.neverOpened}]`);
        this.theLastSortedFilteredListResult = [];
        return this.theLastGroupItemsFilteredSortedCached();
    }

    public totalPeopleInGroup(): string {
        return this.downloadedGroupItems.length.toString();
    }
    public totalFilteredPeopleInGroup(): string {
        return this.theLastSortedFilteredListResult.length.toString();

    }

    public theLastGroupItemsFilteredSortedCached(): CategoryStatsUnion[] {
        // called from angular to list groups
        // When redrawing the page, Angular loads this array.. For some reason, if i simply mouse over the page
        // this method is called.  So, we cached the results to only the array will be returned but not regenerated.
        if(this.theLastSortedFilteredListResult.length == 0) {
            this.theLastSortedFilteredListResult = this.loadGroupItemsFilteredSorted();
        }
        return this.theLastSortedFilteredListResult;
    }

    private loadGroupItemsFilteredSorted(): CategoryStatsUnion[] {

        let emptyList:CategoryStatsUnion[] = [];
        if(this.downloadedGroupItems.length === 0 ) { return emptyList; }

        let source = this.downloadedGroupItems.filter( row => {
                    return this.groupName === row.listedGroup;
            });
        console.log(`loadGroupItemsFilteredSorted:All=[${this.downloadedGroupItems.length}]:InCategory=[${source.length}]`);

        if(source.length == 0 ) { return emptyList; }
        this.groupsInCategory = source.length;

        let filtered = this.getFilteredGroups(source);                              // matches rows against the search input fields

        let retVar = this.getSortedGroups(filtered);
        console.log(`loadGroupItemsFilteredSorted:BeforeFilter=[${source.length}]:AfterFilter=[${filtered.length}]`);
        return retVar;
    }

    private async loadGroupItems(category:string): Promise<CategoryStatsUnion[]> {
        // load from cache here if rquired
        if(this.downloadedGroupItems.length === 0) {
            this.downloadedGroupItems = await this.reloadGroupItems(category);
        }
        return this.downloadedGroupItems;
    }

    public copyGroup(dir:number) {
        // called from angular when by the >> and << buttons
        if(dir === 0) {
            console.log("copy >>");
            // copy from col 0 to col 1

            // col 1 drop down is not yet selected
            if(this.selectedColumnList[1] === this.selectColumnMessage) {
                alert("destination dropdown not selected");
                return;
            }
            // how many items are selected on this side
            let cnt = this.theLastSortedFilteredListResult.filter(row => row.checkedGroup == this.selectedColumnList[0]);
            if(cnt.length === 0) {
                alert("No values to copy");
                return;
            }
            // if(cnt.length > 100)
            // {
            //     alert("Do you really want to copy that many values? ");
            //     return;
            // }
            // for the selected filter values, set the new groupName
            this.theLastSortedFilteredListResult.map(row => { row.checkedGroup = this.selectedColumnList[1];
            });
            // we should be copying everything to set the filter list to empty
            this.theLastSortedFilteredListResult = [];
        } else {
            if(this.selectedColumnList[1] === this.selectColumnMessage) {
                alert("destination dropdown not selected");
                return;
            }
            console.log("copy <<");

            let cnt = this.theLastSortedFilteredListResult.filter(row => row.checkedGroup == this.selectedColumnList[1]);
            if(cnt.length === 0) {
                alert("No values to copy");
                return;
            }
            // if(cnt.length > 100)
            // {
            //     alert("Do you really want to copy that many values? ");
            //     return;
            // }

            this.theLastSortedFilteredListResult.map(row => { row.checkedGroup = this.selectedColumnList[0]; });
        }
    }

    // public ToOurDateTime(DateTime dt)
    // {
    //     let options: Intl.DateTimeFormatOptions = {
    //         day: "numeric", month: "numeric", year: "numeric",
    //         hour: "2-digit", minute: "2-digit"
    //     };
    //     return this.dt.toLocaleDateString("en-GB", options) + " " + this.dt.toLocaleTimeString("en-GB", options);
    // }



    private reloadGroupItems(category:string = ""): CategoryStatsUnion[] {
        // lowest level call to actually download categorys and statistics and join them.
        if (category === undefined || category == null) { category = "";    }

        let retVar:CategoryStatsUnion[] = [];

        let promresponse = this.refindServiceProxyTyped.ListCategoryItems(
                        "",
                        Rt.CategoryItemTypeOptions.JustEmail,
                        Rt.CategoryItemDataTypeOptions.JustEmailAddresses);
            promresponse.then(
                (response) => {
                 if (response.Success) {
                    // remove all of the groups that are not assoicated with users
                    let stats = response.Items.filter(x => x.DataType !== Rt.CategoryItemDataType.Meta);          // the metas are the group names wiithout user associations

                    // build a list of email addresses
                    let emailAddressList = stats.map(x => x.Value);

                    // get the DiscoveredEmailStatistics[] for those email addreses
                    let promRespStats = this.refindServiceProxyTyped.GetStatistics(emailAddressList);
                    promRespStats.then(
                        (responseStats) =>  {
                            if (responseStats.Success) {

                                for (let i = 0; i < stats.length; i++) {
                                    // only find the statictss whos email addreses we have
                                    let element = new CategoryStatsUnion();
                                    retVar.push(element);
                                    element.categoryItem = stats[i];
                                    element.emailAddress = stats[i].Value;
                                    element.listedGroup = stats[i].Category;
                                    element.loadedGroup = stats[i].Category;
                                    element.checkedGroup = stats[i].Category;
                                    let aStatRow = responseStats.Statistics.filter(x => x.EmailAddress === stats[i].Value);
                                    if(aStatRow == null  || aStatRow.length == 0 ) {
                                        console.log("GDLC:Skipped="+element.emailAddress);
                                        continue;
                                    } else {
                                        element.emailStat = aStatRow[0];
                                        element.detectedAs = aStatRow[0].DetectedAs;
                                        element.personName = aStatRow[0].Name;
                                        element.sendMessagesCount = aStatRow[0].SentCount;
                                        element.receivedMessagesCount = aStatRow[0].ReceivedCount;
                                        element.openedMessagesCount = aStatRow[0].OpenCount;
                                        element.ruleName = aStatRow[0].RuleName;
                                        element.firstMessageDate = toDate(aStatRow[0].FirstMessageDate).toLocaleString();
                                        element.lastMessageDate = toDate(aStatRow[0].LastMessageDate).toLocaleString();
                                        element.viewEmailUrl = "https://mail.google.com/mail/u/0/#search/"+element.emailAddress;
                                    }
                                }
                            } else {
                                this.tools.warn("reloadGroupDataRaw:Unable to reload group information.");
                            }

                        },
                        (error) => {
                                this.tools.warn("reloadGroupDataRaw:Unable to reload group information.");
                        }
                    );
                }
            });
            return retVar;
    }


    public loadDropDownGroupList(): string[] {
        // called from angular to gets the list of all groups, prefixed with "select...."
        //let cleaned = this.downloadedGroupTitles.filter(row => !this.selectedColumnList.slice(1).includes(row));
        return [this.selectColumnMessage].concat(this.downloadedGroupTitles);
    }


    public async loadGroupTitles() {
        if(this.downloadedGroupTitles.length === 0 ) {
            this.downloadedGroupTitles = await this.reloadGroupTitles();
        }
    }

    async reloadGroupTitles(): Promise<string[]> {
        let retVar:string[] = [];
        let maccount = this.dataService.getPrimaryEmailAccount();
        let response = await this.refindServiceProxyTyped.ListCategoriesAsync(maccount, Rt.CategoryItemSourceOptions.All, true);
        if (response.Success) {
                let sortedList =  response.Categories.sort( (a,b) => a.Rank-b.Rank);
                retVar = sortedList.map(row => row.Category.toString());
        } else {
            this.tools.warn("loadGroupList:Unable to reload group information.");
        }
        return retVar;
    }

    getSortedGroups(input:CategoryStatsUnion[]): CategoryStatsUnion[] {

        return input.sort((r1,r2) => this.ReverseAbleSortRanker(r1,r2));
    }

    reloadPage() {
        this.reloadPageWithGroup(this.groupId);
    }

    reloadPageWithGroup(gid:string) {
        // create new url with this group in it
        let parts = this.groupId.split('_');
        parts[0] = gid;
        let newGroupId = parts.join('_');

        // load the new dataset
        this.load(newGroupId);

        // show it
        this.router.navigate([this.groupDetailsUrl], { queryParams: { userAccountId: this.userAccountId,groupId: newGroupId } });

  }

//   neverOpenedToggle()
//   {
//       this.neverOpened = ! this.neverOpened;
//       this.orderBy = 'opened';
//       this.theLastSortedFilteredListResult = [];
//       this.reverse = false;
//       this.reloadPage();
//   }

  public reloadPageWithGroupNew() {
      let parts = this.groupId.split('_');
      parts[0] = this.groupName;
      let newGroupId = parts.join('_');
      this.load(newGroupId);
      // always make the first column the newly selected group
      this.selectedColumnList[0] = this.groupName;
      this.router.navigate([this.groupDetailsUrl], { queryParams: { userAccountId: this.userAccountId,groupId: newGroupId } });

}


    public reverseOrder(choice: string) {
        // when column title is clicled on, reverse sort order
        console.log("ReverseOrder:Order="+this.reverse+"Field="+choice);

        this.reverse = !this.reverse;
        this.orderBy = choice;
        // reload the page.  Since  its inside of angular its fast
        this.theLastSortedFilteredListResult = this.loadGroupItemsFilteredSorted();
    }

    public searchChanged() {
        // since the search has changed, clear this  cache so the results will be regenerated
        this.theLastSortedFilteredListResult = [];
    }

    public isDropDownSelectable(column:number,choice:string): boolean {
        return this.selectedColumnList.includes(choice);
    }

    public getFilteredGroups(rawsource:CategoryStatsUnion[]): CategoryStatsUnion[] {

        let source:CategoryStatsUnion[];

        if(this.neverOpened === true  || this.neverSent === true ) {
            source = rawsource.filter(row => {
                if(this.neverOpened === true && row.openedMessagesCount !== 0 ) { return false; }
                if(this.neverSent === true && row.sendMessagesCount !== 0) { return false; }
                return true;
            });
        } else {
            source = rawsource;
        }


        if (this.searchTerm.length > 1) {
            // searchTerm is set in html to be something it wants to find.
            let thisSearch  =  this.searchTerm.toLowerCase();
            // filter on firstName or email Address case insensitive
            let searchFiltered = source.filter(row => {
                return row.emailAddress.toLowerCase().includes(thisSearch) || row.emailStat.Name.toLowerCase().includes(thisSearch);
            });
            console.log(`getFilteredCount:beforeSearchFiltered:search=[${thisSearch}]:beforeCount=[${source.length}]:afterCount=[${searchFiltered.length}]`);
            return searchFiltered;
        } else {
            return source;
        }
    }

    ReverseAbleSortRanker(r1:CategoryStatsUnion,r2:CategoryStatsUnion): number {

        let r = this.SortRanker(r1,r2);
        return (this.reverse) ? -r : r;         // invert the result set if reverse is set.
    }

    SortRanker(r1:CategoryStatsUnion,r2:CategoryStatsUnion): number {
        if(this.orderBy === 'opened') {
            return r1.openedMessagesCount - r2.openedMessagesCount;
        } else if(this.orderBy === 'sent') {
            return r1.sendMessagesCount - r2.sendMessagesCount;
        } else if(this.orderBy === 'received') {
            return r1.receivedMessagesCount - r2.receivedMessagesCount;
        } else if(this.orderBy === 'name') {
            if(r1.personName.toLowerCase() > r2.personName.toLowerCase()) { return 1; }
            if(r1.personName.toLowerCase() < r2.personName.toLowerCase()) { return -1; }
            return 0;
        }

        return 0;
    }
    changeButtonTitle(id:string,text:string)      {  document.getElementById(id).innerText = text;   }


    public isAccountLoaded(): boolean  { return (this.downloadedGroupTitles.length > 0) && (this.isEmpty(this.groupName) == false);  }

    // cacheKey(key:string) { return "refind-cache/"+key; }

    // rowDetails(rid:number) : string
    // {
    //     return "a long messages " + rid;
    // }

    public async GoBack() {
        // the back button was clicked.  Make sure there are no changes will be lost.
        if(this.changesList.length > 0) {
            await this.tools.warningDialog(
                "You have unsaved changes. Do you want to go back at this time? '",'Go Back')
                .then(async (isConfirmed) => {
                    if (isConfirmed) {
                        this.GoGoBack();
                    }
                });
                return;
        }
        this.GoGoBack();
    }

    private async GoGoBack() {
        this.router.navigate([this.groupsListUrl], { queryParams: { userAccountId: this.userAccountId } });
    }
    // async AddGroup()
    // {
    //     await this.tools.warningDialog(
    //         "Should we save the changes you've made so far? '" + "'?",'Save')
    //         .then(async (isConfirmed) => { if (isConfirmed) this.goSaveData(); });
    // }

    public async GoReset() {
        await this.tools.warningDialog(
            "Remove any changes to this page?","Reset")
            .then(async (isConfirmed) => { if (isConfirmed) { this.GoGoReset(); } });
    }

    private async GoGoReset() {
        this.changesList = [];
        this.reloadPage();
    }

    public async saveData() {
        // the save button was clicked.  Verify we should do anything
        let changed = this.downloadedGroupItems.filter(row => row.loadedGroup != row.checkedGroup);
        if(changed.length == 0 ) {
            this.tools.warn("No changes to save");
            return;
        }

        await this.tools.warningDialog(
             `You made ${changed.length} changes.  Do you want to save them now?`,"Save")
             .then(async (isConfirmed) => { if (isConfirmed) { this.goSaveData(changed); } });
    }

    private async goSaveData(changed:CategoryStatsUnion[]) {

        // convert from CategoryStatsUnion to CdCategoryItems
        let changes = changed.map(indata =>  {

            indata.categoryItem.Category = indata.checkedGroup;  // update the saved copy of the CDCategoryItem
            return indata.categoryItem;
        });
        // save all thechanges
        let result = await this.refindServiceProxyTyped.ChangeCategoryItemsAsync(changes);
        if(result.Success) {
            this.tools.success(`Saved ${changed.length} changes`);
        } else {
            this.tools.warn("Could not save those changes!");
        }
        // reset all of the caches and reload from the server
        this.reset();
        this.load(this.groupId);
    }

}
//     cbDefaultColumnTester(displayedRow:CategoryStatsUnion) : boolean
//     {
//         return true;

// //         var alen = this.changesList.length;
// //         for(let i = 0 ; i < alen;i++)
// //         {
// //             if(d == this.changesList)
// //         }
// //         // scan all downloaded items looking
// //         let match = this.changesList.filter(row => {
// //             return row.emailAddress ==
// //         });
// //         if(match[0])
// //         {
// // //            console.log(`cbDefaultColumnTester:${displayedRow.emailAddress}:Set to true`);
// //             return false;
// //         }
// // //        console.log(`cbDefaultColumnTester:${displayedRow.emailAddress}:Set to false`);
// //         return true;
//     }    // cbModelTesterOld(column:number,displayedRow:CategoryStatsUnion) : boolean
    // {
    //     // called everytime a checkbox is dispalayed and its status is evaluated

    //     // get the title of this column in dropdown
    //     let theSelectedColumnTitle = this.selectedColumnList[column];
    //     if (theSelectedColumnTitle == this.selectColumnMessage)
    //     {
    //         // title of row has not been changed.  Its showing Select...
    //         return false;
    //     }
    //     // scan all downloaded items looking
    //     let match = this.theLastSortedFilteredListResult.filter(row => {
    //         return row.emailAddress == displayedRow.emailAddress && theSelectedColumnTitle == displayedRow.currentGroup
    //     });
    //     if(match[0])
    //     {
    //         //console.log("cbModelUpdaterTester=match=cNum:"+column+":cTitle="+theSelectedColumnTitle+":email="+displayedRow.emailAddress+":category="+displayedRow.currentGroup);
    //         return true;
    //     }
    //     return false;
    // }

        // // called everytime a checkbox is clicked or unclicked
        //   let duplicate = this.changesList.filter(row => {
        //       return row.currentGroup == displayedRow.currentGroup && row.emailAddress == displayedRow.emailAddress
        //   });
        //   if(duplicate[0] )
        //   {
        //         // found an existing row, just update it
        //         console.log("cbModelSetter:ChangedExisting:"+displayedRow.emailAddress+"     "+displayedRow.currentGroup+" >> "+theSelectedColumnTitle);
        //         duplicate[0].currentGroup = theSelectedColumnTitle;
        //   }
        //   else
        //   {
        //         // no duplicates found
        //         console.log("cbModelSetter:NewChange:"+displayedRow.emailAddress+"     "+displayedRow.currentGroup+" >> "+theSelectedColumnTitle);
        //         displayedRow.currentGroup = theSelectedColumnTitle;        // assign the group of the selected column to this message
        //         this.changesList.push(displayedRow);                       // add it to the group

        //  }

