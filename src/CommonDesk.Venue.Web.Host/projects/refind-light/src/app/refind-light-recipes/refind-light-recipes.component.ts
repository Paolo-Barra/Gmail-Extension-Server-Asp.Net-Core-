import { Component, ViewEncapsulation, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesPageComponentLogic } from "../../../../../src/app/refind/recipes/recipes-inuse/recipes-inuse-logic.component";
import { trigger } from '@angular/animations';
import { RefindUserDataService } from '../../../../../src/refindRoot/refind-user-data.service';
import { RefindServiceProxyTyped } from '../../../../../src/app/refind/shared/service-proxies/refind-service-proxy-typed';

@Component({
  templateUrl: './refind-light-recipes.component.html',
  styleUrls: ['./refind-light-recipes.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class RefindLightRecipesComponent implements OnInit {

    public activatedRoute: ActivatedRoute;
    public logic: RecipesPageComponentLogic;
    public dataService: RefindUserDataService;
    public refindServiceProxyTyped: RefindServiceProxyTyped;

  public constructor(
    public injector: Injector
    ) 
  {
    this.activatedRoute = injector.get(ActivatedRoute);
    this.dataService = injector.get(RefindUserDataService);
    this.logic = this.injector.get(RecipesPageComponentLogic);
    this.refindServiceProxyTyped = this.injector.get(RefindServiceProxyTyped);
    
  }

  ngOnInit() {

    let uid = this.activatedRoute.snapshot.queryParams["userAccountId"];
    this.dataService.setUserAccountId(uid);
    this.dataService.setDeviceId("Portal");

    // We need to create the proxy and logic after we setup the user and device id on the UserDataService
    // If we create the proxy or logic before configuring the UserDataService we'll have errors because the proxy and logic depend on user/device ids
    this.refindServiceProxyTyped.Init();
    
  

    this.logic.ngOnInit();
    this.logic.editRecipeCookbookUrl = 'recipesCreateOrEdit';
    this.logic.addRecipeCookbookUrl = 'templateList';
  }
}
