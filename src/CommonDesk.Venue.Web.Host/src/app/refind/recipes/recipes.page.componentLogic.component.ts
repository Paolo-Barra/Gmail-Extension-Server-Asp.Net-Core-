import { Injector, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { RefindServiceProxy } from '../shared/service-proxies/refind-service-proxy';
import { RefindServiceProxyTyped } from '../shared/service-proxies/refind-service-proxy-typed';

@Injectable()
export class RecipesPageComponentLogic {
    public viewAddText: string;
    public viewMode: any;
    public displayRows: any[];
    public editRecipeCookbookUrl: string;
    public addRecipeCookbookUrl: string;

    private userAccountId: string;
    private viewType: any;
    private type: string;
    private cookBook_Mode: string = 'CookBooks';
    private recipe_Mode: string = 'Recipes';
    private deviceId: string;

    constructor(injector: Injector,
        private refindServiceProxyTyped: RefindServiceProxyTyped,
//        private _common: RefindServiceProxy,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private route: ActivatedRoute) {
            this.displayRows = []
    }

    ngOnInit(): void {

        this.viewType = this._activatedRoute.snapshot.queryParams["viewType"];
        if (this.viewType == undefined) this.viewType = this.recipe_Mode;
        this.viewMode = this.viewType;


        if (this.viewType == 'Recipes') {
            this.selectRecipesTab();
        }
        else {
            this.selectCookbooksTab();
        }
    }

    async selectRecipesTab() {
        this.viewAddText = 'Recipe';
        this.viewMode = 'Recipes';


        let response = await this.refindServiceProxyTyped.ListRecipeAsync();
        if (response.Success) {
            this.displayRows = response.TheRecipes.map(x => this.formatTab(x, this.viewMode));
        }
        else {
            abp.notify.error("Handled Soft Error:=" + response.Message);
            console.log("This is a soft error");
        }
        abp.ui.clearBusy();
        
        // let data: {};


        // data = {
        //     "UserAccountId": this.userAccountId,
        //     "DeviceId": this.deviceId
        // };
        // this._common.Recipe(data, 'ListRecipe',
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
    }

    formatTab(model: any, type: any) {
        if (type == this.recipe_Mode) {
            return {
                'Name': model.Name,
                'Description': model.Values.TemplateName,
                'Id': model.RecipeId,
                'TemplateId': model.TemplateId
            };
        }
        else if (type == this.cookBook_Mode) {
            return {
                'Name': model.Name,
                'Description': model.Description,
                'Id': model.CookbookId,
                'TemplateId': model.CookbookTemplateId
            };
        }
    }
    public detailsButtonClicked(item: any) {
        abp.ui.setBusy();

        if (this.viewMode == this.cookBook_Mode) {
            this.type = 'cookbook';
        }
        else if (this.viewMode == this.recipe_Mode) {
            this.type = 'recipe';
        }

        this._router.navigate([this.editRecipeCookbookUrl], {
            queryParams: {
                userAccountId: this.userAccountId,
                TemplateId: item.TemplateId,
                type: this.type,
                itemId: item.Id
            }
        });
    }

    public selectCookbooksTab() {
        this.viewAddText = 'Cookbook';
        this.viewMode = 'Cookbooks';
        let data: {};

        data = {
            "UserAccountId": this.userAccountId
        };

        // this.refindServiceProxyTyped.GetListCookbooks(data => {
        //     this.displayRows = data.Cookbooks.map(x => this.formatTab(x, this.viewMode));
        // });

    }


    public addXButtonClick(type) {

        abp.ui.setBusy();
        this._router.navigate([this.addRecipeCookbookUrl], {
            queryParams: {
                userAccountId: this.userAccountId,
                viewType: type
            }
        });
    }
}   

