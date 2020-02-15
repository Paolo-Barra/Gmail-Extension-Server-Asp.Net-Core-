import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig, ActiveToast, GlobalConfig } from "ngx-toastr";
import swal, { SweetAlertType, SweetAlertOptions } from "sweetalert2";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { RefindServiceProxyTyped } from './shared/service-proxies/refind-service-proxy-typed';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class RefindToolsService {



  constructor(protected toastrService: ToastrService) { 


  }

  // Documenation - https://github.com/scttcper/ngx-toastr
  // options - https://github.com/scttcper/ngx-toastr#individual-options
  // Demo - http://foxandxss.github.io/angular-toastr/


  ifDebug(): boolean { return false; }


  mailAccountBuilder(email: string): string {
    if (email.toLowerCase().indexOf("gmail.com") > 0) {
      return email + "_Gmail";
    }
    else {
      return email + "_Office365";
    }
  }

  stringIsTrue(input: string): boolean | undefined {
    try {
      return JSON.parse(input);
    }
    catch (e) {
      return false;
    }
  }



  buildPostActionList(atype:Rt.RestPostAction,key:Rt.RestPostActionSubType) : Rt.EventPostActionDto {
//    let PostActionList = new Rt.EventPostActionListDto();
    let PostAction = new Rt.EventPostActionDto();
    // let arr:Rt.EventPostActionDto[] = [];
    // PostActionList.Commands = arr;

    PostAction.ActionType = atype;
    PostAction.ActionSubType = key;
    return PostAction;
  }


  show(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string) {
    this.toastrService.show(message, title, override, type);
  }
  success(message?: string, title?: string, override?: Partial<IndividualConfig>) {
    if (override == null) {
      let _defaultConfig: Partial<IndividualConfig> =
      {
        positionClass: "toast-bottom-full-width",
        timeOut: 3000,
        closeButton: true,
      }
      override = _defaultConfig;
    }
    this.toastrService.success(message, title, override);
  }
  error(message?: string, title?: string, override?: Partial<IndividualConfig>) {

    if (override == null) {
      let _defaultConfig: Partial<IndividualConfig> =
      {
        positionClass: "toast-bottom-full-width",
        timeOut: 10000,
        closeButton: true,

      }
      override = _defaultConfig;
    }
    this.toastrService.error(message, title, override);
    console.error(message);
  }

  errorFast(message?: string, title?: string, override?: Partial<IndividualConfig>) {

    if (override == null) {
      let _defaultConfig: Partial<IndividualConfig> =
      {
        positionClass: "toast-bottom-right",
        timeOut: 3000,
        closeButton: true,
      }
      override = _defaultConfig;
    }
    this.toastrService.error(message, title, override);
    console.error(message);
  }


  info(message?: string, title?: string, override?: Partial<IndividualConfig>) {
    if (override == null) {
      let _defaultConfig: Partial<IndividualConfig> =
      {
        positionClass: "toast-bottom-full-width",
        timeOut: 10000,
        closeButton: true,

      }
      override = _defaultConfig;
    }

    this.toastrService.info(message, title, override);
  }
  warn(message?: string, title?: string, override?: Partial<IndividualConfig>) {
    if (override == null) {
      let _defaultConfig: Partial<IndividualConfig> =
      {
        positionClass: "toast-bottom-full-width",
        timeOut: 10000,
        closeButton: true,

      }
      override = _defaultConfig;
    }
    this.toastrService.warning(message, title, override);
  }


  async warningDialogWithCheckbox(atitle: string, buttonTitle: string, checkboxMessage: string): Promise<boolean> {

//    var checkboxChoice: boolean; = false;
    const swalOptions: SweetAlertOptions = {
      title: atitle,
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: buttonTitle,
      input: 'checkbox',
      inputPlaceholder: checkboxMessage,
    };

    const swalResult = await swal.fire(swalOptions);
    return new Promise((resolve, reject) => {
      if (swalResult.value) {
        resolve(true);
      } else if (swalResult.value === swal.DismissReason.cancel) {


        reject(false);
      } else {
        resolve(true);
      }
    });

  }

  async infoDialog(atext: string, atitle: string, buttonTitle?: string): Promise<boolean> {

    const swalOptions: SweetAlertOptions = {
      title: atitle,
      //text: atext,
      html: atext,
      type: 'info',
      showCancelButton: false,
      confirmButtonText: buttonTitle || "Ok",
      // input: 'checkbox',
      // inputPlaceholder: "Delete account analysis data.",
      // inputValidator: (result) => {
      //   return result;
      // }
    };

    const swalResult = await swal.fire(swalOptions);

    return new Promise((resolve, reject) => {
      if (swalResult.value) {
        resolve(true);
      }
      else if (swalResult.value === swal.DismissReason.cancel) {
        reject(false);
      }
    });

  }

  async infoDialogHtmlBody(atitle: string, html: HTMLElement,buttonTitle?: string): Promise<boolean> {

    const swalOptions: SweetAlertOptions = {
      title: atitle,
      //text: atext,
      html: html,
      type: 'info',
      showCancelButton: false,
      confirmButtonText: buttonTitle || "Ok",
      // input: 'checkbox',
      // inputPlaceholder: "Delete account analysis data.",
      // inputValidator: (result) => {
      //   return result;
      // }
    };

    const swalResult = await swal.fire(swalOptions);

    return new Promise((resolve, reject) => {
      if (swalResult.value) {
        resolve(true);
      }
      else if (swalResult.value === swal.DismissReason.cancel) {
        reject(false);
      }
    });

  }

  async warningDialog(atitle: string, buttonTitle: string): Promise<boolean> {

    const swalOptions: SweetAlertOptions = {
      title: atitle,
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: buttonTitle,
      // input: 'checkbox',
      // inputPlaceholder: "Delete account analysis data.",
      // inputValidator: (result) => {
      //   return result;
      // }
    };

    const swalResult = await swal.fire(swalOptions);

    return new Promise((resolve, reject) => {
      if (swalResult.value) {
        resolve(true);
      }
      else if (swalResult.value === swal.DismissReason.cancel) {
        reject(false);
      }
    });

  }

  async warningDialogLong(atitle: string, detailedMessage: string, buttonTitle: string): Promise<boolean> {

    const swalOptions: SweetAlertOptions = {
      title: atitle,
      text: detailedMessage,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: buttonTitle
    };

    const swalResult = await swal.fire(swalOptions);

    return new Promise((resolve, reject) => {
      if (swalResult.value) {
        resolve(true);
      }
      else if (swalResult.value === swal.DismissReason.cancel) {
        reject(false);
      }
    });

  }


  // confirm(message: string, title?: string, callback?: (result: boolean) => void, isHtml?: boolean): any {
  //   abp.message.confirm(message, title, callback, isHtml);
  // }

  // async swconfirm(title: string, message: string, options: Partial<SweetAlertOptions> = {}): Promise<boolean> {

  //   const swalOptions: SweetAlertOptions = {
  //     title,
  //     text: message,
  //     ...options
  //   };

  //   const swalResult = await swal.fire(swalOptions);

  //   return new Promise((resolve, reject) => {
  //     if (swalResult.value) {
  //       resolve(true);
  //     }
  //     else if (swalResult.value === swal.DismissReason.cancel) {
  //       reject(false);
  //     }
  //   });
  // }

  isItEmpty(value) {
    // https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in
    return !(typeof value != 'undefined' && value);
  }
  itsNotEmpty(value): boolean {

    return !this.isItEmpty(value);
  }
  assert(value, msg: string) {
    let val = this.isItEmpty(value);
    if (val === true) {
      let a = val;
    }
    console.assert(!val, msg);
  }
  assertplain(value, msg: string) {
    console.assert(value, msg);
  }

  // private UIState:RefindTypes.UserDataRecord[] = [];
  
  // async refreshUiState() 
  // {
  //   let ud = new RefindTypes.UserDataRecord();
  //   ud.UserAccountId = this.getUserAccountId();
  //   ud.Type = RefindTypes.UserTypeTypes.PortalCompletion;
  //   var response = await this.refindServiceProxyTyped.ReadUserMessage(ud)
  //   if(response.Success == true)
  //   {
  //     response.Results.map( row => this.UIState.set(row.Message,row.Visible == RefindTypes.Tristate.True) );
  //   }
  // }

  // async saveUiState() 
  // {
    
  //   this.UIState.entries(row => 
  //     {
  //     let ud = new RefindTypes.UserDataRecord();
  //     ud.UserAccountId = this.getUserAccountId();
  //     ud.Type = RefindTypes.UserTypeTypes.PortalCompletion;
  //     ud.Message = row.Message;
  //     ud.Visible = row.Visible;
  //       theList.push(ud)
  //     }
  //   );

  //   let ud = new RefindTypes.UserDataRecord();
  //   ud.UserAccountId = this.getUserAccountId();
  //   ud.Type = RefindTypes.UserTypeTypes.PortalCompletion;
  //   var response = await this.refindServiceProxyTyped.UpdateUserMessage(ud)
  //   if(response.Success == true)
  //   {
  //     response.Results.map( row => this.UIState.set(row.Message,row.Visible == RefindTypes.Tristate.True) );
  //   }
  // }


}
