import { UserDetailsToSend } from "../refind.auth.service";

export class RefindAuthProviderBase {

    userAccountId: string;
    userId: number;
    userDetails: UserDetailsToSend;
    
    public setUserDetails(profileData: any, authCode: string) {

        // Initialize the user details for the sync service addAccount call
        this.userDetails = {
            GivenName: "",
            FamilyName: "", 
            DisplayName: "",

            UserName: profileData.email,
            EmailAddress: profileData.email,
            NameAndSurname: "",
            TenancyName: "",//this.appSession.tenancyName,
            AccessToken: authCode,

            // The oauth token data will be set once we get it back from the backend
            RefreshToken: "",
            Expiration: "",
            OAuthUniqueId: "",
            RemoteId: "",
            UserAccountId: "",
            MailAccountId: "",
            MailAccountType: "",
            MailServer: "",
            MailServerVersion: ""
        }
        console.log("RLS:setUserDetails" + this.userDetails);
    }

    public getValueFromAuthResult(loginData: string, key: string): any {

        var theKey = key + '=';
        var start = loginData.indexOf(theKey);
        var data = loginData.substring(start);
        var parts = data.split('&');

        // Get the authorization code, this will be exchanged for the auth/refresh tokens on the sync service
        var authCodePart = parts.find(s => s.indexOf(theKey) >= 0);
        if (authCodePart == undefined) {
            console.warn("RAuthProvderBase:getValueFromGoogleAuthResult:Error:Did not find part=" + key);
            return null;
        }

        var authCode = authCodePart.substring(authCodePart.indexOf('=') + 1);

        return authCode;
    }

    public getIdTokenFromUrl(url: string): string {

        let idToken: string;
        let querysection = url.substring(url.indexOf('id_token='));
        let querparts = querysection.split('&');

        var tokenPart = querparts.find(s => s.indexOf("id_token") >= 0);
        if (tokenPart != undefined)
            idToken = tokenPart.substring(tokenPart.indexOf('=') + 1);

        return idToken;
    }

    public getProfileFromAuthResult(loginData: string): any {

        var profileData: any;
        var start = loginData.indexOf('code=');
        var data = loginData.substring(start);
        var parts = data.split('&');

        var token = parts.find(s => s.indexOf("id_token") >= 0);
        if (token != undefined) {
            var tokenPart = token.substring(token.indexOf('=') + 1);
            profileData = this.decodeJwt(tokenPart);
            console.log("RAuthProvderBase:getProfileFromGoogleAuthResult:Valid Profile found");
        }
        else {
            console.warn("RAuthProvderBase:getProfileFromGoogleAuthResult:Error:Failed to parse login data:Data=" + loginData)
        }

        return profileData;
    }

    decodeJwt(token: string): any {
        var segments = token.split('.');

        if (segments.length !== 3) {
            throw new Error('RAuthProvderBase:Not enough or too many segments');
        }

        // The payload segment is always the second segment
        var payloadSeg = segments[1];

        // base64 decode and parse JSON        
        var payload = JSON.parse(this.base64urlDecode(payloadSeg));

        return payload;
    }

    base64urlDecode(str) {
        return new Buffer(this.base64urlUnescape(str), 'base64').toString();
    };

    base64urlUnescape(str) {
        str += Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    }

}