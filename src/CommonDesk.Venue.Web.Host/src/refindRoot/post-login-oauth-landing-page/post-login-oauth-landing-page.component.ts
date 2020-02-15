import { Component, OnInit, Injector } from '@angular/core';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { LoginService, ExternalLoginProvider } from '@account/login/login.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { RefindAuthService } from '@refindRoot/AuthServices/refind.auth.service';

@Component({
  selector: 'app-post-login-oauth-landing-page',
  templateUrl: './post-login-oauth-landing-page.component.html',
  styleUrls: ['./post-login-oauth-landing-page.component.css']
})
export class PostLoginOauthLandingPageComponent extends AppComponentBase implements OnInit {

  refindAuthService: RefindAuthService;

  constructor(
    injector: Injector,
    public loginService: LoginService
    ) {
    super(injector);
    this.landingPageUri = "app/main/recommend";
    this.redirectUri = abp.setting.get('RefindLoginOAuthRedirectUrl');

    this.refindAuthService = new RefindAuthService(injector);
  }

  landingPageUri: any;
  redirectUri: any;

  ngOnInit() {
    console.log("PostLoginOLPC:ngOnInit");

    this.processLogin();
  }

  initializeUserSession() {

  }

  processLogin() {
    let url = UrlHelper.initialUrl;
    console.log("PLOLP:processLogin");

    this.loginService.initExternalLoginProviders(() => {

      if (url && url.indexOf("google") > 0) {

        var opendIdProvider = this.loginService.getExternalProvider(ExternalLoginProvider.GOOGLE);
        this.refindAuthService.completeAccountLoginProcess(opendIdProvider, url, this.redirectUri, this.landingPageUri);
      }      
      else if(url && (url.indexOf('code=') >= 0 || url.indexOf('id_token=') >= 0) ) {
        // Microsoft login has a code= query parameter in the url
        var opendIdProvider = this.loginService.getExternalProvider(ExternalLoginProvider.OPENID);
        this.refindAuthService.completeAccountLoginProcess(opendIdProvider, url, this.redirectUri, this.landingPageUri);        
      }      
    }); 
  }
}


@Component({
  selector: 'app-post-login-oauth-landing-page',
  templateUrl: './post-login-oauth-landing-page.component.html',
  styleUrls: ['./post-login-oauth-landing-page.component.css']
})
export class PostLoginOauthLandingPageComponentMobile extends PostLoginOauthLandingPageComponent implements OnInit {
  constructor(injector: Injector, public loginService: LoginService) {
    super(injector, loginService);
    this.landingPageUri = "app/refind/dashboard-mobile";
    this.redirectUri = abp.setting.get('RefindLoginOAuthRedirectUrlMobile');
  }

  ngOnInit() {
    console.log("PostLoginOLPCMobile:ngOnInit");
    this.processLogin();
  }

}

@Component({
  selector: 'app-post-login-oauth-landing-page',
  templateUrl: './post-login-oauth-landing-page.component.html',
  styleUrls: ['./post-login-oauth-landing-page.component.css']
})
export class PostLoginOauthLandingPageComponentGmail extends PostLoginOauthLandingPageComponent implements OnInit {
  constructor(injector: Injector, public loginService: LoginService) {
    super(injector, loginService);
    this.landingPageUri = "app/refind/dashboard-gmail";
    this.redirectUri = abp.setting.get('RefindLoginOAuthRedirectUrlGmail');
  }

  ngOnInit() {
    console.log("PostLoginOLPCGmail:ngOnInit");
    this.processLogin();
  }

}
