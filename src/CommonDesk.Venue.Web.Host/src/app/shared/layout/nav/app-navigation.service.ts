import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { AppSessionService } from '@shared/common/session/app-session.service';

import { Injectable } from '@angular/core';
import { AppMenu } from './app-menu';
import { AppMenuItem } from './app-menu-item';

@Injectable()
export class AppNavigationService {

    constructor(
        private _permissionCheckerService: PermissionCheckerService,
        private _appSessionService: AppSessionService
    ) {

    }

    getMenu(): AppMenu {
        return new AppMenu('MainMenu', 'MainMenu', [
            new AppMenuItem('Dashboard', 'Pages.Refind.Dashboard', 'flaticon-layer', '/app/main/dashboard'),
            new AppMenuItem('Recommendations', 'Pages.Refind.Groups', 'flaticon-businesswoman', '/app/main/recommend'),
            new AppMenuItem('Recipes', 'Pages.Refind.Recipes', 'flaticon-shopping-basket', '/app/main/recipes'),

            new AppMenuItem('Groups', 'Pages.Refind.Groups', 'flaticon-users-1', '/app/main/groupslist',
            // [
            //     new AppMenuItem('Summary',  'Pages.Refind.Groups', 'flaticon-users-1',      '/app/main/groupslist'),
            //     new AppMenuItem('Details',  'Pages.Refind.Groups', 'flaticon-edit',             '/app/main/groupDetails'),
            //     // new AppMenuItem('Groups',   'Pages.Refind.Groups', 'flaticon-users-1',          '/app/main/groups/edit' ),
            //     // new AppMenuItem('Advanced', 'Pages.Refind.Groups', 'flaticon-edit',             '/app/main/groupsedit'),
            // ]
            
            ),

            new AppMenuItem('Accounts', 'Pages.Refind.MailAccounts', 'flaticon-multimedia', '/app/main/mail-accounts'),
            new AppMenuItem('Devices', 'Pages.Refind.Devices', 'flaticon-star', '/app/main/devices'),

            // new AppMenuItem('Downloads', 'Pages.Refind.Downloads', '', '', [
            //     new AppMenuItem('Outlook', 'Pages.Refind.DownloadOutlook', '', '/app/main/downloads/outlook'),
            //     new AppMenuItem('Gmail', 'Pages.Refind.DownloadGmail', '', '/app/main/downloads/gmail')
            // ]),
            // COMMONDESK

            new AppMenuItem('AdminDashboard', 'Pages.Administration.Host.Dashboard', '', '/app/main/admindashboard'),
            new AppMenuItem('Tenants', 'Pages.Tenants', '', '/app/admin/tenants'),
            new AppMenuItem('Editions', 'Pages.Editions', '', '/app/admin/editions'),

            new AppMenuItem('OrganizationUnits', 'Pages.Administration.OrganizationUnits', '', '/app/admin/organization-units'),
            new AppMenuItem('Roles', 'Pages.Administration.Roles', '', '/app/admin/roles'),
            new AppMenuItem('Users', 'Pages.Administration.Users', '', '/app/admin/users'),
            new AppMenuItem('Languages', 'Pages.Administration.Languages', '', '/app/admin/languages'),
            new AppMenuItem('AuditLogs', 'Pages.Administration.AuditLogs', '', '/app/admin/auditLogs'),
            new AppMenuItem('Maintenance', 'Pages.Administration.Host.Maintenance', '', '/app/admin/maintenance'),
            new AppMenuItem('Subscription', 'Pages.Administration.Tenant.SubscriptionManagement.NoPermission', '', '/app/admin/subscription-management'),
            new AppMenuItem('VisualSettings', 'Pages.Administration.UiCustomization.NoPermission', '', '/app/admin/ui-customization'),
            new AppMenuItem('Settings', 'Pages.Administration.Host.Settings', '', '/app/admin/hostSettings'),
            new AppMenuItem('Settings', 'Pages.Administration.Tenant.Settings.NoPermission', '', '/app/admin/tenantSettings'),
            new AppMenuItem('DemoUiComponents', 'Pages.DemoUiComponents.NoPermission', '', '/app/admin/demo-ui-components'),

            new AppMenuItem('Help', '', 'flaticon-doc', '/app/main/help'),
            new AppMenuItem('Logout', '', 'flaticon-paper-plane-1', '/app/main/external_logout'),
        ]);


    }

    checkChildMenuItemPermission(menuItem): boolean {


        for (let i = 0; i < menuItem.items.length; i++) {
            let subMenuItem = menuItem.items[i];

            if (subMenuItem.permissionName && this._permissionCheckerService.isGranted(subMenuItem.permissionName)) {
                return true;
            } else if (subMenuItem.items && subMenuItem.items.length) {
                return this.checkChildMenuItemPermission(subMenuItem);
            }
        }

        return false;
    }
    showMenuItem(menuItem: AppMenuItem): boolean {

        let username = this._appSessionService.user.userName;
        let status = this.showMenuItemBase(menuItem);
        // console.log('showMenuItem:userName='+username+' menu='+menuItem.name+' permission='+menuItem.permissionName+' value='+status);
        return status;
    }


    showMenuItemBase(menuItem: AppMenuItem): boolean {
        if (menuItem.permissionName === 'Pages.Administration.Roles') {

        }

        if (menuItem.permissionName === 'Pages.Administration.Tenant.SubscriptionManagement' && this._appSessionService.tenant && !this._appSessionService.tenant.edition) {
            return false;
        }

        let hideMenuItem = false;

        if (menuItem.requiresAuthentication && !this._appSessionService.user) {
            hideMenuItem = true;
        }

        if (menuItem.permissionName && !this._permissionCheckerService.isGranted(menuItem.permissionName)) {
            hideMenuItem = true;
        }

        if (this._appSessionService.tenant || !abp.multiTenancy.ignoreFeatureCheckForHostUsers) {
            if (menuItem.hasFeatureDependency() && !menuItem.featureDependencySatisfied()) {
                hideMenuItem = true;
            }
        }
        if (menuItem.permissionName.toLowerCase().indexOf("refind") > 0 && this._appSessionService.user.userName == "admin") {
            // COMMONDESK - fixes a bug where we always see user menus in admin panel
            return false;
        }

        if (!hideMenuItem && menuItem.items && menuItem.items.length) {
            return this.checkChildMenuItemPermission(menuItem);
        }




        return !hideMenuItem;
    }
}
