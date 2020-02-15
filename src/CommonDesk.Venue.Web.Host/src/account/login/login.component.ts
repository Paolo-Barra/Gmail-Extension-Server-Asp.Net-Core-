import { AbpSessionService } from '@abp/session/abp-session.service';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SessionServiceProxy, UpdateUserSignInTokenOutput } from '@shared/service-proxies/service-proxies';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { ExternalLoginProvider, LoginService } from './login.service';
import { RefindAuthService } from '@refindRoot/AuthServices/refind.auth.service';
import { faGooglePlusSquare, faWindows, faGoogle, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { RefindToolsService } from '@app/refind/refind-tools.service';



@Component({
    templateUrl: './login-new.component.html',
    animations: [accountModuleAnimation()],
    styleUrls: ["./login.component.less", "./social-login.scss", "./login.component.scss"]
})
export class LoginComponent extends AppComponentBase implements OnInit {


    @ViewChild('loginForm') loginForm;
    isCompanyAccount: boolean = false;
    submitting = false;
    isMultiTenancyEnabled: boolean = this.multiTenancy.isEnabled;
    allowCreate: boolean = false;
    isAdminLogin: boolean = false;
    refindAuthService: RefindAuthService;
    isFreeAccount: false;

    faGooglePlus: IconDefinition = faGoogle;
    faWindows: IconDefinition = faWindows;

    googleProviderId: string = ExternalLoginProvider.GOOGLE;
    openIdProviderId: string = ExternalLoginProvider.OPENID;

    public loginService: LoginService;
    public _sessionService: AbpSessionService;
    public _sessionAppService: SessionServiceProxy;
    public _route: ActivatedRoute;
    public _router: Router;
    tools: any;

    constructor(
        injector: Injector,

    ) {
        super(injector);
        this.loginService = injector.get(LoginService);
        this._sessionService = injector.get(AbpSessionService);
        this._sessionAppService = injector.get(SessionServiceProxy);
        this._route = injector.get(ActivatedRoute);
        this._router = injector.get(Router);
        this.refindAuthService = new RefindAuthService(injector);
        this.tools = injector.get(RefindToolsService);
        const navigation = this._router.getCurrentNavigation();
        if (navigation) {
            if (navigation.extras.state) {
                this.isFreeAccount = navigation.extras.state.isFreeAccount;
            }
        }
    }

    get multiTenancySideIsTeanant(): boolean {
        return this._sessionService.tenantId > 0;
    }

    get isTenantSelfRegistrationAllowed(): boolean {
        return this.setting.getBoolean('App.TenantManagement.AllowSelfRegistration');
    }

    get isSelfRegistrationAllowed(): boolean {
        if (!this._sessionService.tenantId) {
            return false;
        }

        return this.setting.getBoolean('App.UserManagement.AllowSelfRegistration');
    }

    ngOnInit(): void {
        this.isAdminLogin = this._route.snapshot.data['isAdminLogin'];

        if (this._sessionService.userId > 0 && UrlHelper.getReturnUrl() && UrlHelper.getSingleSignIn()) {
            this._sessionAppService.updateUserSignInToken()
                .subscribe((result: UpdateUserSignInTokenOutput) => {
                    const initialReturnUrl = UrlHelper.getReturnUrl();
                    const returnUrl = initialReturnUrl + (initialReturnUrl.indexOf('?') >= 0 ? '&' : '?') +
                        'accessToken=' + result.signInToken +
                        '&userId=' + result.encodedUserId +
                        '&tenantId=' + result.encodedTenantId;

                    location.href = returnUrl;
                });
        }
    }

    login(): void {
        if (this.loginForm.valid) {
            abp.ui.setBusy(undefined, '', 1);
            this.submitting = true;
            this.loginService.authenticate(
                () => {
                    this.submitting = false;
                    abp.ui.clearBusy();
                }
            );
        }
    }

    externalCreateAccount(provider: ExternalLoginProvider) {

        // called from html
        let url = abp.setting.get('RefindCreateOAuthRedirectUrl');
        console.log("LC:externalCreateAccount:RefindCreateOAuthRedirectUrl=" + url);

        this.refindAuthService.startAccountCreateProcess(provider);
    }

    externalLoginAccount(provider: ExternalLoginProvider) {
        let url = abp.setting.get('RefindLoginOAuthRedirectUrl');
        console.log("LC:externalLoginAccount:RefindLoginOAuthRedirectUrl=" + url);

        this.refindAuthService.startAccountLoginProcess(provider);
    }

    authenticate(providerId: string) {
        if (providerId === undefined) {
            console.error("LC:authenticate:Id is passed as undefine");
            this.tools.warn("LC:authenticate:providerId is passed as undefine");
        }

        let provider = this.loginService.getExternalProvider(providerId);
        if (provider === undefined) {
            console.error(`LC:authenticate:Did not find provider with id ${providerId}`);
            this.tools.warn(`LC:authenticate:Did not find provider with id ${providerId}`);
        }

        if (this.isFreeAccount) {
            return this.externalCreateAccount(provider);
        }
        this.externalLoginAccount(provider);
    }

    handleCompanyAccounCheckbox($event) {
        this.isCompanyAccount = $event.target.checked;
    }
}
