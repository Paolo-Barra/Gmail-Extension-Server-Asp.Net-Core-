import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { DevicesLogicComponent } from '../devices/devices.logic.component';
import { ToastrService } from 'ngx-toastr';
import { RecommendationLogicComponent } from './recommendation.logic.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { RefindServiceProxyTyped } from '../shared/service-proxies/refind-service-proxy-typed';

@Component({
  selector: 'refind-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent extends AppComponentBase {

  constructor(injector: Injector,
    public _activatedRoute: ActivatedRoute,
    public logic: RecommendationLogicComponent,
    public refindServiceProxyTyped: RefindServiceProxyTyped,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.logic.ngOnInit();
  }
}
