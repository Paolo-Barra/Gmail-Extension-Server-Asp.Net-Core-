import { DashboardPieChartComponent } from '@app/refind/dashboard/refind.DashboardPieChart.Component';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Injector, ViewEncapsulation, ElementRef, OnInit, HostListener } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import { RefindToolsService } from '@app/refind/refind-tools.service';
import { RefindServiceProxyTyped } from '@app/refind/shared/service-proxies/refind-service-proxy-typed';

@Component({
  selector: 'app-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.less']
})
export class GroupOverviewComponent extends AppComponentBase implements OnInit {

  VenueServerSideEventsRoot: string;
  public router: Router;
  public elementRef: ElementRef;
  public _activatedRoute: ActivatedRoute;
  public piechart: DashboardPieChartComponent;
  public refindServiceProxyTyped: RefindServiceProxyTyped;
  public tools: RefindToolsService;
  public dataService: RefindUserDataService;

  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.router = injector.get(Router);
    this.elementRef = injector.get(ElementRef);
    this._activatedRoute = injector.get(ActivatedRoute);
    this.piechart = injector.get(DashboardPieChartComponent);
    this.refindServiceProxyTyped = injector.get(RefindServiceProxyTyped);
    this.tools = injector.get(RefindToolsService);
    this.dataService = injector.get(RefindUserDataService);
  }


  newDestroy(): void {
    this.piechart.newDestroy();
  }

  ngOnDestroy(): void {
    this.piechart.ngOnDestroy();
  }
  ngOnInit(): void {

    this.piechart.ngOnInit();
  }

  @HostListener('window:resize', ['$event']) any;

}
