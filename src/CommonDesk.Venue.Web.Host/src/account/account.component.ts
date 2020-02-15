import { Component, Injector, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppUiCustomizationService } from '@shared/common/ui/app-ui-customization.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { LoginService } from './login/login.service';

@Component({
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.less'],
    encapsulation: ViewEncapsulation.None
})

class AccountComponentBase extends AppComponentBase implements OnInit {

    private viewContainerRef: ViewContainerRef;

    currentYear: number = moment().year();
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;
    tenantChangeDisabledRoutes: string[] = [
        'select-edition',
        'buy',
        'upgrade',
        'extend',
        'register-tenant',
        'stripe-purchase',
        'stripe-subscribe',
        'stripe-update-subscription',
        'paypal-purchase'
    ];

    public constructor(
        injector: Injector,
        private _router: Router,
        private _loginService: LoginService,
        private _uiCustomizationService: AppUiCustomizationService,
        viewContainerRef: ViewContainerRef
    ) {
        super(injector);

        // We need this small hack in order to catch application root view container ref for modals
        this.viewContainerRef = viewContainerRef;
    }

    showTenantChange(): boolean {
        return false;
        if (!this._router.url) {
            return false;
        }

        if (_.filter(this.tenantChangeDisabledRoutes, route => this._router.url.indexOf('/account/' + route) >= 0).length) {
            return false;
        }

        return abp.multiTenancy.isEnabled && !this.supportsTenancyNameInUrl();
    }
    showLogo(): boolean {
        return false;

    }


    logoPath(): string {
        return ""; //  this.appRootUrl() + 'assets/common/images/logo.svg';

    }

    useFullWidthLayout(): boolean {
        return this._router.url.indexOf('/account/select-edition') >= 0;
    }

    ngOnInit(): void {
        this._loginService.init();
        document.body.className = this._uiCustomizationService.getAccountModuleBodyClass();
    }

    goToHome(): void {
        (window as any).location.href = '/';
    }

    getBgUrl(): string {
        return 'url(./assets/metronic/assets/demo/' + this.currentTheme.baseSettings.layout.themeColor + '/media/img/bg/bg-4.jpg)';
    }

    private supportsTenancyNameInUrl() {
        return (AppConsts.appBaseUrlFormat && AppConsts.appBaseUrlFormat.indexOf(AppConsts.tenancyNamePlaceHolderInUrl) >= 0);
    }
}

@Component({
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.less'],
    encapsulation: ViewEncapsulation.None
})

export class AccountComponent extends AccountComponentBase implements OnInit {

    public constructor(injector: Injector, _router: Router, _loginService: LoginService, _uiCustomizationService: AppUiCustomizationService, viewContainerRef: ViewContainerRef) {
        super(injector, _router, _loginService, _uiCustomizationService, viewContainerRef);
    }
    useFullWidthLayout(): boolean { return true; }

    ngOnInit() { super.ngOnInit(); }
}

// @Component({
//     templateUrl: './refind.account.component.html',
//     styleUrls: [ './account.component.less' ],
//     encapsulation: ViewEncapsulation.None
// })
// export class AccountComponentMobile extends AccountComponentBase implements OnInit {

//     public constructor(injector: Injector,_router: Router,_loginService: LoginService,_uiCustomizationService: AppUiCustomizationService,viewContainerRef: ViewContainerRef)
//     {
//         super(injector,_router,_loginService,_uiCustomizationService,viewContainerRef);
//     }
//     useFullWidthLayout(): boolean { return true; }
// }
