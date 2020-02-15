import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RecipeTemplateKeys } from './RecipeTemplateConsts';
import { RecipeWizardData } from "@app/refind/recipes/recipesCreateOrEdit/RecipeWizardData";
import { RefindServiceProxyTyped } from './refind-service-proxy-typed';
import { VenueListItemExt } from './VenueListItemExt';
import { RecipeCreateOrEditComponentLogic } from '@app/refind/recipes/recipesCreateOrEdit/recipes-CreateOrEditLogic.component';


 class AedtoValueKeys {
      Name = "Name";
      FieldToMatch = "FieldToMatch";
      SearchTimeFrame= "SearchTimeFrame";
      RecipeType= "RecipeType";
      RankingGreaterThan= "RankingGreaterThan";
      RankingThreshold= "RankingThreshold";
      FolderPerContactSource= "FolderPerContactSource";
      FPC_UseFullNames = "FPC_UseFullNames";
      FPC_DisplaySent =  "FPC_DisplaySent";
      InboxStyle =  "InboxStyle";
      FPC_GroupByCategory =  "FPC_GroupByCategory";
      WhitelistMode = "WhitelistMode";
      PushType = "PushType";
      MailFoldersBasic = "MailFoldersBasic";
      Keywords = "Keywords";
      TemplateName = "TemplateName";

      FPC_UseAllCategories = "FPC_UseAllCategories";
      VenueTreeByTime = "VenueTreeByTime";
      ValueToMatch = "ValueToMatch";
      CookbookTemplateId = "CookbookTemplateId";
}

 class AedtoCollectionKeys {
     MailAccounts = "MailAccounts";
     CategoryId = "CategoryId";
     UserList = "UserList";
     UserGroup = "UserGroup";
     EmailDomains = "EmailDomains";
     VenuesToSubtract = "VenuesToSubtract";
     FolderPerContactGroups = "FolderPerContactGroups";
     NewsGroups = "NewsGroups";
     BuiltInCategoryList = "BuiltInCategoryList";
     Categories_Included = "Categories_Included";
     Categories_Excluded = "Categories_Excluded";
     IndustryGroup = "IndustryGroup";
     MailFolders = "MailFolders";
}

//
// RecipeDtoExt - provides a wrapper around AddOrEditRecipeDto
//
export class RecipeDtoExt extends Rt.AddOrEditRecipeDto {

    static ValueKeys: AedtoValueKeys = new AedtoValueKeys();
    static CollectionKeys: AedtoCollectionKeys = new AedtoCollectionKeys();

    constructor(parent: Rt.AddOrEditRecipeDto) {
        super();

        this.Id = parent.Id;
        this.UserAccountId = parent.UserAccountId;
        this.RecipeId = parent.RecipeId;
        this.TemplateId = parent.TemplateId;

        this.Values = parent.Values ? parent.Values : {};
        this.Collections = parent.Collections ? parent.Collections : {};
        this.Matrixes = parent.Matrixes ? parent.Matrixes : {};

        this.CompletionStatus = parent.CompletionStatus;
        this.Name = parent.Name;
        this.RecipeType = parent.RecipeType;
        this.CookbookId = parent.CookbookId;
        this.IsPushRecipe = parent.IsPushRecipe;
    }

    toWizardData(): RecipeWizardData {

        let wizardData: RecipeWizardData = new RecipeWizardData();

        wizardData.CollectionData = this.Collections;
        wizardData.DataValues = this.Values;

        return wizardData;
    }

    templateToWizardData(template:Rt.CdRecipeTemplate): RecipeWizardData {

        let wizardData: RecipeWizardData = new RecipeWizardData();

        template.Pages.forEach(page => {
            page.Components.filter(r => r.Key != null).map(r => this.setVar(r, wizardData));
        });

        return wizardData;
    }

    fromWizardData(uid:string, wizardData: RecipeWizardData,  template:Rt.CdRecipeTemplate,parent:RecipeCreateOrEditComponentLogic) {

        this.UserAccountId = uid;
        this.Name = wizardData.DataValues.Name;
        this.TemplateId = template.TemplateId;
        this.RecipeType = template.Type.toString();

        

        // Load the recipe data into the dto
        template.Pages.forEach(page => {

            page.Components.filter(r => r.Key != null).map(tComp =>
            {
                let fullKey = tComp.Key;
                let keyPair = fullKey.split('.');
                //console.log(`fromAny:Input:Key=[${fullKey}]:Value=[${value}]`);

                if (keyPair[0] === RecipeTemplateKeys.ValuesPath  ) {
                    this.Values[keyPair[1]] = wizardData.DataValues[keyPair[1]];
                    //console.log(`fromAny:Output:DataValues.${keyPair[1]}=${this.Values[keyPair[1]]}`);
                }
                if (keyPair[0] === RecipeTemplateKeys.CollectionsPath) {

                    // TODO: make all mail accounts and input folders come from the remote collection
                    // Review how the folders collection must work
                    // Remove this workaround that prevents breaking the recipe because no mail accounts or folders have IsItemChecked set to true when saving the recipe
                    if(this.isRemoteOption(tComp) && tComp.Key === "Collections.Categories_Included") {

                        let items = wizardData.CheckboxDataSet.filter(x => x.IsItemSelected === true);
                        this.Collections[keyPair[1]] = items.map(x => x.CategoryId);
                    } else if(this.isRemoteOption(tComp) && tComp.Key === "Collections.Categories_Excluded") {

                        let items = wizardData.CheckboxDataSet.filter(x => x.IsItemSelected === false);
                        this.Collections[keyPair[1]] = items.map(x => x.CategoryId);
                    } 
                    else if(this.isRemoteOption(tComp) && tComp.Key === "Collections.NewsGroups") {

                        let remoteCol = wizardData.RemoteCollectionData[keyPair[1]];
                        let items = remoteCol.filter(x =>  parent.newsGroupTreeSelected.includes(+x.Key));

                        this.Collections[keyPair[1]] = items.map(x => x.Key);
                    }
                    else if(this.isRemoteOption(tComp) && wizardData.CollectionData[keyPair[1]] === undefined) {
                        let items = wizardData.RemoteCollectionData[keyPair[1]].filter(x => x.IsItemSelected);
                        this.Collections[keyPair[1]] = items.map(x => x.Key);
                    } else {
                        this.Collections[keyPair[1]] = wizardData.CollectionData[keyPair[1]];
                    }
                    //console.log(`fromAny:Output:Collections.${keyPair[1]}=[${this.Collections[keyPair[1]]}]`);
                }
            });
        });
    }

    private isRemoteOption(templateComponent: Rt.CdRecipeTemplateComponent): boolean {
        return templateComponent.Widget.indexOf("_RemoteOptions") > 0;
//        return templateComponent.Widget == RefindTypes.CdRecipeTemplateComponent
    }

    private cleanString(val:string): string {

        return val.replace(/['"]+/g, '');
    }

    private setVar(templateComponent: Rt.CdRecipeTemplateComponent, wizardData: RecipeWizardData) {
        try {

            let key = templateComponent.Key;
            let value = templateComponent.Value;
            let sList = key.split('.');
            //console.log(`RDE:setVar:Input:Key=[${key}]:Value=[${value}]:Widget=[${templateComponent.Widget}]`);

            if (sList[0] === RecipeTemplateKeys.ValuesPath  ) {
                wizardData.DataValues[sList[1]] = this.cleanString(value);
              //  console.log(`RDE:setVar:Output:DataValues.${sList[1]}=${wizardData.DataValues[sList[1]]}`);
            }
            if (sList[0] === RecipeTemplateKeys.CollectionsPath) {

                if(value) {
                    wizardData.CollectionData[sList[1]] = [this.cleanString(value)];
                }
                //console.log(`RDE:setVar:Output:CollectionData.${sList[1]}=[${wizardData.CollectionData[sList[1]]}]`);
            }
            if (sList[0] === RecipeTemplateKeys.MatrixesPath) {

                //this.MatrixesData[sList[1]] = [this.cleanString(value)];
                //console.log(`RDE:setDataModelVar:Output:MatrixesDataData.${sList[1]}=[${this.MatrixesDataData[sList[1]]}]`);
            }
        } catch(e) {
            console.log(`RDE:setVar:ParseError=${e.Message}`);
        }
    }
}
