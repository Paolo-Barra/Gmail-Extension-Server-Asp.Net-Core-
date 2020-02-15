import { Component, OnInit, ViewEncapsulation, Injector, ViewChild, NgModule } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ActivatedRoute } from '@angular/router';
import { RecipeCreateOrEditComponentLogic } from './recipes-CreateOrEditLogic.component';
import { AppComponentBase } from '@shared/common/app-component-base';


@Component({
    templateUrl: './nonCookbook.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class RecipeCreateOrEditComponent extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector, 
        private _activatedRoute: ActivatedRoute, 
        public logic: RecipeCreateOrEditComponentLogic
        ) {
            super(injector);
            
        }

        
    ngOnInit() 
    { 
        this.logic.ngOnInit();
    }

    ngOnChanges()
    {
        //this.logic.ngOnChanges();
    }
    ngOnDestroy()
    {
        this.logic.ngOnDestroy();
    }
}