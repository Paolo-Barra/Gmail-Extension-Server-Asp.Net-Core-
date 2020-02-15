import { IRefindAuthProvider } from "./IRefindAuthProvider";
import { ExternalLoginProvider } from "@account/login/login.service";
import { MicrosoftAuthProvider } from "./MicrosoftAuthProvider";
import { GmailAuthProvider } from "./GmailAuthProvider";
import { Injector } from "@angular/core";

export class RefindAuthProviderFactory {

    constructor(public injector: Injector) {

    }
    
    public createAuthProvider(provider: ExternalLoginProvider) : IRefindAuthProvider {

        switch(provider.name) {
            case ExternalLoginProvider.OPENID: {
                return new MicrosoftAuthProvider(this.injector, provider);
            }
            case ExternalLoginProvider.GOOGLE: {
                return new GmailAuthProvider(this.injector, provider);
            }
        }

        // TODO: Throw an exception or handle this error in a better way
        return undefined;
    }
}
