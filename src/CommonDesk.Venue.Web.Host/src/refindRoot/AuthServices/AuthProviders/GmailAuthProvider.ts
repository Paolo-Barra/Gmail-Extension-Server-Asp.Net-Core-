import { Injectable, Injector } from '@angular/core';
import { IRefindAuthProvider } from './IRefindAuthProvider';
import { ExternalLoginProvider, LoginService } from '@account/login/login.service';
import { ExternalAuthenticateModel, ExternalAuthenticateResultModel, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { Router } from '@angular/router';
import { RefindToolsService } from '@app/refind/refind-tools.service';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import { RefindServiceProxyTyped } from '@app/refind/shared/service-proxies/refind-service-proxy-typed';
import { WizardFormData } from '@account/sign-up/wizard-form-data';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindAuthProviderBase } from './RefindAuthProviderBase';

declare const gapi: any; // Gmail api

@Injectable()
export class GmailAuthProvider extends RefindAuthProviderBase implements IRefindAuthProvider {

    router: Router;
    refindServiceProxyTyped: RefindServiceProxyTyped;
    tokenAuthService: TokenAuthServiceProxy;
    loginService: LoginService;
    gmailScopes: string;
    tools: RefindToolsService;
    dataService: RefindUserDataService;

    constructor(public injector: Injector, public provider: ExternalLoginProvider) {

        super();

        this.tokenAuthService = injector.get(TokenAuthServiceProxy);
        this.loginService = injector.get(LoginService);
        this.refindServiceProxyTyped = injector.get(RefindServiceProxyTyped);
        this.router = injector.get(Router);
        this.tools = injector.get(RefindToolsService);
        this.dataService = injector.get(RefindUserDataService);

        // Gmail API Scopes https://developers.google.com/gmail/api/auth/scopes

        this.gmailScopes =

            //'https://mail.google.com/ ' +
            'https://www.googleapis.com/auth/gmail.compose ' +
            //'https://www.googleapis.com/auth/gmail.insert ' +
            //'https://www.googleapis.com/auth/gmail.modify ' +
            //'https://www.googleapis.com/auth/gmail.send ' +

            // Gmail People API scopes https://developers.google.com/people/v1/how-tos/authorizing
            'https://www.googleapis.com/auth/contacts.readonly ' +
            'openid ' +
            'profile ' +
            'email';
    }

    async getAccountCreationState() {

        let ud = new Rt.UserDataRecord();
        ud.UserAccountId = this.dataService.getUserAccountId();
        ud.Type = Rt.UserTypeTypes.AccountCreationState;

        let response = await this.refindServiceProxyTyped.ReadUserMessage(ud);
        if(response.Success) {
            let p0 = response.Results.filter(row => row.SubType === Rt.UserTypesSubTypes.AccountCreationPhase0 ).length;
            let p1 = response.Results.filter(row => row.SubType === Rt.UserTypesSubTypes.AccountCreationPhase1 ).length;
            let p2 = response.Results.filter(row => row.SubType === Rt.UserTypesSubTypes.AccountCreationPhase2 ).length;
            console.log("GAP:GACS:login states ="+p0+":"+p1+":"+p2);
            if(p0 === 0 && p1 === 0 && p2 === 0  ) {  this.dataService.setCreateAccountState('never'); }
            else if(p0 === 1 && p1 === 1 && p2 === 0  ) {   this.dataService.setCreateAccountState('level1'); }
            else if(p0 === 1 && p1 === 1 && p2 === 1  ) {   this.dataService.setCreateAccountState('level2'); }

        }

    }

    startAccountLoginProcess() {
        try {
            this.loginService.initExternalLoginProviders(() => {

                let redirectUri = abp.setting.get('RefindLoginOAuthRedirectUrl');
                let provider = this.loginService.getExternalProvider(ExternalLoginProvider.GOOGLE);
                this.loginService.ensureExternalLoginProviderInitialized(provider, redirectUri, () => {

                    console.log("GAP:SALP:Asking Google, to ask user to select account");
                    console.log("GAP:SALP:redirectUri=" + redirectUri);

                    // Build datastructure google API call, select_account = Prompt the user to select an account
                    let ops = this.getGoogleoAuthAccountOptions("select_account", redirectUri);
                    Promise.resolve(gapi.auth2.getAuthInstance().grantOfflineAccess(ops).then(() => {
                        console.log("GAP:SALP:Complete");
                    }));
                });
            });

        } catch (error) {
            console.log("GAP:SALP:Error=" + error);
        }
    }

    async completeAccountLoginProcess(postUrl: string, originalRedirectUri: string, landingPageUri: string) {

        // Google has called us back because account CREATION process has completed
        console.log("GAP:CALP:Login with google implicit flow");

        // Extract the auth code from data google has provided us
        let authCode = this.getValueFromAuthResult(postUrl, "code");
        if (authCode == undefined) {
            console.warn("GAO:CALP:Unable to retrieve access code, can't login");
            return;
        }

        let profileData = this.getProfileFromAuthResult(postUrl);
        if (profileData != undefined) {

            // In oauth, the 'sub' property on the user profile is the UserAccountId
            this.dataService.setUserAccountId(profileData.sub);
            this.dataService.setDeviceId('Portal');

            // We got a user account id. Ensure the user and device ids are set on the service proxy
            this.refindServiceProxyTyped.Init();

            let response = await this.refindServiceProxyTyped.UserAccountExists();
            // if(response == null)
            // {
            //     this.tools.warn("UserAccountExists returned null");
            //     return;
            // }
            if (response.AccountExists) {
                try {

                    // This user had created an account before, we can allow them to login to the app and navigate to the dashboard

                    console.log("GAP:CALP:User registration validated, login in user=" + profileData.email);
                    this.setUserDetails(profileData, authCode);
                    this.dataService.setPrimaryEmailAccount(profileData.email);
                    // Exchange the access token on the sync service
                    await this.refindServiceProxyTyped.CreateOAuthProfile(Rt.OAuthTokenTypes.Gmail,
                        Rt.OAuthLoginTypes.Login,
                        authCode,
                        Rt.SyncAccountTypes.Gmail,
                        profileData.sub,
                        "Portal",
                        profileData.email + '_Gmail',
                        originalRedirectUri,
                        (authResponse) => {

                            console.log("GAP:CALP:AuthResponse= " + authResponse);

                            const model = new ExternalAuthenticateModel();
                            model.authProvider = ExternalLoginProvider.GOOGLE;
                            model.providerAccessCode = authResponse.AuthToken;
                            model.providerKey = profileData.sub;
                            model.singleSignIn = UrlHelper.getSingleSignIn();
                            model.returnUrl = UrlHelper.getReturnUrl();

                            this.userDetails.GivenName = authResponse.GivenName;
                            this.userDetails.FamilyName = authResponse.FamilyName;
                            this.userDetails.DisplayName = authResponse.DisplayName;

                            this.userDetails.OAuthUniqueId = authResponse.OAuthUniqueId;
                            this.userDetails.AccessToken = authResponse.AuthToken;
                            this.userDetails.RefreshToken = authResponse.RefreshToken;
                            this.userDetails.Expiration = authResponse.ExpirationDate;
                            this.dataService.setMailAccountId(profileData.email + '_Gmail');

                            console.log("GAP:CALP:logging into aspnetzero backend");
                            console.log("GAP:CALP:Going to page " + landingPageUri);

                            // Login to the account on the aspnet backend, this creates the session
                            this.loginToAspNetZeroBackend(model, landingPageUri, null, false);

                            abp.ui.clearBusy();

                        }, () => {
                            this.tools.error("GAP:CALP:subscribe issue");
                            abp.ui.clearBusy();
                        });
                } catch (err) {
                    this.tools.error("GAP:CALP:Error=" + err.message);
                    abp.ui.clearBusy();
                }
            } else {
                try {

                    // Someone attempted to login with a nonregistered account, show an error and redirect them to create an account
                    this.tools.error("Sorry but the user " + profileData.email + " is not registered.");
                    console.warn("GAP:CALP:User is not registered= " + profileData.email);
                    abp.ui.clearBusy();

                    this.router.navigate(["account/start"]);
                } catch (err) {
                    this.tools.error("GAP:CALP:Error=" + err.message);
                    abp.ui.clearBusy();
                }
            }
        } else {
            this.tools.error("GAP:CALP:Profile == undefined");
            abp.ui.clearBusy();
        }

        this.getAccountCreationState();
    }

    startAccountCreateProcess() {

        try {
            let redirectUri = abp.setting.get('RefindCreateOAuthRedirectUrl');
            console.log("GAP:StartAccountCreateProcess:Creating account with Gmail oAuth");
            console.log("GAP:StartAccountCreateProcess:redirectUri=" + redirectUri);
            // Build datastructure google API call. consent = Prompt the user for concent

            this.loginService.initExternalLoginProviders(() => {

                let provider = this.loginService.getExternalProvider(ExternalLoginProvider.GOOGLE);
                this.loginService.ensureExternalLoginProviderInitialized(provider, redirectUri, async () => {

                    let consentEmail = this.dataService.getConsentEmail();
                    if(consentEmail === undefined || consentEmail === "") {
                        console.warn("GAP:SACP:Did not find valid consent email, defaulting to presenting oauth consent dialog");
                    }

                    // Since we are too early in the oauth workflow we need to setup some defaults before calling IsAccountConsentGranted
                    // A this time we don't have the user account id yet, so we must use NA
                    this.dataService.setUserAccountId("NA");
                    this.dataService.setDeviceId('Portal');
                    this.refindServiceProxyTyped.Init();

                    let consentGrantedResp = await this.refindServiceProxyTyped.IsAccountConsentGranted(consentEmail + '_Gmail');
                    let oauthMode = consentGrantedResp.IsConsentGranted ? "select_account" : "consent";
                    console.log("GAP:SACP:IsConsentGranted=" + consentGrantedResp.IsConsentGranted);
                    console.log("GAP:SACP:Preseting oauth workflow=" + oauthMode);

                    let ops = this.getGoogleoAuthAccountOptions(oauthMode, redirectUri);
                    gapi.auth2.getAuthInstance().grantOfflineAccess(ops);
                    // Problem:  if this host is not registered with google we will not be notified of the error.
                    // we will fail silently.
                    // The probelem is documented here: https://github.com/google/google-api-javascript-client/issues/288
                    // https://developers.google.com/identity/sign-in/web/reference
                    //
                });
            });
        } catch (error) {
            console.error("GAP:SACP:Error=" + error);
        }
    }

    async completeAccountCreateProcess(postUrl: string, originalRedirectUri: string, landingPageUri: string, id: string, userAccountDto: WizardFormData) {

        try {

            console.log("GAP:completeAccountCreateProcess:Start:With GoogleImplicitFlow result");

            let profileData = this.getProfileFromAuthResult(postUrl);
            if (profileData != undefined) {

                // The the authCode for registration with sync service
                let authCode = this.getValueFromAuthResult(postUrl, "code");

                this.setUserDetails(profileData, authCode);

                // In oauth, the 'sub' property on the user profile is the UserAccountId
                this.dataService.setUserAccountId(profileData.sub);

                this.dataService.setDeviceId('Portal');

                // We got a user account id. Ensure the user and device ids are set on the service proxy
                this.refindServiceProxyTyped.Init();

                let consentEmail = this.dataService.getConsentEmail();
                let loginType = Rt.OAuthLoginTypes.Consent;
                if(consentEmail === undefined || consentEmail === "") {
                    console.warn("GAP:CMACP:Did not find valid consent email");
                } else {
                    let consentGrantedResp = await this.refindServiceProxyTyped.IsAccountConsentGranted(consentEmail + '_Gmail');
                    loginType = consentGrantedResp.IsConsentGranted ? Rt.OAuthLoginTypes.Login : Rt.OAuthLoginTypes.Consent;
                }

                console.log("GAP:completeAccountCreateProcess:Createing OauthProfile On server");
                // Exchange the access token on the sync service
                await this.refindServiceProxyTyped.CreateOAuthProfile(Rt.OAuthTokenTypes.Office365,
                    loginType,
                    authCode,
                    Rt.SyncAccountTypes.Gmail,
                    profileData.sub,
                    "Portal",
                    profileData.email + '_Gmail',
                    originalRedirectUri,
                    (authResponse) => {
                        console.log("GAP:completeAccountCreateProcess:Success");

                        const model = new ExternalAuthenticateModel();
                        model.authProvider = ExternalLoginProvider.GOOGLE;
                        model.providerAccessCode = authResponse.AuthToken;
                        model.providerKey = profileData.sub;
                        model.singleSignIn = UrlHelper.getSingleSignIn();
                        model.returnUrl = UrlHelper.getReturnUrl();

                        this.userDetails.GivenName = authResponse.GivenName;
                        this.userDetails.FamilyName = authResponse.FamilyName;
                        this.userDetails.DisplayName = authResponse.DisplayName;

                        this.userDetails.OAuthUniqueId = authResponse.OAuthUniqueId;
                        this.userDetails.AccessToken = authResponse.AuthToken;
                        this.userDetails.RefreshToken = authResponse.RefreshToken;
                        this.userDetails.Expiration = authResponse.ExpirationDate;
                        console.log("GAP:completeAccountCreateProcess:GivenName="+authResponse.GivenName);
                        console.log("GAP:completeAccountCreateProcess:FamilyName="+authResponse.FamilyName);
                        console.log("GAP:completeAccountCreateProcess:DisplayName="+authResponse.DisplayName);
                        console.log("GAP:completeAccountCreateProcess:OAuthUniqueId="+authResponse.OAuthUniqueId);

                        // Create the account on the aspnet backend
                        this.loginToAspNetZeroBackend(model, landingPageUri, userAccountDto, true);

                    },
                    (error) => {
                        this.tools.error(`GAP:completeAccountCreateProcess:CreateOAuthToken failed:${error}`);
                    });
            } else {
                this.tools.error("GAP:completeAccountCreateProcess:ProfileData == undefined");
            }

            this.getAccountCreationState();

        } catch (e) {
            this.tools.error("GAP:completeAccountCreateProcess:Error=" + e);
        }
    }


    private loginToAspNetZeroBackend(model: ExternalAuthenticateModel, redirectToPageUrl: string, userAccountDto: WizardFormData, isCreatingAccount: boolean) {

        console.log('GAP:LoginASPBack:Start');
        console.log('GAP:LoginASPBack:LoginId=' + model.providerKey);

        // Register the user with the aspnetzero backend.
        // This is where the ASPNETZERO account is created for the first time
        this.tokenAuthService.externalAuthenticate(model).subscribe(

            async (authResult: ExternalAuthenticateResultModel) => {
                console.log("GAP:LoginASPBack:Calling UserAccountId=" + authResult.refindUserAccountId);
                console.assert(authResult, "GAP:LoginASPBack:Assert failed,authResult === null");

                // // If we are logged in to the asp netzero backend, register with the sync service
                console.assert(this.userDetails, "GAP:LoginASPBack:Assert failed,userDetails === null");
                console.assert(authResult.userId !== 0, "GAP:LoginASPBack:Assert failed,authResult.userId === null");
                if (authResult.userId <= 0) {
                    this.tools.error("GAP:LoginASPBack:userid <= 0");
                    return;
                }

                // This is the db user id from the portal database
                this.userId = authResult.userId;

                // This is the userAccountId for the sync service
                this.userDetails.UserAccountId  = this.userAccountId = authResult.refindUserAccountId;
                this.userDetails.MailAccountId = this.userDetails.EmailAddress + "_Gmail", //mail account id
                this.dataService.setMailAccountId(this.userDetails.MailAccountId);
                this.userDetails.MailAccountType = "Gmail",
                this.userDetails.MailServer = "http://imap.gmail.com";
                this.userDetails.MailServerVersion = "";

                console.log("GAP:LoginASPBack:UserAccountId="+this.userDetails.UserAccountId);
                console.log("GAP:LoginASPBack:MailAccountId="+this.userDetails.MailAccountId);
                console.log("GAP:LoginASPBack:MailAccountType="+this.userDetails.MailAccountType);

                // This is where we used to create the sync service account.
                // save the userDetail for later on
                this.dataService.setAuthUserDetails(this.userDetails);

                //////////// tell sync service were created a portal account

                console.log('GAP:LoginASPBack:PortalAccountWasAddedAsync:Called');
                let response = await this.refindServiceProxyTyped.PortalAccountWasAddedAsync(this.userDetails.EmailAddress, this.userDetails.MailAccountId);
                if(response.Success) {
                    console.log('GAP:LoginASPBack:PortalAccountWasAddedAsync:Success');
                } else {
                    console.warn("GAP:LoginASPBack:PortalAccountWasAddedAsync failed");
                }

                console.log('GAP:LoginASPBack:LoginService:redirecting to='+redirectToPageUrl);
                // Login to the portal with the new user
                this.loginService.login(authResult.accessToken, authResult.encryptedAccessToken, authResult.expireInSeconds, false, '', redirectToPageUrl);
                abp.ui.clearBusy();
            },
            (error) => {
                this.tools.error("User Authenticate failed:", error);
                abp.ui.clearBusy();
            }
        );
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

    getGoogleoAuthAccountOptions(prompt: string, redirectUri: string) {
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

    logout() {

    }
}
