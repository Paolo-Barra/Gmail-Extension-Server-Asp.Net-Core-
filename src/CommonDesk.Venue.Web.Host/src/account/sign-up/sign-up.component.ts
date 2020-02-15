import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { MatStepper } from "@angular/material";
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { EmailProblemCheckboxComponent } from './email-problem-checkbox/email-problem-checkbox.component';
import { LoginService, ExternalLoginProvider } from '@account/login/login.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AbpSessionService } from 'abp-ng2-module/dist/src/session/abp-session.service';
import { SessionServiceProxy, UpdateUserSignInTokenOutput } from '@shared/service-proxies/service-proxies';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { RefindAuthService } from '@refindRoot/AuthServices/refind.auth.service';
import { WizardFormData } from './wizard-form-data';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends AppComponentBase implements OnInit {
  isMultiTenancyEnabled: boolean = false;
  refindAuthService: RefindAuthService;

  confirmed: boolean = false;
  error: string = "";

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild(SignUpFormComponent) signUpFormComponent: SignUpFormComponent;
  @ViewChild(EmailProblemCheckboxComponent) emailProblemCheckboxComponent: EmailProblemCheckboxComponent;

  constructor(
    private _sessionService: AbpSessionService,
    public loginService: LoginService,
    private _sessionAppService: SessionServiceProxy,
    injector: Injector) {

    super(injector);
    abp;

    this.refindAuthService = new RefindAuthService(injector);
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

    this.loginService.init();

    if (this._sessionService.userId > 0 && UrlHelper.getReturnUrl() && UrlHelper.getSingleSignIn()) {
      this._sessionAppService
        .updateUserSignInToken()
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


  onSubmit() {

  }
  ngAfterViewInit() {

  }

  saveFormData(): void {
    const isFormValid = this.signUpFormComponent.valid();

    if (!isFormValid) {
      return;
    }

    const formControls = this.signUpFormComponent.registerForm.controls;
    // const emailProblems = this.emailProblemCheckboxComponent.emailProblemForm.controls.emailProblems;

    let formData = new WizardFormData();
    formData.firstName = formControls.firstName.value;
    formData.lastName = formControls.lastName.value;
    formData.accountType = formControls.accountType.value;
    formData.numberOfEmailAccounts = formControls.numberOfEmailAccounts.value;
    // formData.emailProblems = emailProblems.value.filter((item: any) => item.selected).map((item: any) => item.name);

    localStorage.setItem("SUC:formData", JSON.stringify(formData));



    // const stringifiedFormData: string = JSON.stringify(userData);
    // localStorage.setItem("suc:sendUserData", stringifiedFormData);
    // //save the data to the localStorage 
    // localStorage.setItem("user_form_data", stringifiedFormData);

    this.stepper.next();
  }


  onCheckboxChanged($event) {
    this.confirmed = !this.confirmed;
    if (this.confirmed) {
      this.error = '';
    }
  }

  move(index: number) {
    this.stepper.selectedIndex = index;
  }

  externalCreateAccount(provider: ExternalLoginProvider) {
    if (!this.confirmed) {
      this.error = "Please click the checkbox to show that you understand";
      return;
    }
    this.refindAuthService.startAccountCreateProcess(provider);
  }

  externalLoginAccount(provider: ExternalLoginProvider) {
    this.refindAuthService.startAccountLoginProcess(provider);
  }
}
