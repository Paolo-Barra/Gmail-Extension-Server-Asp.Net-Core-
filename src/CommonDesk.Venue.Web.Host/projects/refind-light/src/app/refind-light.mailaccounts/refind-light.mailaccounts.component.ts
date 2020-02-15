import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MailAccountLogicComponent } from '../../../../../src/app/refind/mail-accounts/mail.accounts.logic.component';
import { RefindUserDataService } from '../../../../../src/refindRoot/refind-user-data.service';

@Component({
    templateUrl: './refind-light.mailaccounts.component.html',
    encapsulation: ViewEncapsulation.None
})
export class RefindLightMailAccountsComponent implements OnInit {
    
    logic: MailAccountLogicComponent;
    
    constructor(injector: Injector,
        public activatedRoute: ActivatedRoute,
        mailAccountLogic: MailAccountLogicComponent,
        public dataService: RefindUserDataService) 
     {
        this.logic = mailAccountLogic;
    }

    ngOnInit() {
    
        let uid = this.activatedRoute.snapshot.queryParams["userAccountId"];
        this.dataService.setUserAccountId(uid);
        this.dataService.setDeviceId("Portal");

        this.logic.ngOnInit();
        this.logic.getMailAccounts();
    }
}