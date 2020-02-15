import { Component, OnInit, Input } from '@angular/core';
import { RecipeCreateOrEditComponentLogic } from '@app/refind/recipes/recipesCreateOrEdit/recipes-CreateOrEditLogic.component';
@Component({
  selector: 'recipe-wizard-headers',
  templateUrl: './recipe-wizard-headers.component.html',
  styleUrls: ['./recipe-wizard-headers.component.css']
})
export class RecipeWizardHeadersComponent implements OnInit {
 
  constructor(public logic: RecipeCreateOrEditComponentLogic) { }
  ngOnInit() {
  }

}
