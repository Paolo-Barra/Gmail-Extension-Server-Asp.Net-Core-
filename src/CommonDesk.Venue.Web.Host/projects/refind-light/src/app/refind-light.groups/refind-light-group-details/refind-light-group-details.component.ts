import { Component, OnInit, ViewEncapsulation, Injector, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { trigger } from '@angular/animations';
import { GroupsDetailsLogicComponent } from '../../../../../../src/app/refind/groups/groupDetails/group-details.logic.component';
import { CreateGroupDto } from '../../../../../../src/shared/service-proxies/shared-proxies';

@Component({
    templateUrl: './refind-light-group-details.new.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [trigger('routerTransition', [])] 
})
export class RefindLightGroupsDetailsComponent implements OnInit {

    public logic : GroupsDetailsLogicComponent

    constructor(injector: Injector)
    {
        this.logic = injector.get(GroupsDetailsLogicComponent); 
    }

    ngOnInit() {

        this.logic.ngOnInit();        
        this.logic.groupDetailsUrl = 'groupsDetails';
        this.logic.groupsListUrl = 'groups';
    }
}