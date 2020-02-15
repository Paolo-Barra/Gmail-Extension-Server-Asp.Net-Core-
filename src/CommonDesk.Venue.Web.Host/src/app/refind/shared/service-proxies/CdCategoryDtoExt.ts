import { AddOrEditRecipeDto } from '@app/refind/shared/service-proxies/RecipeTemplateKeys';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { IDictionaryOfAny, IDictionaryOfStringArray } from '@app/refind/recipes/recipesCreateOrEdit/recipes.interfaces';




    export class CdCategoryDtoExt extends Rt.CdCategoryDto {
        IsItemSelected: boolean;
        IsExcludedChecked: boolean;
        IsIncludedChecked: boolean;
        IsCustomListChecked: boolean;
        constructor(private pp: Rt.CdCategoryDto) {
            super(pp)
        }
    }
