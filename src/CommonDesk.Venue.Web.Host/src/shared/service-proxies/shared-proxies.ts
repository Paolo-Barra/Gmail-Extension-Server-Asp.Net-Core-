import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import * as moment from 'moment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


// COMMONDESK - Remove CommonServiceProxyOld
//const appSettingdata = require("../../../appsettings.json");
// @Injectable()
// export class CommonServiceProxyOld {
//     private http: HttpClient;
//     private baseUrl: string;
//     protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
//     _baseUrl: any = '';
    
//     constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
//         this.http = http;
//         //this._baseUrl = appSettingdata.ServiceBaseURL; 
//         this._baseUrl = abp.setting.get('ServiceBaseURL');
//     }

//     /**
//      * @param filter (optional) 
//      * @param permission (optional) 
//      * @param role (optional) 
//      * @param onlyLockedUsers (optional) 
//      * @param sorting (optional) 
//      * @param maxResultCount (optional) 
//      * @param skipCount (optional) 
//      * @return Success
//      */


//     ///////////////////////////----START GROUPS/CATEGORIES------///////////////
//     /**
//      * @param input (optional) 
//      * @return Success
//      */
//     Group(input: any, type: string): Observable<any> {
        
//         let url_;
//         if (type == 'AddGroup') {
//             url_ = this._baseUrl + "/json/reply/AddCategoryItem";
//         }
//         else if (type == 'ListGroup') {
//             url_ = this._baseUrl + "/json/reply/ListCategories";
//         }
//         else if (type == 'LoadGroupItem') {
//             url_ = this._baseUrl + "/json/reply/ListCategoryItems";
//         }
//         else if (type == 'getStatistics') {
//             url_ = this._baseUrl + "/json/reply/GetStatistics";
//         }
//         else if (type == 'deleteGroup') {
//             url_ = this._baseUrl + "/json/reply/DeleteCategory";
//         }
//         else if (type == 'ReassignGroup') {
//             url_ = this._baseUrl + "/json/reply/ReassignCategory";
//         }
//         url_ = url_.replace(/[?&]$/, "");

//         let options_: any = {
//             body: input,
//             observe: "response",
//             responseType: "blob",
//             headers: new HttpHeaders({
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             })
//         };

//         return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
//             return this.processGroup(response_);
//         })).pipe(_observableCatch((response_: any) => {
//             if (response_ instanceof HttpResponseBase) {
//                 console.log(response_);
//                 try {
//                     return this.processGroup(<any>response_);
//                 } catch (e) {
//                     return <Observable<any>><any>_observableThrow(e);
//                 }
//             } else
//                 console.log(response_);
//             return <Observable<any>><any>_observableThrow(response_);
//         }));
//     }

//     protected processGroup(response: HttpResponseBase): Observable<any> {
//         const status = response.status;
//         const responseBlob =
//             response instanceof HttpResponse ? response.body :
//                 (<any>response).error instanceof Blob ? (<any>response).error : undefined;

//         let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
//         if (status === 200) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 let result200: any = null;
//                 let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
//                 return _observableOf(resultData200);
//             })
//             )
//         } else if (status !== 200 && status !== 204) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 return throwException("An unexpected server error occurred.", status, _responseText, _headers);
//             }));
//         }
//         return _observableOf<void>(<any>null);
//     }


//     ///////////////////////////----END GROUPS/CATEGORIES------///////////////





//     ///////////////////////////----START MAIL ACCOUNT------///////////////

//     /**
//      * @param input (optional) 
//      * @return Success
//      */
//     mailAccount(input: any, type: string): Observable<any> {
        
//         let url_
//         if (type == 'getAccounts') {
//             url_ = this._baseUrl + "/json/reply/GetAccounts";
//         }
//         else if (type == 'query_device') {
//             url_ = this._baseUrl + "/json/reply/GetAccountsOnDevice";
//         }

//         url_ = url_.replace(/[?&]$/, "");

//         //var content_ = JSON.stringify(input);
//         // content_ = '{' + content_ + '}';


//         //content_ = content_.substring(1, content_.length - 1);
//         let options_: any = {
//             body: input,
//             observe: "response",
//             responseType: "blob",
//             headers: new HttpHeaders({
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             })
//         };


//         //let options_: any = {
//         //    body: content_,
//         //    headers: new HttpHeaders({
//         //        "Content-Type": "application/json;charset=utf-8",
//         //        "Accept": "application/json;charset=utf-8",
//         //        "Cache-Control": "no-cache, no-store, must-revalidate",
//         //        "Expires": "Wed, 21 Oct 2018 07:28:00 GMT",
//         //        "Access-Control-Allow-Origin": "*",
//         //        "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
//         //        "Accept-Language": "en-US"
//         //    })
//         //};

//         return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
//             return this.processmailAccount(response_);
//         })).pipe(_observableCatch((response_: any) => {
//             if (response_ instanceof HttpResponseBase) {
//                 console.log(response_);
//                 try {
//                     return this.processmailAccount(<any>response_);
//                 } catch (e) {
//                     return <Observable<any>><any>_observableThrow(e);
//                 }
//             } else
//                 console.log(response_);
//             return <Observable<any>><any>_observableThrow(response_);
//         }));


//     }

//     protected processmailAccount(response: HttpResponseBase): Observable<any> {
//         const status = response.status;
//         const responseBlob =
//             response instanceof HttpResponse ? response.body :
//                 (<any>response).error instanceof Blob ? (<any>response).error : undefined;

//         let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
//         if (status === 200) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 let result200: any = null;
//                 let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
//                 return _observableOf(resultData200);
//             })
//             )
//         } else if (status !== 200 && status !== 204) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 return throwException("An unexpected server error occurred.", status, _responseText, _headers);
//             }));
//         }
//         return _observableOf<void>(<any>null);
//     }



//     ///////////////////////////----END MAIL ACCOUNT------///////////////


//     /**
//      * @param input (optional) 
//      * @return Success
//      */
//     RegisterMailSyncAccount(input: any): Observable<any> {
        
//         let url_
//         url_ = this._baseUrl + "/json/reply/AddAccount";
//         url_ = url_.replace(/[?&]$/, "");

//         let options_: any = {
//             body: input,
//             observe: "response",
//             responseType: "blob",
//             headers: new HttpHeaders({
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             })
//         };

//         return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
//             return this.processRegisterSyncAccountResponse(response_);
//         })).pipe(_observableCatch((response_: any) => {
//             if (response_ instanceof HttpResponseBase) {
//                 console.log(response_);
//                 try {
//                     return this.processRegisterSyncAccountResponse(<any>response_);
//                 } catch (e) {
//                     return <Observable<any>><any>_observableThrow(e);
//                 }
//             } 
//             else
//             {
//                 console.log(response_);
//             }
            
//             return <Observable<any>><any>_observableThrow(response_);
//         }));
//     }

//     protected processRegisterSyncAccountResponse(response: HttpResponseBase): Observable<any> {
//         const status = response.status;
//         const responseBlob =
//             response instanceof HttpResponse ? response.body :
//                 (<any>response).error instanceof Blob ? (<any>response).error : undefined;

//         let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
//         if (status === 200) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 let result200: any = null;
//                 let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
//                 return _observableOf(resultData200);
//             })
//             )
//         } else if (status !== 200 && status !== 204) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 return throwException("An unexpected server error occurred.", status, _responseText, _headers);
//             }));
//         }
//         return _observableOf<void>(<any>null);
//     }


//     ///////////////////////////----START DEVICE------///////////////

//     /**
//      * @param input (optional) 
//      * @return Success
//      */
//     Device(input: any, type: string): Observable<any> {
        
//         let url_
//         if (type == 'ListDevices') {
//             url_ = this._baseUrl + "/json/reply/ListDevices";
//         }

//         url_ = url_.replace(/[?&]$/, "");

//         // var content_ = JSON.stringify(input);
//         // content_ = '{' + content_ + '}';


//         //content_ = content_.substring(1, content_.length - 1);
//         let options_: any = {
//             body: input,
//             observe: "response",
//             responseType: "blob",
//             headers: new HttpHeaders({
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             })
//         };


//         //let options_: any = {
//         //    body: content_,
//         //    headers: new HttpHeaders({
//         //        "Content-Type": "application/json;charset=utf-8",
//         //        "Accept": "application/json;charset=utf-8",
//         //        "Cache-Control": "no-cache, no-store, must-revalidate",
//         //        "Expires": "Wed, 21 Oct 2018 07:28:00 GMT",
//         //        "Access-Control-Allow-Origin": "*",
//         //        "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
//         //        "Accept-Language": "en-US"
//         //    })
//         //};

//         return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
//             return this.processDevice(response_);
//         })).pipe(_observableCatch((response_: any) => {
//             if (response_ instanceof HttpResponseBase) {
//                 console.log(response_);
//                 try {
//                     return this.processDevice(<any>response_);
//                 } catch (e) {
//                     return <Observable<any>><any>_observableThrow(e);
//                 }
//             } else
//                 console.log(response_);
//             return <Observable<any>><any>_observableThrow(response_);
//         }));


//     }

//     protected processDevice(response: HttpResponseBase): Observable<any> {
//         const status = response.status;
//         const responseBlob =
//             response instanceof HttpResponse ? response.body :
//                 (<any>response).error instanceof Blob ? (<any>response).error : undefined;

//         let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
//         if (status === 200) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 let result200: any = null;
//                 let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
//                 return _observableOf(resultData200);
//             })
//             )
//         } else if (status !== 200 && status !== 204) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 return throwException("An unexpected server error occurred.", status, _responseText, _headers);
//             }));
//         }
//         return _observableOf<void>(<any>null);
//     }



//     ///////////////////////////----END DEVICE------///////////////



//     ///////////////////////////----START RECIPE------///////////////

//     /**
//      * @param input (optional) 
//      * @return Success
//      */
//     Recipe(input: any, type: string): Observable<any> {
        
//         let url_;
//         if (type == 'ListRecipe') {
//             url_ = this._baseUrl + "/json/reply/ListRecipe";
//         }
//         else if (type == 'ListCookbook') {
//             url_ = this._baseUrl + "/json/reply/ListCookbooks";
//         }
//         else if (type == 'ListRecipeTemplate') {
//             url_ = this._baseUrl + "/json/reply/ListCdRecipeTemplates";
//         }
//         else if (type == 'ListCookbookTemplate') {
//             url_ = this._baseUrl + "/json/reply/ListCookbookTemplates";
//         }
//         else if (type == 'get_cookbookTemplate') {
//             url_ = this._baseUrl + "/json/reply/GetCookbookTemplate";
//         }
//         else if (type == 'get_RecipeTemplate') {
//             url_ = this._baseUrl + "/json/reply/GetCdRecipeTemplate";
//         }
//         else if (type == 'makeCriteria') {
//             url_ = this._baseUrl + "/json/reply/MakeRecipeCriteria";
//         }
//         else if (type == 'update') {
//             url_ = this._baseUrl + "/json/reply/ModifyRecipe";
//         }
//         else if (type == 'create') {
//             url_ = this._baseUrl + "/json/reply/AddARecipe";
//         }
//         else if (type == 'get') {
//             url_ = this._baseUrl + "/json/reply/ListRecipe";
//         }
//         else if (type == 'get_cookbook') {
//             url_ = this._baseUrl + "/json/reply/GetCookbook";
//         }
//         else if (type == 'delete') {
//             url_ = this._baseUrl + "/json/reply/DeleteRecipe";
//         }
//         else if (type == 'add_cookbook') {
//             url_ = this._baseUrl + "/json/reply/AddCookbook";
//         }
//         else if (type == 'update_cookbook') {
//             url_ = this._baseUrl + "/json/reply/UpdateCookbook";
//         }
//         else if (type == 'delete_cookbook') {
//             url_ = this._baseUrl + "/json/reply/DeleteCookbook";
//         }


//         url_ = url_.replace(/[?&]$/, "");

//         // var content_ = JSON.stringify(input);
//         // content_ = '{' + content_ + '}';

//         let options_: any;
//         //content_ = content_.substring(1, content_.length - 1);
//         //if (type == 'makeCriteria') {
//         //    var content_ = JSON.stringify(input);
//         //    let options_: any = {
//         //        body: content_,
//         //        observe: "response",
//         //        responseType: "blob",
//         //        headers: new HttpHeaders({
//         //            "Content-Type": "application/json",
//         //            "Accept": "application/json"
//         //        })
//         //    };
//         //} else {
//         options_ = {
//             body: input,
//             observe: "response",
//             responseType: "blob",
//             headers: new HttpHeaders({
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             })
//         };
//         // }


//         //let options_: any = {
//         //    body: content_,
//         //    headers: new HttpHeaders({
//         //        "Content-Type": "application/json;charset=utf-8",
//         //        "Accept": "application/json;charset=utf-8",
//         //        "Cache-Control": "no-cache, no-store, must-revalidate",
//         //        "Expires": "Wed, 21 Oct 2018 07:28:00 GMT",
//         //        "Access-Control-Allow-Origin": "*",
//         //        "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
//         //        "Accept-Language": "en-US"
//         //    })
//         //};

//         return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
//             return this.processRecipe(response_);
//         })).pipe(_observableCatch((response_: any) => {
//             if (response_ instanceof HttpResponseBase) {
//                 console.log(response_);
//                 try {
//                     return this.processRecipe(<any>response_);
//                 } catch (e) {
//                     return <Observable<any>><any>_observableThrow(e);
//                 }
//             } else
//                 console.log(response_);
//             return <Observable<any>><any>_observableThrow(response_);
//         }));


//     }

//     protected processRecipe(response: HttpResponseBase): Observable<any> {
//         const status = response.status;
//         const responseBlob =
//             response instanceof HttpResponse ? response.body :
//                 (<any>response).error instanceof Blob ? (<any>response).error : undefined;

//         let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
//         if (status === 200) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 let result200: any = null;
//                 let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
//                 return _observableOf(resultData200);
//             })
//             )
//         } else if (status !== 200 && status !== 204) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 return throwException("An unexpected server error occurred.", status, _responseText, _headers);
//             }));
//         }
//         return _observableOf<void>(<any>null);
//     }



//     ///////////////////////////----END RECIPE------///////////////



//     ///////////////////////////----START OPTIONS------///////////////

//     /**
//      * @param input (optional) 
//      * @return Success
//      */
//     Options(input: any, type: string): Observable<any> {
        
//         let url_
//         if (type == 'GetOptions') {
//             url_ = this._baseUrl + "/json/reply/GetOptions";


//             url_ = url_.replace(/[?&]$/, "");

//             let options_: any = {
//                 observe: "response",
//                 responseType: "blob",
//                 headers: new HttpHeaders({
//                     "Content-Type": "application/json",
//                     "Accept": "application/json"
//                 })
//             };

//             return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
//                 return this.processOptions(response_);
//             })).pipe(_observableCatch((response_: any) => {
//                 if (response_ instanceof HttpResponseBase) {
//                     console.log(response_);
//                     try {
//                         return this.processOptions(<any>response_);
//                     } catch (e) {
//                         return <Observable<any>><any>_observableThrow(e);
//                     }
//                 } else
//                     console.log(response_);
//                 return <Observable<any>><any>_observableThrow(response_);
//             }));



//         }

//         else {
//             if (type == 'SetCategoriesForValue') {
//                 url_ = this._baseUrl + "/json/reply/SetCategoriesForValue";
//             }

//             url_ = url_.replace(/[?&]$/, "");

//             let options_: any = {
//                 body: input,
//                 observe: "response",
//                 responseType: "blob",
//                 headers: new HttpHeaders({
//                     "Content-Type": "application/json",
//                     "Accept": "application/json"
//                 })
//             };

//             return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
//                 return this.processOptions(response_);
//             })).pipe(_observableCatch((response_: any) => {
//                 if (response_ instanceof HttpResponseBase) {
//                     console.log(response_);
//                     try {
//                         return this.processOptions(<any>response_);
//                     } catch (e) {
//                         return <Observable<any>><any>_observableThrow(e);
//                     }
//                 } else
//                     console.log(response_);
//                 return <Observable<any>><any>_observableThrow(response_);
//             }));
//         }

//     }

//     protected processOptions(response: HttpResponseBase): Observable<any> {
//         const status = response.status;
//         const responseBlob =
//             response instanceof HttpResponse ? response.body :
//                 (<any>response).error instanceof Blob ? (<any>response).error : undefined;

//         let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
//         if (status === 200) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 let result200: any = null;
//                 let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
//                 return _observableOf(resultData200);
//             })
//             )
//         } else if (status !== 200 && status !== 204) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 return throwException("An unexpected server error occurred.", status, _responseText, _headers);
//             }));
//         }
//         return _observableOf<void>(<any>null);
//     }



//     ///////////////////////////----END OPTIONS------///////////////



//     ///////////////////////////----START Categories------///////////////

//     /**
//     * @param input (optional) 
//     * @return Success
//     */
//     Categories(input: any, type: string): Observable<any> {
        
//         let url_
//         if (type == 'list_categories') {
//             url_ = this._baseUrl + "/json/reply/ListCategories";
//         }

//         url_ = url_.replace(/[?&]$/, "");

//         // var content_ = JSON.stringify(input);
//         // content_ = '{' + content_ + '}';


//         //content_ = content_.substring(1, content_.length - 1);
//         let options_: any = {
//             body: input,
//             observe: "response",
//             responseType: "blob",
//             headers: new HttpHeaders({
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             })
//         };

//         return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
//             return this.processCategories(response_);
//         })).pipe(_observableCatch((response_: any) => {
//             if (response_ instanceof HttpResponseBase) {
//                 console.log(response_);
//                 try {
//                     return this.processCategories(<any>response_);
//                 } catch (e) {
//                     return <Observable<any>><any>_observableThrow(e);
//                 }
//             } else
//                 console.log(response_);
//             return <Observable<any>><any>_observableThrow(response_);
//         }));


//     }

//     protected processCategories(response: HttpResponseBase): Observable<any> {
//         const status = response.status;
//         const responseBlob =
//             response instanceof HttpResponse ? response.body :
//                 (<any>response).error instanceof Blob ? (<any>response).error : undefined;

//         let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
//         if (status === 200) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 let result200: any = null;
//                 let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
//                 return _observableOf(resultData200);
//             })
//             )
//         } else if (status !== 200 && status !== 204) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 return throwException("An unexpected server error occurred.", status, _responseText, _headers);
//             }));
//         }
//         return _observableOf<void>(<any>null);
//     }


//     ///////////////////////////----END Categories------///////////////




//     ///////////////////////////----START venueService------///////////////

//     /**
//     * @param input (optional) 
//     * @return Success
//     */
//     Venue(input: any, type: string): Observable<any> {
        
//         let url_
//         if (type == 'add') {
//             url_ = this._baseUrl + "/json/reply/AddVenues";
//         }
//         else if (type == 'delete') {
//             url_ = this._baseUrl + "/json/reply/DeleteVenues";
//         }

//         url_ = url_.replace(/[?&]$/, "");

//         // var content_ = JSON.stringify(input);
//         // content_ = '{' + content_ + '}';


//         //content_ = content_.substring(1, content_.length - 1);
//         let options_: any = {
//             body: input,
//             observe: "response",
//             responseType: "blob",
//             headers: new HttpHeaders({
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             })
//         };

//         return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
//             return this.processVenue(response_);
//         })).pipe(_observableCatch((response_: any) => {
//             if (response_ instanceof HttpResponseBase) {
//                 console.log(response_);
//                 try {
//                     return this.processVenue(<any>response_);
//                 } catch (e) {
//                     return <Observable<any>><any>_observableThrow(e);
//                 }
//             } else
//                 console.log(response_);
//             return <Observable<any>><any>_observableThrow(response_);
//         }));


//     }

//     protected processVenue(response: HttpResponseBase): Observable<any> {
//         const status = response.status;
//         const responseBlob =
//             response instanceof HttpResponse ? response.body :
//                 (<any>response).error instanceof Blob ? (<any>response).error : undefined;

//         let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
//         if (status === 200) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 let result200: any = null;
//                 let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
//                 return _observableOf(resultData200);
//             })
//             )
//         } else if (status !== 200 && status !== 204) {
//             return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
//                 return throwException("An unexpected server error occurred.", status, _responseText, _headers);
//             }));
//         }
//         return _observableOf<void>(<any>null);
//     }


//     ///////////////////////////----END VenueService------///////////////
// }


export class SwaggerException extends Error {
    Message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.Message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = function () {
                observer.next(this.result);
                observer.complete();
            }
            reader.readAsText(blob);
        }
    });
}

export class CreateGroupDto {
    category!: string;
    userAccountId!: string;
    type!: string;
    Datatype!: string;
    DevideId!: string;
    categoryId!: string;

    init(data?: any) {
        if (data) {
            this.category = data["category"];
            this.userAccountId = data["userAccountId"];
            this.type = data["type"];
            this.Datatype = data["Datatype"];
            this.DevideId = data["DevideId"];
            this.categoryId = data["categoryId"];
        }
    }

    static fromJS(data?: any): CreateGroupDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateGroupDto();
        result.init(data);
        return result;
    }

    toJS(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["category"] = this.category;
        data["userAccountId"] = this.userAccountId;
        data["type"] = this.type;
        data["Datatype"] = this.Datatype;
        data["DevideId"] = this.DevideId;
        data["categoryId"] = this.categoryId;
        return data;
    }
    toJSON() {
        return JSON.stringify(this.toJS());
    }
}

export interface ICreateGroupInput {
    category: string;
    userAccountId: string;
    type: string;
    Datatype: string;
}


export class finalSavedDataDto {
    Collections: finalSavedDataCollectionsDto = new finalSavedDataCollectionsDto();
    RecipeType!: string;
    TemplateId!: string;
    UserAccountId!: string;
    RecipeId!: string;
    Values: finalSavedDataValuesDto = new finalSavedDataValuesDto();

    init(data?: any) {
        if (data) {
            this.Collections = data["Collections"];
            this.RecipeType = data["RecipeType"];
            this.TemplateId = data["TemplateId"];
            this.UserAccountId = data["UserAccountId"];
            this.RecipeId = data["RecipeId"];
            this.Values = data["Values"] ? finalSavedDataValuesDto.fromJS(data["Values"]) : null;
        }
    }

    static fromJS(data?: any): finalSavedDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new finalSavedDataDto();
        result.init(data);
        return result;
    }

    toJS(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Collections"] = this.Collections;
        data["RecipeType"] = this.RecipeType;
        data["TemplateId"] = this.TemplateId;
        data["UserAccountId"] = this.UserAccountId;
        data["RecipeId"] = this.RecipeId;
        data["Values"] = this.Values;
        return data;
    }
    toJSON() {
        return JSON.stringify(this.toJS());
    }
}

export class finalSavedDataValuesDto {
    FPC_DisplaySent: boolean = false;
    MailFoldersBasic!: string;
    Name!: string;
    SearchTimeFrame!: string;
    VenueTreeByTime!: string;
    WhitelistMode!: boolean;
    FPC_UseFullNames: boolean = false;
    FPC_GroupByCategory: boolean = false;
    ValueToMatch!: string;
    FieldToMatch!: string;
    FPC_UseAllCategories: boolean = false;

    init(data?: any) {
        if (data) {
            this.FPC_DisplaySent = data["FPC_DisplaySent"];
            this.FPC_UseAllCategories = data["FPC_UseAllCategories"];
            this.MailFoldersBasic = data["MailFoldersBasic"];
            this.Name = data["Name"];
            this.SearchTimeFrame = data["SearchTimeFrame"];
            this.VenueTreeByTime = data["VenueTreeByTime"];
            this.WhitelistMode = data["WhitelistMode"];
            this.FPC_UseFullNames = data["FPC_UseFullNames"];
            this.FPC_GroupByCategory = data["FPC_GroupByCategory"];
            this.ValueToMatch = data["ValueToMatch"];
            this.FieldToMatch = data["FieldToMatch"];
        }
    }

    static fromJS(data?: any): finalSavedDataValuesDto {
        data = typeof data === 'object' ? data : {};
        let result = new finalSavedDataValuesDto();
        result.init(data);
        return result;
    }

    toJS(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["FPC_DisplaySent"] = this.FPC_DisplaySent;
        data["FPC_UseAllCategories"] = this.FPC_UseAllCategories;
        data["MailFoldersBasic"] = this.MailFoldersBasic;
        data["Name"] = this.Name;
        data["SearchTimeFrame"] = this.SearchTimeFrame;
        data["VenueTreeByTime"] = this.VenueTreeByTime;
        data["WhitelistMode"] = this.WhitelistMode;
        data["FPC_UseFullNames"] = this.FPC_UseFullNames;
        data["FPC_GroupByCategory"] = this.FPC_GroupByCategory;
        data["ValueToMatch"] = this.ValueToMatch;
        data["FieldToMatch"] = this.FieldToMatch;
        return data;
    }
    toJSON() {
        return JSON.stringify(this.toJS());
    }
}

export class finalSavedDataCollectionsDto {
    MailAccounts!: string;

    init(data?: any) {
        if (data) {
            this.MailAccounts = data["MailAccounts"];
        }
    }

    static fromJS(data?: any): finalSavedDataCollectionsDto {
        data = typeof data === 'object' ? data : {};
        let result = new finalSavedDataCollectionsDto();
        result.init(data);
        return result;
    }

    toJS(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["MailAccounts"] = this.MailAccounts;
        return data;
    }
    toJSON() {
        return JSON.stringify(this.toJS());
    }
}
 