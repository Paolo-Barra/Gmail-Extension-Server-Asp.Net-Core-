import { WizardFormData } from "@account/sign-up/wizard-form-data";

export interface IRefindAuthProvider {

    startAccountLoginProcess();
    startAccountCreateProcess();

    completeAccountLoginProcess(postUrl: string, originalRedirectUri: string, landingPageUri: string);
    completeAccountCreateProcess(postUrl: string, originalRedirectUri: string, landingPageUri: string, id: string, userAccountDto: WizardFormData);

    logout();
    
}