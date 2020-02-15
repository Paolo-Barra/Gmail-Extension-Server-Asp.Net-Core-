import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { RecipesTemplateLogic } from './recipes-template-list.logic';
import { RefindToolsService } from '@app/refind/refind-tools.service';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';

@Component({
    templateUrl: './recipes-template-list.component.html',
    styleUrls: ['./recipes-template-list.component.css'],
    encapsulation: ViewEncapsulation.None,

    animations: [appModuleAnimation()],
})
export class RecipeListComponent extends AppComponentBase implements OnInit {

    constructor(
        private injector: Injector,
        public logic: RecipesTemplateLogic,
        private tools: RefindToolsService
    ) {
        super(injector);
    }

    async ngOnInit() {
        abp.ui.clearBusy();
        this.logic.ngOnInit();
        this.logic.editRecipeCookbookUrl = 'app/main/recipes/CreateOrEdit';
        this.logic.recipeListUrl = 'app/main/recipes';
        try {
            if (this.logic.viewType == 'Recipes') {
                this.logic.RecipeList = await this.logic.getRecipesTemplate();
                
                this.logic.RecipeList.map(row => {
                    if(row.TemplateId == "I_Industry") {
                        row.Status = Rt.RecipeTemplateStatus.ComingSoon;
                    }
                })
            }
            else if (this.logic.viewType == 'Cookbooks') {
                this.logic.CookbookList = await this.logic.getCookbookTemplate();
            }
        } catch (e) {
            this.tools.warn("RecipeListComponent:ngOnInit:" + e);
        }
    }
    async  getRecipesTemplate() {
        try {
            this.primengTableHelper.showLoadingIndicator();
            this.logic.RecipeList = await this.logic.getRecipesTemplate();
            this.primengTableHelper.hideLoadingIndicator();
            abp.ui.clearBusy();
        } catch (e) {
            this.tools.warn("RecipeListComponent:ngOnInit:" + e);
        }
    }

    async getCookbookTemplate() {
        try {
            this.primengTableHelper.showLoadingIndicator();
            this.logic.CookbookList = await this.logic.getCookbookTemplate();
            this.primengTableHelper.hideLoadingIndicator();
            abp.ui.clearBusy();
        } catch (e) {
            this.tools.warn("RecipeListComponent:ngOnInit:" + e);
        }
    }
}
