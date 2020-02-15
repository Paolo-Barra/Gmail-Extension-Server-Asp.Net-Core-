import { Component, OnInit, Injector } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single,byTime,getSend,ssValue} from './data';
import { RefindServiceProxyTyped } from '../shared/service-proxies/refind-service-proxy-typed';
import { RefindToolsService } from '../refind-tools.service';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import { Router } from '@angular/router';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { formatDate } from '@angular/common';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})

export class HelpComponent implements OnInit 
{
  single: any[];
  byTime: any[];
  getSend: any[];
  ssValue: any[];
  view: any[] = [750, 300];
  viewh: any[] = [650, 200];
  views: any[] = [800, 150];
  userAccountId: string;
  deviceId: string;
  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'right';
  maxLabelLength: number = 20;
  trimLabels: boolean = false;

  // unpacked 
  data: Rt.AccountCreationChartData;
  messagesStartTime: string;
  messagesEndTime: string;
  messagesCount: number;
  messagesPerGroupJson: object;
  uniqueSendersPerGroup: object;
  messagesPerDay: object;
  messagesSentVsRecieved:object;
  

  showLegendh: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Groups';
  yAxisLabelMsg: string = 'Messages per Day';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Message count';
  showDataLabel: boolean = true;
  cardColor: string = '#232837';

  isAccountCreated:boolean = false;

  constructor(
    injector: Injector,
    public refindServiceProxyTyped: RefindServiceProxyTyped,
    public tools: RefindToolsService,
    public dataService: RefindUserDataService,
    private router: Router
    )
     {
      Object.assign(this, { single });
      Object.assign(this, { byTime  });
      Object.assign(this, { getSend  });
      Object.assign(this, { ssValue  });


  }

  ngOnInit() {

    this.userAccountId = this.dataService.getUserAccountId();
    this.deviceId = this.dataService.getDeviceId();
    this.tools.assert(this.userAccountId,"HPC:ngOnInit:userAccountId == null");
    this.tools.assert(this.deviceId,"HPC:ngOnInit:deviceId == null");
    this.refindServiceProxyTyped.Init();

    this.getChartData();

  }
  async getChartData()  { 
    
    let response = await this.refindServiceProxyTyped.ListChartDataAsync(Rt.ChartDataQuerys.Basic);
    if(response.Success)
    {
      if(response.Results.ReceivedMessages > 0 ) this.isAccountCreated = true;
      this.data = response.Results;
      this.messagesSentVsRecieved = [
        {"name":"Sent Messages","value":response.Results.SentMessages},
        {"name":"Received Messages","value":response.Results.ReceivedMessages}
      ];
      this.uniqueSendersPerGroup = JSON.parse(response.Results.UniqueSendersPerGroupJson);
      this.messagesPerGroupJson = JSON.parse(response.Results.MessagesPerGroupJson);
      this.messagesPerDay = JSON.parse(response.Results.MessagesPerDayJson);

    }

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


}
