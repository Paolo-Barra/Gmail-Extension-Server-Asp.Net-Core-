import { Router, ActivatedRoute } from '@angular/router';
import { Component, Injector, ElementRef, OnInit, HostListener } from '@angular/core';
import { DashboardPieChartComponent } from '../../../../../src/app/refind/dashboard/refind.DashboardPieChart.Component';
import { trigger } from '@angular/animations';
import { RefindToolsService } from '../../../../../src/app/refind/refind-tools.service';
import { RefindServiceProxyTyped } from '../../../../../src/app/refind/shared/service-proxies/refind-service-proxy-typed';
import { RefindUserDataService } from '../../../../../src/refindRoot/refind-user-data.service';

@Component({
  selector: 'app-refind-light.dashboard',
  templateUrl: './refind-light.dashboard.component.html',
  styleUrls: ['./refind-light.dashboard.component.mobile.less'],
//  animations: [trigger('routerTransition', [])]
})
export class RefindLightDashboardComponent implements OnInit {

    public router: Router;
    public elementRef: ElementRef;
    public activatedRoute: ActivatedRoute;
    public logic: DashboardPieChartComponent;
    public tools: RefindToolsService;
    public refindServiceProxyTyped: RefindServiceProxyTyped;
    public dataService: RefindUserDataService;

  constructor(public injector: Injector) {
    this.router = injector.get(Router);
    this.elementRef = injector.get(ElementRef);
    this.activatedRoute = injector.get(ActivatedRoute);
        
    this.tools = injector.get(RefindToolsService);
    this.dataService = injector.get(RefindUserDataService);
  }
  
  ngOnDestroy(): void {

      this.logic.ngOnDestroy();
  }
  ngOnInit(): void {
    let uid = this.activatedRoute.snapshot.queryParams["userAccountId"];
    this.dataService.setUserAccountId(uid);
    this.dataService.setDeviceId("Portal");

    // We need to create the proxy and logic after we setup the user and device id on the UserDataService
    // If we create the proxy or logic before configuring the UserDataService we'll have errors because the proxy and logic depend on user/device ids
    this.refindServiceProxyTyped = this.injector.get(RefindServiceProxyTyped);
    this.refindServiceProxyTyped.Init();

    this.logic = this.injector.get(DashboardPieChartComponent);
    this.logic.ngOnInit();
  } 

  init(): void { 
      this.logic.init();
  }
  cancelConnection(): void {
      this.logic.cancelConnection();
  }
  change_filter(): any { 
      this.logic.change_filter();
  }

  onGetCategories(response) { 
      this.logic.onGetCategories(response);
  }

  @HostListener('window:resize', ['$event'])

  gofromMessageDetails(group) { 
      this.router.navigate(['groupDetails'], {
          queryParams: {
              groupId: group.id,
          }
      });
  }
  gofromPeopleDetails(group) {
      this.router.navigate(['groupDetails'], {
          queryParams: {
              groupId: group.id,
          }
      });
  }
  get_text_positions(values) {

      return this.logic.get_text_positions(values);
  }

  get_account_progress_percent() {
      return this.logic.get_account_progress_percent();
  }

  get_account_progress_style() {
      return this.logic.get_account_progress_style();
  }

  ByMessage() {
      this.logic.ByMessage();
  }

  ByPerson() {
      this.logic.ByPerson();
  }

  getSummary() {
      this.logic.getSummary();
  }
  getDetails() {
      this.logic.getDetails();
  }

  get_percentFromMessage(group) {
      return this.logic.get_percentFromMessage(group);
  }

  get_percentFromPeople(group) {
      return this.logic.get_percentFromPeople(group);
  }

  get_total_messages() {
      return this.logic.get_total_messages();
  }

  get_total_people() {
      return this.logic.get_total_people();
  }
}

