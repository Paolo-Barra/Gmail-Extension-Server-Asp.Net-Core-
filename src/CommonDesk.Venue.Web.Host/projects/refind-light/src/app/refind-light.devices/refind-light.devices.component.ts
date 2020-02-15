import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevicesLogicComponent } from '../../../../../src/app/refind/devices/devices.logic.component';
import { RefindUserDataService } from '../../../../../src/refindRoot/refind-user-data.service';

@Component({
    templateUrl: './refind-light.devices.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class RefindLightDevicesComponent implements OnInit {

    constructor(injector: Injector, 
        public activatedRoute: ActivatedRoute,
        public logic: DevicesLogicComponent,
        public dataService: RefindUserDataService) 
    {
    }

    ngOnInit() {
        
        let uid = this.activatedRoute.snapshot.queryParams["userAccountId"];
        this.dataService.setUserAccountId(uid);
        this.dataService.setDeviceId("Portal");

        this.logic.ngOnInit();        
    }     
}
