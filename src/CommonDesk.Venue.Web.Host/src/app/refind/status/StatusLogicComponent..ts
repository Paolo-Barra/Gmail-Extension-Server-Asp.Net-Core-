import { OnInit, Injector, ViewChild, Injectable } from '@angular/core';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindServiceProxyTyped } from '../shared/service-proxies/refind-service-proxy-typed';
import { RefindToolsService } from '../refind-tools.service';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import { Router } from '@angular/router';

@Injectable()
export class StatusLogicComponent implements OnInit {

    getDevicerecords: Rt.DeviceRecord[];
    userAccountId: string;
    deviceId: string;
    recomendationList:Rt.UserDataRecord[] = [];
    userTypes = Rt.UserTypeTypes;
    actionTypes = Rt.RecDisplayActionTypes;
    actionWidget = Rt.RecDisplayActionWidgetType;
    triState = Rt.Tristate;
    isLoadingContent = false;

    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector,
        public refindServiceProxyTyped: RefindServiceProxyTyped,
        public tools: RefindToolsService,
        public dataService: RefindUserDataService,
        private router: Router
        ) {

    }
    hasNoElements():boolean
    {
         return this.recomendationList == undefined || this.recomendationList.length == 0;
    }
    hasElements():boolean
    {
        return this.recomendationList.length > 0;
    }


    ngOnInit() {
        this.userAccountId = this.dataService.getUserAccountId();
        this.deviceId = this.dataService.getDeviceId();
        this.tools.assert(this.userAccountId,"DLC:ngOnInit:userAccountId == null");
        this.tools.assert(this.deviceId,"DLC:ngOnInit:deviceId == null");

        this.refindServiceProxyTyped.Init();

        this.getDashboardMessages();
    }


    getRecomendationDescription(row: Rt.RecDisplayBlock) {
        return row.Fields[0].Header;
    }

    getRecomendationFields(row: Rt.RecDisplayBlock) {

        // We don't return the first element because it is used as the row description on the mat-expansion panel - See getRecomendationDescription()
        return row.Fields.slice(1, row.Fields.length);
    }

    isExpanded(row: Rt.RecDisplayBlock): string {
      return (row.Minimized == Rt.Tristate.True) ? "false" : "true";

    }
    rowExpandedEvent(row: Rt.RecDisplayBlock) {
       // if(this.isLoadingContent) return;

        row.Minimized = Rt.Tristate.False;
        this.refindServiceProxyTyped.UpdateUserMessage(row);

        console.log(`rowExpandedEvent:Minimized=${row.Minimized}`);
    }

    rowCollapsedEvent(row: Rt.RecDisplayBlock) {

        row.Minimized = Rt.Tristate.True;
        this.refindServiceProxyTyped.UpdateUserMessage(row);

        console.log(`rowCollapsedEvent:Minimized=${row.Minimized}`);
    }

    recommendationActionButtonClicked(row: Rt.RecDisplayBlock, action: Rt.RecDisplayActionField) {
        console.log(`ActionType=${action.ActionType}:ActionTitle=${action.Title}:Arg=${action.Arg}`);

        switch(action.ActionType) {
            case Rt.RecDisplayActionTypes.InstallRecipe:
                // Navigate to the add recipe page
                this.router.navigate(["app/main/recipes/CreateOrEdit"], {
                    queryParams: {
                        userAccountId: this.userAccountId,
                        TemplateId: action.Arg[0],
                        type: "Recipes"
                    }
                });
            break;
            case Rt.RecDisplayActionTypes.AddAccount:
                // Navigate to the add recipe page
                this.router.navigate(["app/main/welcome"], {
                    queryParams: {}
                });
            break;
            case Rt.RecDisplayActionTypes.JumpToLink:
                // Navigate to the add recipe page
                this.router.navigate([action.Arg[0]], {
                    queryParams: {}
                });
            break;

            case Rt.RecDisplayActionTypes.DismissRecomendation:
                row.Dismissed = Rt.Tristate.True;
                this.refindServiceProxyTyped.UpdateUserMessage(row);
            break;

            case Rt.RecDisplayActionTypes.Minimize:
                row.Visible = Rt.Tristate.False;
                this.refindServiceProxyTyped.UpdateUserMessage(row);
            break;
        }
    }

    isRecommendationVisible(row: Rt.RecDisplayBlock) {
        return row.Minimized == Rt.Tristate.False;
    }

    isRecommendationDismissed(row: Rt.RecDisplayBlock) {
        return row.Dismissed == Rt.Tristate.True;
    }

    async getDashboardMessages()  {

        this.isLoadingContent = true;

        this.recomendationList = [];

        //let userDetails = this.dataService.getAuthUserDetails();

        let ud = new Rt.UserDataRecord();
        ud.UserAccountId = this.userAccountId;
        ud.Visible = Rt.Tristate.True;
        ud.Dismissed = Rt.Tristate.False;
        ud.Type = Rt.UserTypeTypes.UserDashboard;

        let response = await this.refindServiceProxyTyped.ReadUserMessage(ud);
        if(response.Success) {
            console.log("Recommendations for user=" + response.Results.length);

            let usedRows = response.Results.filter(row =>
                row.Type === Rt.UserTypeTypes.UserDashboard );

            for(let row of usedRows) {
                this.recomendationList.push(this.hydrateRecommentation(row));
            }
        }

        this.isLoadingContent = false;
    }

    hydrateRecommentationOld(row: Rt.UserDataRecord): Rt.RecDisplayBlock {
        let rec = JSON.parse(row.FieldsJson) as Rt.RecDisplayBlock;
        rec.Id = row.Id;

        return rec;
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
        rr.DateToDisplay     = row.DateToDisplay;
        rr.Type = row.Type;
        rr.Visible = row.Visible;
        rr.Minimized = row.Minimized;
        rr.Dismissed = row.Dismissed;
        rr.Message = row.Message;
        rr.FieldsJson = row.FieldsJson;
        rr.TagsJson = row.TagsJson;

        return rr;
    }
}

