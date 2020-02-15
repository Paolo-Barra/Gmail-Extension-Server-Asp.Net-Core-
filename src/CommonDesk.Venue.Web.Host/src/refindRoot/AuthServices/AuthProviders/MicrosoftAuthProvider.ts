import { Injectable, Injector } from '@angular/core';
import { IRefindAuthProvider } from './IRefindAuthProvider';
import { Authentication, AdalConfig, User } from 'adal-typescript';
import { ExternalLoginProvider, LoginService } from '@account/login/login.service';
import { ExternalAuthenticateModel, TokenAuthServiceProxy, ExternalAuthenticateResultModel } from '@shared/service-proxies/service-proxies';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { Router } from '@angular/router';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import { WizardFormData } from '@account/sign-up/wizard-form-data';
import { RefindServiceProxyTyped } from '@app/refind/shared/service-proxies/refind-service-proxy-typed';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindToolsService } from '@app/refind/refind-tools.service';
import { RefindAuthProviderBase } from './RefindAuthProviderBase';

@Injectable()
export class MicrosoftAuthProvider extends RefindAuthProviderBase implements IRefindAuthProvider {

    router: Router;
    refindServiceProxyTyped: RefindServiceProxyTyped;
    tokenAuthService: TokenAuthServiceProxy;
    loginService: LoginService;
    dataService: RefindUserDataService;
    tools: RefindToolsService;
    
    constructor(public injector: Injector, public provider: ExternalLoginProvider) {

        super();

        this.tokenAuthService = injector.get(TokenAuthServiceProxy);
        this.loginService = injector.get(LoginService);
        this.tools = injector.get(RefindToolsService);
        this.refindServiceProxyTyped = injector.get(RefindServiceProxyTyped);
        this.router = injector.get(Router);
        this.dataService = injector.get(RefindUserDataService);        
    }

    startAccountLoginProcess() {
        
        let settings = this.getOpenIdSettings(this.provider, "code id_token", "select_account", abp.setting.get('RefindLoginOAuthRedirectUrl'));
        let context = Authentication.getContext(settings);
        context.login();
    }

    async completeAccountLoginProcess(postUrl: string, originalRedirectUri: string, landingPageUri: string) {

        var profileData = super.getProfileFromAuthResult(postUrl);
        if (profileData != undefined) {
                    
            let authCode = this.getValueFromAuthResult(postUrl, 'code');     
        
            // In oauth, the 'sub' property on the user profile is the UserAccountId
            this.dataService.setUserAccountId(profileData.sub);
            this.dataService.setDeviceId('Portal');

            this.refindServiceProxyTyped.Init();

            let response = await this.refindServiceProxyTyped.UserAccountExists();
            if (response.AccountExists) {
                try {
                    // This user had created an account before, we can allow them to login to the app and navigate to the dashboard

                    console.log("User registration validated, login in user=" + profileData.unique_name);

                    await this.refindServiceProxyTyped.CreateOAuthProfile(Rt.OAuthTokenTypes.Office365,
                        Rt.OAuthLoginTypes.Login,
                        authCode,
                        Rt.SyncAccountTypes.Office365,
                        profileData.sub,
                        "Portal",
                        profileData.unique_name + '_Office365',
                        originalRedirectUri, (authResponse) => {

                            console.log(authResponse);

                            this.setUserDetails({
                                email: profileData.unique_name
                            }, authCode);

                            const model = new ExternalAuthenticateModel();
                            model.authProvider = ExternalLoginProvider.OPENID;
                            model.providerAccessCode = authResponse.IdToken;
                            model.providerKey = profileData.sub;
                            model.singleSignIn = UrlHelper.getSingleSignIn();
                            model.returnUrl = UrlHelper.getReturnUrl();

                            // For microsoft accounts, we get these values from the id_token returned by the microsoft oauth server
                            this.userDetails.GivenName = profileData.given_name;
                            this.userDetails.FamilyName = profileData.family_name;
                            this.userDetails.DisplayName = profileData.name;

                            this.userDetails.OAuthUniqueId = authResponse.OAuthUniqueId;
                            this.userDetails.AccessToken = authResponse.AuthToken;
                            this.userDetails.RefreshToken = authResponse.RefreshToken;
                            this.userDetails.Expiration = authResponse.ExpirationDate;

                            console.log("RLS:completeAccountLoginWithMSAuth: logging into aspnetzero backend");
                            console.log("RLS:completeAccountLoginWithMSAuth: Going to page " + landingPageUri);
                            
                            // Login to the account on the aspnet backend, this creates the session
                            this.loginToAspNetZeroBackend(model, landingPageUri);
                            abp.ui.clearBusy();
                        });
                }
                catch (err) {
                    this.tools.error("GAP:completeAccountLoginProcess:Error=" + err.message);
                    abp.ui.clearBusy();
                }
            }
            else {
                try {
                    // Someone attempted to login with a nonregistered account, show an error and redirect them to create an account

                    this.tools.error("Sorry but the user " + profileData.unique_name + " is not registered.");
                    console.warn("User is not registered= " + profileData.unique_name);
                    abp.ui.clearBusy();

                    this.router.navigate(["account/start"]);
                }
                catch (err) {
                    this.tools.error("GAP:completeAccountLoginProcess:else:Error=" + err.message);
                    abp.ui.clearBusy();
                }
            }   
        }
        else {
            this.tools.error("LS:completeAccountLoginWithMSAuth:Profile == undefined");

            abp.ui.clearBusy();
        }     
    }


    startAccountCreateProcess() {

        let redirectUri = abp.setting.get('RefindCreateOAuthRedirectUrl');
        console.log("MAP:startAccountCreateProcess:Creating account with Microsoft oAuth");
        console.log("MAP:startAccountCreateProcess:redirectUri=" + redirectUri);

        let settings = this.getOpenIdSettings(this.provider, "code id_token", "consent", redirectUri);
        let context = Authentication.getContext(settings);
        context.login();
    }

    async completeAccountCreateProcess(postUrl: string, originalRedirectUri: string, landingPageUri: string, id: string, userAccountDto: WizardFormData) {

        try {    

            var profileData = super.getProfileFromAuthResult(postUrl);
            if (profileData != undefined) {
                        
                let authCode = this.getValueFromAuthResult(postUrl, 'code');     
                            
                // In oauth, the 'sub' property on the user profile is the UserAccountId
                this.dataService.setUserAccountId(profileData.sub);
                this.dataService.setDeviceId('Portal');

                this.refindServiceProxyTyped.Init();
                
                await this.refindServiceProxyTyped.CreateOAuthProfile(Rt.OAuthTokenTypes.Office365, 
                    Rt.OAuthLoginTypes.Consent,
                    authCode, 
                    Rt.SyncAccountTypes.Office365,          
                    profileData.sub,
                    "Portal",
                    profileData.unique_name + '_Office365',
                    originalRedirectUri, 
                    (authResponse) => {

                    console.log(authResponse);

                    this.setUserDetails({
                        email: profileData.unique_name
                    }, authCode);

                    const model = new ExternalAuthenticateModel();
                    model.authProvider = ExternalLoginProvider.OPENID;
                    model.providerAccessCode = authResponse.IdToken;
                    model.providerKey = profileData.sub;
                    model.singleSignIn = UrlHelper.getSingleSignIn();
                    model.returnUrl = UrlHelper.getReturnUrl();

                    // For microsoft accounts, we get these values from the id_token returned by the microsoft oauth server
                    this.userDetails.GivenName = profileData.given_name;
                    this.userDetails.FamilyName = profileData.family_name;
                    this.userDetails.DisplayName = profileData.name;
                    
                    this.userDetails.OAuthUniqueId = authResponse.OAuthUniqueId;
                    this.userDetails.AccessToken = authResponse.AuthToken;
                    this.userDetails.RefreshToken = authResponse.RefreshToken;
                    this.userDetails.Expiration = authResponse.ExpirationDate;

                    // Create the account on the aspnet backend
                    this.loginToAspNetZeroBackend(model, landingPageUri);

                    abp.ui.clearBusy();
                });
            }
            else {
                this.tools.error("LS:completeAccountCreationWithMSAuth:Profile == undefined");

                abp.ui.clearBusy();
            }
        }
        catch (e) {
            this.tools.error("completeAccountCreationWithMSAuth:Error=" + e);
            abp.ui.clearBusy();
        }
    }

    private loginToAspNetZeroBackend(model: ExternalAuthenticateModel, redirectToPageUrl: string) {

        console.log('LS:loginToAspNetZeroBackend:ID: ' + model.providerKey);
        // Register the user with the aspnetzero backend so the account is created on the portal
        this.tokenAuthService.externalAuthenticate(model).subscribe(

            async (authResult: ExternalAuthenticateResultModel) => {
                console.log("LS:loginToAspNetZeroBackend:UserAccountId=" + authResult.refindUserAccountId);
                console.assert(authResult, "LS:loginToAspNetZeroBackend:Assert failed,authResult === null")

                // // If we are logged in to the asp netzero backend, register with the sync service
                console.assert(this.userDetails, "LS:loginToAspNetZeroBackend:Assert failed,userDetails === null")
                console.assert(authResult.userId !== 0, "LS:loginToAspNetZeroBackend:Assert failed,authResult.userId === null")
                if (authResult.userId <= 0) {                    
                    this.tools.error("LS:loginToAspNetZeroBackend:userid <= 0");
                    return;
                }
                console.log("RLS:loginToAspNetZeroBackend:Auth result from the backend", authResult);
                
                // This is the db user id from the portal database
                this.userId = authResult.userId;

                // This is the userAccountId for the sync service
                this.userDetails.UserAccountId  = this.userAccountId = authResult.refindUserAccountId;                
                this.userDetails.MailAccountId = this.userDetails.EmailAddress + "_Office365", //mail account id                    
                this.userDetails.MailAccountType = "Office365",
                this.userDetails.MailServer = "https://outlook.office365.com";
                this.userDetails.MailServerVersion = "Exchange2015";
                
                // This is where we used to create the sync service account.
                // save the userDetail for later on
                this.dataService.setAuthUserDetails(this.userDetails);

                //////////// tell sync service were created a portal account 

                var response = await this.refindServiceProxyTyped.PortalAccountWasAddedAsync(this.userDetails.EmailAddress, this.userDetails.MailAccountId);
                if(response.Success)
                {

                }
                else
                {
                    console.warn("MSAP:PortalAccountWasAddedAsync failed")
                }

                // Login to the portal with the new user
                this.loginService.login(authResult.accessToken, authResult.encryptedAccessToken, authResult.expireInSeconds, false, '', redirectToPageUrl);

                abp.ui.clearBusy();                
            },
            (error) => {
                abp.notify.error("User Authenticate failed:", error);
                abp.ui.clearBusy();
            }
        );
    }

    getOpenIdSettings(loginProvider: ExternalLoginProvider, responseType: string, promptType: string, postRedirectUrl: string): AdalConfig {

        return new AdalConfig(
            loginProvider.clientId,
            'common',
            postRedirectUrl,
            '',
            responseType, //'code',
            'prompt=' + promptType + '&scope=openid offline_access'
        );
    }

    logout() {
    }
}
