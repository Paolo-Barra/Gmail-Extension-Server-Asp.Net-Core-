import { RecipeTemplateKeys } from "./RecipeTemplateConsts";
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';

interface IDictionaryTuple {
    [key: number]: [number, string, number, boolean];
};

export enum SearchTimeFrame {
    None,
    OneWeek,
    TwoWeeks,
    OneMonth,
    TwoMonths,
    ThreeMonths,
    FourMonths,
    SixMonths,
    OneYear,
    Everything
}

export class SearchTimeFrameHelper{
    private ttt: IDictionaryTuple = [
        [SearchTimeFrame.None, "0 Week", 7, false],
        [SearchTimeFrame.OneWeek, "1 Week", 7, false],
        [SearchTimeFrame.TwoWeeks, "2 Week", 7 * 2, false],
        [SearchTimeFrame.OneMonth, "1 Month", 7 * 4, true],
        [SearchTimeFrame.TwoMonths, "2 Monhts", 7 * 4 * 2, false],
        [SearchTimeFrame.ThreeMonths, "3 Months", 15, false],
        [SearchTimeFrame.FourMonths, "3 Months", 15, false],
        [SearchTimeFrame.SixMonths, "6 Months", 15, false],
        [SearchTimeFrame.OneYear, "1 Year", 15, false],
        [SearchTimeFrame.Everything, "Everything", 15, false],
    ];
    findText(index: number): string {
        return this.ttt[index][1];
    }
    findDays(index: number): number {
        return this.ttt[index][2];
    }

   
    static findDefault(index: number): number {
        return SearchTimeFrame.OneMonth;
    }
}


export class MailFoldersBasicKey {
    public static Inbox = "Inbox";
}

export class UniqueIdFactory {
    static Get(input: any) {
        if (input instanceof Rt.VenueBlock) {
            let tany = input as Rt.VenueBlock;
            return tany.VenueId;
        }
        if (input instanceof Rt.RecipeCriteriaEmail) {
            let tany = input as Rt.RecipeCriteriaEmail;
            return tany.Email;
        }
        if (input instanceof Rt.RecipeCriteriaContactsGroup) {
            let tany = input as Rt.RecipeCriteriaContactsGroup;
            return tany.DiscoveredGroupId;
        }
        if (input instanceof Rt.RecipeCriteriaNewsGroup) {
            let tany = input as Rt.RecipeCriteriaNewsGroup;
            return tany.CategoryId.toString();
        }
    }
}


export class AddOrEditRecipeDto {
    Id: number;
    UserAccountId: string;
    RecipeId: string;
    TemplateId: string;
    Values: { [key: string]: string };
    Collections: { [key: string]: string[] };

    Matrixes: { [key: string]: { [key: string]: string[] } };

    private static ToStringJs(argument:any)
    {
        if(argument instanceof Boolean )
        {
            return argument.toString().toLowerCase();
        }
        return argument;
    }


    static FromCriteria(criteria: Rt.RecipeCriteria): Rt.AddOrEditRecipeDto {

        var ssh = new SearchTimeFrameHelper();
        var xx = ssh.findDays(criteria.HistoryDaysBack);

        var dto = new Rt.AddOrEditRecipeDto();
        dto.Values[RecipeTemplateKeys.RecipeName.Key] = criteria.Name;
        dto.RecipeId = criteria.RecipeId;
        dto.CookbookId = criteria.CookbookId;
        dto.TemplateId = criteria.TemplateId;
        dto.CookbookId = criteria.CookbookId;
        dto.Collections[RecipeTemplateKeys.MailAccounts.Key] = [criteria.MailAccountId];
        dto.Collections[RecipeTemplateKeys.CategoryId.Key] = criteria.CategoryIds;
        dto.UserAccountId = criteria.UserAccountId;
        dto.Values[RecipeTemplateKeys.FieldToMatch.Key] = criteria.FieldToMatch.toString();
        dto.Values[RecipeTemplateKeys.ValueToMatch.Key] = criteria.ValueToMatch;
//        dto.Values[RecipeTemplateKeys.SearchTimeFrame.Key] = EnumDescHelper.FindIntChoice<SearchTimeFrame>(criteria.HistoryDaysBack).ToStringJs();
        dto.Values[RecipeTemplateKeys.RecipeType.Key] = criteria.RecipeType.toString();

        // check to make sure these are the real keys
        dto.Collections[RecipeTemplateKeys.UserList.Key] = criteria.UserList.map(r => UniqueIdFactory.Get(r));
        dto.Collections[RecipeTemplateKeys.UserGroup.Key] = criteria.UserList.map(r => UniqueIdFactory.Get(r));
        dto.Collections[RecipeTemplateKeys.Domains.Key] = criteria.UserList.map(r => UniqueIdFactory.Get(r));

        dto.Values[RecipeTemplateKeys.RankingKey.Key] = criteria.RankingCriteria.Key;
        dto.Values[RecipeTemplateKeys.RankingGreaterThan.Key] = this.ToStringJs(criteria.RankingCriteria.GreaterThanThreshold);
        dto.Values[RecipeTemplateKeys.RankingThresholdKey] = this.ToStringJs(criteria.RankingCriteria.Threshold);

        // dto.Collections[RecipeTemplateKeys.VenuesToSubtract.Key] = criteria.VenuesToSubtract;

        // dto.Values[RecipeTemplateKeys.FolderPerContactSource.Key] = criteria.SortCriteria.Source.ToStringJs();
        // dto.Collections[RecipeTemplateKeys.FolderPerContact_Groups.Key] = criteria.SortCriteria.GroupIds;
        dto.Values[RecipeTemplateKeys.FolderPerContact_UseFullNames.Key] = this.ToStringJs(criteria.SortCriteria.UseFullNames);
        dto.Values[RecipeTemplateKeys.FolderPerContact_DisplaySentFolders.Key] = this.ToStringJs(criteria.SortCriteria.DisplaySentMessages);

        dto.Collections[RecipeTemplateKeys.NewsGroups.Key] = criteria.NewsGroups.map(r => UniqueIdFactory.Get(r));
        dto.Matrixes[RecipeTemplateKeys.FolderCategoryMatrix.Key] = criteria.FolderCategoryMatrix;
        dto.Matrixes[RecipeTemplateKeys.FolderCategoryNameMatrix.Key] = criteria.FolderCategoryNameMatrix;
        dto.Matrixes[RecipeTemplateKeys.AddressCategoryMatrix.Key] = criteria.AddressCategoryMatrix;
        // dto.Matrixes[RecipeTemplateKeys.SmartPushGroups.Key] =
        // criteria.PushSettings.NotificationSounds.ToDictionary(x => x.Key, y => new List<string>() {y.Value.FriendlyName});

//        dto.Values[RecipeTemplateKeys.InboxStyle.Key] = criteria.InboxStyle.ToStringJs();
        dto.Collections[RecipeTemplateKeys.BuiltInCategoryList.Key] = [criteria.BuiltInCategoryList];

        // if (criteria.SortCriteria.Source.ToVenueTreeByTime(out var byTime))
        // {
        //     dto.Values[RecipeTemplateKeys.VenueTreeByTime.Key] = byTime.ToStringJs();
        // }

//        dto.Matrixes[RecipeTemplateKeys.SmartPushGroups.Key] = criteria.PushSettings.NotificationSounds.ToDictionary(x => x.Key, y => new List<string>() { y.Value.FriendlyName });

        // dto.Collections[RecipeTemplateKeys.CategoriesWhitelistKey] = criteria.FilterCriteria.Whitelist;
        // dto.Collections[RecipeTemplateKeys.IndustryGroupKey] = criteria.SortCriteria.IndustryGroups;
        // dto.Values[RecipeTemplateKeys.FolderPerContact_GroupByCategoryKey] =
        //     criteria.SortCriteria.JustGroupByCategories.ToStringJs();
        // dto.Values[RecipeTemplateKeys.WhitelistModeKey] = criteria.FilterCriteria.WhitelistMode.ToStringJs();

        // dto.CompletionStatus = MobileNotifyRecipeStatus.Status.Start;
        // dto.Values[RecipeTemplateKeys.PushTypeKey] = criteria.PushSettings.PushStyle.ToStringJs();
        // ParseFolders(dto, criteria);

        // dto.Values[RecipeTemplateKeys.KeywordsKey] = criteria.SortCriteria.Keywords.Join(", ");dto: 
        return;
    }

    // static void ParseFolders(AddOrEditRecipeDto dto, RecipeCriteria criteria)  {

    //     var other  = new Boolean();
    //     switch (criteria.ProcessedFolders.Count)
    //     {
    //         case 1:folder: var;
    //             if (folder.IsInbox())
    //             {
    //                 dto.Values[RecipeTemplateKeys.MailFoldersBasicKey] =
    //                     FolderSearch.Inbox.ToStringJs();
    //                 other = false;
    //             }
    //             else if (folder.IsSentItems())
    //             {
    //                 dto.Values[RecipeTemplateKeys.MailFoldersBasicKey] =
    //                     FolderSearch.SentItems.ToStringJs();
    //                 other = false;
    //             }
    //             break;
    //         case 2:
    //             if (criteria.ProcessedFolders.Any(x => x.IsInbox()) &&
    //                 criteria.ProcessedFolders.Any(x => x.IsSentItems()))
    //             {
    //                 dto.Values[RecipeTemplateKeys.MailFoldersBasicKey] =
    //                     FolderSearch.InboxAndSent.ToStringJs();
    //                 other = false;
    //             }
    //             break;
    //     }

    //     if (other == true)
    //     {
    //         dto.Values[RecipeTemplateKeys.MailFoldersBasicKey] =
    //             FolderSearch.Other.ToStringJs();
    //     }
    //     dto.Collections[RecipeTemplateKeys.MailFoldersAdvanced.Key] =
    //         criteria.ProcessedFolders.Select(x => x.FolderId).ToList();
    // }


    //         static  Name :string {
    //             get
    //             {
    //                 try
    //                 {
    //                     return Values[RecipeTemplateKeys.RecipeName.Key];
    //                 }
    // #pragma warning disable CS0168 // The variable 'e' is declared but never used
    //                 catch (Exception e)
    // #pragma warning restore CS0168 // The variable 'e' is declared but never used
    //                 {
    //                     // Swallow the exception and return empty
    //                     return "";
    //                 }
    //             }
    //         }

    //         export string RecipeType {
    //             get
    //             {
    //                 try
    //                 {
    //                     return Values[RecipeTemplateKeys.RecipeType.Key];
    //                 }
    // #pragma warning disable CS0168 // The variable 'e' is declared but never used
    //                 catch (Exception e)
    // #pragma warning restore CS0168 // The variable 'e' is declared but never used
    //                 {
    //                     // Swallow the exception and return empty
    //                     return "";
    //                 }
    //             }
    //         }

    //         CookbookId: string;

    //         export string GetValueForKey(string key) {
    //             if (key.IsNullOrEmpty())
    //             {
    //                 return "";
    //             }paths: var;

    //             if (paths.Length != 2)
    //             {
    //                 return "";
    //             }

    //             switch (paths[0])
    //             {
    //                 case RecipeTemplateKeys.ValuesPath:
    //                     if(Values.ContainsKey(paths[1]))
    //                     {
    //                         return Values[paths[1]];
    //                     }
    //                     break;
    //                 case RecipeTemplateKeys.CollectionsPath:
    //                     if (Collections.ContainsKey(paths[1]))
    //                     {
    //                         return Collections[paths[1]].FirstOrDefault();
    //                     }
    //                     break;
    //                 case RecipeTemplateKeys.MatrixesPath:
    //                     if (Matrixes.ContainsKey(paths[1]))
    //                     {
    //                         return JsonSerializer.SerializeToString(Matrixes[paths[1]]);
    //                     }
    //                     break;
    //             }

    //             return "";
    //         }

    //         export static AddOrEditRecipeDto FromCookbook(CdCookbook cookbook) {dto: var;
    //             dto.CookbookId = cookbook.CookbookId;
    //             dto.Values[RecipeTemplateKeys.CookbookTemplateId.Key] = cookbook.CookbookTemplateId;
    //             dto.Collections[RecipeTemplateKeys.MailAccounts.Key] = new List<string>() {cookbook.MailAccountId};dto: return;
    //         }

    //         export bool IsPushRecipe {
    //             get
    //             {
    //                 if (Enum.TryParse<RecipeTypes>(RecipeType, out var type))
    //                 {
    //                     switch (type)
    //                     {
    //                         case RecipeTypes.PushNotifications:true: return;
    //                     }
    //                 }false: return;
    //             }
    //         }
    //     }
}