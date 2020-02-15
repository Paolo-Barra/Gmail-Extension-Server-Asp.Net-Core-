import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ActivatedRoute } from '@angular/router';
import { DevicesLogicComponent } from './devices.logic.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './devices.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class DevicesComponent extends AppComponentBase implements OnInit {

    constructor(injector: Injector, 
        public _activatedRoute: ActivatedRoute,
        public logic: DevicesLogicComponent,
        public toast: ToastrService)
    {

        super(injector);
    }

    ngOnInit() {
        
        this.logic.ngOnInit();        
    }     
}
