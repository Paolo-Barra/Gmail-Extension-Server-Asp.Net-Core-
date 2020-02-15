import { Collections } from './../../recipes/recipesCreateOrEdit/recipes.interfaces';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonServiceClient } from '@servicestack/client';
import { AppConsts } from '@shared/AppConsts';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import { RefindToolsService } from '@app/refind/refind-tools.service';
import { EditCategoryItem } from '@shared/service-proxies/refind/ReFind.dtos';
import { IterableChangeRecord_ } from '@angular/core/src/change_detection/differs/default_iterable_differ';

export type Callback = (response: any) => any;
export type CallbackTyped<T> = (response: Rt.IReturn<T>) => Rt.IReturn<T>;

export class SoftErrorException extends Error {
    public eType: string;
    public Message: string;
    public Caller: string;
    constructor(c: string, message?: string) {
        super(message);
        this.eType = "SoftErrorException";
        this.Message = message;
        this.Caller = c;
        Object.setPrototypeOf(this, SoftErrorException.prototype); // restore prototype chain
    }
}
export class HardErrorException extends Error {
    public eType: string;
    public Message: string;
    public Caller: string;
    constructor(caller: string, message?: string) {
        super(message);
        this.eType = "HardErrorException";
        this.Message = message;
        this.Caller = caller;
        Object.setPrototypeOf(this, HardErrorException.prototype); // restore prototype chain
    }
}


@Injectable()
export class RefindServiceProxyTyped {

    constructor(
        @Inject(HttpClient) http: HttpClient,
        protected dataService: RefindUserDataService,
        protected tools: RefindToolsService,
    ) {
        this.http = http;
        this.ErrorHandelTellUser();
    }

    http: HttpClient;
    baseUrl: string;
    UserAccountId: string;
    MailAccountId: string;
    DeviceId: string;
    displayWarning: string;
    ServiceStackApiKey = "AIzaSyCxuBkQhSuOHVX9_0HvIZZElqdDrzllyLI";
    ServiceStackApiKeyName = "RKey";

    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
    _baseUrl: any = '';
    _aspBackendBaseUrl: any = '';

    selectedErrorHandle = "";

    Init() {
        this._baseUrl = AppConsts.refindBackendUrl;
        this.UserAccountId = this.dataService.getUserAccountId();
        this.DeviceId = this.dataService.getDeviceId();
        this.MailAccountId = this.dataService.getMailAccountId();

        this.tools.assert(this.UserAccountId, "RefindServiceProxyTyped:UserAccountId == null");
        this.tools.assert(this.DeviceId, "RefindServiceProxyTyped:DeviceId:did == null");
    }

    async GetVenuesByRecipeId(recipeId: string) {
        const mName = "GetVenues";
        let request = new Rt.GetVenues();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;

        let response = await this.ASYNC_REST_CATCH_POST<Rt.GetVenuesResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async DeleteVenues(recipeId: string) {
        const mName = "DeleteVenues";
        let request = new Rt.DeleteVenues();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.RecipeId = recipeId;

        let response = await this.ASYNC_REST_CATCH_POST<Rt.DeleteVenuesResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async IsAccountConsentGranted(MailAccountId: string) {
        const mName = "IsAccountConsentGranted";
        let request = new Rt.IsAccountConsentGranted();
        request.MailAccountId = MailAccountId;
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;

        let response = await this.ASYNC_REST_CATCH_POST<Rt.IsAccountConsentGrantedResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async ReadApplicationState(uid:string,mid:string) {
        const mName = "ReadApplicationState";
        let request = new Rt.ReadApplicationState();
        request.UserAccountId = uid;
        request.MailAccountId = mid;
        let response = await this.ASYNC_REST_CATCH_POST<Rt.ReadApplicationStateResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async CreateApplicationState(uid:string,mid:string,input:Rt.ApplicationStateDto[]) {
        const mName = "CreateApplicationState";
        let request = new Rt.CreateApplicationState();
        request.UserAccountId = uid;
        request.MailAccountId = mid;
        request.Input = input;
        let response = await this.ASYNC_REST_CATCH_POST<Rt.CreateApplicationStateResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async CreateUserMessage(userData:Rt.UserDataRecord) {
        const mName = "CreateUserMessage";
        let request = new Rt.CreateUserMessage();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = userData.MailAccountId;
        request.DatePosted = userData.DatePosted;
        request.DateToDisplay = userData.DateToDisplay;
        request.Dismissed = userData.Dismissed;
        request.Type = userData.Type;
        request.Visible = userData.Visible;
        request.Minimized = userData.Minimized;
        request.Dismissed = userData.Dismissed;
        request.Message = userData.Message;
        request.FieldsJson = userData.FieldsJson;
        request.TagsJson = userData.TagsJson;
        let response =  await this.ASYNC_REST_CATCH_POST<Rt.CreateUserMessageResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async ReadUserMessage(userData:Rt.UserDataRecord) {
        const mName = "ReadUserMessage";
        let request = new Rt.ReadUserMessage();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = userData.DeviceId;
        request.MailAccountId = userData.MailAccountId;

        let response = await this.ASYNC_REST_CATCH_POST<Rt.ReadUserMessageResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    async UpdateUserMessageNow(userData:Rt.UserDataRecord) {
        let d = new Date();
        userData.DatePosted = d.toLocaleString();
        return await this.UpdateUserMessage(userData);
    }



    async UpdateUserMessage(userData:Rt.UserDataRecord) {
        const mName = "UpdateUserMessage";
        let request = new Rt.UpdateUserMessage();
        request.Id = userData.Id;
        request.RecordId = userData.RecordId;
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = userData.MailAccountId;
        request.DatePosted = userData.DatePosted;
        request.DateToDisplay = userData.DateToDisplay;
        request.Dismissed = userData.Dismissed;
        request.Type = userData.Type;
        request.SubType = userData.SubType;
        request.Visible = userData.Visible;
        request.Minimized = userData.Minimized;
        request.Dismissed = userData.Dismissed;
        request.Message = userData.Message;
        request.FieldsJson = userData.FieldsJson;
        request.TagsJson = userData.TagsJson;

        let response =  await this.ASYNC_REST_CATCH_POST<Rt.UpdateUserMessageResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async DeleteUserMessage(id:number) {
        const mName = "DeleteUserMessage";
        let request = new Rt.DeleteUserMessage();
        request.UserAccountId = this.UserAccountId;
        request.Rid = id;
        let response = await this.ASYNC_REST_CATCH_POST<Rt.DeleteUserMessageResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    AddVenues(vbList: Rt.VenueBlock[], rcriteria: Rt.RecipeCriteria, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "AddVenues";
        let request = new Rt.AddVenues();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = rcriteria.MailAccountId;
        request.AddedVenues = vbList;

        this.REST_CATCH_POST<Rt.AddVenuesResponse>(mName, request, sucessCallback, errorCallback);
    }

    async AddVenuesAsync(vbList: Rt.VenueBlock[], rcriteria: Rt.RecipeCriteria) {
        const mName = "AddVenuesAsync";
        let request = new Rt.AddVenues();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = rcriteria.MailAccountId;
        request.AddedVenues = vbList;
        let response = await this.ASYNC_REST_CATCH_POST<Rt.AddVenuesResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async PortalAccountWasAddedAsync(email: string, mid: string) {
        const mName = "PortalAccountWasAddedAsync";
        let request = new Rt.PortalAccountWasAdded();
        request.UserAccountId = this.UserAccountId;
        request.MailAccountId = mid;
        request.DeviceId = this.DeviceId;
        request.Email = email;

        let response = await this.ASYNC_REST_CATCH_POST<Rt.PortalAccountWasAddedResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    AddRecipe(rc: Rt.RecipeCriteria, mid: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "AddRecipe";
        let request = new Rt.AddARecipe();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = mid;
        request.Criteria = rc;
        request.RecipeId = rc.RecipeId;
        this.REST_CATCH_POST<Rt.AddRecipeResponse>(mName, request, sucessCallback, errorCallback);
    }
    async AddRecipeAsync(rc: Rt.RecipeCriteria, mid: string,pAction:Rt.EventPostActionDto) {
        const mName = "AddRecipeAsync";
        let request = new Rt.AddARecipe();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = mid;
        request.Criteria = rc;
        request.RecipeId = rc.RecipeId;
        request.ShortAction = pAction;
        let response = await this.ASYNC_REST_CATCH_POST<Rt.AddRecipeResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }
    AddCookbook(templateId: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "AddCookbook";
        let request = new Rt.AddCookbook();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        this.REST_CATCH_POST<Rt.AddCookbookResponse>(mName, request, sucessCallback, errorCallback);
    }


    async AddCookbookAsync(templateId: string, mailAccountId: string, metaData: any) {

        let mName = "AddCookbookAsync";
        let request = new Rt.AddCookbook();
        request.CookbookTemplateId = templateId;
        request.MailAccountId = mailAccountId;
        request.Metadata = metaData;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.AddCookbookResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async DeleteFullAccount(deleteCache:boolean) {
        let userDetails = this.dataService.getAuthUserDetails();

        let mName = "DeleteAccount";
        let request = new Rt.DeleteAccount();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = userDetails.MailAccountId;
        request.DeleteCachedData = deleteCache;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.DeleteAccountResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async UserAccountExists() {
        let mName = "UserAccountExists";
        let request = new Rt.UserAccountExists();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.UserAccountExistsResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async AddAccount(
        uid: string,
        mid: string,
        email: string,
        givenName: string,
        familyName: string,
        displayName: string,
        startRange:string,
        endRange:string,
        serviceUrl: string,
        syncAccountType: string,
        serverVersion: string,
        authToken: string,
        refreshToken: string,
        expireTokenDate: string,
        oAuthUniqueId: string,
        tokeType: Rt.OAuthAccessTokenType,
        paction:Rt.EventPostActionDto
        ) {

        let mName = "AddAccount";
        let request = new Rt.AddAccount();
        request.UserAccountId = uid;
        request.MailAccountId = mid;
        request.DeviceId = this.DeviceId;
        request.DeviceToken = "NA";
        request.AuthToken = authToken;
        request.RefreshToken = refreshToken;
        request.ExpiresOn = expireTokenDate;
        request.Email = email;
        request.GivenName = givenName;
        request.FamilyName = familyName;
        request.DisplayName = displayName;
        request.StartRange = startRange;
        request.EndRange = endRange;
        request.ServiceUrl = serviceUrl;
        request.SyncAccountType = syncAccountType;
        request.AppVersion = "1";
        request.ServerVersion = serverVersion;
        request.SyncAccountId = 0;
        request.OAuthUniqueId = oAuthUniqueId;
        request.DeviceType = Rt.VenueDeviceType.Web;
        request.AccessTokenType = tokeType;
        request.DeviceName = "Refind Portal";
        request.DeviceModel = "Web";
        request.ShortAction = paction;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.AddAccountResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }



    async LoadAccount(
        uid: string,
        mid: string,
        email: string,
        startRange:string,
        endRange:string,
        serviceUrl: string,
        syncAccountType: string,

        serverVersion: string,

        authToken: string,
        refreshToken: string,
        expireTokenDate: string,
        oAuthUniqueId: string,
        paction:Rt.EventPostActionDto
        ) {

        let mName = "LoadAccount";
        let request = new Rt.LoadAccount();
        request.UserAccountId = uid;
        request.MailAccountId = mid;
        request.DeviceId = this.DeviceId;
        request.DeviceToken = "NA";
        request.AuthToken = authToken;
        request.RefreshToken = refreshToken;
        request.ExpiresOn = expireTokenDate;
        request.Email = email;
        request.ServiceUrl = serviceUrl;
        request.SyncAccountType = syncAccountType;
        request.AppVersion = "1";
        request.ServerVersion = serverVersion;
        request.SyncAccountId = 0;
        request.OAuthUniqueId = oAuthUniqueId;
        request.DeviceType = Rt.VenueDeviceType.Web;
        request.DeviceName = "Refind Portal";
        request.DeviceModel = "Web";
        request.ShortAction = paction;
        request.StartRange = startRange;
        request.EndRange = endRange;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.LoadAccountResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    CreateOAuthProfile(tokenType: Rt.OAuthTokenTypes, loginType: Rt.OAuthLoginTypes, authToken: string, stypes: Rt.SyncAccountTypes, uid: string, did: string, mid: string, ruri: string, sucessCallback: Callback, errorCallback: Callback = this.handleError)
    {
        let mName = "CreateOAuthProfile";
        let request = new Rt.CreateOAuthProfile();
        request.TokenType = tokenType;
        request.LoginType = loginType;
        request.AuthenticationToken = authToken;
        request.SyncAccountType = stypes;
        request.RedirectUri = ruri;
        request.MailAccountId = mid;
        request.UserAccountId = uid;
        request.DeviceId = did;
        request.DeviceType = Rt.VenueDeviceType.Web;

        this.REST_CATCH_POST<Rt.CreateOAuthProfileResponse>(mName, request, sucessCallback, errorCallback);
    }

    async CreateOAuthProfileAsync(tokenType: Rt.OAuthTokenTypes, loginType: Rt.OAuthLoginTypes, authToken: string, stypes: Rt.SyncAccountTypes, ruri: string) {

        let mName = "CreateOAuthProfileAsync";
        let request = new Rt.CreateOAuthProfile();
        request.TokenType = tokenType;
        request.LoginType = loginType;
        request.AuthenticationToken = authToken;
        request.SyncAccountType = stypes;
        request.RedirectUri = ruri;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.CreateOAuthProfileResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    DeleteCategory(CategoryId: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "DeleteCategory";
        let request = new Rt.DeleteCategory();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.CategoryId = CategoryId;
        this.REST_CATCH_POST<Rt.DeleteCategoryResponse>(mName, request, sucessCallback, errorCallback);
    }

    async DeleteCategoryAsync(CategoryId: string) {
        const mName = "DeleteCategoryAsync";
        let request = new Rt.DeleteCategory();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.CategoryId = CategoryId;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.DeleteCategoryResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    DeleteRecipe(recipeId: string, paction:Rt.EventPostActionDto, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "DeleteRecipe";
        let request = new Rt.DeleteRecipe();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.RecipeId = recipeId;
        request.ShortAction = paction;
        this.REST_CATCH_POST<Rt.DeleteRecipeResponse>(mName, request, sucessCallback, errorCallback);
    }

    async DeleteRecipeAsync(recipeId: string) {
        const mName = "DeleteRecipeAsync";
        let request = new Rt.DeleteRecipe();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.RecipeId = recipeId;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.DeleteRecipeResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;


    }



    DeleteCookbook(cookbookId: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "DeleteCookbook";
        let request = new Rt.DeleteCookbook();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.CookbookId = cookbookId;
        this.REST_CATCH_POST<Rt.DeleteCookbookResponse>(mName, request, sucessCallback, errorCallback);
    }


    async DeleteCookbookAsync(cookbookId: string) {
        let mName = "DeleteCookbookAsync";
        let request = new Rt.DeleteCookbook();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.CookbookId = cookbookId;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.DeleteCookbookResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    UpdateCookbook(templateId: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "UpdateCookbook";
        let request = new Rt.UpdateCookbook();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        this.REST_CATCH_POST<Rt.UpdateCookbookResponse>(mName, request, sucessCallback, errorCallback);
    }


    async UpdateCookbookAsync(cookbookTemplateId: string, cookbookId: string, mailAccountId: string, metaData: any) {

        let mName = "UpdateCookbookAsync";
        let request = new Rt.UpdateCookbook();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.CookbookId = cookbookId;
        request.CookbookTemplateId = cookbookTemplateId;
        request.MailAccountId = mailAccountId;
        request.Metadata = metaData;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.UpdateCookbookResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }
    async GetRecomendation(mailAccountId: string,rtype:Rt.AccountCreationReportType) {

        let mName = "GetAccountRecomendations";
        let request = new Rt.GetAccountCreationResultsRequest();
        request.UserAccountId = this.UserAccountId;
        request.MailAccountId = mailAccountId;
        request.DeviceId = this.DeviceId;
        request.Type = rtype;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.GetAccountCreationResultsResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async GetUpdateCookbook(templateId: string) {

        let mName = "UpdateCookbookAsync";
        let request = new Rt.UpdateCookbook();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.UpdateCookbookResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;

    }

    GetCdRecipeTemplate<T>(templateId: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "GetCdRecipeTemplate";
        let request = new Rt.GetCdRecipeTemplate();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.TemplateId = templateId;
        this.REST_CATCH_POST<Rt.GetCdRecipeTemplateResponse>(mName, request, sucessCallback, errorCallback);
    }

    async GetCdRecipeTemplateAsync<T>(templateId: string) {
        const mName = "GetCdRecipeTemplateAsync";
        let request = new Rt.GetCdRecipeTemplate();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.TemplateId = templateId;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.GetCdRecipeTemplateResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;

    }

    GetCookbookTemplate(templateId: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "GetCookbookTemplate";
        let request = new Rt.GetCookbookTemplate();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.CookbookTemplateId = templateId;
        this.REST_CATCH_POST<Rt.GetCookbookTemplateResponse>(mName, request, sucessCallback, errorCallback);
    }

    async GetCookbookTemplateAsync(templateId: string) {
        const mName = "GetCookbookTemplateAsync";
        let request = new Rt.GetCookbookTemplate();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.CookbookTemplateId = templateId;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.GetCookbookTemplateResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    GetVenueServerCollection(templateId: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "GetVenueServerCollection";
        let request = new Rt.GetVenueServerCollection();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.Path = "";
        request.Argument = "";
        this.REST_CATCH_POST<Rt.GetVenueServerCollectionResponse>(mName, request, sucessCallback, errorCallback);
    }

    async GetVenueServerCollectionAsync(path: string, argument: string) {
        const mName = "GetVenueServerCollection";

        let collection = new Rt.VenueServerCollection();
        let request = new Rt.GetVenueServerCollection();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = "NA";
        request.Path = path;
        request.Argument = argument;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.GetVenueServerCollectionResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);

        collection = response.Collection;
        collection.DefaultValues = response.DefaultValues;

        return collection;
    }

    ListCategories(sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "ListCategories";
        let request = new Rt.ListCategories();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        this.REST_CATCH_POST<Rt.ListCategoriesResponse>(mName, request, sucessCallback, errorCallback);
    }

    async ListCategoriesAsync(mid: string, sourceOptions: Rt.CategoryItemSourceOptions, includestats: boolean) {
        const mName = "ListCategoriesAsync";
        let request = new Rt.ListCategories();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = mid;
        request.SourceOptions = sourceOptions;
        request.IncludeStatistics = includestats;


        const response = await this.ASYNC_REST_CATCH_POST<Rt.ListCategoriesResponse>(mName, request);
        this. handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    GetAccounts(mid: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "GetAccounts";
        let request = new Rt.GetAccounts();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = mid;
        this.REST_CATCH_POST<Rt.GetAccountsResponse>(mName, request, sucessCallback, errorCallback);
    }

    async GetAccountsAsync(mid: string) {
        const mName = "GetAccountsAsync";
        let request = new Rt.GetAccounts();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = mid;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.GetAccountsResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    GetAccountsOnDevice(sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "GetAccountsOnDevice";
        let request = new Rt.GetAccountsOnDevice();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        this.REST_CATCH_POST<Rt.GetAccountsOnDeviceResponse>(mName, request, sucessCallback, errorCallback);
    }

    async GetAccountsOnDeviceAsync() {
        const mName = "GetAccountsOnDeviceAsync";
        let request = new Rt.GetAccountsOnDevice();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.GetAccountsOnDeviceResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    ListRecipe(recipeId: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "ListRecipe";
        let request = new Rt.ListRecipe();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.RecipeId = recipeId;
        this.REST_CATCH_POST<Rt.ListRecipeResponse>(mName, request, sucessCallback, errorCallback);
    }

    async ListRecipeAsync(recipeId?: string) {

        const mName = "ListRecipeAsync";
        let request = new Rt.ListRecipe();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.RecipeId = recipeId;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.ListRecipeResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    ListDevices(recipeId: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "ListDevices";
        let request = new Rt.ListDevices();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        this.REST_CATCH_POST<Rt.ListDevicesResponse>(mName, request, sucessCallback, errorCallback);
    }
    async ListDevicesAsync() {

        const mName = "ListDevicesAsync";
        let request = new Rt.ListDevices();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.ListDevicesResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    // GetListCookbooks(successCallback: Callback, errorCallback: Callback = this.handleError){

    //     let request = new RefindServiceTyped.ListCookbooks();
    //     request.UserAccountId = this.UserAccountId;
    //     request.DeviceId = this.DeviceId;
    //     this.REST_CATCH_GET<RefindServiceTyped.ListCookbooksResponse>(request, successCallback, errorCallback);
    // }

    GetSequence(type: Rt.GetSequenceType, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "GetSequence";
        let request = new Rt.GetSequence();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.Type = type;
        this.REST_CATCH_POST<Rt.GetSequenceResponse>(mName, request, sucessCallback, errorCallback);
    }

    async GetSequenceAsync(type: Rt.GetSequenceType) {
        const mName = "GetSequenceAsync";
        let request = new Rt.GetSequence();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.Type = type;
        let response = await this.ASYNC_REST_CATCH_POST<Rt.GetSequenceResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    GetStatistics(emailAddressList: string[]): Promise<Rt.GetStatisticsResponse> {
        const mName = "GetStatistics";
        let request = new Rt.GetStatistics();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.EmailAddresses = emailAddressList;
        return this.REST_CATCH_POST_SHORT<Rt.GetStatisticsResponse>(mName, request);
    }

    async GetStatisticsAsync(emailAddressList: string[]) {
        const mName = "GetStatisticsAsync";
        let request = new Rt.GetStatistics();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.EmailAddresses = emailAddressList;
        let response = await this.ASYNC_REST_CATCH_POST<Rt.GetStatisticsResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    MakeRecipeCriteria(data: Rt.AddOrEditRecipeDto, maid: string, Cookbook: Rt.AddOrEditRecipeDto, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "MakeRecipeCriteria";
        let request = new Rt.MakeRecipeCriteria();
        request.UserAccountId = this.UserAccountId;
        request.MailAccountId = maid;
        request.DeviceId = this.DeviceId;
        request.Data = data;
        request.Cookbook = Cookbook;
        this.REST_CATCH_POST<Rt.MakeRecipeCriteriaResponse>(mName, request, sucessCallback, errorCallback);
    }

    async MakeRecipeCriteriaAsync(data: Rt.AddOrEditRecipeDto, maid: string, Cookbook?: Rt.AddOrEditRecipeDto) {
        const mName = "MakeRecipeCriteriaAsync";
        let request = new Rt.MakeRecipeCriteria();
        request.UserAccountId = this.UserAccountId;
        request.MailAccountId = maid;
        request.DeviceId = this.DeviceId;
        request.Data = data;
        request.Cookbook = Cookbook;
        let response = await this.ASYNC_REST_CATCH_POST<Rt.MakeRecipeCriteriaResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async ModifyRecipeAsync(data: Rt.AddOrEditRecipeDto, maid: string, criteria: Rt.RecipeCriteria) {
        const mName = "ModifyRecipeAsync";
        let request = new Rt.ModifyRecipe();
        request.UserAccountId = this.UserAccountId;
        request.MailAccountId = maid;
        request.DeviceId = this.DeviceId;
        request.RecipeId = data.RecipeId;
        request.Criteria = criteria;

        let response = await this.ASYNC_REST_CATCH_POST<Rt.ModifyRecipeResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    async ModifyRecipeCriteriaAsync(rc: Rt.RecipeCriteria) {
        const mName = "ModifyRecipeCriteriaAsync";
        let request = new Rt.ModifyRecipe();
        request.UserAccountId = rc.UserAccountId;

        request.DeviceId = this.DeviceId;
        request.Criteria = rc;

        let response = await this.ASYNC_REST_CATCH_POST<Rt.ModifyRecipeResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    ModifyRecipeCriteria(rc: Rt.RecipeCriteria, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "ModifyRecipeCroiteria";
        let request = new Rt.ModifyRecipe();
        request.UserAccountId = rc.UserAccountId;

        request.DeviceId = this.DeviceId;
        request.Criteria = rc;

        this.REST_CATCH_POST<Rt.ModifyRecipeResponse>(mName, request, sucessCallback, errorCallback);
    }

    GetCookbookTemplateRequest(tid: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "GetCookbookTemplateRequest";
        let request = new Rt.GetCookbookTemplate();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.CookbookTemplateId = tid;
        this.REST_CATCH_POST<Rt.GetCookbookTemplateResponse>(mName, request, sucessCallback, errorCallback);
    }

    async GetCookbookTemplateRequestAsync(tid: string) {

        let mName = "GetCookbookTemplateRequestAsync";
        let request = new Rt.GetCookbookTemplate();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.CookbookTemplateId = tid;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.GetCookbookTemplateResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    GetCookbook(cid: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "GetCookbook";
        let request = new Rt.GetCookbook();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.CookbookId = cid;
        this.REST_CATCH_POST<Rt.GetCookbookResponse>(mName, request, sucessCallback, errorCallback);
    }

    async GetCookbookAsync(cookbookId: string): Promise<Rt.GetCookbookResponse> {
        const mName = "GetCookbookAsync";
        let request = new Rt.GetCookbook();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.CookbookId = cookbookId;
        let response = await this.ASYNC_REST_CATCH_POST<Rt.GetCookbookResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    GetCdRecipeTemplates(sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "GetCdRecipeTemplates";
        let request = new Rt.ListCdRecipeTemplates();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        this.REST_CATCH_POST<Rt.ListCdRecipeTemplatesResponse>(mName, request, sucessCallback, errorCallback);
    }

    async GetCdRecipeTemplatesAsync() {
        const mName = "GetCdRecipeTemplatesAsync";
        let request = new Rt.ListCdRecipeTemplates();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.ListCdRecipeTemplatesResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    ListCookbookTemplates(sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "ListCookbookTemplates";
        let request = new Rt.ListCookbookTemplates();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        this.REST_CATCH_POST<Rt.ListCookbookTemplatesResponse>(mName, request, sucessCallback, errorCallback);
    }


    async ListCookbookTemplatesAsync() {
        const mName = "ListCookbookTemplatesAsync";
        let request = new Rt.ListCookbookTemplates();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.ListCookbookTemplatesResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async EditCategoryItemsAsync(changes:Rt.CdCategoryItem[]) {

        let changeRequests = changes.map(row => {
            let rrr = new EditCategoryItem();
            rrr.Category = row[0];
            rrr.Value = row[1];
            return rrr;
        });

        const mName = "EditCategoryItemsAsync";
        let request = new Rt.EditCategoryItems();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.EditRequests = changeRequests;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.EditCategoryItemsResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async ChangeCategoryItemsAsync(changes:Rt.CdCategoryItem[]) {

        const mName = "ChangeCategoryItemsAsync";
        let request = new Rt.ChangeCategoryItems();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.Items = changes;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.ChangeCategoryItemsResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }



    ListCategoryItems<T>(category: string, typeOption:Rt.CategoryItemTypeOptions,dataOptions:Rt.CategoryItemDataTypeOptions): Promise<Rt.ListCategoryItemsCleanResponse> {
        const mName = "ListCategoryItemsClean";
        let request = new Rt.ListCategoryItemsClean();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.Category = category;
        request.TypeOptions = typeOption;
        request.DataTypeOptions = dataOptions;
        const presponse = this.REST_CATCH_POST_SHORT<Rt.ListCategoryItemsCleanResponse>(mName, request);
        return presponse;
    }

    async ListCategoryItemsAsync(category: string,typeOption:Rt.CategoryItemTypeOptions,dataOptions:Rt.CategoryItemDataTypeOptions) {
        const mName = "ListCategoryItemsCleanAsync";
        let request = new Rt.ListCategoryItemsClean();   // note: switched to clean interface as non clean had options that were not generated by typescript builder
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.Category = category;
        request.TypeOptions = typeOption;
        request.DataTypeOptions = dataOptions;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.ListCategoryItemsCleanResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async ListCategoryItemsAdvancedAsync(category: string, options: string = '', max: number = 20, offset: number = 0) {
        const mName = "ListCategoryItemsAdvancedAsync";
        let request = new Rt.ListCategoryItemsAdvanced();

        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = '';
        request.Category = category;
        request.Options = options;
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.Max = max;
        request.Offset = offset;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.ListCategoryItemsAdvancedResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    async ListGroupItemsAsync(category: string, otype: Rt.OrderByTypes, descend: boolean, take: number = 20, skip: number = 0) {
        const mName = "ListGroupItems";
        let request = new Rt.ListGroupItems();

        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = this.MailAccountId;
        request.DeviceId = this.DeviceId;
        request.UserCategory = category;
        request.OrderBy = otype;
        request.OrderByDescending = descend;

        request.Take = take;
        request.Skip = skip;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.ListGroupItemsResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async ListChartDataAsync(ctype: Rt.ChartDataQuerys) {
        const mName = "ListChartDataAsync";
        let request = new Rt.ListChartData();

        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.MailAccountId = this.MailAccountId;
        request.DeviceId = this.DeviceId;
        request.Query = ctype;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.ListChartDataResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }



    GetOptions(sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "GetOptions";
        let request = new Rt.GetOptions();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;

        this.REST_CATCH_GET<Rt.GetOptionsResponse>(mName, request, sucessCallback, errorCallback);
    }


    async AddCategoryItemAsync(categoryName: string) {

        const mName = "AddCategoryItemAsync";
        let request = new Rt.AddCategoryItem();
        request.Category = categoryName;
        request.DeviceId = this.DeviceId;
        request.UserAccountId = this.UserAccountId;
        request.DataType = Rt.CategoryItemDataType.Meta;
        request.Type = Rt.CategoryItemType.User;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.AddCategoryItemResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);

        return response;

    }

    async GetOptionsAsync() {
        const mName = "GetOptionsAsync";
        let request = new Rt.GetOptions();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        const response = await this.ASYNC_REST_CATCH_GET<Rt.GetOptionsResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    ReassignCategory(NewCategory: string, id: string, reset: boolean, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "ReassignCategory";
        let request = new Rt.ReassignCategory();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.NewCategory = NewCategory;
        request.Id = +id;
        request.Reset = reset;

        this.REST_CATCH_POST<Rt.ReassignCategoryResponse>(mName, request, sucessCallback, errorCallback);
    }

    async ReassignCategoryAsync(NewCategory: string, id: number, reset: boolean) {
        const mName = "ReassignCategoryAsync";
        let request = new Rt.ReassignCategory();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.NewCategory = NewCategory;
        request.Id = id;
        request.Reset = reset;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.ReassignCategoryResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async ReassignCategoryListAsync(ReassignCategoryList, reset: boolean) {
        const mName = "ReassignCategoryListAsync";
        let request = new Rt.ReassignCategoryList();
        request.RequestToChange = ReassignCategoryList;
        request.DeviceId = this.DeviceId;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.ReassignCategoryListResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    async DeleteVenuesAsync(vlist: Rt.VenueBlock[]) {
        const mName = "DeleteVenuesAsync";
        vlist.forEach(v => {
            v.UserAccountId = this.UserAccountId;
        });
        let request = new Rt.DeleteVenues();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.DeletedVenues = vlist;

        const response = await this.ASYNC_REST_CATCH_POST<Rt.DeleteVenuesResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    DeleteAccountOnDevice(email: string, mid: string, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        const mName = "DeleteAccountOnDevice";
        let request = new Rt.DeleteAccountOnDevice();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.Email = email;
        request.MailAccountId = mid;
        this.REST_CATCH_POST<Rt.DeleteAccountOnDeviceResponse>(mName, request, sucessCallback, errorCallback);
    }

    async DeleteAccountOnDeviceAsync(email: string, mid: string) {
        const mName = "DeleteAccountOnDeviceAsync";
        let request = new Rt.DeleteAccountOnDevice();
        request.UserAccountId = this.UserAccountId;
        request.DeviceId = this.DeviceId;
        request.Email = email;
        request.MailAccountId = mid;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.DeleteAccountOnDeviceResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }


    async DeleteAnyAccountOnDeviceAsync(uid: string, did: string, email: string, mid: string) {
        const mName = "DeleteAccountOnDeviceAsync";
        let request = new Rt.DeleteAccountOnDevice();
        request.UserAccountId = uid;
        request.DeviceId = did;
        request.Email = email;
        request.MailAccountId = mid;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.DeleteAccountOnDeviceResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    // async InsertWizardAccountAsync(uid:string,fname:string,lname:string,atype:string,numAccount:string,emailProblems:string[]) {

    async InsertWizardAccountAsync(
        userId: string,
        firstName: string,
        lastName: string,
        accountType: string,
        numberOfEmailAccounts: string,
        emailProblems: string[]
    ) {
        const mName = "InsertWizardAccountAsync";
        let request = new Rt.InsertWizardAccount();
        request.UserAccountId = userId;
        request.DeviceId = this.DeviceId;
        request.FirstName = firstName;
        request.LastName = lastName;
        request.AccountType = accountType;
        request.NumberOfEmailAccounts = numberOfEmailAccounts;
        request.EmailProblems = emailProblems;
        const response = await this.ASYNC_REST_CATCH_POST<Rt.InsertWizardAccountResponse>(mName, request);
        this.handleOurSoftErrorsAsync(mName, response);
        return response;
    }

    private REST_CATCH_POST<T extends Rt.StandardResponse>(methodName: string, request: Rt.IReturn<T>, sucessCallback: Callback, errorCallback: Callback = this.handleError) {

        this.tools.assert(this.UserAccountId, `RSP:REST_CATCH_POST:${methodName}:Assert failed,UserAccountId === null`);
        this.tools.assert(this.DeviceId, `RSP:REST_CATCH_POST:${methodName}:Assert failed,DeviceId === null`);

        let url = AppConsts.refindBackendUrl;
        this.tools.assert(url, `RSP:REST_CATCH_POST:${methodName}:Assert failed,url === null`);

        let client = new JsonServiceClient(url);
        client.headers.append (this.ServiceStackApiKeyName, this.ServiceStackApiKey);
        client.credentials = "omit";
        let response = client.post(request);
        response.then((ourResponse) => {
            this.handleOurSoftErrors<T>("", ourResponse, sucessCallback);
        }).catch((error) => {
            console.log("RSPT:REST_CATCH_POST:error" + error);
            errorCallback(error);
        });
    }
     
    private REST_CATCH_POST_SHORT<T extends Rt.StandardResponse>(methodName: string, request: Rt.IReturn<T>): Promise<T>  {

        this.tools.assert(methodName, `RSP:REST_CATCH_POST:Methodname not set`);
        this.tools.assert(this.UserAccountId, `RSP:REST_CATCH_POST:${methodName}:Assert failed,UserAccountId === null`);
        this.tools.assert(this.DeviceId, `RSP:REST_CATCH_POST:${methodName}:Assert failed,DeviceId === null`);

        let url = AppConsts.refindBackendUrl;
        this.tools.assert(url, `RSP:REST_CATCH_POST:${methodName}:Assert failed,url === null`);
        let retVar:Rt.StandardResponse;

        let client = new JsonServiceClient(url);
        client.headers.append (this.ServiceStackApiKeyName, this.ServiceStackApiKey);
        client.credentials = "omit";
        let response = client.post(request);
        return response;
        // response.then(
        //     (ourResponse) =>
        //     {
        //         retVar = ourResponse;
        //     xit},
        //     (xx) => {
        //         retVar =  xx
        //     },
        // );
        // response.catch(
        //     (error) => { retVar = error}
        // );

        // return <T>retVar;
    }

    private processError(errorType:string,methodName:string) {
        if(errorType == "Failed to fetch") {
            if(this.selectedErrorHandle == "TellUser") {
                this.tools.warn(`Method:=${methodName} Error=${errorType}`,`Unable to connect to the reFind service host or the Internet!`);

            } else if(this.selectedErrorHandle == "Throw") {
                console.error(`Internet Connection Error: ${methodName}`);
                throw new HardErrorException(methodName, errorType);
            } else {
                console.error(`Internet Connection Error: ${methodName}`);
            }
        } else {
            this.tools.error(`Unknown error messages received: ${errorType}`);
        }
    }

    // Error Managment Tools
    ErrorHandelThrow(): this {
        // tells error logic to throw an exception
        this.selectedErrorHandle = "Throw";
        return this;
    }
    ErrorHandelTellUser(): this {
        this.selectedErrorHandle = "TellUser";
        return this;
    }
    AutoWarning(msg: string): this {
        this.displayWarning = msg;
        return this;
    }

    handleOurSoftErrorsAsync<T>(methodName: string, tResponse: Rt.StandardResponse): void {

        if(tResponse == null ) {
            let emsg = `REST:${methodName}: response == null`;
            console.warn(emsg);
            if (this.displayWarning) {
                this.tools.warn(emsg + "-"+this.displayWarning);
            }
            this.displayWarning = null;
            return;
        }
        if (tResponse.Success === false) {
            let emsg = `REST:${methodName}:RemoteSystemSays=${tResponse.Message}`;
            console.warn(emsg);
            if (this.displayWarning) {
                this.tools.warn(this.displayWarning);
            }
        }
        this.displayWarning = null;
    }

    async ASYNC_REST_CATCH_POST<T extends Rt.StandardResponse>(methodName: string, request: Rt.IReturn<T>): Promise<T> {

        this.tools.assert(methodName, `RSP:ASYNC_REST_CATCH_POST:Methodname not set`);
        this.tools.assert(this.UserAccountId, `RSP:ASYNC_REST_CATCH_POST:${methodName}:Assert failed,UserAccountId === null`);
        this.tools.assert(this.DeviceId, `RSP:ASYNC_REST_CATCH_POST:${methodName}:Assert failed,DeviceId === null`);

        try {
            let url = AppConsts.refindBackendUrl;
            this.tools.assert(url, `RSP:ASYNC_REST_CATCH_POST:${methodName}:Assert failed,url === null`);

            let client = new JsonServiceClient(url);
            client.headers.append (this.ServiceStackApiKeyName, this.ServiceStackApiKey);
            client.credentials = "omit";

            let response = await client.post(request);
            return response;
        } catch (e) {
            e.caller = methodName;
            this.processError(e.message,methodName);
            this.ErrorHandelTellUser(); // reset error hander to default
        }
    }



    private REST_CATCH_GET<T extends Rt.StandardResponse>(methodName: string, request: Rt.IReturn<T>, sucessCallback: Callback, errorCallback: Callback = this.handleError) {
        this.tools.assert(this.UserAccountId, `RSP:REST_CATCH_GET:${methodName}:Assert failed,UserAccountId === null`);
        this.tools.assert(this.DeviceId, `RSP:REST_CATCH_GET:${methodName}:Assert failed,DeviceId === null`);

        let url = AppConsts.refindBackendUrl;
        this.tools.assert(url, `RSP:REST_CATCH_GET:${methodName}:Assert failed,url === null`);

        let client = new JsonServiceClient(url);
        client.headers.append (this.ServiceStackApiKeyName, this.ServiceStackApiKey);
        client.credentials = "omit";

        console.log(client.headers);
        let response = client.get(request);
        response.then((ourResponse) => {
            this.handleOurSoftErrors<T>("", ourResponse, sucessCallback);
        }).catch((error) => {
            console.log("RSPT:REST_CATCH_GET:error" + error);
            errorCallback(error);
        });
    }

    private async ASYNC_REST_CATCH_GET<T>(methodName: string, request: Rt.IReturn<T>) {
        this.tools.assert(this.UserAccountId, `RSP:ASYNC_REST_CATCH_GET:${methodName}:Assert failed,UserAccountId === null`);
        this.tools.assert(this.DeviceId, `RSP:ASYNC_REST_CATCH_GET:${methodName}:Assert failed,DeviceId === null`);
        try {
            let url = AppConsts.refindBackendUrl;
            this.tools.assert(url, `RSP:ASYNC_REST_CATCH_GET:${methodName}:Assert failed,url === null`);

            let client = new JsonServiceClient(url);
            client.headers.append (this.ServiceStackApiKeyName, this.ServiceStackApiKey);
            client.credentials = "omit";

            console.log(client.headers);
            let response = await client.get(request);
            return response;
        } catch (e) {
            e.caller = methodName;
            console.error("RSPT:ASYNC_REST_CATCH_GET:error", e.message);
            throw new HardErrorException(methodName, e.Message);
        }
    }

    handleOurSoftErrors<T extends Rt.StandardResponse>(methodName: string, tResponse: T, successCb: Callback): void {
        if (tResponse.Success === false) {
            let emsg = `REST:${methodName}:Error=${tResponse.Message}`;
            console.warn(emsg);
            this.tools.warn(emsg);
        }
        successCb(tResponse);
    }


    getLongTimeDialog(): any {
        return {
            closeButton: true,
            position: 'bottom-end',
            showConfirmButton: false,
            showDuration: 99999,
            timer: 99999,
            padding: 0,
            toast: true,
            animation: false
        };
    }
    handleError(...args: any[]): void {
        let dialogLongTime = {
            closeButton: true,
            position: 'bottom-end',
            showConfirmButton: false,
            showDuration: 99999,
            timer: 99999,
            padding: 0,
            toast: true,
            animation: false
        };
        // 1 arg only - display standard message with error number
        // 2 arg only - display custom message with error number
        // 3 args     - display custom message with error number and print stack trace
        if (args.length === 1) {


            abp.notify.error("Unable to contact the ReFind service.  Please check your internet connection. " + args[0], "", dialogLongTime);
            console.warn("Unable to contact the ReFind service.  Please check your internet connection. " + args[0]);
        }
        if (args.length === 2) {
            abp.notify.error(args[0] + ":Error=" + args[1], "", dialogLongTime);
            console.warn(args[0] + ":Error=" + args[1]);
        }
        if (args.length === 3) {
            abp.notify.error(args[0] + ":Error=" + args[1], "", dialogLongTime);
            console.warn(args[0] + ":Error=" + args[1]);
        }
    }
}
