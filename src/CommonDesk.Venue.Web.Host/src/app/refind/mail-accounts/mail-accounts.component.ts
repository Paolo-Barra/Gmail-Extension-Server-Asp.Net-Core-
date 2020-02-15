import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { MailAccountLogicComponent } from './mail.accounts.logic.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { RefindServiceProxyTyped } from '../shared/service-proxies/refind-service-proxy-typed';
import { RefindToolsService } from '../refind-tools.service';

@Component({
    templateUrl: './mail-accounts.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class MailAccountComponent extends AppComponentBase implements OnInit {
    logic: MailAccountLogicComponent;
    uid: string;
    did: string;

    constructor(injector: Injector,
        public _activatedRoute: ActivatedRoute,
        mailAccountLogic: MailAccountLogicComponent) {
        super(injector);

        this.logic = mailAccountLogic;
    }

    ngOnInit() {
        
        this.logic.ngOnInit();
        this.logic.getMailAccounts();
    }
}
