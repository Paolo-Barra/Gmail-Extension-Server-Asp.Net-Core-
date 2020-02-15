import { OnInit, Injector, ViewChild, Injectable } from '@angular/core';
import { CreateGroupDto } from '@shared/service-proxies/shared-proxies'
import { Paginator } from 'primeng/components/paginator/paginator';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindToolsService } from '../../refind-tools.service';
import { RefindServiceProxyTyped } from '@app/refind/shared/service-proxies/refind-service-proxy-typed';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';

export class CategoryStatsUnion {
    categoryItem: Rt.CdCategoryItem;
    emailStat: Rt.DiscoveredEmailStatistics;
    personName:string;
    emailAddress: string;
    pastGroup: string;
    currentGroup: string;
    sendMessagesCount:number;
    receivedMessagesCount:number;
    moving: boolean;
    reset: boolean;
}

// Notes: 
// How to work with radiobuttons in angular - https://stackoverflow.com/questions/38097472/radio-button-for-boolean-property?rq=1
// 

@Injectable()
export class GroupsDetailsLogicComponent implements OnInit {
    userAccountId: string;
    selectedCategory: string[] = [];
    moveItemData: CategoryStatsUnion;
    groupId: string;
    input: CreateGroupDto;
    groupName: string = "";
  
    // used by checkbox items 
    selectColumnMessage:string = "Select...";   
    selectedColumnList:string[] = [];           // bound to each pulldown over the three columns
    
    // used by list of groups 
    downloadedGroupTitlesList: Rt.CdCategoryDto[] = [];    // The downloaded list of groups 
    displayGroupTitlesList: Rt.CdCategoryDto[] = [];       // The displayed list of titleds 
    personList: CategoryStatsUnion[] = [];                    // 

    radioSelectionsList:string[] = [];

    searchTerm:any;
    groups: any;
    orderBy: string = "name";
    reverse: boolean = false;
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
    private router: Router

    constructor(injector: Injector) {

        this.activatedRoute = injector.get(ActivatedRoute);
        this.refindServiceProxyTyped = injector.get(RefindServiceProxyTyped);
        this.tools = injector.get(RefindToolsService);
        this.dataService = injector.get(RefindUserDataService);
        this.router = injector.get(Router);

        this.groupDetailsUrl  = 'app/main/groupDetails';
        this.groupsListUrl = 'app/main/groupslist';
    }

    ngOnInit() 
    {
        this.refindServiceProxyTyped.Init();
        this.userAccountId = this.dataService.getUserAccountId();
        this.groupId = this.activatedRoute.snapshot.queryParams["groupId"];
        
        this.loadGroupList();
        this.startup(this.groupId);
    }

    startup(groupinfo:string)
    {
        if(this.groupId)
        {
            // parse this url InterestingPeople_User_116342098561566205553
            let parts = groupinfo.split('_');
            this.groupName = parts[0];
            // change the first column to be the default group and the default column for the rest 
            this.selectedColumnList[0] = parts[0];
            this.selectedColumnList[1] = this.selectColumnMessage;
            this.selectedColumnList[2] = this.selectColumnMessage;
            //this.type = parts[1];
            this.selectedCategory[0] = this.groupId;
            this.loadGroupData(this.groupName);
        }
        else
        {
            // the page was called without a groupId. So, ask user to select column
            this.groupName = this.selectColumnMessage
            // change the first column to be the default group
            this.selectedColumnList[0] = this.selectColumnMessage;
            this.selectedColumnList[1] = this.selectColumnMessage;
            this.selectedColumnList[2] = this.selectColumnMessage;
            this.tools.warn("Please select a group to display.");
        }
    }
    private isEmpty(value): boolean {
        return (typeof value === "undefined" || value == null);
    }

    log(msg:string) {
        console.log(msg);
    }
    showDetailsPopup()
    {

    }

    isColumnValid(column:number) : boolean
    {
        return  (this.selectedColumnList[column] != this.selectColumnMessage);

    }

    //         const groupLayoutArray: IGroupLayout[] = JSON.parse(localStorage.getItem("Venue/abpzerotemplate_local_storage/ruds:group-layout")) as IGroupLayout[] || [];


    cbModelSetter(column:number,row:CategoryStatsUnion)
    {
          let newGroup = this.selectedColumnList[column];
          console.log("cbModelSetter:"+row.emailAddress+"     "+row.currentGroup+" >> "+newGroup);
          row.pastGroup = row.currentGroup;
          row.currentGroup = newGroup;
//        console.log("cbModelSetter:cNum="+column+":nName="+columnGroup+":email="+row.emailAddress+":category="+row.categoryItem.Category+":old="+row.categoryItem.ArchivedCategory);
    }

    cbModelTester(column:number,row:CategoryStatsUnion) : boolean
    {
        // called by each checkbox to determine if it should show as on or off 
        // make sure this column can be set 
        let columnGroup = this.selectedColumnList[column]
        if (columnGroup == this.selectColumnMessage)
        {
            return false;
        }
        if(columnGroup == row.currentGroup)
        {
            // console.log("cbModelUpdaterTester=cNum="+column+":nName="+columnGroup+":email="+row.emailAddress+":category="+row.categoryItem.Category);
            return true;
        }
        return false;
    }


    
    getDefaultGroupByRow(index:number,column:string) : boolean
    {

        let retVar =  (column === this.selectedColumnList[index]);
//        console.log("getDefaultGroupByRow="+index+":column="+column+":value="+retVar)
        return retVar;

    }

    changeButtonTitle(id:string,text:string)      {  document.getElementById(id).innerText = text;   }

    getGroupsDto() : Rt.CdCategoryDto[]  {  return this.displayGroupTitlesList; }

    isAccountLoaded() : boolean  { return (this.downloadedGroupTitlesList.length > 0) && (this.isEmpty(this.groupName) == false);  }

    async loadGroupData(category:string)
    {

        this.personList = await this.reloadGroupDataRaw(category);
    }


    async reloadGroupDataRaw(category:string = "") : Promise<CategoryStatsUnion[]> {

        if (category == undefined || category == null) { category = "";    }
        
        let retVar:CategoryStatsUnion[] = [];

        // get the list of CdCategoryItems for this group 
        let response = await this.refindServiceProxyTyped.ListCategoryItemsAsync(
            this.groupName,
                Rt.CategoryItemTypeOptions.JustEmail,
                Rt.CategoryItemDataTypeOptions.JustEmailAddresses);
        if (response.Success) {
            // remove all of the groups that are not assoicated with users 
            let stats = response.Items.filter(x => x.DataType !== Rt.CategoryItemDataType.Meta);          // the metas are the group names wiithout user associations 

            // build a list of email addresses 
            let emailAddressList = stats.map(x => x.Value);

            // get the DiscoveredEmailStatistics[] for those email addreses 
            let responseStats = await this.refindServiceProxyTyped.GetStatisticsAsync(emailAddressList);
            if (responseStats.Success) {

                for (let i = 0; i < stats.length; i++) {
                    // only find the statictss whos email addreses we have 
                    let aStatRow = responseStats.Statistics.filter(x => x.EmailAddress === stats[i].Value);

                    if (aStatRow) {
                        // combind the group associations with the facts about each eamail adddress into 
                        let element = new CategoryStatsUnion();
                        element.categoryItem = stats[i];
                        element.emailStat = aStatRow[0];
                        element.emailAddress = aStatRow[0].EmailAddress;
                        element.pastGroup = element.currentGroup = stats[i].Category;
                        element.personName = aStatRow[0].Name;
                        element.sendMessagesCount = aStatRow[0].SentCount;
                        element.receivedMessagesCount = aStatRow[0].ReceivedCount;
                        retVar.push(element);
                    }
                }
            }
        }
        else
        {
            this.tools.warn("reloadGroupDataRaw:Unable to reload group information.")
        }
        return retVar;
    }


    async reloadGroupDataRawOld(category:string) : Promise<CategoryStatsUnion[]> {

        if (category != undefined || category != null) {
            this.groupName = category;
        }
        let retVar:CategoryStatsUnion[] = [];

        // get the list of CdCategoryItems for this group 
        let response = await this.refindServiceProxyTyped.ListCategoryItemsAsync(
            this.groupName,
                Rt.CategoryItemTypeOptions.JustEmail,
                Rt.CategoryItemDataTypeOptions.JustEmailAddresses);
        if (response.Success) {
            // remove all of the groups that are not assoicated with users 
            let stats = response.Items.filter(x => x.DataType !== Rt.CategoryItemDataType.Meta);          // the metas are the group names wiithout user associations 

            // build a list of email addresses 
            let emailAddressList = stats.map(x => x.Value);

            // get the DiscoveredEmailStatistics[] for those email addreses 
            let responseStats = await this.refindServiceProxyTyped.GetStatisticsAsync(emailAddressList);
            if (responseStats.Success) {

                for (let i = 0; i < stats.length; i++) {
                    // only find the statictss whos email addreses we have 
                    let aStatRow = responseStats.Statistics.filter(x => x.EmailAddress === stats[i].Value);

                    if (aStatRow) {
                        // combind the group associations with the facts about each eamail adddress into 
                        let element = new CategoryStatsUnion();
                        element.categoryItem = stats[i];
                        element.emailStat = aStatRow[0];
                        element.emailAddress = aStatRow[0].EmailAddress;
                        element.pastGroup = element.currentGroup = stats[i].Category;
                        element.personName = aStatRow[0].Name;
                        element.sendMessagesCount = aStatRow[0].SentCount;
                        element.receivedMessagesCount = aStatRow[0].ReceivedCount;
                        retVar.push(element);
                    }
                }
            }
        }
        else
        {
            this.tools.warn("reloadGroupDataRaw:Unable to reload group information.")
        }
        return retVar;
    }

    async loadGroupList()
    {
        let maccount = this.dataService.getPrimaryEmailAccount();
        let responselc = await this.refindServiceProxyTyped.ListCategoriesAsync(maccount, Rt.CategoryItemSourceOptions.All, true);
        if (responselc.Success) {
            this.downloadedGroupTitlesList = responselc.Categories;
            // build the list of displayable groups 
            let selectArow = new Rt.CdCategoryDto();
            selectArow.Category = this.selectColumnMessage;
            this.displayGroupTitlesList = [selectArow].concat(this.downloadedGroupTitlesList);
        }
        else
        {
            this.tools.warn("loadGroupList:Unable to reload group information.")
        }

    }

    
    GoBack() {

        this.router.navigate([this.groupsListUrl], { queryParams: { userAccountId: this.userAccountId } });
    }

    async AddGroup() 
    {
        await this.tools.warningDialog(
            "Should we save the changes you've made so far? '" + "'?",'Save')
            .then(async (isConfirmed) => { if (isConfirmed) this.goSaveData(); });
    }

    async goAddGroup() {
        // let request = await this.refindServiceProxyTyped.DeleteCategoryAsync(this.groupId);
        // if (request.Success) {
        //     this.router.navigate([this.groupsListUrl], { queryParams: { userAccountId: this.userAccountId } });
        //     this.tools.success("Group deleted");
        // }
        // else {
        //     this.tools.error(request.Message);
        // }
    }


    async saveData() 
    {
        await this.tools.warningDialog(
            "Should we save the changes you've made so far? '" + this.groupName + "'?",'Save')
            .then(async (isConfirmed) => { if (isConfirmed) this.goSaveData(); });
    }

    async goSaveData() {
        // let request = await this.refindServiceProxyTyped.DeleteCategoryAsync(this.groupId);
        // if (request.Success) {
        //     this.router.navigate([this.groupsListUrl], { queryParams: { userAccountId: this.userAccountId } });
        //     this.tools.success("Group deleted");
        // }
        // else {
        //     this.tools.error(request.Message);
        // }
    }

    async deleteGroup() 
    {
        await this.tools.warningDialog(
            "Do you want to delete the group titled '" + this.groupName + "'?",
            'Delete')
            .then(async (isConfirmed) => { if (isConfirmed) this.goDeleteGroup(); });
    }

    async goDeleteGroup() {
        let request = await this.refindServiceProxyTyped.DeleteCategoryAsync(this.groupId);
        if (request.Success) {
            this.router.navigate([this.groupsListUrl], { queryParams: { userAccountId: this.userAccountId } });
            this.tools.success("Group deleted");
        }
        else {
            this.tools.error(request.Message);
        }
    }

    getFilteredSortedUsers() : CategoryStatsUnion[] 
    {
        var filtered = this.getFilteredGroups();         
        var sorted = this.getSortedGroups(filtered);
        //console.log("getFilteredSortedUsers:count:"+sorted.length);
        return sorted
    }

    getSortedGroups(input:CategoryStatsUnion[]): CategoryStatsUnion[] {

        return input.sort((r1,r2) => this.ReverseAbleSortRanker(r1,r2));
    }
    
    ReverseAbleSortRanker(r1:CategoryStatsUnion,r2:CategoryStatsUnion) : number 
    {

        let r = this.SortRanker(r1,r2);
        return (this.reverse) ? -r : r;         // invert the result set if reverse is set.
    }

    SortRanker(r1:CategoryStatsUnion,r2:CategoryStatsUnion) : number
    {
        // Allows sorting by the different fields we have on the screen 
        if(this.orderBy == 'name')
        {
            if(r1.personName.toLowerCase() > r2.personName.toLowerCase()) return 1;
            if(r1.personName.toLowerCase() < r2.personName.toLowerCase()) return -1;
            return 0;
        } 
        if(this.orderBy == 'received')
        {
            return r1.receivedMessagesCount - r2.receivedMessagesCount;
        } 
        if(this.orderBy == 'sent')
        {
            return r1.sendMessagesCount - r2.sendMessagesCount;
        } 
        return 0;
    };
    
    reloadPage(gid:string) { this.reloadPageWithGroup(this.groupId);}

    reloadPageWithGroup(gid:string)
    {
        let parts = this.groupId.split('_');
        parts[0] = gid,
        this.startup(parts.join('_'))
  }

    reverseOrder(choice: string) {
        console.log("ReverseOrder:Order="+this.reverse+"Field="+choice)

        this.reverse = !this.reverse;
        this.orderBy = choice;

        // reload the page.  Since  its inside of angular its fast
        this.reloadPage(this.groupId);
    }

    
    getFilteredGroups(): CategoryStatsUnion[] {
        // return a filtered list of results 
        // searchTerm is set in html to be something it wants to find.
        if (!this.searchTerm) {
            return this.personList;  
        }   
        let thisSearch  =  this.searchTerm.toString().toLowerCase();
        
        if(thisSearch.length < 2) {
            return this.personList;
        }

        // filter on firstName or email Address case insensitive 
        return this.personList.filter(row => 
        {
                   return row.emailAddress.toLowerCase().includes(thisSearch) || row.emailStat.Name.toLowerCase().includes(thisSearch)
        });
    }
}