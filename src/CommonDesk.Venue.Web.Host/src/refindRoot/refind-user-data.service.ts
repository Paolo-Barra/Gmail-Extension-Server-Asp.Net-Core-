import { Injectable } from '@angular/core';
import { UserDetailsToSend } from './AuthServices/refind.auth.service';
import { map } from 'rxjs/operators';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindServiceProxyTyped } from '@app/refind/shared/service-proxies/refind-service-proxy-typed';
import { Dictionary } from 'ts-generic-collections-linq';

class KeyBooleanPair {
  key: string;
  value: boolean;
}

class KeyStringPair {
  key: string;
  value: string;
}


export class ApplicationState
{
  //State:Dictionary<string,RefindTypes.ApplicationStateDto>;
  State: Map<Rt.RestPostActionSubType, Rt.ApplicationStateDto>;
  constructor() {
    this.State = new Map<Rt.RestPostActionSubType, Rt.ApplicationStateDto>();

    //this.State = new Dictionary<string,RefindTypes.ApplicationStateDto>();
  }

  clear() {
    this.State.clear();
  }

  GetBool(key:Rt.RestPostActionSubType) {
    if(this.State.has(key) == false) { return ""; }
    let result = this.State.get(key);
    return result.StateValue == "true" ? true : false;
  }

  GetValue(key:Rt.RestPostActionSubType): string {
    if(this.State.has(key) == false) { return ""; }
    let result = this.State.get(key);
    return result.StateValue;
  }

  async ReadApplicationState(refindServiceProxyTyped: RefindServiceProxyTyped,uid:string,mid:string)  {

    let response = await refindServiceProxyTyped.ReadApplicationState(uid,mid);
    if(response.Success) {
        for(let row of response.Results) {
          this.State.set(row.StateKey, row);
          //if(this.State[row.StateKey] == false) {
          // }
          // else {
          //   this.State.remove(this.State.tryGetValue(row.StateKey));
          // }
        }
    }
  }

  async CreateApplicationState(uid:string,mid:string)  {

    // let response = await this.refindServiceProxyTyped.CreateApplicationState(uid,mid);
    // if(response.Success)
    // {
    // //    console.log("Recommendations for user=" + response.Results.length);
    // }
  }
}

@Injectable({
  providedIn: 'root'
})
export class RefindUserDataService {

  private _UserAccountIdKey = "ruds:uid";
  private _MailAccountIdKey = "ruds:mid";
  private _DeviceIdKey = "ruds:did";
  private _PrimaryEmailKey = "ruds:pemail";
  private _AuthProvider = "ruds:authProvider:UserDetails";
  private UIStateKey = "ruds:UIStateKey:";
  private ConsentEmailKey = "ruds:ConsentEmailKey:";
  private AccountCreateKey = "ruds:AccountCreateKey:";

  constructor() {
  }

  reset() {
    localStorage.clear();
  }

  setConsentEmail(email:string) {
    localStorage.setItem( this.ConsentEmailKey, email);
  }

  getConsentEmail(): string {
    return localStorage.getItem( this.ConsentEmailKey);
  }



  isAccountCreated(): boolean {

    return (this.getCreateAccountState() !== 'never');
  }
  setCreateAccountState(val:string) {
    localStorage.setItem( this.AccountCreateKey, val);
  }

  getCreateAccountState(): string {
    return localStorage.getItem(this.AccountCreateKey);
  }

  setAuthUserDetails(userDetails:UserDetailsToSend) {
    let val = JSON.stringify(userDetails);
    localStorage.setItem( this._AuthProvider, val);
  }
  getAuthUserDetails(): UserDetailsToSend
  {
    let val = localStorage.getItem( this._AuthProvider);
    return JSON.parse(val);
  }

  setPrimaryEmailAccount(val:string) {
    localStorage.setItem( this._PrimaryEmailKey, val);
  }

  getPrimaryEmailAccount() {
    return localStorage.getItem(this._PrimaryEmailKey);
  }

  setUserAccountId(val:string)   {
    if(val) {
      localStorage.setItem( this._UserAccountIdKey, val);
    } else {
      console.warn("RUDS:setUserAccountId set == null");
    }
  }

  getUserAccountId(): string {
    return localStorage.getItem(this._UserAccountIdKey);
  }

  setMailAccountId(val:string) {
    if(val) {
      localStorage.setItem( this._MailAccountIdKey, val);
    } else {
      console.warn("RUDS:setMailAccountId set == null");
    }
  }


  getMailAccountId(): string {
    return localStorage.getItem(this._MailAccountIdKey);
  }


  setDeviceId(val:string)   {
    localStorage.setItem(this._DeviceIdKey, val);
  }

  getDeviceId(): string {
    return localStorage.getItem(this._DeviceIdKey);
  }

  getValue(key:string): string {
    return localStorage.getItem(key);
  }

  setValue(key:string,val:string)   {
    localStorage.setItem(key, val);
  }


}
