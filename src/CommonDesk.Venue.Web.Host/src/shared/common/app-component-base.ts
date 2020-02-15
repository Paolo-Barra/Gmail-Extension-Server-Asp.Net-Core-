import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { FeatureCheckerService } from '@abp/features/feature-checker.service';
import { LocalizationService } from '@abp/localization/localization.service';
import { MessageService } from '@abp/message/message.service';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';
import { NotifyService } from '@abp/notify/notify.service';
import { SettingService } from '@abp/settings/setting.service';
import { Injector } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppUrlService } from '@shared/common/nav/app-url.service';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { AppUiCustomizationService } from '@shared/common/ui/app-ui-customization.service';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { UiCustomizationSettingsDto } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';

export abstract class AppComponentBase {

    localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

    localization: LocalizationService;
    permission: PermissionCheckerService;
    feature: FeatureCheckerService;
    notify: NotifyService;
    setting: SettingService;
    message: MessageService;
    multiTenancy: AbpMultiTenancyService;
    appSession: AppSessionService;
    primengTableHelper: PrimengTableHelper;
    ui: AppUiCustomizationService;
    appUrlService: AppUrlService;

    constructor(injector: Injector) {
        this.localization = injector.get(LocalizationService);
        this.permission = injector.get(PermissionCheckerService);
        this.feature = injector.get(FeatureCheckerService);
        this.notify = injector.get(NotifyService);
        this.setting = injector.get(SettingService);
        this.message = injector.get(MessageService);
        this.multiTenancy = injector.get(AbpMultiTenancyService);
        this.appSession = injector.get(AppSessionService);
        this.ui = injector.get(AppUiCustomizationService);
        this.appUrlService = injector.get(AppUrlService);
        this.primengTableHelper = new PrimengTableHelper();

        //this.appSession.init();
    }

    flattenDeep(array) {
        return array.reduce((acc, val) =>
            Array.isArray(val) ?
            acc.concat(this.flattenDeep(val)) :
            acc.concat(val),
            []);
    }

    l(key: string, ...args: any[]): string {
        args.unshift(key);
        args.unshift(this.localizationSourceName);
        return this.ls.apply(this, args);
    }

    ls(sourcename: string, key: string, ...args: any[]): string {
        let localizedText = this.localization.localize(key, sourcename);

        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, this.flattenDeep(args));
    }

    isGranted(permissionName: string): boolean {
        return this.permission.isGranted(permissionName);
    }

    isGrantedAny(...permissions: string[]): boolean {
        if (!permissions) {
            return false;
        }

        for (const permission of permissions) {
            if (this.isGranted(permission)) {
                return true;
            }
        }

        return false;
    }

    s(key: string): string {
        return abp.setting.get(key);
    }

    appRootUrl(): string {
        return this.appUrlService.appRootUrl;
    }

    get currentTheme(): UiCustomizationSettingsDto {
        return this.appSession.theme;
    }

    // COMMONDESK Changes: what device are we talking to 
    get_device_id() {
        return "Portal";
    }

    // COMMONDESK Changes: Added method for settings
    isSet(settingName: string): boolean {
        return abp.setting.getBoolean(settingName);
    }
    
    // COMMONDESK Changes: Added method for timed log
    logtm(msg) {
        const now = new Date();
        const currentDate = `[${now.toISOString()}]: `;
        const args = Array.from(arguments);
        args.unshift(currentDate);
        console.log(currentDate + msg);
    }
    userErrorMsg(...args)
    {
        // 1 arg only - display standard message with error number 
        // 2 arg only - display custom message with error number 
        // 3 args     - display custom message with error number and print stack trace
        if(args.length === 1)
        {
            abp.notify.error("Unable to contact our portal backend service. Contact ReFind Support. Error:"+args[0]);
        }
        if(args.length === 2)
        {
            abp.notify.error(args[0]+":Error="+args[1]);
        }
        if(args.length === 3)
        {
            abp.notify.error(args[0]+":Error="+args[1],args[2]);
        }
    }

//     userErrorMsg(message,stack,mid)
//     {
//         abp.notify.error(message+mid,stack);
// //        abp.notify.error("Unable to contact our portal backend service. Contact ReFind Support. Error:"+mid);
//     }
//     userErrorMsg(message,stack,mid)
//     {
//         abp.notify.error(message+mid,stack);
// //        abp.notify.error("Unable to contact our portal backend service. Contact ReFind Support. Error:"+mid);
//     }
    consoleWarning(message)
    {
        abp.notify.error(message);
    }

    // // COMMONDESK Changes: Added method for settings
    // isSet(settingName: string): boolean {
    //     return abp.setting.getBoolean(settingName);
    // }
    // // COMMONDESK Changes: Added method for timed log
    // logtm(msg) {
    //     const now = new Date();
    //     const currentDate = `[${now.toISOString()}]: `;
    //     const args = Array.from(arguments);
    //     args.unshift(currentDate);
    //     console.log(currentDate + msg);
    // }

    // COMMONDESK Changes: Gets user account id from url query params or from session if available
    getUserAccountId(activatedRoute: ActivatedRoute) : string {
        let uid: string;

        // For the full website, we get the user account id from the session
        if(this.appSession.user) {
            uid = this.appSession.user.userAccountId; 
        }
        else {
            // The chrome extension doesn't have a session, it sends the user account id as a query parameter
            uid = activatedRoute.snapshot.queryParams["userAccountId"]; 
        }            
        
        if(uid == undefined) {
            abp.notify.error('GDC:setUserAccountId:No user account id specified');
            console.log('GDC:setUserAccountId:No user account id specified');
        }

        return uid;
    }
}
