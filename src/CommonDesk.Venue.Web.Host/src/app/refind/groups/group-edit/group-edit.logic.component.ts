import { Injectable } from "@angular/core";
import { RefindServiceProxyTyped } from "@app/refind/shared/service-proxies/refind-service-proxy-typed";
import { CategoryItemSourceOptions, ListCategoriesResponse, ListCategoryItemsResponse, ListGroupItemsResponse, CdGroupItemDto } from "@shared/service-proxies/refind/ReFind.dtos";
import { IGroupData, IReassignCategory, IApplyDragResponse, IDragResult, IGroupItem, IGroupOrderBy, IGroupLayout, IOrderGroupItem, IGroupMailItem } from "../group.interfaces";
import { BehaviorSubject } from "rxjs";
import { IReassignCategoryResult} from "../group.interfaces";
import { RefindToolsService } from "@app/refind/refind-tools.service";
import { LocalStorageService } from "@shared/utils/local-storage.service";
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';



@Injectable()
export class GroupEditLogic {
    // this does need a function] to normalize the data, could make it a static function
    // selectedGroups: String[] = [];

    // change this to an interface instead of any.
    groupsData: IGroupData;
    $onSave: BehaviorSubject<IReassignCategoryResult>;
    orderData: IOrderGroupItem = {};
    isOrdered: boolean = false;
    isSearchDecending: boolean[] = [false,false,false,false,false];

    static defaultGroups: string[] = [
        "Contacts",
        "People",
        "InterestingPeople",
        "Machines",
        "MailingList"
    ];

    /**
     * Initially, we need to only load three categories(Swimlanes) in the UI,
     * but the network will call all the groups at once, right?
     * It is true, so I guess we can mirror two different arrays - one in the logic, and the
     * other in the UI class.
     *
     * Another option, Create a different array that only holds the group id's and then use that to only load
     * the groups in that category.
     *
     * First order of business, write the UI for the modal to display the list of the categories that
     * are currently visible with checkboxes to indicate the visible group's swimlanes.
     */

    /**
     * Group operations to hold operations for moving contacts between groups
     * as a buffer before sending the operation array to the /ReassignCategory array.
     * I guess that would work, but the intricate details of that are still unbeknownst to me
     */
    groupsOperations: IReassignCategory = {};

    constructor(
        private refindServiceProxyTyped: RefindServiceProxyTyped,
        private tools: RefindToolsService,
        private localStorageService: LocalStorageService
    ) {
        this.groupsData = {
            groups: [],
            type: 'container',
            props: {
                orientation: 'horizontal'
            }
        };

        this.$onSave = new BehaviorSubject<IReassignCategoryResult>({
            initialValue: true
        });
    }

    async init() {

        // change this logic to fetch the messages for all the groups in a loop
        this.refindServiceProxyTyped.Init();
        // if (!this.groupsData.groups.length) 
        {
            const listCategoriesResponse: ListCategoriesResponse = await this.refindServiceProxyTyped.ListCategoriesAsync(null, CategoryItemSourceOptions.All, true);

            if (!listCategoriesResponse.Success) {
                this.tools.errorFast('An error occurred when fetching groups', '');
                return;
            }
            // let inarr = this.toGroupItemFromCdGroupItemDto(listCategoriesResponse.Categories );
            // this.normalizeGroupsData(inarr);
        }

    }

    /**
     * Call ListCategoryItems rest call.  Normaiizeds data for use in swimlanes UI.
     * Keeps a cached copy in localstorage 
     */
    async normalizeGroupsData(groups: IGroupItem[]) 
    {
        const groupLayoutArray: IGroupLayout[] = JSON.parse(localStorage.getItem("Venue/abpzerotemplate_local_storage/ruds:group-layout")) as IGroupLayout[] || [];
        this.groupsData.groups = groups;

        for (let i = 0; i < groups.length; i++) {

            let group = groups[i];

            this.orderData[group.Category] = {
                type: "JustNames"
            };
            var restAscending = this.isSearchDecending[i];
            var sortType = Rt.OrderByTypes.PersonName;

            const response = await this.refindServiceProxyTyped.ListGroupItemsAsync(group.Category, sortType,restAscending, 500,0);
 
            if (response.Success) {
                var r = this.toGroupMailItemListDto(response.Results);
                this.groupsData.groups[i].Messages = r;
            }
            else {
                group.error = true;
                group.Messages = [];
            }
   
//            let response: ListGroupItemsResponse = await this.refindServiceProxyTyped.ListGroupItemsAsync(group.Category, '');
//          let listCategoryItemsResponse: ListCategoryItemsResponse = await this.refindServiceProxyTyped.ListCategoryItemsAsync(group.Category, '');
            // if (response.Success) {
            //     group.error = false;
            //     let messages = listCategoryItemsResponse.Items.filter(item => item.DataType !== "Meta");
            //     group.Messages = messages;
            // }

            // if (response.Success) {
            //      group.error = false;
            //      group.Messages = this.toGroupMailItemListDto(response.Results);
            //  }

            // else {
            //     group.error = true;
            //     group.Messages = [];
            // }
            if (GroupEditLogic.defaultGroups.includes(group.Category)) {
                group.selected = true;
            }
        }

        if (groupLayoutArray.length) {
            this.updateGroupLayoutFromLocalStorage(groupLayoutArray);
            return;
        }

        this.isOrdered = true;
    }

    toGroupMailItemListDto(source:CdGroupItemDto[]) : IGroupMailItem[]
    {
        return source.map(item => 
            {
             let row: IGroupMailItem = {
                    ArchivedCategory:item.UserCategory,
                    Category:item.UserCategory,
                    CategoryId:"",
                    DataType: "",
                    Id: 0,
                    Source:item.UserCategory,
                    //UserAccountId:
                    Value:item.EmailAddress,
                    PersonName:item.PersonName,
                    EmailAddress:item.EmailAddress,
                    Domain: item.Domain,
                    UserCategory:item.UserCategory,
                    DetectedAs:item.DetectedAs,
                    OpenCount: item.OpenCount,
                    SentCount: item.SentCount,
                    ReceivedCount: item.ReceivedCount,
                    InAddressBook: item.InAddressBook,
                    InAddressBookGroup: item.InAddressBookGroup,
                    InWhiteList:item.InWhiteList,
                    InBlackList:item.InBlackList,
                };
                return row;
            }
        );
    }

    toGroupMailItemList(source:Rt.CdCategoryItem[]) : IGroupMailItem[]

    {
        return source.map(item => 
            {
             let row: IGroupMailItem = {
                    ArchivedCategory:item.ArchivedCategory,
                    Category:item.Category,
                    CategoryId:item.CategoryId,
                    DataType: item.DataType,
                    Id: item.Id,
                    Source:item.Source,
                    //UserAccountId:
                    Value:item.Value,
                    PersonName:"",
                    EmailAddress:item.Value,
                    Domain: "",
                    UserCategory:item.Category,
                    DetectedAs:"",
                    OpenCount: 0,
                    SentCount: 0,
                    ReceivedCount: 0,
                    InAddressBook: 0,
                    InAddressBookGroup: 0,
                    InWhiteList:0,
                    InBlackList:0,
                };
                return row;
            }
        );
    }
    toGroupItemFromCdGroupItemDto(source:Rt.CdCategoryDto[]) : IGroupMailItem[]

    {
        return source.map(item => 
            {
             let row: IGroupMailItem = {
                    ArchivedCategory: "",
                    CategoryId: "",
                    Source: "",
                    Category:item.Category,
                    DataType: item.DataType,
                    Id: item.Id,
                    //UserAccountId:
                    Value: "",
                    PersonName:"",
                    EmailAddress: "",
                    Domain: "",
                    UserCategory:item.Category,
                    DetectedAs:"",
                    OpenCount: 0,
                    SentCount: 0,
                    ReceivedCount: 0,
                    InAddressBook: 0,
                    InAddressBookGroup: 0,
                    InWhiteList:0,
                    InBlackList:0,
                };
                return row;
            }
        );
    }



    

    updateGroupLayoutFromLocalStorage(groupLayoutArray: IGroupLayout[]) {
        /**
         * Groups array is stored in groupsData.group
         * local storage returnssaf the layout for the groups previously altered
         */
        groupLayoutArray.forEach((layout, index) => {

            const groupItemIndex = this.groupsData.groups.findIndex(item => item.Category === layout.Category);
            if (groupItemIndex !== -1 && this.groupsData.groups[index] !== undefined) {
                this.groupsData.groups[groupItemIndex].selected = layout.selected;

                if (layout.Category !== this.groupsData.groups[index].Category) {
                    [this.groupsData.groups[index], this.groupsData.groups[groupItemIndex]] = [this.groupsData.groups[groupItemIndex], this.groupsData.groups[index]];
                }
            }
        });
        this.saveGroupsLayoutToStorage();

        this.isOrdered = true;
    }

    /**
        Creates a new category items using the AddCategory REST call
    **/
    async createGroup(groupName: string) {
        // send the request to AddCategoryItem api

        // TODO Add a call to the web service to check if the group name is allowed or not.
        const createGroupResponse = await this.refindServiceProxyTyped.AddCategoryItemAsync(groupName);

        if (createGroupResponse.Success) {
            this.tools.success(`New group '${groupName}' created successfully`);
            this.groupsData.groups.splice(0, 0, {
                Category: groupName,
                CategoryId: groupName + "_User_" + this.refindServiceProxyTyped.UserAccountId,
                error: false,
                Count: 0,
                Messages: [],
                PercentOfTotal: 0,
                SortOrder: 40,
                TotalMessages: 0,
                Type: 'Personal',
                selected: true,
                Rank: 0,
                Description: "",
                UserAccountId: this.refindServiceProxyTyped.UserAccountId
            });
            this.saveGroupsLayoutToStorage();
        }
    }

    /**
     * @param keyword
     * @param column
     *
     * Function to send a request to the api for filtering and then load the data to the group
     */
    filterGroupData(keyword: string, column: IGroupItem) {
        console.log(keyword, column);
    }


    // async resetOrder(column: IGroupItem, index: number) {

    //     // function to reset the orders for a column;
    //     this.orderData[column.Category].type = "JustNames";
    //     let listCategoryItemsResponse: ListCategoryItemsResponse = await this.refindServiceProxyTyped.ListCategoryItemsAsync(column.Category, '');

    //     this.groupsData.groups[index].Messages = listCategoryItemsResponse.Items.filter(item => item.DataType !== "Meta");
    // }

    /**
     * If menu is selected return true vs false.
     */
    isMenuItemSelected(type: IGroupOrderBy, column: IGroupItem, index: number) : boolean {    
        if(this.orderData[column.Category])
        {
            if(this.orderData[column.Category].type === type)
            {
                return true;
            }
        }
        return false;
    }
    

    /**
     * If menu item is selected show a checkmark, otherwize show a space. 
     * @param gbtype 
     * @param column 
     * @param index 
     */
    isMenuItemSelectedChecked(gbtype: IGroupOrderBy, column: IGroupItem, index: number) : string {    
        if(this.orderData[column.Category])
        {
            if(this.orderData[column.Category].type === gbtype)
            {
                // Display the box with a checkmark
                // https://en.wikipedia.org/wiki/Check_mark
//                return "<span>&#x2714;</span>";   
                return "<span>&#x1F5F9;</span>";

            }
        }
        // display an open box
        // http://jkorpela.fi/chars/spaces.html
        // https://www.fileformat.info/info/unicode/char/2610/index.htm
        return "<span>&#x2610;</span>";;
//        return "<span>&#x2003;</span>";;
    }


    /**
     * If menu item is selected show a checkmark, otherwize show a space. 
     * @param gbtype 
     * @param column 
     * @param index 
     */
    isAscendingMenuItemSelectedChecked( val: boolean,column: number) : string {   
        let x = column+0; 
        return (this.isSearchDecending[column] == val ) ? "<span>&#x1F5F9;</span>" : "<span>&#x2610;</span>";
    }

    async toggleMenuItemAscending(type: boolean, column: IGroupItem, i: number) {
        this.clickOnMenuItem(this.lastGroup,column,i);
        this.isSearchDecending[i] = ! this.isSearchDecending[i];
    }
    lastGroup: IGroupOrderBy;
    /**
     *
     * @param config
     *
     * Function to order the column group data by the selected type
     * sends a request to the list api for the given.
     * I am kinda confused now, if all the columns have the order by
     * option, but the other groups don't have the data in the columns
     *
     * I guess for now, just load the first column and then load
     * the remaning column data later on.
     * */
    async clickOnMenuItem(type: IGroupOrderBy, column: IGroupItem, index: number) {

        this.lastGroup = type;
        let restType: Rt.OrderByTypes;
        switch(type)
        {
            case 'JustDomains':
                restType = Rt.OrderByTypes.Domain;
                break;
            case 'JustFrequencys':
                restType = Rt.OrderByTypes.ReceivedCount;
                break;
            case 'JustNewSenders':
                restType = Rt.OrderByTypes.Domain;
                break;
            case 'JustName':
                restType = Rt.OrderByTypes.PersonName;
                break;                
            default:
                restType = Rt.OrderByTypes.PersonName;
                break;
        }
        const orderDataForColumn = this.orderData[column.Category];

        var restAscending = this.isSearchDecending[index];
        // if (orderDataForColumn) {
        //     if (orderDataForColumn.type === type) {
        //         return;
        //     }
        // }

        if (!Object.values(this.groupsOperations).length) {
            // if (type === "ResetOrder") {
            //     this.resetOrder(column, index);
            //     return;
            // }
            this.orderData[column.Category] = {
                type
            };
            // const response = await this.refindServiceProxyTyped.
            //     ListCategoryItemsAdvancedAsync(column.Category, type, 2, this.orderData[column.Category].offset);
            const response = await this.refindServiceProxyTyped.ListGroupItemsAsync(column.Category, restType,restAscending, 500,0);
 
            if (response.Success) {
                var r = this.toGroupMailItemListDto(response.Results);
                this.groupsData.groups[index].Messages = r;
            }
            else {
                this.tools.error('An error occurred while fetching data');
            }
        }
        else {
            // show a popup to cancel all the pending operations first.
            this.tools.warn("Please save or cancel your pending operations first");
        }
    }


    /**
     * Takes a contact id, and a new group
     * and sends a request to the /ReassignCategory API
     * to move a contact to anotherr group.
     * Note that any group that is moved has an
     * archived property set to true. Use this as a flag
     * to show the Reset button on each card.
     */
    assignToGroup(): void | boolean {
    }

    /**
     * Save the pending group changes to server
     * TODO fix save operations: after applying save, any new card operation does not get changes to yellow color DONE
     */
     async saveGroupOperations(): Promise<any> {

        const saveGroupOperationsArray = Object.values(this.groupsOperations).filter(item => item);

        let reassignCateogryResult: IReassignCategoryResult = {
            initialValue: false,
            data: {}
        };

        const ReassignCategoryList = saveGroupOperationsArray.map(item => {
            return {
                Id: item.data.Id,
                NewCategory: item.newGroup.Category
            }
        });

        /**
         * We would need to assign new category to the saved operations,
         * or fetch new data for the columns that have changed?
         */
        for (let i = 0; i < saveGroupOperationsArray.length; i++) {
            reassignCateogryResult.data[saveGroupOperationsArray[i].data.Id] = {
                success: true
            };
        }

        await this.refindServiceProxyTyped.ReassignCategoryListAsync(ReassignCategoryList, false);

        this.$onSave.next(reassignCateogryResult);

        setTimeout(() => {
            this.$onSave.next({
                initialValue: false,
                data: {}
            });
        }, 4000);
        this.groupsOperations = {};
    }



    /**
     * Function to handle cancelling the pending operations in the groupOperations object
     */
    cancelGroupOperations() {

    }

    async removeGroup(categoryId: string) {
        await this.refindServiceProxyTyped.DeleteCategoryAsync(categoryId);
    }
    /**
     * Static function to apply drag and drop operation to array
     */

    static applyDrag(arr: any[], dragResult: IDragResult): IApplyDragResponse {

        let { removedIndex, addedIndex, payload } = dragResult;
        if (removedIndex === null && addedIndex === null) return { operation: null, children: [] }

        if (Array.isArray(payload)) {
            const result = [...arr];
            if (removedIndex !== null) {
                result.splice(removedIndex, payload.length);
                return { children: result, operation: 'remove' };
            }
            else if (addedIndex !== null) {
                result.splice(addedIndex, 0, ...payload);
                return { children: result, operation: 'add' };
            }
        }
        else {
            const result = [...arr];
            let itemToAdd = payload;

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
                return { children: result, operation: 'remove' };
            }

            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
                return { children: result, operation: 'add' };
            }

            return {
                children: result, operation: removedIndex !== null ? 'remove' : 'add'
            };
        }
    };

    static applyCardDrag(arr, dragResult) {

        const { removedIndex, addedIndex, payload } = dragResult;

        if (removedIndex === null && addedIndex === null) return arr;

        let resultArray = [...arr];
        let itemToAdd = payload;

        if (removedIndex !== null) {
            itemToAdd = resultArray.splice(removedIndex, 1)[0];
        }

        if (addedIndex !== null) {
            resultArray.splice(addedIndex, 0, itemToAdd);
        }

        return resultArray;
    }

    static applyColumnDrag(arr, dragResult: IDragResult) {
        const { removedIndex, addedIndex, payload } = dragResult;
        if (removedIndex === null && addedIndex === null) return arr;

        const result = [...arr];
        let itemToAdd = payload;

        if (removedIndex !== null) {
            itemToAdd = result.splice(removedIndex, 1)[0];
        }

        if (addedIndex !== null) {
            result.splice(addedIndex, 0, itemToAdd);
        }

        return result;
    };

    public handleOnSelect($event: IGroupItem[]) {
        this.groupsData.groups = $event;
        this.saveGroupsLayoutToStorage();
    }

    isCardInOperation(cardId: number) {
        let cardInOperation = this.groupsOperations[cardId];

        if (!cardInOperation) {
            return false;
        }

        if (!cardInOperation.originalGroup) {
            return true;
        }

        if (!cardInOperation.newGroup) {
            return false;
        }

        const condition = cardInOperation.newGroup.CategoryId !== cardInOperation.originalGroup.CategoryId;
        return condition;
    }


    handleOnGroupSelect(selectedCategory: string, index: number) {
        const prevCategory = this.groupsData.groups[index];

        if (prevCategory.Category === selectedCategory) {
            return;
        }

        const selectedElementIndex = this.groupsData.groups.findIndex(item => item.Category === selectedCategory);
        this.groupsData.groups[selectedElementIndex].selected = true;
        this.groupsData.groups[index].selected = false;
        [this.groupsData.groups[index], this.groupsData.groups[selectedElementIndex]] = [this.groupsData.groups[selectedElementIndex], this.groupsData.groups[index]];
        this.saveGroupsLayoutToStorage();

    }


    async fetchNextPage(group: IGroupItem, index: number) {

        const orderData = this.orderData[group.Category] || {};

        const { Messages } = this.groupsData.groups.find(item => item.Category === group.Category);
        //const response = await this.refindServiceProxyTyped.ListCategoriesAdvancedAsyc(group.Category, orderData.type, 10, Messages.length);

    }


    saveGroupsLayoutToStorage() {

        const layout: IGroupLayout[] = [];

        this.groupsData.groups.forEach((group, index) => {
            layout.push({
                Category: group.Category,
                selected: group.selected
            })
        });

        this.localStorageService.setItem('ruds:group-layout', layout);
    }

}