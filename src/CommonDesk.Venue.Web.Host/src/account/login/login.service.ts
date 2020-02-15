import { TokenService } from '@abp/auth/token.service';
import { LogService } from '@abp/log/log.service';
import { MessageService } from '@abp/message/message.service';
import { UtilsService } from '@abp/utils/utils.service';
import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//COMMONDESK
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AuthenticateModel, AuthenticateResultModel, ExternalAuthenticateModel, ExternalAuthenticateResultModel, ExternalLoginProviderInfoModel, TokenAuthServiceProxy, UserListDto } from '@shared/service-proxies/service-proxies';
import { ScriptLoaderService } from '@shared/utils/script-loader.service';
import * as AuthenticationContext from 'adal-angular/lib/adal';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';



declare const FB: any; // Facebook API
declare const gapi: any; // Facebook API
declare const WL: any; // Microsoft API
//declare const Buffer;

export class ExternalLoginProvider extends ExternalLoginProviderInfoModel {

    static readonly FACEBOOK: string = 'Facebook';
    static readonly GOOGLE: string = 'Google';
    static readonly MICROSOFT: string = 'Microsoft';
    static readonly OPENID: string = 'OpenIdConnect';
    static readonly WSFEDERATION: string = 'WsFederation';

    icon: string;
    initialized = false;

    constructor(providerInfo: ExternalLoginProviderInfoModel) {
        super();

        this.name = providerInfo.name;
        this.clientId = providerInfo.clientId;
        this.additionalParams = providerInfo.additionalParams;
        this.icon = ExternalLoginProvider.getSocialIcon(this.name);
    }

    private static getSocialIcon(providerName: string): string {
        providerName = providerName.toLowerCase();

        if (providerName === 'google') {
            providerName = 'googleplus';
        }

        return providerName;
    }
}

// COMMONDESK
declare function sendTodidRegister(userDetails): any;

@Injectable()
export class LoginService extends AppComponentBase {

    static readonly twoFactorRememberClientTokenName = 'TwoFactorRememberClientToken';

    authenticateModel: AuthenticateModel;
    authenticateResult: AuthenticateResultModel;
    public externalLoginProviders: ExternalLoginProvider[] = [];

    rememberMe: boolean;

    // COMMONDESK
    oAuthAuthenticateResult: ExternalAuthenticateResultModel;
    currentUser: UserListDto;
    userAccountId: string;
    userId: number;
    saving: boolean;
    getRedirectToUrl: any;
    isUserRegistered: boolean = false;
    isUserLoggedin: boolean = false;
    dataForMobile: any[] = [];
    gmailScopes: string;

    wsFederationAuthenticationContext: any;

    constructor(
        private _tokenAuthService: TokenAuthServiceProxy,
        private _router: Router,
        private _utilsService: UtilsService,
        private _messageService: MessageService,
        private _tokenService: TokenService,
        private _logService: LogService,
        public oauthService: OAuthService,

        // COMMONDESK
        private _activatedRoute: ActivatedRoute,
        // private _groupServiceProxy: VenueServiceProxy,
        private injector: Injector,
    ) {
        super(injector);
        this.clear();

        // https://developers.google.com/identity/protocols/OAuth2WebServer

        this.gmailScopes = 'https://mail.google.com/ ' +
            'https://www.googleapis.com/auth/gmail.compose ' +
            'https://www.googleapis.com/auth/gmail.insert ' +
            'https://www.googleapis.com/auth/gmail.modify ' +
            'https://www.googleapis.com/auth/gmail.send ' +
            'https://www.googleapis.com/auth/contacts.readonly ' +
            'https://www.googleapis.com/auth/plus.login ' +
            'openid ' +
            'profile ' +
            'email';

            //'https://www.googleapis.com/auth/gmail.labels ' +
            //'https://www.google.com/m8/feeds/ ' +
            //'https://www.googleapis.com/auth/contacts ' +
            //'https://www.googleapis.com/auth/admin.directory.user '  +
            //'https://www.googleapis.com/auth/admin.directory.group.member ' +
            //'https://www.googleapis.com/auth/admin.directory.group ' +

    }

    authenticate(finallyCallback?: () => void, redirectUrl?: string): void {
        finallyCallback = finallyCallback || (() => {
            abp.ui.clearBusy();
        });

        // We may switch to localStorage instead of cookies
        this.authenticateModel.twoFactorRememberClientToken = this._utilsService.getCookieValue(LoginService.twoFactorRememberClientTokenName);
        this.authenticateModel.singleSignIn = UrlHelper.getSingleSignIn();
        this.authenticateModel.returnUrl = UrlHelper.getReturnUrl();

        this._tokenAuthService
            .authenticate(this.authenticateModel)
            .pipe(finalize(finallyCallback))
            .subscribe((result: AuthenticateResultModel) => {
                this.processAuthenticateResult(result, redirectUrl);
            });
    }

    startCreatingAccountWithGoogleAuth(redirectUri: string) {
        // 'grantOfflineAccess' returns an authorization code that we can send to the sync service
        // Then the sync service can exchange it for an access and refresh token pair
        // consent = Prompt the user for concent
        gapi.auth2.getAuthInstance().grantOfflineAccess(this.getGoogleCreateAccountOptions("consent", redirectUri));
    }

    createAccountWithExternalProvider(provider: ExternalLoginProvider, redirectUri: string): void {
        this.ensureExternalLoginProviderInitialized(provider, redirectUri, () => {
            // if (provider.name === ExternalLoginProvider.FACEBOOK) {
            //     FB.login(response => {
            //         this.facebookLoginStatusChangeCallback(response);
            //     }, { scope: 'email' });
            // } else
            if (provider.name === ExternalLoginProvider.GOOGLE) {

                this.startCreatingAccountWithGoogleAuth(redirectUri);

            } else if (provider.name === ExternalLoginProvider.MICROSOFT) {
                WL.login({
                    scope: ['wl.signin', 'wl.basic', 'wl.emails']
                });
            }
        });
    }

    externalAuthenticate(provider: ExternalLoginProvider): void {
        this.ensureExternalLoginProviderInitialized(provider, '', () => {
            if (provider.name === ExternalLoginProvider.FACEBOOK) {
                FB.login(response => {
                    this.facebookLoginStatusChangeCallback(response);
                }, { scope: 'email' });
            } else if (provider.name === ExternalLoginProvider.GOOGLE) {
                gapi.auth2.getAuthInstance().signIn().then(() => {
                    this.googleLoginStatusChangeCallback(gapi.auth2.getAuthInstance().isSignedIn.get());
                });
            } else if (provider.name === ExternalLoginProvider.MICROSOFT) {
                WL.login({
                    scope: ['wl.signin', 'wl.basic', 'wl.emails']
                });
            }
        });
    }

    loginWithExternalProvider(provider: ExternalLoginProvider, redirectUri: string): void {
        this.ensureExternalLoginProviderInitialized(provider, redirectUri, () => {
            // if (provider.name === ExternalLoginProvider.FACEBOOK) {
            //     FB.login(response => {
            //         this.facebookLoginStatusChangeCallback(response);
            //     }, { scope: 'email' });
            // } else 
            if (provider.name === ExternalLoginProvider.GOOGLE) {

                this.startLoginAccountWithGoogleAuth(redirectUri);

            } else if (provider.name === ExternalLoginProvider.MICROSOFT) {
                WL.login({
                    scope: ['wl.signin', 'wl.basic', 'wl.emails']
                });
            }
        });
    }

    getGoogleCreateAccountOptions(prompt: string, redirectUri: string) {
        return {
            scope: this.gmailScopes,
            getBasicProfile: 'true',
            access_token: 'true',
            prompt: prompt,
            response_type: "offline",
            ux_mode: 'redirect',
            redirect_uri: redirectUri
        };
    }

    startLoginAccountWithGoogleAuth(redirectUri: string) {
        // We are going to pass control to google here, once the user goes through the auth process we'll get redirected to our site
        // At that time 'completeAccountLoginWithGoogleAuth' is called and we process the result of the login process
        // select_account = Prompt the user to select an account 
        try {
            var ops = this.getGoogleCreateAccountOptions("select_account", redirectUri);
            gapi.auth2.getAuthInstance().grantOfflineAccess(ops);

        } catch (error) {
            console.log("startLoginAccountWithGoogleAuth:Error=" + error);
        }
    }

    init(): void {
        console.log("LoginService.init()");

        this.initExternalLoginProviders();

        this.getRedirectToUrl = this._activatedRoute.snapshot.queryParams["redirectUrl"];
    }

    private processAuthenticateResult(authenticateResult: AuthenticateResultModel, redirectUrl?: string) {
        this.authenticateResult = authenticateResult;

        if (authenticateResult.shouldResetPassword) {
            // Password reset

            this._router.navigate(['account/reset-password'], {
                queryParams: {
                    userId: authenticateResult.userId,
                    tenantId: abp.session.tenantId,
                    resetCode: authenticateResult.passwordResetCode
                }
            });

            this.clear();

        } else if (authenticateResult.requiresTwoFactorVerification) {
            // Two factor authentication

            this._router.navigate(['account/send-code']);

        } else if (authenticateResult.accessToken) {
            // Successfully logged in
            if (authenticateResult.returnUrl && !redirectUrl) {
                redirectUrl = authenticateResult.returnUrl;
            }

            this.login(
                authenticateResult.accessToken,
                authenticateResult.encryptedAccessToken,
                authenticateResult.expireInSeconds,
                this.rememberMe,
                authenticateResult.twoFactorRememberClientToken,
                redirectUrl
            );

        } else {
            // Unexpected result!

            this._logService.warn('Unexpected authenticateResult!');
            this._router.navigate(['account/login']);

        }
    }
    // COMMONDESK
    login(accessToken: string, encryptedAccessToken: string, expireInSeconds: number, rememberMe?: boolean, twoFactorRememberClientToken?: string, redirectUrl?: string): boolean {

        let tokenExpireDate = rememberMe ? (new Date(new Date().getTime() + 1000 * expireInSeconds)) : undefined;

        +this._tokenService.setToken(accessToken, tokenExpireDate);

        this._utilsService.setCookieValue(
            AppConsts.authorization.encrptedAuthTokenName,
            encryptedAccessToken,
            tokenExpireDate,
            abp.appPath
        );

        if (twoFactorRememberClientToken) {
            this._utilsService.setCookieValue(
                LoginService.twoFactorRememberClientTokenName,
                twoFactorRememberClientToken,
                new Date(new Date().getTime() + 365 * 86400000), // 1 year
                abp.appPath
            );
        }
        
        if (redirectUrl) {

            // NOTE: This causes the issue with login failure the first time the app is launched
            // _router.navigate is not causing initialization of objects, probably because the site is not reloaded when navigating
            // Temporary fix is to use "location.href = redirectUrl;"

            location.href = redirectUrl;
            return true;

        } else {
            let initialUrl = UrlHelper.initialUrl;

            if (initialUrl.indexOf('/account') > 0) {
                initialUrl = AppConsts.appBaseUrl;
            }

            location.href = initialUrl;
            return true;
        }

    }

    private clear(): void {
        this.authenticateModel = new AuthenticateModel();
        this.authenticateModel.rememberClient = false;
        this.authenticateResult = null;
        this.rememberMe = false;
    }

    public initExternalLoginProviders(callback?: any) {

        console.log("LoginService.initExternalLoginProviders()");

        this._tokenAuthService
            .getExternalAuthenticationProviders()
            .subscribe((providers: ExternalLoginProviderInfoModel[]) => {
                this.externalLoginProviders = _.map(providers, p => {
                    console.log("initExternalLoginProviders:ProviderName=" + p.name);
                    return new ExternalLoginProvider(p)
                });

                if (callback) {
                    callback();
                }
            },
            (error) => {
                console.log("LoginService.initExternalLoginProviders:Error:", error);
            },
            () => {
                console.log("LoginService.getExternalAuthenticationProviders completed");
            });
    }

    ensureExternalLoginProviderInitialized(loginProvider: ExternalLoginProvider, redirectUri: string, callback: () => void) {
        if (loginProvider.initialized) {
            callback();
            return;
        }

        if (loginProvider.name === ExternalLoginProvider.FACEBOOK) {
            new ScriptLoaderService().load('//connect.facebook.net/en_US/sdk.js').then(() => {
                FB.init({
                    appId: loginProvider.clientId,
                    cookie: false,
                    xfbml: true,
                    version: 'v2.5'
                });

                FB.getLoginStatus(response => {
                    this.facebookLoginStatusChangeCallback(response);
                    if (response.status !== 'connected') {
                        callback();
                    }
                });
            });
        } else if (loginProvider.name === ExternalLoginProvider.GOOGLE) {
            new ScriptLoaderService().load('https://apis.google.com/js/platform.js').then(() => {
                gapi.load('auth2',
                    () => {
                        gapi.auth2.init(this.getGoogleDefaultSigninOptions(loginProvider.clientId, redirectUri)).then(() => {
                            callback();
                        });
                    });
            });
        } else if (loginProvider.name === ExternalLoginProvider.MICROSOFT) {
            new ScriptLoaderService().load('//js.live.net/v5.0/wl.js').then(() => {
                WL.Event.subscribe('auth.login', this.microsoftLogin);
                WL.init({
                    client_id: loginProvider.clientId,
                    scope: ['wl.signin', 'wl.basic', 'wl.emails'],
                    redirect_uri: AppConsts.appBaseUrl,
                    response_type: 'token'
                });
            });
        } else if (loginProvider.name === ExternalLoginProvider.OPENID) {
           // const authConfig = this.getOpenIdConnectConfig(loginProvider);
           // this.oauthService.configure(authConfig);
           // this.oauthService.initImplicitFlow('openIdConnect=1');
           callback();
        } else if (loginProvider.name === ExternalLoginProvider.WSFEDERATION) {
            let config = this.getWsFederationConnectConfig(loginProvider);
            this.wsFederationAuthenticationContext = new AuthenticationContext(config);
            this.wsFederationAuthenticationContext.login();
        }
    }

    private getWsFederationConnectConfig(loginProvider: ExternalLoginProvider): any {
        let config = {
            clientId: loginProvider.clientId,
            popUp: true,
            callback: this.wsFederationLoginStatusChangeCallback.bind(this)
        } as any;

        if (loginProvider.additionalParams['Tenant']) {
            config.tenant = loginProvider.additionalParams['Tenant'];
        }

        return config;
    }

    public getOpenIdConnectConfig(loginProvider: ExternalLoginProvider): AuthConfig {
        let authConfig = new AuthConfig();
        authConfig.loginUrl = loginProvider.additionalParams['LoginUrl'];
        authConfig.issuer = loginProvider.additionalParams['Authority'];

        // NOTE: We don't want to validate the issuer, we need to allow any office365 tenant
        authConfig.skipIssuerCheck = true;//loginProvider.additionalParams['ValidateIssuer'] === 'false';
        authConfig.clientId = loginProvider.clientId;
        authConfig.responseType = 'id_token token';
        //authConfig.redirectUri = window.location.origin + '/account/login';
        // TODO: Make the redirect url configurable for mobile/desktop
        authConfig.redirectUri = abp.setting.get('RefindLoginOAuthRedirectUrl');
        authConfig.scope = 'openid profile address email roles permissions';
        authConfig.requestAccessToken = true;
        authConfig.resource = "https://outlook.office365.com";

        return authConfig;
    }

    getGoogleDefaultSigninOptions(clientId: string, redirectUri: string) {
        return {
            clientId: clientId,
            scope: this.gmailScopes,
            getBasicProfile: 'true',
            access_token: 'true',
            prompt: "select_account",
            response_type: "offline",
            ux_mode: 'redirect',
            redirectUri: redirectUri
        };
    }

    private facebookLoginStatusChangeCallback(resp) {
        if (resp.status === 'connected') {
            const model = new ExternalAuthenticateModel();
            model.authProvider = ExternalLoginProvider.FACEBOOK;
            model.providerAccessCode = resp.authResponse.accessToken;
            model.providerKey = resp.authResponse.userID;
            model.singleSignIn = UrlHelper.getSingleSignIn();
            model.returnUrl = UrlHelper.getReturnUrl();

            this._tokenAuthService.externalAuthenticate(model)
                .subscribe((result: ExternalAuthenticateResultModel) => {
                    if (result.waitingForActivation) {
                        this._messageService.info('You have successfully registered. Waiting for activation!');
                        return;
                    }

                    this.login(result.accessToken, result.encryptedAccessToken, result.expireInSeconds, false, '', result.returnUrl);
                });
        }
    }

    public getExternalProvider(providerName: string) : ExternalLoginProvider {
        return _.filter(this.externalLoginProviders, { name: providerName })[0];
    }

    public openIdConnectLoginCallback(resp) {
        this.initExternalLoginProviders(() => {
            let openIdProvider = _.filter(this.externalLoginProviders, { name: 'OpenIdConnect' })[0];
            let authConfig = this.getOpenIdConnectConfig(openIdProvider);

            this.oauthService.configure(authConfig);

            abp.ui.setBusy();

            this.oauthService.tryLogin().then(() => {
                let claims = this.oauthService.getIdentityClaims();

                const model = new ExternalAuthenticateModel();
                model.authProvider = ExternalLoginProvider.OPENID;
                model.providerAccessCode = this.oauthService.getAccessToken();//getIdToken();
                model.providerKey = claims['sub'];
                model.singleSignIn = UrlHelper.getSingleSignIn();
                model.returnUrl = this.oauthService.redirectUri;//UrlHelper.getReturnUrl();

                this._tokenAuthService.externalAuthenticate(model)
                    .pipe(finalize(() => { abp.ui.unblock(); }))
                    .subscribe((result: ExternalAuthenticateResultModel) => {
                        // if (result.waitingForActivation) {
                        //     this._messageService.info('You have successfully registered. Waiting for activation!');
                        //     return;
                        // }

                        this.login(result.accessToken, result.encryptedAccessToken, result.expireInSeconds, false, '', result.returnUrl);
                    });
            });
        });
    }

    private googleLoginStatusChangeCallback(isSignedIn) {
        if (isSignedIn) {
            const model = new ExternalAuthenticateModel();
            model.authProvider = ExternalLoginProvider.GOOGLE;
            model.providerAccessCode = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
            model.providerKey = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
            model.singleSignIn = UrlHelper.getSingleSignIn();
            model.returnUrl = UrlHelper.getReturnUrl();

            this._tokenAuthService.externalAuthenticate(model)
                .subscribe((result: ExternalAuthenticateResultModel) => {
                    if (result.waitingForActivation) {
                        this._messageService.info('You have successfully registered. Waiting for activation!');
                        return;
                    }

                    this.login(result.accessToken, result.encryptedAccessToken, result.expireInSeconds, false, '', result.returnUrl);
                });
        }
    }

    public wsFederationLoginStatusChangeCallback(errorDesc, token, error, tokenType) {
        let user = this.wsFederationAuthenticationContext.getCachedUser();

        const model = new ExternalAuthenticateModel();
        model.authProvider = ExternalLoginProvider.WSFEDERATION;
        model.providerAccessCode = token;
        model.providerKey = user.profile.sub;
        model.singleSignIn = UrlHelper.getSingleSignIn();
        model.returnUrl = UrlHelper.getReturnUrl();

        this._tokenAuthService.externalAuthenticate(model)
            .subscribe((result: ExternalAuthenticateResultModel) => {
                if (result.waitingForActivation) {
                    this._messageService.info('You have successfully registered. Waiting for activation!');
                    this._router.navigate(['account/login']);
                    return;
                }

                this.login(result.accessToken, result.encryptedAccessToken, result.expireInSeconds, false, '', result.returnUrl);
            });
    }

    /**
    * Microsoft login is not completed yet, because of an error thrown by zone.js: https://github.com/angular/zone.js/issues/290
    */
    private microsoftLogin() {
        this._logService.debug(WL.getSession());
        const model = new ExternalAuthenticateModel();
        model.authProvider = ExternalLoginProvider.MICROSOFT;
        model.providerAccessCode = WL.getSession().access_token;
        model.providerKey = WL.getSession().id; // How to get id?
        model.singleSignIn = UrlHelper.getSingleSignIn();
        model.returnUrl = UrlHelper.getReturnUrl();

        this._tokenAuthService.externalAuthenticate(model)
            .subscribe((result: ExternalAuthenticateResultModel) => {
                if (result.waitingForActivation) {
                    this._messageService.info('You have successfully registered. Waiting for activation!');
                    return;
                }

                this.login(result.accessToken, result.encryptedAccessToken, result.expireInSeconds, false, '', result.returnUrl);
            });
    }
}
