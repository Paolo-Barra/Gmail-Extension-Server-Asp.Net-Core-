import { OnInit, Injector, ViewChild, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import { Router, ActivatedRoute } from '@angular/router';
//import { RefindServiceProxy } from '../../shared/service-proxies/refind-service-proxy';
import { AppConsts } from '../../../../shared/AppConsts';
import { RefindToolsService } from '@app/refind/refind-tools.service';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import { RefindServiceProxyTyped } from '@app/refind/shared/service-proxies/refind-service-proxy-typed';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';

@Injectable()
export class GroupsLogicComponent implements OnInit {

    userAccountId: string;
    deviceId: string;

    loadedGroupsRecords: Rt.CdCategoryDto[] = [];

    // accessed from dialog in html 
    showUnAcceptable: boolean = false;
    fieldRequired: boolean = false;    
    groupAlreadyExists: boolean = false;
    display: any;
    input:any;

    groupDetailsUrl: string;


    //    new_category: string;
    //    modalPopupInput: string;
    //    modelData: string;


    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector, 
        public refindServiceProxyTyped: RefindServiceProxyTyped,
        public httpClient: HttpClient, 
        public router: Router, 
        public tools: RefindToolsService,
        public dataService: RefindUserDataService
        ) 
    {        
    }

    setGroupDto(groupDto: any) {
        this.input = groupDto;
    }

    ngOnInit() {
       
        this.refindServiceProxyTyped.Init();

        this.userAccountId = this.dataService.getUserAccountId();
        this.deviceId = this.dataService.getDeviceId();
        this.tools.assert(this.userAccountId,"GLC:ngOnInit:userAccountId == null");
        this.tools.assert(this.deviceId,"GLC:ngOnInit:deviceId == null");
        this.loadGroups();
    }

    openPopup(): void {
        // This opens the popup.  Its done differently than whats defined in the bootstap manual to allow for validation.
        // Our valiadation is controled by the showUnAcceptable and FieldRequired messages
    
        this.display = 'block';         // accessed by a ngStyle in the dialog 
        this.fieldRequired = false;  
        this.groupAlreadyExists  = false;
    }

    onCloseHandled(): void {
        // called by dialog to close it self via ngstyle
        this.display = 'none';
    }

    async add_Gropus() {

        // called back when dialog add button is pressed 
        // dialog stores the input field in "input.category"
        if (this.input.category == null || this.input.category == undefined) {
            this.fieldRequired = true;
        }
        else {
            // the _ is a special character 
            let Invalid = this.input.category.includes("_");
            if (Invalid) {
                // display errors on dialog 
                this.showUnAcceptable = true;
                this.fieldRequired = false;
            }
            else {
                this.fieldRequired = false;
                let responselc = await this.refindServiceProxyTyped.AddCategoryItemAsync(this.input.category);
                if (responselc.Success) {
                    this.loadGroups();
                    this.display = 'none';  // allows dialog to be dismissed.
                }
                else
                {
                    // we should have better support for diferenating errors from duplicates. but api does not support it for now.
                    if(responselc.Message.startsWith("Error"))
                    this.groupAlreadyExists = true;
                }
            }
        }
    }
    getGroupsRecords() : any
    {
        return this.loadedGroupsRecords;
    }



    async loadGroups() 
    {
        let maccount = this.dataService.getPrimaryEmailAccount();
        let responselc = await this.refindServiceProxyTyped.ListCategoriesAsync(maccount, Rt.CategoryItemSourceOptions.All, true);
        if (responselc.Success) {
            this.loadedGroupsRecords = responselc.Categories.sort( (a,b) => a.Rank-b.Rank)
        }
    }


    loadGroupDetailsPage(id): void {

        this.router.navigate([this.groupDetailsUrl], {
            queryParams: {
                userAccountId: this.userAccountId,
                groupId: id,
            }
        });
    }
}
