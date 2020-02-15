import { Router, ActivatedRoute } from '@angular/router';
import { Component, Injector, ViewEncapsulation, ElementRef, OnInit, HostListener } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RefindServiceProxyTyped } from '../shared/service-proxies/refind-service-proxy-typed';
import { RefindToolsService } from '../refind-tools.service';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';

@Component({
    templateUrl: './refind.dashboard.component.html',
    styleUrls: ['./refind.dashboard.component.less']
})
class RefindDashboardComponent extends AppComponentBase implements OnInit {

    VenueServerSideEventsRoot: string;
    public router: Router;
    public elementRef: ElementRef;
    public _activatedRoute: ActivatedRoute;
    public refindServiceProxyTyped: RefindServiceProxyTyped;
    public tools: RefindToolsService;
    public dataService: RefindUserDataService;

    downloadedGroupTitles:Rt.CdCategoryDto[] = [];

    userAccountId: string;
    deviceId: string;
    data: Rt.AccountCreationChartData;
    messagesStartTime: string;
    messagesEndTime: string;
    messagesCount: number;
    messagesPerGroupJson: object;
    uniqueSendersPerGroup: object;
    messagesPerDay: object;
    messagesSentVsRecieved: object;

    gradient: boolean = false;
    showLegend: boolean = true;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
    legendPosition: string = 'right';
    maxLabelLength: number = 20;
    trimLabels: boolean = false;
  
    showLegendh: boolean = false;
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    showXAxisLabel: boolean = true;
    yAxisLabel: string = 'Groups';
    yAxisLabelMsg: string = 'Messages per Day';
    showYAxisLabel: boolean = true;
    xAxisLabel: string = 'Message count';
    showDataLabel: boolean = true;

    isDataDownloaded:boolean = false;

    constructor(
        injector: Injector,
    ) {
        super(injector);
        this.router = injector.get(Router);
        this.elementRef = injector.get(ElementRef);
        this._activatedRoute = injector.get(ActivatedRoute);
        this.refindServiceProxyTyped = injector.get(RefindServiceProxyTyped);
        this.tools = injector.get(RefindToolsService);
        this.dataService = injector.get(RefindUserDataService);
    }


    newDestroy(): void {
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {


        this.userAccountId = this.dataService.getUserAccountId();
        this.deviceId = this.dataService.getDeviceId();
        this.tools.assert(this.userAccountId, "HPC:ngOnInit:userAccountId == null");
        this.tools.assert(this.deviceId, "HPC:ngOnInit:deviceId == null");
        this.refindServiceProxyTyped.Init();
        this.getChartData();

    }

    async getChartData()  { 
    
        // this.downloadedGroupTitles = await this.reloadGroupTitles();
        let response = await this.refindServiceProxyTyped.ListChartDataAsync(Rt.ChartDataQuerys.Basic);
        if(response.Success)
        {
          this.data = response.Results;
          this.messagesSentVsRecieved = [
            {"name":"Sent Messages","value":response.Results.SentMessages},
            {"name":"Received Messages","value":response.Results.ReceivedMessages}
          ];
          this.uniqueSendersPerGroup = JSON.parse(response.Results.UniqueSendersPerGroupJson);
          this.messagesPerGroupJson = JSON.parse(response.Results.MessagesPerGroupJson);
          this.messagesPerDay = JSON.parse(response.Results.MessagesPerDayJson);
          this.downloadedGroupTitles = response.Results.GroupList;
          this.isDataDownloaded = true;
        }
    
    }
    isAccountCreated() : boolean {

        return (this.isDataDownloaded == true && this.dataService.getCreateAccountState() != 'never');
    }

    // async loadGroupTitles()
    // {
    //     if(this.downloadedGroupTitles.length == 0 )
    //     {
    //         this.downloadedGroupTitles = await this.reloadGroupTitles();
    //     }
    //     return this.downloadedGroupTitles;
    // }

    getEmailAddress() : string {
        return this.dataService.getAuthUserDetails().EmailAddress;
    }
    
    async reloadGroupTitles() : Promise<Rt.CdCategoryDto[]>
    {
        let retVar:Rt.CdCategoryDto[] = [];
        let maccount = this.dataService.getPrimaryEmailAccount();
        let response = await this.refindServiceProxyTyped.ListCategoriesAsync(maccount, Rt.CategoryItemSourceOptions.All, true);
        if (response.Success) {
                retVar = response.Categories.sort( (a,b) => a.Rank-b.Rank) 
        }
        else
        {
            this.tools.warn("loadGroupList:Unable to reload group information.")
        }
        return retVar;
    }


      //  http://paletton.com/#uid=73D0u0kllllaFw0g0qFqFg0w0aF
  colorScheme = {
    domain: ['#4C688B', '#D4AC6A', '#5B5393', '#D4BE6A']
  };

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }



    @HostListener('window:resize', ['$event']) any;
}
@Component({
    templateUrl: './refind.dashboard.component.html',
    styleUrls: ['./refind.dashboard.component.mobile.less'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class RefindDashboardComponentMobile extends RefindDashboardComponent implements OnInit {

    constructor(injector: Injector) { super(injector); }

    ngOnInit() {
        super.ngOnInit();
    }
}

@Component({
    templateUrl: './refind.dashboard.component.html',
    styleUrls: ['./refind.dashboard.component.mobile.less'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class RefindDashboardComponentGmail extends RefindDashboardComponent implements OnInit {

    constructor(injector: Injector) { super(injector); }
    ngOnInit() {
        super.ngOnInit();
    }
}

@Component({
    templateUrl: './refind.dashboard.component.html',
    styleUrls: ['./refind.dashboard.component.less'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class RefindDashboardComponentWeb extends RefindDashboardComponent implements OnInit {

    constructor(injector: Injector) { super(injector); }

    ngOnInit() {
        super.ngOnInit();
    }
}
