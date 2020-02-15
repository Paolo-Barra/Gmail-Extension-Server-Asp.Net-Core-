import { Component, OnInit, Injector } from '@angular/core';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { LoginService, ExternalLoginProvider } from '@account/login/login.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { RefindAuthService } from '@refindRoot/AuthServices/refind.auth.service';
import { WizardFormData } from '@account/sign-up/wizard-form-data';

@Component({
  selector: 'app-post-create-oauth-landing-page',
  templateUrl: './post-create-oauth-landing-page.component.html',
  styleUrls: ['./post-create-oauth-landing-page.component.css']
})

export class PostCreateOauthLandingPageComponent extends AppComponentBase implements OnInit {

  refindAuthService: RefindAuthService;

  constructor(
    injector: Injector,
    public loginService: LoginService) 
  {
    super(injector);
    this.landingPageUri = "app/main/recommend";
    this.redirectUri = abp.setting.get('RefindCreateOAuthRedirectUrl');

    this.refindAuthService = new RefindAuthService(injector);
  }

  landingPageUri: any;
  redirectUri: any;

  ngOnInit() {
    console.log("PostCreateOLPC:ngOnInit");
    this.processLogin();
  }

  initializeUserSession() {

  }

  processLogin() {
    let url = UrlHelper.initialUrl;
    console.log("PostCreateOLPC:" + url);

    let userDto: WizardFormData = JSON.parse(localStorage.getItem("SUC:formData"));
    const userId: string = localStorage.getItem("user_create_id");
    console.log("userDto", userDto);

    this.loginService.initExternalLoginProviders(() => {

      if (url && url.indexOf("google") > 0) {

        var opendIdProvider = this.loginService.getExternalProvider(ExternalLoginProvider.GOOGLE);
        this.refindAuthService.completeAccountCreateProcess(opendIdProvider, url, this.redirectUri, this.landingPageUri, userId, userDto);           
      }      
      else if(url && (url.indexOf('code=') >= 0 || url.indexOf('id_token=') >= 0) ) {
        // Microsoft login has a code= query parameter in the url
        var opendIdProvider = this.loginService.getExternalProvider(ExternalLoginProvider.OPENID);
        this.refindAuthService.completeAccountCreateProcess(opendIdProvider, url, this.redirectUri, this.landingPageUri, userId, userDto);        
      }
    });
  }
}



