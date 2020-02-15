import { CdCategoryDto } from "@shared/service-proxies/refind/ReFind.dtos";
import { Column } from "primeng/primeng";

export interface IGroupMailItem {
    ArchivedCategory: string;
    Category: string;
    CategoryId: string;
    DataType: string;
    Id: number;
    Source: string;
//    UserAccountId: string;
    Value?: string;
    PersonName: string;
    EmailAddress: string;
    Domain: string;
    UserCategory: string;
    DetectedAs: string;
    OpenCount: number;
    SentCount: number;
    ReceivedCount: number;
    InAddressBook: number;
    InAddressBookGroup: number;
    InWhiteList: number;
    InBlackList: number;
}

export interface IGroupItem {
    Category: string;
    Type: string;
    UserAccountId: string;
    CategoryId: string;
    Count: number;
    SortOrder: number;
    TotalMessages: number;
    PercentOfTotal: number;
    Rank:number;
    Messages?: IGroupMailItem[];
    error?: boolean;
    selected: boolean;
    Description: string;
    props?: {
        orientation: 'horizontal' | 'vertical',
        className: 'card-container'
    }
}

export interface IGroupData {
    type: string;
    props: {
        orientation: 'horizontal' | 'vertical'
    };
    groups: IGroupItem[];
}


export interface IDragResult {
    removedIndex: number;
    addedIndex: number;
    payload?;

}

export interface IMultipleDragResult {

    removedIndex: number;
    removedColumn: IGroupItem
    addedIndex: number;
    addedColumn: IGroupItem;
    payload: IGroupMailItem;
}

export interface IApplyDragResponse {
    operation: 'add' | 'remove' | null,
    children: Array<IGroupItem>
}


export interface IReassignCategory {
    [Id: string]: {
        prevGroup?: IGroupItem;
        newGroup?: IGroupItem;
        originalGroup?: IGroupItem;
        data?: IGroupMailItem;
        addedIndex?: number;
        removedIndex?: number;
    }
}


export interface IReassignCategoryResult {

    initialValue?: boolean;
    data?: {
        [Id: string]: {
            success: boolean;
        }
    },
}


export interface IGroupSelect {

    groups: IGroupItem[]
}



export interface IOnSelect {
    id: number;
    selected: boolean;
    name: CdCategoryDto;
}


export type IGroupOrderBy = 'JustTags' | 'JustDomains' | 'JustFrequencys' | 'JustNewSenders' | 'ResetOrder' | 'JustEmailAddress' | 'JustName' | 'JustAsend' | 'JustDecent';

export interface ICardClickEvent {
    data: {
        mail: IGroupMailItem,
        column: IGroupItem,
        index: number
    };
    operation: 'add' | 'remove'
}

export interface IMultiSelectItem {
    mail: IGroupMailItem,
    column: IGroupItem,
    index: number;
}


export interface IGroupLayout {
    Category: string,
    selected: boolean

}

export interface IOrderGroupItem {
    [Catgory: string]: {
        type?: string;
        max?: number;
        offset?: number;
        sortOrder?: 0 | 1; // 0 => ascending, 1 => descending
    }
}