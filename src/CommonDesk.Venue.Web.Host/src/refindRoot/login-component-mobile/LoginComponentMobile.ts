import { Component, OnInit, Injector } from "@angular/core";
import { accountModuleAnimation } from "@shared/animations/routerTransition";
import { ExternalLoginProvider } from "@account/login/login.service";
import { LoginComponent } from "@account/login/login.component";

// COMMONDESK
@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()],    
    styleUrls:['./login.component.mobile.less']
})
export class LoginComponentMobile extends LoginComponent implements OnInit {

    constructor(
        injector: Injector,
    ) {
        super(injector);
        console.log('LoginComponentMobile:constructor');
    }

    ngOnInit(): void {

        console.log('LCM:ngOnInit');

        this.loginService.init();
    }

    externalCreateAccount(provider: ExternalLoginProvider) {
        //this.reFindLoginService.createAccountWithExternalProvider(provider, abp.setting.get('RefindCreateOAuthRedirectUrl'));
    }
    externalLoginAccount(provider: ExternalLoginProvider) {
        //this.reFindLoginService.loginWithExternalProvider(provider, abp.setting.get('RefindLoginOAuthRedirectUrlMobile'));
    }
}

// COMMONDESK
@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()],    
    styleUrls:['./login.component.mobile.less']
})
export class LoginComponentGmail extends LoginComponent implements OnInit {

    constructor(
        injector: Injector,
        //  loginService: LoginService,
        //  reFindLoginService: ReFindLoginService,
        //  _router: Router,
        //  _sessionService: AbpSessionService,
        //  _sessionAppService: SessionServiceProxy,
        //  _route: ActivatedRoute
    ) {
        super(injector);
        console.log('LoginComponentGmail:constructor');
    }

    ngOnInit(): void {

        console.log('LCM:ngOnInit');

        this.loginService.init();
    }

    externalCreateAccount(provider: ExternalLoginProvider) {
        //this.reFindLoginService.createAccountWithExternalProvider(provider, abp.setting.get('RefindCreateOAuthRedirectUrl'));
    }
    externalLoginAccount(provider: ExternalLoginProvider) {
        //this.reFindLoginService.loginWithExternalProvider(provider, abp.setting.get('RefindLoginOAuthRedirectUrlGmail'));
    }
}
