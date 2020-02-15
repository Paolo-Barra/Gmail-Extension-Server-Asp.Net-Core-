import { Component, OnInit, HostListener } from '@angular/core';
import { GroupEditLogic } from './group-edit.logic.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { SelectGroupModalComponent } from '../select-group-modal/select-group-modal.component';
import { IDragResult, IGroupItem, IGroupMailItem, IMultiSelectItem, IMultipleDragResult } from '../group.interfaces';
import { CreateGroupModalComponent } from '../create-group-modal/create-group-modal.component';
import { RefindToolsService } from '@app/refind/refind-tools.service';
import { SelectModalComponent } from '../select-modal/select-modal.component';
import { ScrollEvent } from 'ngx-scroll-event';
@Component({
    selector: 'refind-group-edit',
    templateUrl: './group-edit.component.html',
    styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {

    groupId: string;
    groupName: string;
    type: string;
    modalRef: BsModalRef;
    viewActions: boolean = false;

    multiSelectItemsArray: IMultiSelectItem[] = [];

    isCardHover: boolean = false;


    constructor(
        public logic: GroupEditLogic,
        private _modalService: BsModalService,
        private tools: RefindToolsService
    ) {
    }

    ngOnInit() {
        this.logic.init();
    }

    @HostListener('document:keydown', ['$event'])
    onKeyPress($event: KeyboardEvent) {
        switch ($event.code) {
            case "Escape":
                this.multiSelectItemsArray = [];
                return;
        }
    }

    @HostListener('document:mousedown', ['$event'])
    onMouseDown($event: MouseEvent) {
        if (!$event.shiftKey && !$event.ctrlKey && !this.isCardHover) {
            this.multiSelectItemsArray = [];
        }
    }

    onGroupColumnDrop($event: IDragResult) {
        let groupsData = [...this.logic.groupsData.groups];

        let selectedGroups = groupsData.filter(item => item.selected);
        let hiddenGroups = groupsData.filter(item => !item.selected);

        const updatedgroupsData = GroupEditLogic.applyColumnDrag(selectedGroups, $event);
        this.logic.groupsData.groups = updatedgroupsData.concat(hiddenGroups);
        this.logic.saveGroupsLayoutToStorage();
    }

    onGroupCardDrop(
        col: IGroupItem,
        $event: IDragResult
    ): void {
        //handle ui updates here for the swimlane items
        if ($event.removedIndex === null && $event.addedIndex === null) {
            return;
        }

        if (this.multiSelectItemsArray.length) {
            if ($event.addedIndex !== null) {
                this.applyMultiSelectDragAndDrop($event, col);
            }
        } else {
            let groupsArray = [...this.logic.groupsData.groups];
            let changedColumn = groupsArray.find(item => item.CategoryId === col.CategoryId);
            const changedColumnIndex = groupsArray.findIndex(item => item.CategoryId === col.CategoryId);

            let newColumn = Object.assign({}, changedColumn);
            if ($event.addedIndex !== null) {
                $event.payload.Category = changedColumn.Category;
                $event.payload.CategoryId = changedColumn.CategoryId;
            }

            const newMessages = GroupEditLogic.applyCardDrag(changedColumn.Messages, $event);

            newColumn.Messages = newMessages;

            groupsArray.splice(changedColumnIndex, 1, newColumn);

            this.logic.groupsData.groups = groupsArray;


            // logic to force added index to always occur first and removed index to occur second
            if ($event.removedIndex !== null) {
                setTimeout(() => {
                    this.addGroupOperationToOperationArray($event, col);
                }, 5);
            }
            else {
                this.addGroupOperationToOperationArray($event, col);
            }
        }

    }

    static sortArray(a: IMultiSelectItem, b: IMultiSelectItem) {

        if (a.index < b.index) {
            return -1;
        }
        if (a.index > b.index) {
            return 1;
        }
        return 0;
    }

    /**
     * TODO Fix cancel for multi select operations
     */
    applyMultiSelectDragAndDrop($event: IDragResult, col: IGroupItem) {

        let operationsArray: IMultipleDragResult[] = [];

        this.multiSelectItemsArray.sort(GroupEditComponent.sortArray);

        let i = 0;

        while (this.multiSelectItemsArray.length > 0) {

            const selectedMailItem = this.multiSelectItemsArray.pop();

            for (let j = 0; j < 2; j++) {
                operationsArray.push({
                    addedIndex: j === 0 ? $event.addedIndex + i : null,
                    removedIndex: j === 1 ? selectedMailItem.index : null,
                    payload: selectedMailItem.mail,
                    addedColumn: col,
                    removedColumn: selectedMailItem.column
                });
            }
            i++;
        }

        if (!this.multiSelectItemsArray.length) {

            for (let i = 0; i < operationsArray.length; i++) {

                let operation = operationsArray[i];

                if (operation.addedIndex !== null) {
                    this.onGroupCardDrop(operation.addedColumn, {
                        addedIndex: operation.addedIndex,
                        payload: operation.payload,
                        removedIndex: null
                    });
                }

                if (operation.removedIndex !== null) {
                    this.onGroupCardDrop(operation.removedColumn, {
                        addedIndex: null,
                        payload: operation.payload,
                        removedIndex: operation.removedIndex
                    });
                }
            }
        }

    }

    selectGroup(col: IGroupItem, index: number) {

        this.modalRef = this._modalService.show(SelectModalComponent, {
            animated: true,
            backdrop: true,
            initialState: {
                groupArray: this.logic.groupsData,
                selectedGroupArray: [],
                groupId: this.groupId,
                hideModal: this.hideModal,
                group: col.Category,
                groupData: col,
                index
            }
        });
    }

    selectAll(col: IGroupItem, index: number, columnMenuPopover) {
        // add all the contacts in this column to the multiselect array
        if (this.multiSelectItemsArray.length) {
            return;
        }

        const multiSelectArray: IMultiSelectItem[] = col.Messages.map((item, index) => {
            return {
                mail: item,
                index,
                column: col
            }
        });
        this.multiSelectItemsArray = multiSelectArray;
    }

    removeGroup(col: IGroupItem, index: number) {
        if (col.Messages.length) {
            return this.tools.warningDialog("Please move all contacts to another group before attempting to remove this group.", "Ok");
        }

        if (Object.values(this.logic.groupsOperations).filter(item => item).length) {
            return this.tools.warningDialog("Please select save or cancel before attempting to remove a group.", "Ok");
        }
        this.tools.warningDialog(
            "Are you sure you want to remove this group?",
            'Yes')
            .then(async (isConfirmed) => {

                if (isConfirmed) {
                    await this.logic.removeGroup(col.CategoryId);
                    this.logic.groupsData.groups[index].selected = false;
                    this.logic.groupsData.groups.splice(index, 1);
                    this.logic.saveGroupsLayoutToStorage();
                }
            });
    }

    addOperationToPending(
        $event: IDragResult,
        column: IGroupItem
    ): void {

        if ($event.addedIndex === null && $event.removedIndex === null) {
            return;
        }

        const { Id } = $event.payload;

        const groupOperation = Object.assign({}, this.logic.groupsOperations[Id]);
        groupOperation.data = $event.payload;

        if ($event.addedIndex !== null) {
            groupOperation.newGroup = column;
            groupOperation.removedIndex = $event.addedIndex;
        }

        if ($event.removedIndex !== null) {
            groupOperation.prevGroup = column;
        }
    }

    addGroupOperationToOperationArray(
        $event: IDragResult,
        column: IGroupItem
    ) {
        if ($event.addedIndex === null && $event.removedIndex === null) {
            return;
        }

        const { Id } = $event.payload;
        const groupOperation = Object.assign({}, this.logic.groupsOperations[Id]);
        groupOperation.data = $event.payload;

        if ($event.addedIndex !== null) {
            groupOperation.newGroup = column;
            groupOperation.removedIndex = $event.addedIndex;
        }

        if ($event.removedIndex !== null) {
            groupOperation.addedIndex = $event.removedIndex;
            if (groupOperation.originalGroup === undefined || groupOperation.originalGroup === null) {
                groupOperation.originalGroup = column;
            }

        }

        if (groupOperation.originalGroup) {
            // DONE fixed group operation rollback if originalGroup Category and newGroup Category are same
            if (!groupOperation.newGroup) {
                this.logic.groupsOperations[Id] = null;
            } else if (groupOperation.originalGroup.Category !== groupOperation.newGroup.Category) {
                this.logic.groupsOperations[Id] = groupOperation;
            } else {
                this.logic.groupsOperations[Id] = null;
            }

        } else {
            this.logic.groupsOperations[Id] = groupOperation;
        }
        // updated logic to check if pending operations is true | false;
        this.viewActions = Object.values(this.logic.groupsOperations).filter(item => item).length > 0;
    }

    handleCancelGroupOperations() {

        this.tools.warningDialog(
            "All your changes will be lost. \nDo you want to continue?",
            'Yes')
            .then(isConfirmed => {
                if (isConfirmed) {
                    let groupOperationsArray = Object.values(this.logic.groupsOperations).filter(item => item);
                    /**
                     * Instead of removing items using the index in the array, remove them using the Column and the Category Id? 
                     */
                    groupOperationsArray.forEach(operation => {
                        // explicitly define a drag event to cancel the operations
                        const syntheticDragEvent: IDragResult = {
                            addedIndex: operation.addedIndex,
                            removedIndex: null,
                            payload: operation.data
                        };
                        this.onGroupCardDrop(operation.originalGroup, syntheticDragEvent);

                        const removeCardFromIndex = this.logic.groupsData.groups.findIndex(item => item.Category === operation.newGroup.Category);

                        // Removed group index is removeCardFromIndex
                        const newMessages = this.logic.groupsData.groups[removeCardFromIndex].Messages.filter(item => item.Id !== operation.data.Id);
                        this.logic.groupsData.groups[removeCardFromIndex].Messages = newMessages;
                    });
                    this.viewActions = false;
                    this.logic.groupsOperations = {};
                }
            });
    }

    getGroupCardPayload(columnId: string) {
        return (index: number) => {
            return this.logic.groupsData.groups.find(p => p.CategoryId === columnId).Messages[index];
        }
    }

    /**
     * Function to handle scrolling event for the swimlanes and append data for the next page
     */
    handleScroll($event: ScrollEvent, group: IGroupItem, index: number) {

        return;
        if ($event.isReachingBottom) {
            this.logic.fetchNextPage(group, index)
        }
    }


    async saveGroupOperations() {
        try {
            await this.logic.saveGroupOperations();
            this.viewActions = false;
        } catch (error) {

        }
    }

    groupSearch($event, column: IGroupItem) {
        const value = $event.target.value;
        if ($event.code === "Enter") {
            if (value === "") {
                return;
            }

            // TODO API call to fetch all the Categories for the column by filter
        }
    }

    handleOpenGroupModal(): void {
        this.modalRef = this._modalService.show(SelectGroupModalComponent, {
            animated: true,
            backdrop: true,
            initialState: {
                groupArray: this.logic.groupsData,
                groupId: this.groupId,
                hideModal: this.hideModal
            }
        });
    }

    handleCreateGroupModal(): void {

        this.modalRef = this._modalService.show(CreateGroupModalComponent, {
            animated: true,
            backdrop: true,
            keyboard: true,
            initialState: {
                hideModal: this.hideModal
            }
        });
    }

    hideModal = (): void => {
        if (this.modalRef) {
            this.modalRef.hide();
        }
    }

    get groupOperationsIsSet() {
        return Object.values(this.logic.groupsOperations).filter(item => item).length === 0;
    }

    cardHover($event: boolean) {
        this.isCardHover = $event;
    }

    cardMultiSelect({ data, operation }) {

        if (!this.multiSelectItemsArray.length || operation !== 'add') {
            this.multiSelectItemsArray = [];
            this.multiSelectItemsArray.push(data);
            return;
        }

        if (operation === 'add') {
            const tempArray = [...this.multiSelectItemsArray];

            // check if user only multi selects cards from a single Category swimlane
            if (tempArray.length) {
                if (tempArray[tempArray.length - 1].mail.Category !== data.mail.Category) {
                    return this.tools.info("Please select contacts from a single group");
                }
            }

            const isDataInArray = this.multiSelectItemsArray.find(item => item.mail.Id === data.mail.Id);

            if (!isDataInArray) {
                tempArray.push(data);
                this.multiSelectItemsArray = tempArray;
            }
        } else {
            const tempArray = [...this.multiSelectItemsArray];
            this.multiSelectItemsArray = tempArray.filter(item => item.mail.Id !== data.mail.Id);
        }
    }

    isCardMultiSelect(card: IGroupMailItem) {
        if (this.multiSelectItemsArray.length === 0) {
            return false;
        }
        return this.multiSelectItemsArray.find(item => item.mail.Id === card.Id) !== undefined;
    }


    getGroupByGroupName(groupName: string) {

        let groupData = this.logic.groupsData.groups.find(item => item.Category === groupName);
        return groupData;
    }


}
