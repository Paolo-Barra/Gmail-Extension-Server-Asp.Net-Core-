import { Component, OnInit, ViewEncapsulation, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateGroupDto } from '@shared/service-proxies/shared-proxies';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { GroupsLogicComponent } from './groups.logic.component';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';

@Component({
    templateUrl: './groups.component.html',
    styleUrls: [ './groups.component.css'],
    animations: [appModuleAnimation()]
})
export class GroupsComponent extends AppComponentBase {

    constructor(injector: Injector, 
        public httpClient: HttpClient, 
        public router: Router, 
        public _activatedRoute: ActivatedRoute,
        public logic: GroupsLogicComponent,
        public dataService: RefindUserDataService) {
        super(injector);
    }

    ngOnInit() {

        var a=1;
        this.logic.setGroupDto(CreateGroupDto.fromJS());
        this.logic.groupDetailsUrl = 'app/main/groupDetails';
        this.logic.ngOnInit();
    }   
    
    isAccountLoaded(){
        return this.logic.loadedGroupsRecords!=undefined || this.logic.loadedGroupsRecords!=null;
    }
}