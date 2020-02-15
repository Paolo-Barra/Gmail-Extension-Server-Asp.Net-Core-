import { Component, OnInit,Input} from '@angular/core';
import { RecipeCreateOrEditComponentLogic } from '@app/refind/recipes/recipesCreateOrEdit/recipes-CreateOrEditLogic.component';
import { CdRecipeTemplate } from '@app/refind/recipes/recipesCreateOrEdit/recipes.interfaces';
import * as Rt  from '@shared/service-proxies/refind/ReFind.dtos';
import { RecipeTemplateWidget } from '@shared/service-proxies/refind/ReFind.dtos';


@Component({
  selector: 'cookbook-wizard-fields',
  templateUrl: './cookbook-wizard-fields.component.html',
  styleUrls: ['./cookbook-wizard-fields.component.css']
})
export class CookbookWizardFieldsComponent implements OnInit 
{
  RecipeTypeEnum = RecipeTemplateWidget;
  @Input() aComponent: Rt.CdRecipeTemplateComponent;

  constructor(public logic: RecipeCreateOrEditComponentLogic) { }

  ngOnInit() {
  }

}
