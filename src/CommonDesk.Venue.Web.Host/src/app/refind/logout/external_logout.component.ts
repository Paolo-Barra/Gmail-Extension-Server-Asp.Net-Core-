import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';


class LogoutComponentBase extends AppComponentBase implements OnInit {
    constructor(injector: Injector, private _appAuthService: AppAuthService) {
        super(injector);
    }
    ngOnInit(): void {
        this._appAuthService.logout();
    }
}


@Component({
    templateUrl: './external_logout.component.html',
    selector: 'ext-logout',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})

export class LogoutComponent extends LogoutComponentBase implements OnInit {
    constructor(injector: Injector, _appAuthService: AppAuthService, public _dataService: RefindUserDataService) {
        super(injector, _appAuthService);
        this.appAuthService = _appAuthService;        
    }
    appAuthService: AppAuthService;

    ngOnInit(): void {
        let logoutUrl = "";

        if (this.appSession.user.userName == "admin") {
            logoutUrl = "/account/login-admin";
        }
        else {
            logoutUrl = abp.setting.get('LogoutUrl');
        }
        this.appAuthService.logout(true, logoutUrl);
    }

}