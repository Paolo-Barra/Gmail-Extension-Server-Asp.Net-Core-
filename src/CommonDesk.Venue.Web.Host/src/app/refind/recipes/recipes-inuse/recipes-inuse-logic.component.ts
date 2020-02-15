import { Injector, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RefindToolsService } from '@app/refind/refind-tools.service';
import { TestBed } from '@angular/core/testing';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { RefindServiceProxyTyped } from '@app/refind/shared/service-proxies/refind-service-proxy-typed';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';

@Injectable()
export class RecipesPageComponentLogic {
    public viewAddText: string;

    public viewMode: string;
    public RecipeList: Rt.AddOrEditRecipeDto[] = [];
    public CookbookList: Rt.AddOrEditRecipeDto[] = [];
    public editRecipeCookbookUrl: string;
    public addRecipeCookbookUrl: string;


    private userAccountId: string;
    private viewType: string;
    private type: string;
    private cookBook_Mode: string;
    private recipe_Mode: string;
    private deviceId: string;

    constructor(
        injector: Injector,
        private refindServiceProxyTyped: RefindServiceProxyTyped,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private tools: RefindToolsService,
        public dataService: RefindUserDataService
    ) {
    }

    ngOnInit(): void {
        this.cookBook_Mode = 'CookBooks';
        this.recipe_Mode = 'Recipes';

        this.userAccountId = this.dataService.getUserAccountId();
        this.deviceId = this.dataService.getDeviceId();
        this.tools.assert(this.userAccountId,"RPCL:ngOnInit:userAccountId == null");
        this.tools.assert(this.deviceId,"RPCL:ngOnInit:deviceId == null");

        this.refindServiceProxyTyped.Init();

        this.viewType = this._activatedRoute.snapshot.queryParams["viewType"];
        if (this.viewType == undefined) { this.viewType = this.recipe_Mode; }
        this.viewMode = this.viewType;

        if (this.viewType == 'Recipes') {
            this.selectRecipesTab();
        } else {
            this.selectCookbooksTab();
        }
    }

    anyRecipesInstalled(): boolean {
        return this.RecipeList != null && this.RecipeList.length > 0;
    }
    anyAccountsInstalled(): boolean {
        return this.dataService.isAccountCreated();
    }
    anyCookbooksInstalled(): boolean {
        return this.CookbookList != null && this.CookbookList.length > 0;
    }

    async selectRecipesTab() {
        // show the recipes tab
        this.viewAddText = 'Recipe';
        this.viewMode = 'Recipes';

        try {
            let response = await this.refindServiceProxyTyped.ListRecipeAsync();
            if (response.Success) {
                // IsPushRecipe are internal and cant be edited or deleted
                this.RecipeList = response.TheRecipes.filter(r => r.IsPushRecipe == false);
            } else {
                this.tools.warn("RCPL:selectRecipesTab:SERROR"+response.Message);
            }
        } catch (e) {
            this.tools.error("RCPL:selectRecipesTab:ERROR"+e.Message);
        }
    }


    public selectCookbooksTab() {
        // show the cookbooks tab
        //abp.ui.setBusy();
        this.viewAddText = 'Cookbook';
        this.viewMode = 'Cookbooks';
        let data: {};

        data = {
            "UserAccountId": this.userAccountId
        };

        // let result = await = this.refindServiceProxyTyped.GetCookbookAsync();

        // data => {
        //     this.displayRows = data.Cookbooks.map(x => this.formatTab(x, this.viewMode));
        // });

    }


    public recipeDetailsButtonClicked(item: Rt.AddOrEditRecipeDto) {
        this.tools.assert(this.userAccountId,"recipeDetailsButtonClicked:UserAccountId == null ");
        this.tools.assert(item.TemplateId,"recipeDetailsButtonClicked:TemplateId == null");
        this.tools.assert(item.RecipeId,"recipeDetailsButtonClicked:RecipeId == null");
//        this.tools.assert(this.type,"recipeDetailsButtonClicked:type == null");


        // show details of a recipe button click
        this.type = 'recipe';
        this._router.navigate([this.editRecipeCookbookUrl], {
            queryParams: {
                userAccountId: this.userAccountId,
                TemplateId: item.TemplateId,
                type: this.type,
                itemId: item.RecipeId,
                summary: true,
            }
        });
    }

    public cookbookDetailsButtonClicked(item: Rt.AddOrEditRecipeDto) {
        this.tools.assert(this.userAccountId,"cookbookDetailsButtonClicked:UserAccountId == null ");
        this.tools.assert(item.TemplateId,"cookbookDetailsButtonClicked:TemplateId == null");
        this.tools.assert(item.CookbookId,"cookbookDetailsButtonClicked:CookbookId == null");
//        this.tools.assert(this.type,"cookbookDetailsButtonClicked:type == null");

        // show details of a cookbook button click
        this.type = 'cookbook';
        this._router.navigate([this.editRecipeCookbookUrl], {
            queryParams: {
                userAccountId: this.userAccountId,
                TemplateId: item.TemplateId,
                type: this.type,
                itemId: item.CookbookId
            }
        });
    }

    // Findme: Add Recipe Button
    public addButtonClick(type) {

        this.tools.assert(this.userAccountId,"addButtonClick:UserAccountId == null ");
        this.tools.assert(type,"addButtonClick:type == null");


        // add a cookbook or recipe button
        this._router.navigate([this.addRecipeCookbookUrl], {
            queryParams: {
                userAccountId: this.userAccountId,
                viewType: type
            }
        });
    }
}

// private formatTab(model: any, type: any) {
//     if (type == this.recipe_Mode) {
//         return {
//             'Name': model.Name,
//             'Description': model.Values.TemplateName,
//             'Id': model.RecipeId,
//             'TemplateId': model.TemplateId
//         };
//     }
//     else if (type == this.cookBook_Mode) {
//         return {
//             'Name': model.Name,
//             'Description': model.Description,
//             'Id': model.CookbookId,
//             'TemplateId': model.CookbookTemplateId
//         };
//     }
// }
        // this.displayRows = response.TheRecipes.map(x => this.formatTab(x, this.viewMode));
        //     retVar = response.Templates.filter(function (x: RefindTypes.CdRecipeTemplate) {
        //             return x.CdCookbookTemplateId === 0;
        //     });
        // return retVar;

        // this.refindServiceProxyTyped.GetListRecipe(undefined,(response) => {
        //     if (response.Success) {
        //         this.displayRows = response.TheRecipes.map(x => this.formatTab(x, this.viewMode));
        //     }
        //     else {
        //         abp.notify.error("Handled Soft Error:=" + response.Message);
        //         console.log("This is a soft error");
        //     }
        //     abp.ui.clearBusy();

        // },(error)=>{

        // });
        // abp.ui.clearBusy();
        // let data: {};
        // data = {
        //     "UserAccountId": this.userAccountId,
        //     "DeviceId": this.deviceId
        // };
        // this.common.Recipe(data, 'ListRecipe',
        //     result => {
        //         if (result.Success) {
        //             this.displayRows = result.TheRecipes.map(x => this.formatTab(x, this.viewMode));
        //         }
        //         else {
        //             abp.notify.error("Handled Soft Error:=" + result.Message);
        //             console.log("This is a soft error");
        //         }
        //         abp.ui.clearBusy();
        //     }
        // );
