import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { IStepperItem } from '@shared/stepper/stepper.component';
import { WelcomeStatusListener } from './welcomeStatusListener';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import { RefindServiceProxyTyped } from '../shared/service-proxies/refind-service-proxy-typed';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindToolsService } from '../refind-tools.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  ProgressGuageSteps: IStepperItem[] = [];
  CurrentPage: number;
  WizardPageNumber: number;
  UseProgressGauge: Boolean;
  PrivacyPolicyAgreement: Boolean;
  IsAccountCreationRunning: Boolean;

  constructor(
    private _router: Router,
    public logic: WelcomeStatusListener,
    public dataService: RefindUserDataService,
    public refindServiceProxyTyped: RefindServiceProxyTyped,
    public tools: RefindToolsService,
  ) {

  }

  ngOnInit() {

    console.log(this.stepper);
    this.CurrentPage = 0;
    this.WizardPageNumber = 0;
    this.UseProgressGauge = true;
    this.PrivacyPolicyAgreement = true;
    this.populateWizardProgressSteps();
    this.IsAccountCreationRunning = false;
    this.logic.ngOnInit();
  }



  firstPage() {
    this.WizardPageNumber = 0;

  }
  nextWizardPage()
  {
    if(this.WizardPageNumber == 1 && this.IsAccountCreationRunning == false) {
      this.IsAccountCreationRunning = true;
      this.RegisterAccountWithSyncService();
    }
    this.WizardPageNumber++;
  }
  backWizardPage() {
    this.WizardPageNumber--;
  }

  navigateToRecommendation() {
    this._router.navigate(['/app/main/recommend']);
  }

  navigateToDashboard(): void {
    this._router.navigate(['/app/main/recommend']);
  }

  public async RegisterAccountWithSyncService() {
    let ud = this.dataService.getAuthUserDetails();

    console.assert(ud.UserAccountId,"RE:RegisterAccountWithSyncService:UserAccountId not set" );
    console.assert(ud.AccessToken  ,"RE:RegisterAccountWithSyncService:AccessToken not set" );
    console.assert(ud.Expiration  ,"RE:RegisterAccountWithSyncService:Expiration not set" );
    console.assert(ud.MailAccountId  ,"RE:RegisterAccountWithSyncService:MailAccountId not set" );
    console.assert(ud.MailServer  ,"RE:RegisterAccountWithSyncService:MailServer not set" );
    console.assert(ud.MailAccountType  ,"RE:RegisterAccountWithSyncService:MailAccountType not set" );

    // NOTE: On the latest msal oauth library the refresh token is hidden so we don't need to pass it or check for it anywhere
    //console.assert(refreshToken  ,"RE:RegisterAccountWithSyncService:refreshToken not set" );


    this.logic.updateProgressMessage("Creating account...");

    // Tell the ADDAccount REST webservice to run the InitApplicationState action
    // let PostAction = new RefindTypes.EventPostActionDto();
    // PostAction.ActionType = RefindTypes.RestPostActionEnum.InitApplicationState;
    // PostAction.ActionStateField = RefindTypes.ApplicationStateKeys.PrimaryMailAccountCreated;
    // let PostActionList = new RefindTypes.EventPostActionListDto();
    // PostActionList.Commands[0] = PostAction;
    let pal = this.tools.buildPostActionList(Rt.RestPostAction.InitApplicationState,Rt.RestPostActionSubType.PrimaryMailAccountCreated);

    let response =  await this.refindServiceProxyTyped.AddAccount(
        ud.UserAccountId,
        ud.MailAccountId,
        ud.EmailAddress,
        ud.GivenName,
        ud.FamilyName,
        ud.DisplayName,
        "",
        "",
        ud.MailServer,
        ud.MailAccountType,
        "",
        ud.AccessToken,
        ud.RefreshToken,
        ud.Expiration,
        ud.OAuthUniqueId,
        Rt.OAuthAccessTokenType.AccessCode,
        pal,
    );
    if(response.Success = true) {
      this.logic.updateProgressMessage("Account created...");
      this.logic.startListiner();
    } else {
      this.logic.updateProgressMessage("We were unable to create this account. Error="+response.Message);
    }
    this.IsAccountCreationRunning = false;
  }

  private populateWizardProgressSteps() {

    // https://nigelotoole.github.io/progress-tracker/

    this.ProgressGuageSteps = [
      {
        active: false,
        completed: false,
        title: "Step 1",
        description: "Adding a new Email Account"
      },
      {
        active: false,
        completed: false,
        title: "Step 2",
        description: "Learing and Privacy"
      },
      {
        active: false,
        completed: false,
        title: "Step 3",
        description: "Access your Inbox"
      },
    ];

  }


}
