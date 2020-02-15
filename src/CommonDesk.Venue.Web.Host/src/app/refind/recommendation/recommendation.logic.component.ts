import { OnInit, Injector, ViewChild, Injectable } from '@angular/core';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindServiceProxyTyped } from '../shared/service-proxies/refind-service-proxy-typed';
import { RefindToolsService } from '../refind-tools.service';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import { Router } from '@angular/router';
import { WelcomeStatusListener } from '../welcome/welcomeStatusListener';

@Injectable()
export class RecommendationLogicComponent implements OnInit {

    getDevicerecords: Rt.DeviceRecord[];
    userAccountId: string;
    deviceId: string;
    allRecomendationList: Rt.UserDataRecord[] = [];
    recomendationList: Rt.RecDisplayBlock[] = [];
    accountCreationControl: Rt.RecDisplayBlock;
    downloadDuration = "6m";

    progressStateDisabledFlag: boolean;

    welcomeListener: WelcomeStatusListener;

    rTypes = Rt.UserTypeTypes;
    //userSubTypes = Rt.UserTypesSubTypes;
    actionTypes = Rt.RecDisplayActionTypes;
    actionWidget = Rt.RecDisplayActionWidgetType;
    triState = Rt.Tristate;

    IsAccountCreationRunning: Boolean;

    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    // Allows dynamically added control ngModel to bind
    bindMap: { [key: string]: string; } = {};
    setControlBind(key: string, val: string) {
        if (val && key) {
            this.bindMap[key] = val;
        }
    }
    setControlBindByAction(key: Rt.RecDisplayActionField, val: string) { this.setControlBind(key.ActionType, val); }
    getControlBind(row: Rt.RecDisplayActionField): string { return this.bindMap[row.ActionType]; }
    getControlBindByAction(key: Rt.RecDisplayActionTypes): string { return this.bindMap[key]; }

    hasNoElements(): boolean { return this.recomendationList == undefined || this.anyVisibleRecommentations() == false; }
    hasElements(): boolean { return this.anyVisibleRecommentations() == true; }
    isRecommendationVisible(row: Rt.RecDisplayBlock) { return row.Visible == Rt.Tristate.True; }
    isRecommendationDismissed(row: Rt.RecDisplayBlock) { return row.Dismissed == Rt.Tristate.True; }
    rowExpandedEvent() { }
    rowCollapsedEvent() { }

    constructor(
        injector: Injector,
        public refindServiceProxyTyped: RefindServiceProxyTyped,
        public tools: RefindToolsService,
        public dataService: RefindUserDataService,
        private router: Router,
    ) {

        this.welcomeListener = injector.get(WelcomeStatusListener);
    }


    async ngOnInit() {
        this.IsAccountCreationRunning = false;
        this.userAccountId = this.dataService.getUserAccountId();
        this.deviceId = this.dataService.getDeviceId();
        this.tools.assert(this.userAccountId, "DLC:ngOnInit:userAccountId == null");
        this.tools.assert(this.deviceId, "DLC:ngOnInit:deviceId == null");
        this.refindServiceProxyTyped.Init();

        // load the current recomendations and apply filters
        await this.getRecomendationRecords();
        this.welcomeListener.ngOnInit();
        this.welcomeListener.setParent(this);
    }

    async getRecomendationRecords() {

        this.recomendationList = [];                    // zero it out from last time

        // load our UserDataRecords that were not already dismissed
        let ud = new Rt.UserDataRecord();
        ud.UserAccountId = this.userAccountId;
        ud.Dismissed = Rt.Tristate.False;
        let response = await this.refindServiceProxyTyped.ReadUserMessage(ud);
        if (response.Success) {

            // save a copy of the unmodified ones
            this.allRecomendationList = response.Results;

            // get the ones we actually need
            let records = response.Results.filter(row =>
                row.Type === Rt.UserTypeTypes.RecommendationBlock ||
                row.Type === Rt.UserTypeTypes.ProgressBlock
            );
            // convert the serialized json strings to objects
            for (let row of records) {
                console.log(`RLC:loaded:Name=${row.Message}:Type=${row.Type}:SubType=${row.SubType}:Visible=${row.Visible}:Minimized=${row.Minimized}:Dismissed=${row.Dismissed}`);
                this.recomendationList.push(this.hydrateRecommentation(row));
            }
        } else {
            console.log("RLC:getRecomendationRecords:SoftError:" + response.Message);
            this.tools.warn("RLC:getRecomendationRecords:SoftError:" + response.Message);
        }
        this.setUIDefaults();
    }


    setUIDefaults() {
        // populate controls with default values if they exist
        this.recomendationList.forEach(recomend => {
            if (recomend != null) {
                recomend.Fields.forEach(dispFields => {
                    if (dispFields != null) {
                        dispFields.ActionFields.forEach(actionFields => {
                          this.setDefaultValues(actionFields);
                          actionFields.ShortPost.ElementId  = recomend.RecordId;
                        });
                    }
                });
            }
        });
    }

    setDefaultValues(actionFields:Rt.RecDisplayActionField) {
        if (actionFields != null) {
            switch (actionFields.ActionField) {
                case Rt.RecDisplayActionWidgetType.Button: {
                    break;
                }
                case Rt.RecDisplayActionWidgetType.DropDown: {
                    console.log("DD:af=" + actionFields.ActionType + ":default=" + actionFields.DefaultValue);
                    this.setControlBindByAction(actionFields, actionFields.DefaultValue);
                    break;
                }
                case Rt.RecDisplayActionWidgetType.Checkbox: {
                    console.log("CB:af=" + actionFields.ActionType + ":default=" + actionFields.DefaultValue);
                    this.setControlBindByAction(actionFields, actionFields.DefaultValue);
                    break;
                }

            }
        }
    }

    recommendationActionButtonClicked(row: Rt.RecDisplayBlock, action: Rt.RecDisplayActionField) {

        // Called by HTML on Recommendation Button Click
        console.log("recommendationActionButtonClicked:action.ActionType=" + action.ActionType);



        switch (action.ActionType) {
            case Rt.RecDisplayActionTypes.InstallRecipe: {
                    // Navigate to the add recipe page
                    this.router.navigate(["app/main/recipes/CreateOrEdit"], {
                        queryParams: {
                            userAccountId: this.userAccountId,
                            TemplateId: action.Arg[0],
                            type: "Recipes",
                            pAction: JSON.stringify(action.ShortPost),
                        }
                    });
                    break;
                }
            case Rt.RecDisplayActionTypes.AddAccount: {
                    // called when button is clicked in InitalImportRecommend
                    this.IsAccountCreationRunning = true;


                    // show the Account loading progress recomendation
                    let progressDialog = this.getRecommentationsBySubType(Rt.UserTypesSubTypes.ProgressAccountPhase1);
                    if (progressDialog) {

                        progressDialog.Visible = Rt.Tristate.True;
                        this.refindServiceProxyTyped.UpdateUserMessageNow(progressDialog);
                        this.progressStateDisabledFlag = true;

                    }
                    // Hide the Import Recomendation recomendation
                    let importDialog = this.getRecommentationsBySubType(Rt.UserTypesSubTypes.ImportAccountPhase1);
                    if (importDialog) {
                        importDialog.Visible = Rt.Tristate.False;
                        this.refindServiceProxyTyped.UpdateUserMessageNow(importDialog);
                    }

                    let startRange = "today";
                    let endRange = this.getControlBindByAction(Rt.RecDisplayActionTypes.LoadAccountPhase1);

                    console.log("AddAccount:Start=" + startRange + ":End=" + endRange);

                    // acutally add account
                    this.ImportAccountPhase1(startRange, endRange).finally(() => {
                        // reload the changed recomendation list
                    });
                    break;
                }
            case Rt.RecDisplayActionTypes.HideProgressPhase1: {
                    // called when button on ProgressDialogQuick is clicked
                    row.Visible = Rt.Tristate.False;
                    this.refindServiceProxyTyped.UpdateUserMessageNow(row);
                    this.getRecomendationRecords();
                    break;
                }
            case Rt.RecDisplayActionTypes.LoadAccountPhase2: {
                    // called when button is clicked in InitalImportRecommend
                    this.IsAccountCreationRunning = true;

                    // show the Account loading full progress recomendation
                    let progressDialog = this.getRecommentationsBySubType(Rt.UserTypesSubTypes.ProgressAccountPhase2);
                    if (progressDialog) {
                        progressDialog.Visible = Rt.Tristate.True;
                        this.refindServiceProxyTyped.UpdateUserMessageNow(progressDialog);
                        this.progressStateDisabledFlag = true;
                    }
                    // Hide the import account recemendation
                    let importRec = this.getRecommentationsBySubType(Rt.UserTypesSubTypes.ImportAccountPhase2);
                    if (importRec) {
                        importRec.Visible = Rt.Tristate.False;
                        this.refindServiceProxyTyped.UpdateUserMessageNow(importRec);
                    }

                    let startRange = "today";
                    let endRange = this.getControlBindByAction(Rt.RecDisplayActionTypes.LoadAccountPhase1);
                    console.log("LoadAccount:Start=" + startRange + ":End=" + endRange);
                    // acutally add account
                    this.ImportAccountPhase2(startRange, endRange).finally(() => {
                        // reload the changed recomendation list
                    });
                    break;
                }
            case Rt.RecDisplayActionTypes.HideProgressPhase2: {
                    // called when button on ProgressDialogFull is clicked
                    row.Visible = Rt.Tristate.False;
                    this.refindServiceProxyTyped.UpdateUserMessageNow(row);
                    this.getRecomendationRecords();
                    break;
                }
            case Rt.RecDisplayActionTypes.JumpToLink: {
                    // Navigate to a specific link
                    this.router.navigate([action.Arg[0]], {
                        queryParams: {}
                    });
                    break;
                }
            case Rt.RecDisplayActionTypes.DismissRecomendation: {
                    // mark this recomendation as dismissed
                    row.Dismissed = Rt.Tristate.True;
                    this.refindServiceProxyTyped.UpdateUserMessageNow(row);
                    break;
                }
            case Rt.RecDisplayActionTypes.Minimize: {
                    // mark this recomendation as minimized
                    row.Visible = Rt.Tristate.False;
                    this.refindServiceProxyTyped.UpdateUserMessageNow(row);
                    break;
                }
            default:
            {
                    console.warn("RLC:recommendationActionButtonClicked:Missing Action Handler:"+action.ActionType);
                    break;
            }
        }
    }


    public ProgressStateRecommendationDisabled(): boolean {
        return this.progressStateDisabledFlag;
    }

    public async ImportAccountPhase1(sdate: string, edate: string) {
        // run the REST methods AddAccount
        let ud = this.dataService.getAuthUserDetails();

        console.assert(ud.UserAccountId, "RE:ImportAccountPhase1:UserAccountId not set");
        console.assert(ud.AccessToken, "RE:ImportAccountPhase1:AccessToken not set");
        console.assert(ud.Expiration, "RE:ImportAccountPhase1:Expiration not set");
        console.assert(ud.MailAccountId, "RE:ImportAccountPhase1:MailAccountId not set");
        console.assert(ud.MailServer, "RE:ImportAccountPhase1:MailServer not set");
        console.assert(ud.MailAccountType, "RE:ImportAccountPhase1:MailAccountType not set");

        this.welcomeListener.updateProgressMessage("Loading account...");

        // Build a post action to set the ApplicationState to PrimaryMailAccountCreated
        let pal = this.tools.buildPostActionList(
            Rt.RestPostAction.InitApplicationState,
            Rt.RestPostActionSubType.PrimaryMailAccountCreated);

        // Tell the ADDAccount REST webservice to run the InitApplicationState action
        let response = await this.refindServiceProxyTyped.AddAccount(
            ud.UserAccountId,
            ud.MailAccountId,
            ud.EmailAddress,
            ud.GivenName,
            ud.FamilyName,
            ud.DisplayName,
            sdate,
            edate,
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
        if (response.Success = true) {
            this.welcomeListener.updateProgressMessage("Account loaded...");
            this.welcomeListener.startListiner();
            this.dataService.setCreateAccountState('level1');
        } else {
            this.welcomeListener.updateProgressMessage("We were unable to load this account. Error=" + response.Message);
        }
        this.IsAccountCreationRunning = false;
    }

    public async ImportAccountPhase2(sdate: string, edate: string) {
        // run the REST methods LoadAccount
        let ud = this.dataService.getAuthUserDetails();

        console.assert(ud.UserAccountId, "RE:ImportAccountPhase2:UserAccountId not set");
        console.assert(ud.AccessToken, "RE:ImportAccountPhase2:AccessToken not set");
        console.assert(ud.Expiration, "RE:ImportAccountPhase2:Expiration not set");
        console.assert(ud.MailAccountId, "RE:ImportAccountPhase2:MailAccountId not set");
        console.assert(ud.MailServer, "RE:ImportAccountPhase2:MailServer not set");
        console.assert(ud.MailAccountType, "RE:ImportAccountPhase2:MailAccountType not set");

        this.welcomeListener.updateProgressMessage("Creating account...");

        // Build a post action to set the ApplicationState to PrimaryMailAccountCreated
        let pal = this.tools.buildPostActionList(
            Rt.RestPostAction.InitApplicationState,
            Rt.RestPostActionSubType.PrimaryMailAccountCreated);

        // Tell the ADDAccount REST webservice to run the InitApplicationState action
        let response = await this.refindServiceProxyTyped.LoadAccount(
            ud.UserAccountId,
            ud.MailAccountId,
            ud.EmailAddress,
            sdate,
            edate,
            ud.MailServer,
            ud.MailAccountType,
            "",
            ud.AccessToken,
            ud.RefreshToken,
            ud.Expiration,
            ud.OAuthUniqueId,
            pal,
        );
        if (response.Success = true) {
            this.welcomeListener.updateProgressMessage("Account created...");
            this.welcomeListener.startListiner();
            this.dataService.setCreateAccountState('level2');

        } else {
            this.welcomeListener.updateProgressMessage("We were unable to create this account. Error=" + response.Message);
        }
        this.IsAccountCreationRunning = false;
    }



    hydrateRecommentation(row: Rt.UserDataRecord): Rt.RecDisplayBlock {
        let rr = new Rt.RecDisplayBlock();
        rr.Fields = JSON.parse(row.FieldsJson) as Rt.RecDisplayField[];
        rr.TagsList = JSON.parse(row.TagsJson) as Rt.RecDisplayTag[];
        rr.Id = row.Id;
        rr.RecordId = row.RecordId;
        rr.UserAccountId = row.UserAccountId;
        rr.MailAccountId = row.MailAccountId;
        rr.DeviceId = row.DeviceId;
        rr.DatePosted = row.DatePosted;
        rr.DateToDisplay = row.DateToDisplay;
        rr.Type = row.Type;
        rr.SubType = row.SubType;
        rr.Visible = row.Visible;
        rr.Minimized = row.Minimized;
        rr.Dismissed = row.Dismissed;
        rr.Message = row.Message;
        rr.SubMessage = row.SubMessage;
        rr.FieldsJson = row.FieldsJson;
        rr.TagsJson = row.TagsJson;
        rr.Fields.forEach(row =>
            row.ActionFields.forEach(r =>  r.ShortPost.ElementId = rr.RecordId )
        );
        return rr;
    }

    getVisibleRecommentations(): Rt.RecDisplayBlock[] {
        let recs = this.recomendationList.filter(row => row.Visible === Rt.Tristate.True);
        return recs;
    }

    getRecommentationsBySubType(stype: Rt.UserTypesSubTypes): Rt.RecDisplayBlock {
        let recs = this.recomendationList.filter(row => row.SubType === stype);
        if (recs.length > 0) {
            return recs[0];
        }
        return null;
    }

    getRecDisplayTags(row: Rt.RecDisplayBlock) {
        return row.TagsList;
    }

    anyVisibleRecommentations(): boolean {

        let rlist = this.recomendationList.filter(row =>
            row.Visible === Rt.Tristate.True &&
            row.Dismissed === Rt.Tristate.False);
        return (rlist != null && rlist.length > 0);
    }


    getRecomendationDescription(row: Rt.RecDisplayBlock): string {

        let x = row.Fields[0].Header;
        return x;
    }

    getRecomendationFields(row: Rt.RecDisplayBlock): Rt.RecDisplayField[] {

        // We don't return the first element because it is used as the row description on the mat-expansion panel - See getRecomendationDescription()
        //return row.Fields.slice(1, row.Fields.length);
        return row.Fields;
    }

    isExpanded(row: Rt.RecDisplayBlock): string {
        return (row.Minimized === Rt.Tristate.True) ? "false" : "true";

    }


    dismissRecommendation(row: Rt.RecDisplayBlock) {
        row.Dismissed = Rt.Tristate.True;
        this.refindServiceProxyTyped.UpdateUserMessageNow(row);
    }




    // searchForAccountPhase1(recs: RefindTypes.UserDataRecord[]): boolean {

    //     let records = recs.filter(row =>
    //         row.Type == RefindTypes.UserTypeTypes.AccountCreationState &&
    //         row.SubType == RefindTypes.UserTypesSubTypes.AccountCreationPhase1
    //     );
    //     return (records.length > 0);
    // }

    // searchForAccountPhase(recs: RefindTypes.UserDataRecord[], subtype: RefindTypes.UserTypesSubTypes): boolean {

    //     let records = recs.filter(row =>
    //         row.Type == RefindTypes.UserTypeTypes.AccountCreationState &&
    //         row.SubType == subtype
    //     );
    //     return (records.length > 0);
    // }


    getStyleForTag(tag: Rt.RecDisplayTag) {
        // Each panel badge can have a color and style
        // This is a lookup table for the style

        let recommendationType = tag.CssStyle.split(' ')[1];
        let recommendationStyle = " success-tag";

        if (recommendationType === "badge-info") {
            recommendationStyle = ' success-tag';
        } else if (recommendationType === "badge-warning") {
            recommendationStyle = ' warning-tag';
        } else if (recommendationType === "badge-danger") {
            recommendationStyle = ' danger-tag';
        }

        return tag.CssStyle + recommendationStyle;
    }

}
