import { Component, OnInit, Injector } from '@angular/core';
import { RecipesTemplateLogic }  from "../../../../../src/app/refind/recipes/recpiesTemplateList/recipes-template-list.logic";
import { RefindToolsService } from '../../../../../src/app/refind/refind-tools.service';
import { RefindUserDataService } from '../../../../../src/refindRoot/refind-user-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-refind-light-template-gmail',
  templateUrl: './refind-light-template-gmail.component.html',
  styleUrls: ['./refind-light-template-gmail.component.css']
})
export class RefindLightTemplateGmailComponent implements OnInit {

  public logic: RecipesTemplateLogic;
  private tools: RefindToolsService;
  private dataService: RefindUserDataService;
  private activatedRoute: ActivatedRoute;

  constructor(
      private injector: Injector      
  ) 
  {
    this.dataService = injector.get(RefindUserDataService);
    this.tools = injector.get(RefindToolsService);
    this.logic = injector.get(RecipesTemplateLogic);
    this.activatedRoute = injector.get(ActivatedRoute);
  }

  async ngOnInit() {

    let uid = this.activatedRoute.snapshot.queryParams["userAccountId"];
    this.dataService.setUserAccountId(uid);
    this.dataService.setDeviceId("Portal");

    this.logic.ngOnInit();
    this.logic.editRecipeCookbookUrl = 'recipesCreateOrEdit';
    this.logic.recipeListUrl = 'recipes';

    try {
        if (this.logic.viewType == 'Recipes') {
            this.logic.RecipeList = await this.logic.getRecipesTemplate();
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
          this.logic.RecipeList = await this.logic.getRecipesTemplate();
      } catch (e) {
          this.tools.warn("RecipeListComponent:ngOnInit:" + e);
      }
  }

  async getCookbookTemplate() {
      try {
          this.logic.CookbookList = await this.logic.getCookbookTemplate();
      } catch (e) {
          this.tools.warn("RecipeListComponent:ngOnInit:" + e);
      }
  }
}