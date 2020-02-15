import { Component, OnInit, Input } from '@angular/core';
import { RecipeCreateOrEditComponentLogic } from '@app/refind/recipes/recipesCreateOrEdit/recipes-CreateOrEditLogic.component';
import * as Rt  from '@shared/service-proxies/refind/ReFind.dtos';
import { RecipeTemplateWidget } from '@shared/service-proxies/refind/ReFind.dtos';


@Component({
  selector: 'display-wizard-summary',
  templateUrl: './display-wizard-summary.component.html',
  styleUrls: ['./display-wizard-summary.component.css']
})

export class DisplayWizardSummaryComponent implements OnInit {
  RecipeTypeEnum = RecipeTemplateWidget;
  @Input() aComponent: Rt.CdRecipeTemplateComponent;
  constructor(public logic: RecipeCreateOrEditComponentLogic) { }

  ngOnInit() {
  }

  public splitGroup(raw:string)
  {
    let splitted = raw.split('_'); 
    return splitted[0];
  }

  public splitWant(raw:any,want:number)
  {
    try {
      let splitted = raw.split('_'); 
      return splitted[want];
    }
    catch
    {
      return "";
    }

  }
}
