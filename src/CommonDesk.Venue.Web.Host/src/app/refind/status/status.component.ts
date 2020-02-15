import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { RefindServiceProxyTyped } from '../shared/service-proxies/refind-service-proxy-typed';
import { StatusLogicComponent } from './StatusLogicComponent.';

@Component({
  selector: 'status-recommendation',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent extends AppComponentBase {

  constructor(injector: Injector,
    public _activatedRoute: ActivatedRoute,
    public logic: StatusLogicComponent,
    public refindServiceProxyTyped: RefindServiceProxyTyped,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.logic.ngOnInit();
  }
}