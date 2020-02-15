import { Injectable, Injector } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindServiceProxyTyped } from "@app/refind/shared/service-proxies/refind-service-proxy-typed";
import { RefindToolsService } from "@app/refind/refind-tools.service";
import { RefindUserDataService } from "@refindRoot/refind-user-data.service";

@Injectable()
export class RecipesTemplateLogic {
    viewAddText: string;
    type: string;
    userAccountId: string;
    viewType: any;
    viewMode: any;
    public RecipeList: Rt.CdRecipeTemplate[] = [];
    public CookbookList: Rt.CdCookbookTemplate[] = [];
    editRecipeCookbookUrl: string;
    recipeListUrl: string;
    constructor(
        private injector: Injector,
        private _activatedRoute: ActivatedRoute,
        private refindServiceProxyTyped: RefindServiceProxyTyped,
        private router: Router,
        private tools: RefindToolsService,
        private dataService: RefindUserDataService,
        ) 
    {
    }
    ngOnInit() {
        this.viewType = this._activatedRoute.snapshot.queryParams["viewType"];
        this.viewMode = this.viewType;
        this.userAccountId = this.dataService.getUserAccountId();

        this.refindServiceProxyTyped.Init();        
    }

    anyRecipesInstalled() : boolean
    {
        return this.RecipeList != null && this.RecipeList.length > 0;
    }
    anyCookbooksInstalled() : boolean
    {
        return this.CookbookList != null && this.CookbookList.length > 0;
    }


    isRowVisible(recipe:Rt.CdRecipeTemplate) : boolean 
    {
        switch(recipe.Status)
        {
            case Rt.RecipeTemplateStatus.None:
            case Rt.RecipeTemplateStatus.Enabled:
            case Rt.RecipeTemplateStatus.ComingSoon:
            case Rt.RecipeTemplateStatus.RequiresBodys:
                return true;
            default:
                return false;
        }
    }

    isStatusVisible(recipe:Rt.CdRecipeTemplate) : boolean 
    { 
        switch(recipe.Status)
        {
            case Rt.RecipeTemplateStatus.RequiresBodys:
            case Rt.RecipeTemplateStatus.ComingSoon:
                return true;
            default:
                return false;
        }
    }

    statusToShow(recipe:Rt.CdRecipeTemplate) : string 
    {
        switch(recipe.Status)
        {
            case Rt.RecipeTemplateStatus.RequiresBodys:
                return "Requires Message Bodys"
            case Rt.RecipeTemplateStatus.ComingSoon:
                return "Coming Soon!"
            default: 
                return ""
        }
    }



    async getRecipesTemplate() {
        this.viewAddText = 'Recipe';
        this.viewMode = 'Recipes';
        let response = await  this.refindServiceProxyTyped.GetCdRecipeTemplatesAsync();
        if(response.Success)
        {
            return response.Templates.filter(function (x: Rt.CdRecipeTemplate) {
                    return x.CdCookbookTemplateId === 0;
            });
        }
    }

   
    async getCookbookTemplate() {
        this.viewAddText = 'Cookbook';
        this.viewMode = 'Cookbooks';
        let response = await this.refindServiceProxyTyped.ListCookbookTemplatesAsync();
        if(response.Success)
        {
            return response.CookbookTemplates;
        }
    }

    async clickRecipeRow(recipe:Rt.CdRecipeTemplate ) 
    {
        switch(recipe.Status)
        {
            // if its not enabled dont goto edit screen
            case Rt.RecipeTemplateStatus.RequiresBodys:
            case Rt.RecipeTemplateStatus.ComingSoon:
                return true;
        }

        this.tools.assert(this.userAccountId,"clickRecipeRow:UserAccountId == null ");
        this.tools.assert(recipe.TemplateId,"clickRecipeRow:templateid == null ");
        this.tools.assert(this.viewType,"clickRecipeRow:viewType == null ");

        // an existing recipe has been clicked 
        this.router.navigate([this.editRecipeCookbookUrl], {
            queryParams: {
                userAccountId: this.userAccountId,
                TemplateId: recipe.TemplateId,
                type: this.viewType
            }
        });
    }

    async clickCookbookRow(cookbookTemplateId:string ) 
    {
        // check if there are any active mail accounts before going there.
        let response = await this.refindServiceProxyTyped.GetAccountsOnDeviceAsync();
        if(response.Success)
        {
            if(response.Result.length > 0)
            {
                    this.router.navigate([this.editRecipeCookbookUrl], {
                        queryParams: {
                            userAccountId: this.userAccountId,
                            TemplateId: cookbookTemplateId,
                            type: this.viewType
                        }
                    });
            }
            else
            {
                this.tools.error("None of your mail accounts are ready for Cookbook creation yet.");
            }
        }
    }
    public viewClick(type) 
    {
        this.router.navigate([this.recipeListUrl], {
            queryParams: {
                userAccountId: this.userAccountId,
                viewType: type
            }
        });
    }
}
