import { Component, OnInit } from '@angular/core';
import { RecipeCreateOrEditComponentLogic } from '@app/refind/recipes/recipesCreateOrEdit/recipes-CreateOrEditLogic.component';
import { RecipeTemplateWidget } from '@shared/service-proxies/refind/ReFind.dtos';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'wizard-summary-table',
  templateUrl: './wizard-summary-table.component.html',
  styleUrls: ['./wizard-summary-table.component.css']
})
export class WizardSummaryTableComponent implements OnInit {
  RecipeTypeEnum = RecipeTemplateWidget;

  displayedColumns: string[] = ["position", "name", "value"];

  constructor(public logic: RecipeCreateOrEditComponentLogic) { }

  ngOnInit() {
  }

}