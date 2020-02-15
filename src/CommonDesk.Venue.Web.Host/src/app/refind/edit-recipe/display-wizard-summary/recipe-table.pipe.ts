import { Pipe, PipeTransform } from '@angular/core';

interface IHumanReadableKeys {
  [index: string]: string;
}
/**
 * Angular pipe to transform the recipes summary data for tabular view
 */
@Pipe({
  name: 'tableRecipe'
})
export class RecipeTablePipe implements PipeTransform {

  private humanReadableKeys: IHumanReadableKeys = {

    Name: 'Name',
    CustomDomainList: "Custom Domain List",
    ValueToMatch: "Value To Match",
    FieldToMatch: "Field To Match",
    VenueTreeByTime: "TimeFrame Style",
    FPC_DisplaySent: "Display Sent Folders",
    FPC_GroupByCategory: "Messages by Industry in one venue",
    FPC_UseFullNames: "Use Full Names",
    MailAccounts: "Match all messages from",
    CategoriesRecipeIncluded: "Include messages from the following groups",
    CategoriesRecipeExluded: "Exclude messagess from the following groups",
    WhitelistMode: "White List Mode",
    FolderSearch: "Search in Folders",
    SearchTimeFrame: "Search Time Frame",
    MailFoldersBasic: "Mail Folders"
  };

  TableValue(key: string, value: string[]) {
    switch (key) {
      case 'CustomDomainList':
      case 'CategoriesREcipeIncluded':
      case 'CategoriesRecipeExluded':
        if (value.length === 0) return "Not set";

        return value.map((domain: string) => {
          return `<p>${domain}</p>;`
        }).join(" ");
        
      default:
        return value;
    }
  }

  // Gets the logic.DataArray variable from template
  // Returns a table mat table optimized data for rendering in a table

  transform(value: any, args?: any[]): any {
    let data = [];
    let i = 0;

    for (let key in value) {

      if (value.hasOwnProperty(key)) {

        const tableValue = this.TableValue(key, value[key]);
        // console.log("tableValue", tableValue);
        data.push(
          { position: ++i, name: this.humanReadableKeys[key], value: tableValue }
        );
      }
    }

    return data;
  }
}



