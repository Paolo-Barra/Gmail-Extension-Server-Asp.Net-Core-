import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf, ObservableLike } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { SwaggerException } from '../../../../shared/service-proxies/service-proxies';
import { AppConsts} from '@shared/AppConsts';
// import { UserListDto } from '@shared/service-proxies/service-proxies';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export type Callback = (response: any) => any;

@Injectable()
export class RefindServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
    _baseUrl: string = '';
    _aspBackendBaseUrl: string = '';


    constructor(
        @Inject(HttpClient) http: HttpClient, 
        @Optional() @Inject(API_BASE_URL) aspBackEndUrl?: string) {
        this.http = http;
        this._aspBackendBaseUrl = AppConsts.remoteServiceBaseUrl;
        this._baseUrl = AppConsts.refindBackendUrl;

    }

    Account(request: any, methodName: string, sucessCallback: Callback,  errorCallback: Callback = this.handleError) : void {
        this.httpRequest("post", methodName, request, "blob").subscribe(
            (data) =>  { this.handleOurSoftErrors(methodName,data,sucessCallback); },errorCallback);           
    }

    Wizard(request: any, methodName: string, sucessCallback: Callback, errorCallback: Callback = this.handleError): void {
        // return this.httpRequest("post", type, input, "blob");
        this.httpRequest("post", methodName, request, "blob").subscribe(
            (data) =>  { this.handleOurSoftErrors(methodName,data,sucessCallback); },errorCallback);    
    }

    Group(request: any, methodName: string, sucessCallback: Callback, errorCallback: Callback = this.handleError): void {
        // return this.httpRequest("post", type, input, "blob");
        this.httpRequest("post", methodName, request, "blob").subscribe(
            (data) =>  { this.handleOurSoftErrors(methodName,data,sucessCallback); },errorCallback);                
    }

    mailAccount(request: any, methodName: string, sucessCallback: Callback,errorCallback: Callback = this.handleError): void {
        // return this.httpRequest("post", type, input, "blob");
        this.httpRequest("post", methodName, request, "blob").subscribe(
            (data) =>  { this.handleOurSoftErrors(methodName,data,sucessCallback); },errorCallback);    
    }

    Device(request: any, methodName: string, sucessCallback: Callback,errorCallback: Callback = this.handleError): void {
        // return this.httpRequest("post", type, input, "blob");
        this.httpRequest("post", methodName, request, "blob").subscribe(
            (data) =>  { this.handleOurSoftErrors(methodName,data,sucessCallback); },errorCallback);    
    }

    // [HandleError]
    CreateOAuthToken(input: any, type: string): Observable<any> {
        let url_
        if (type == 'CreateOAuthToken') {
            url_ = "CreateOAuthToken";
        }
        return this.httpRequest("post", url_, input, "blob");
        // this.httpRequest("post", url_, input, "blob").subscribe(callback, this.handleError);
    }

    // [HandleError]
    Registration(input: any, type: string): Observable<any> {
        let url_
        if (type == 'AddAccount') {
            url_ = "AddAccount";
        }
        return this.httpRequest("post", url_, input, "blob");
        // this.httpRequest("post", url_, input, "blob").subscribe(callback, this.handleError);
    }

    Recipe(request: any, methodName: string, sucessCallback: Callback,errorCallback: Callback = this.handleError): void {
        this.httpRequest("post", methodName, request, "blob").subscribe(
            (data) =>  { this.handleOurSoftErrors(methodName,data,sucessCallback); },errorCallback);
    }

    Options(request: any, methodName: string, sucessCallback: Callback,errorCallback: Callback = this.handleError): void {
        this.httpRequest("get", methodName, request, "blob").subscribe(
            (data) =>  { this.handleOurSoftErrors(methodName,data,sucessCallback); },errorCallback);
    }

    Categories(request: any, methodName: string, sucessCallback: Callback,errorCallback: Callback = this.handleError): void {
        this.httpRequest("post", methodName, request, "blob").subscribe(
            (data) =>  { this.handleOurSoftErrors(methodName,data,sucessCallback); },errorCallback);    }

    Venue(request: any, methodName: string, sucessCallback: Callback,errorCallback: Callback = this.handleError): void {
        this.httpRequest("post", methodName, request, "blob").subscribe(
            (data) =>  { this.handleOurSoftErrors(methodName,data,sucessCallback); },errorCallback);            
    }

    protected processAny(response: HttpResponseBase): Observable<any> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                return _observableOf(resultData200);
            })
            )
        } else if (status !== 200 && status !== 204) {
            return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }

    handleOurSoftErrors(methodName: string, response: any,successCb: Callback): void {
        if(response.Success === false) {
//            if(environment.production == true)
//            {
                abp.notify.error(`REST:${methodName}:Error=${response.Message}`);
//            }
        }
        successCb(response);
    }

 

    handleError(...args: any[]): void {
        // 1 arg only - display standard message with error number 
        // 2 arg only - display custom message with error number 
        // 3 args     - display custom message with error number and print stack trace
        if (args.length === 1) {
            var dialogLongTime = {
                closeButton: true,
                position: 'bottom-end',
                showConfirmButton: false,
                showDuration: 99999,
                timer: 99999,
                padding: 0,
                toast: true,
                animation: false
            };

            abp.notify.error("Unable to contact the ReFind service.  Please check your internet connection. " + args[0],"",dialogLongTime);
            console.warn("Unable to contact the ReFind service.  Please check your internet connection. " + args[0]);
        }
        if (args.length === 2) {
            abp.notify.error(args[0] + ":Error=" + args[1],"",dialogLongTime);
            console.warn(args[0] + ":Error=" + args[1]);
        }
        if (args.length === 3) {
            abp.notify.error(args[0] + ":Error=" + args[1],"",dialogLongTime);
            console.warn(args[0] + ":Error=" + args[1]);
        }
    }


    httpRequest(httpType: string, method: string, input: string, rtype: string): Observable<any> {
        console.log("SP:HttpRequest:" + method);
        let options_ = this.GetOptions(input, rtype);

        let url_ = this._baseUrl + "/json/reply/" + method;
        url_ = url_.replace(/[?&]$/, "");

        return this.httpRequestInternal(httpType, url_, options_);
    }

    aspBackendHttpRequest(httpType: string, apiUrl: string, rtype: string): Observable<any> {
        console.log("SP:aspBackendHttpRequest:" + apiUrl);
        let options_ = this.GetOptions("", rtype);

        let url_ = this._aspBackendBaseUrl +  apiUrl;
        url_ = url_.replace(/[?&]$/, "");

        return this.httpRequestInternal(httpType, url_, options_);
    }

    httpRequestInternal(httpType: string, url_: string, options_: any): Observable<any> {
        
        return this.http.request(httpType, url_, options_)
            .pipe(_observableMergeMap((response_: any) => 
            {
                return this.processAny(response_);
            }))
            .pipe(_observableCatch((response_: any) => 
            {

                if (response_ instanceof HttpResponseBase) 
                {
                    console.log(response_);
                    try {
                        return this.processAny(<any>response_);
                    } catch (e) {
                        return <Observable<any>><any>_observableThrow(e);
                    }
                } else
                    console.log(response_);
                return <Observable<any>><any>_observableThrow(response_);
            }));
    }

    GetOptions(input: string, rtype: string): any {
        let options_: any = {
            body: input,
            observe: "response",
            responseType: rtype,
            headers: new HttpHeaders({
                //"Content-Type": "application/json",
                "Accept": "application/json"
            })
        };
        return options_;
    }
    throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
        if (result !== null && result !== undefined)
            return _observableThrow(result);
        else
            return _observableThrow(new SwaggerException(message, status, response, headers, null));
    }
    blobToText(blob: any): Observable<string> {
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
}
