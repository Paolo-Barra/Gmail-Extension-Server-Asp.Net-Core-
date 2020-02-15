import { Component, OnInit } from '@angular/core';
import { RecipeCreateOrEditComponentLogic } from '@app/refind/recipes/recipesCreateOrEdit/recipes-CreateOrEditLogic.component';
@Component({
  selector: 'recipe-wizard-page-leadin',
  templateUrl: './recipe-wizard-page-leadin.component.html',
  styleUrls: ['./recipe-wizard-page-leadin.component.css']
})
export class RecipeWizardPageLeadinComponent implements OnInit {
  constructor(public logic: RecipeCreateOrEditComponentLogic) { }

  ngOnInit() {
  }

}
