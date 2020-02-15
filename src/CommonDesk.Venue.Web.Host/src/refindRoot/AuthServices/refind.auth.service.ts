import {  Injectable, Injector } from '@angular/core';
import { ExternalLoginProvider } from '@account/login/login.service';
import { RefindAuthProviderFactory } from './AuthProviders/RefindAuthProviderFactory';
import { IRefindAuthProvider } from './AuthProviders/IRefindAuthProvider';
import { WizardFormData } from '@account/sign-up/wizard-form-data';

export class UserDetailsToSend {
    GivenName: string;
    FamilyName: string;
    DisplayName: string;
    
    UserName: string;
    EmailAddress: string;
    NameAndSurname: string;
    TenancyName: string;
    AccessToken: string;

    // The oauth token data will be set once we get it back from the backend
    RefreshToken: string;
    Expiration: string;
    OAuthUniqueId: string;
    RemoteId: string;
    UserAccountId: string;
    MailAccountId: string;
    MailAccountType: string;
    MailServer: string;
    MailServerVersion: string;    
}

@Injectable()
export class RefindAuthService {
    
    AuthProviderFactory: RefindAuthProviderFactory;
    
    constructor(public injector: Injector)
    {   
        this.AuthProviderFactory = new RefindAuthProviderFactory(injector);
    }
    
    getRefindAuthProvider(aspnetLoginProvider: ExternalLoginProvider) : IRefindAuthProvider {
        let refindAuthProvider = this.AuthProviderFactory.createAuthProvider(aspnetLoginProvider);
        if(refindAuthProvider === undefined)
        {
            // TODO: Show an error and return
            throw new Error('RAS:getRefindAuthProvider:Unable to create auth provider for account type=' + aspnetLoginProvider.name);            
        }

        return refindAuthProvider;
    }

    startAccountCreateProcess(aspnetLoginProvider: ExternalLoginProvider) {
        console.log("RAS:startAccountCreateProcess")
        let refindAuthProvider = this.getRefindAuthProvider(aspnetLoginProvider);

        // Start the account creation process
        refindAuthProvider.startAccountCreateProcess();
     }

     completeAccountCreateProcess(aspnetLoginProvider: ExternalLoginProvider, postUrl: string, originalRedirectUri: string, landingPageUri: string, id: string, userAccountDto: WizardFormData) {
        console.log("RAS:completeAccountCreateProcess")
        
        let refindAuthProvider = this.getRefindAuthProvider(aspnetLoginProvider);

        // Called on the post create account landing page
        refindAuthProvider.completeAccountCreateProcess(postUrl, originalRedirectUri, landingPageUri, id, userAccountDto);
    }
 
    startAccountLoginProcess(aspnetLoginProvider: ExternalLoginProvider) {

        console.log("RAS:startAccountLoginProcess")
        let refindAuthProvider = this.getRefindAuthProvider(aspnetLoginProvider);

        // Start the account login process
        refindAuthProvider.startAccountLoginProcess();
    }

    completeAccountLoginProcess(aspnetLoginProvider: ExternalLoginProvider, postUrl: string, originalRedirectUri: string, landingPageUri: string) {

        console.log("RAS:completeAccountLoginProcess")
        let refindAuthProvider = this.getRefindAuthProvider(aspnetLoginProvider);

        // Called on the post login account landing page
        refindAuthProvider.completeAccountLoginProcess(postUrl, originalRedirectUri, landingPageUri);
    }
}