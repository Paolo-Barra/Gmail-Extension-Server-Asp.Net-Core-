import { Component, OnInit, ViewEncapsulation, Directive } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipesPageComponentLogic } from './recipes-inuse-logic.component';

@Component({
    templateUrl: './recipes-inuse.component.html',
    encapsulation: ViewEncapsulation.None,
    selector: 'refind-recipes',
    animations: [appModuleAnimation()]
})
export class RecipesComponent extends AppComponentBase implements OnInit {

    constructor(
        injector: Injector,
           _router: Router,
           public _activatedRoute: ActivatedRoute, 
           public logic: RecipesPageComponentLogic           
           ) 
           {
            super(injector);
    }
     
    
    ngOnInit() {
        
        this.logic.editRecipeCookbookUrl = 'app/main/recipes/CreateOrEdit';
        this.logic.addRecipeCookbookUrl = 'app/main/recipesTemplateList';

        this.logic.ngOnInit();
    }
}


