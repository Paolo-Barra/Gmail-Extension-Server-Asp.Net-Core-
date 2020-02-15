import { IDictionaryOfAny, IDictionaryOfVenueListItemsArray } from './recipes.interfaces';
import { IDictionaryOfStringArray } from './recipes.interfaces';
import { CdCategoryDtoExt } from '@app/refind/shared/service-proxies/CdCategoryDtoExt';

export class RecipeWizardData {
    public CollectionData: IDictionaryOfStringArray = {};
    public RemoteCollectionData: IDictionaryOfVenueListItemsArray = {};
    public DataValues: IDictionaryOfAny = {}; // union to hold any choices set in wizard
    public CheckboxDataSet: Array<CdCategoryDtoExt> = [];              // Extended version of CategoriesDataSrv but adds options needed for display
}
