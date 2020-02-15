import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsLogicComponent } from '../../../../../src/app/refind/groups/groupList/groups.logic.component';
import { CreateGroupDto } from '../../../../../src/shared/service-proxies/shared-proxies';
import { RefindUserDataService } from '../../../../../src/refindRoot/refind-user-data.service';

@Component({
    templateUrl: './refind-light.groups.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./refind-light.groups.component.css']
})
export class RefindLightGroupsComponentGmail {

    public dataService: RefindUserDataService;
    public logic: GroupsLogicComponent;
    public activatedRoute: ActivatedRoute;

    constructor(injector: Injector) {
        this.dataService = injector.get(RefindUserDataService);
        this.logic = injector.get(GroupsLogicComponent);
        this.activatedRoute = injector.get(ActivatedRoute);
    }

    ngOnInit() {

        let uid = this.activatedRoute.snapshot.queryParams["userAccountId"];
        this.dataService.setUserAccountId(uid);
        this.dataService.setDeviceId("Portal");

        this.logic.ngOnInit();
        this.logic.setGroupDto(CreateGroupDto.fromJS());
        this.logic.groupDetailsUrl = 'groupDetails';

        //this.logic.getGroups();
        
    }
}

@Component({
    templateUrl: './refind-light.groups.component.html',
    encapsulation: ViewEncapsulation.None,
    //animations: [appModuleAnimation()]
})
export class RefindLightGroupsComponentMobile {

    constructor(public _activatedRoute: ActivatedRoute, public logic: GroupsLogicComponent) {
    }

    ngOnInit() {

        this.logic.ngOnInit();
        this.logic.setGroupDto(CreateGroupDto.fromJS());
        this.logic.groupDetailsUrl = 'app/refind/groupDetails-mobile';

        //this.logic.getGroups();
        
    }
}
