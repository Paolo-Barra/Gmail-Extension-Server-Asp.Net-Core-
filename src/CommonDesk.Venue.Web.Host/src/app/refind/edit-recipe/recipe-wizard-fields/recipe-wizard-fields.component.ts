import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RecipeCreateOrEditComponentLogic } from '@app/refind/recipes/recipesCreateOrEdit/recipes-CreateOrEditLogic.component';
import { CdRecipeTemplate } from '@app/refind/recipes/recipesCreateOrEdit/recipes.interfaces';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RecipeTemplateWidget } from '@shared/service-proxies/refind/ReFind.dtos';


@Component({
  selector: 'recipe-wizard-fields',
  templateUrl: './recipe-wizard-fields.component.html',
  styleUrls: ['./recipe-wizard-fields.component.css']
})
export class DisplayRecipeWizardFieldsComponent implements OnInit, AfterViewInit {
  @Input() aComponent: Rt.CdRecipeTemplateComponent;
  @ViewChild("recipeName") recipeNameField: ElementRef;
  constructor(public logic: RecipeCreateOrEditComponentLogic) { }
  RecipeTypeEnum = RecipeTemplateWidget;
  ngOnInit() {

  }
  ngAfterViewInit(): void {
    if (this.recipeNameField) {
      this.recipeNameField.nativeElement.focus();
    }
  }
}
