import { Component, OnInit, Input } from '@angular/core';
import { RecipeCreateOrEditComponentLogic } from '@app/refind/recipes/recipesCreateOrEdit/recipes-CreateOrEditLogic.component';
@Component({
  selector: 'recipe-wizard-page-footer',
  templateUrl: './recipe-wizard-page-footer.component.html',
  styleUrls: ['./recipe-wizard-page-footer.component.css']
})
export class RecipeWizardPageFooterComponent implements OnInit {
  constructor(public logic: RecipeCreateOrEditComponentLogic) { }

  ngOnInit() {
  }

}
