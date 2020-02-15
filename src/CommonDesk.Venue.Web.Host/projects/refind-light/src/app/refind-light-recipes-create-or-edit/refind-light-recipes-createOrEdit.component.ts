import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger } from '@angular/animations';
import { RecipeCreateOrEditComponentLogic } from "../../../../../src/app/refind/recipes/recipesCreateOrEdit/recipes-CreateOrEditLogic.component";
import { RefindUserDataService } from '../../../../../src/refindRoot/refind-user-data.service';

@Component({
    templateUrl: './nonCookbook.html',
    encapsulation: ViewEncapsulation.None,
//    animations: [trigger('routerTransition', [])] 
})
export class RefindLightRecipeCreateOrEditComponent implements OnInit {

    public dataService: RefindUserDataService;
    private activatedRoute: ActivatedRoute;
    public logic: RecipeCreateOrEditComponentLogic;

    constructor(injector: Injector) 
    { 
        this.logic = injector.get(RecipeCreateOrEditComponentLogic);
        this.activatedRoute = injector.get(ActivatedRoute);
        this.dataService = injector.get(RefindUserDataService);
    }

    ngOnInit() { 
        let uid = this.activatedRoute.snapshot.queryParams["userAccountId"];
        this.dataService.setUserAccountId(uid);
        this.dataService.setDeviceId("Portal");

        this.logic.ngOnInit();
        this.logic.RecipeListUrl = "recipes";
    }
}