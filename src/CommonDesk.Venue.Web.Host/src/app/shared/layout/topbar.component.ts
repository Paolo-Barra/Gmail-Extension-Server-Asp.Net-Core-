import { Injector, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { ImpersonationService } from '@app/admin/users/impersonation.service';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';
import { LinkedAccountService } from '@app/shared/layout/linked-account.service';
import { AppConsts } from '@shared/AppConsts';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { ChangeUserLanguageDto, LinkedUserDto, ProfileServiceProxy, UserLinkServiceProxy } from '@shared/service-proxies/service-proxies';
import * as _ from 'lodash';
import { RefindServiceProxyTyped } from '@app/refind/shared/service-proxies/refind-service-proxy-typed';
import { RefindToolsService } from '@app/refind/refind-tools.service';
import { Router } from '@angular/router';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';

// @Component({
//     templateUrl: './topbar.component.html',
//     selector: 'topbar',
//     encapsulation: ViewEncapsulation.None
// })

class TopBarComponentBase extends ThemesLayoutBaseComponent implements OnInit {

    isHost = false;
    languages: abp.localization.ILanguageInfo[];
    currentLanguage: abp.localization.ILanguageInfo;
    isImpersonatedLogin = false;
    isMultiTenancyEnabled = false;
    shownLoginName = '';
    tenancyName = '';
    userName = '';
    email = '';
    profilePicture = AppConsts.appBaseUrl + '/assets/common/images/default-profile-picture.png';
    defaultLogo = AppConsts.appBaseUrl + '/assets/common/images/app-logo-on-' + this.currentTheme.baseSettings.menu.asideSkin + '.svg';
    recentlyLinkedUsers: LinkedUserDto[];
    unreadChatMessageCount = 0;
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;
    chatConnected = false;
    isQuickThemeSelectEnabled: boolean = this.setting.getBoolean('App.UserManagement.IsQuickThemeSelectEnabled');
    refindUiCleanUp: boolean = true;

    constructor(
        injector: Injector,
        protected _abpSessionService: AbpSessionService,
        protected _abpMultiTenancyService: AbpMultiTenancyService,
        protected _profileServiceProxy: ProfileServiceProxy,
        protected _userLinkServiceProxy: UserLinkServiceProxy,
        protected _authService: AppAuthService,
        protected _impersonationService: ImpersonationService,
        protected _linkedAccountService: LinkedAccountService,
        protected _refindServiceProxyTyped: RefindServiceProxyTyped,
        protected _refindToolsService: RefindToolsService,
        protected _dataService: RefindUserDataService,
        protected _router: Router,
        protected _sessionService: AppSessionService
    ) {
        super(injector);
    }

    ngOnInit() {

        this.isHost = !this._abpSessionService.tenantId;
        this.isMultiTenancyEnabled = this._abpMultiTenancyService.isEnabled;
        this.languages = _.filter(this.localization.languages, l => (l).isDisabled === false);
        this.currentLanguage = this.localization.currentLanguage;
        this.isImpersonatedLogin = this._abpSessionService.impersonatorUserId > 0;
        this.setCurrentLoginInformations();
        this.getProfilePicture();
        this.getRecentlyLinkedUsers();

        this.registerToEvents();
    }

    registerToEvents() {
        abp.event.on('profilePictureChanged', () => {
            this.getProfilePicture();
        });

        abp.event.on('app.chat.unreadMessageCountChanged', messageCount => {
            this.unreadChatMessageCount = messageCount;
        });

        abp.event.on('app.chat.connected', () => {
            this.chatConnected = true;
        });

        abp.event.on('app.getRecentlyLinkedUsers', () => {
            this.getRecentlyLinkedUsers();
        });

        abp.event.on('app.onMySettingsModalSaved', () => {
            this.onMySettingsModalSaved();
        });
    }

    changeLanguage(languageName: string): void {
        const input = new ChangeUserLanguageDto();
        input.languageName = languageName;

        this._profileServiceProxy.changeLanguage(input).subscribe(() => {
            abp.utils.setCookieValue(
                'Abp.Localization.CultureName',
                languageName,
                new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
                abp.appPath
            );

            window.location.reload();
        });
    }

    setCurrentLoginInformations(): void {
        this.shownLoginName = this.appSession.getShownLoginName();
        this.tenancyName = this.appSession.tenancyName;
        this.userName = this.appSession.user.userName;
        this.email = this.appSession.user.userName;

        document.title = `reFind - ${this.userName}`;
        // By default the displayed username is the email address, but if the user has a name associated with their oauth profile then we may be able to display a real name here
        // Get the user oauth profile
        var userAuthDetails = this._dataService.getAuthUserDetails();
        if (userAuthDetails) {

            // If there is a display name use it, this usually is something like "FirstName Lastname"
            if (userAuthDetails.DisplayName != "") {
                this.userName = userAuthDetails.DisplayName;
            }
            else if (userAuthDetails.GivenName != "" && userAuthDetails.FamilyName != "") {
                // If no display name, attempt to build one from the given and family name fields returned from the oauth profile
                this.userName = `${userAuthDetails.GivenName} ${userAuthDetails.FamilyName}`;
            }
        }

        //this.userName = "xxxxxx";
    }

    getShownUserName(linkedUser: LinkedUserDto): string {
        if (!this._abpMultiTenancyService.isEnabled) {
            return linkedUser.username;
        }

        return (linkedUser.tenantId ? linkedUser.tenancyName : '.') + '\\' + linkedUser.username;
    }

    getProfilePicture(): void {
        this._profileServiceProxy.getProfilePicture().subscribe(result => {
            if (result && result.profilePicture) {
                this.profilePicture = 'data:image/jpeg;base64,' + result.profilePicture;
            }
        });
    }

    getRecentlyLinkedUsers(): void {
        this._userLinkServiceProxy.getRecentlyUsedLinkedUsers().subscribe(result => {
            this.recentlyLinkedUsers = result.items;
        });
    }


    showLoginAttempts(): void {
        abp.event.trigger('app.show.loginAttemptsModal');
    }

    showLinkedAccounts(): void {
        abp.event.trigger('app.show.linkedAccountsModal');
    }

    changePassword(): void {
        abp.event.trigger('app.show.changePasswordModal');
    }

    changeProfilePicture(): void {
        abp.event.trigger('app.show.changeProfilePictureModal');
    }

    changeMySettings(): void {
        abp.event.trigger('app.show.mySettingsModal');
    }

    logout(): void {
        this._authService.logout(false);
    }

    onMySettingsModalSaved(): void {
        this.shownLoginName = this.appSession.getShownLoginName();
    }

    backToMyAccount(): void {
        this._impersonationService.backToImpersonator();
    }

    switchToLinkedUser(linkedUser: LinkedUserDto): void {
        this._linkedAccountService.switchToAccount(linkedUser.id, linkedUser.tenantId);
    }

    downloadCollectedData(): void {
        this._profileServiceProxy.prepareCollectedData().subscribe(() => {
            this.message.success(this.l('GdprDataPrepareStartedNotification'));
        });
    }

    deleteFullAccount(): void {
        var msg = "Are you sure you want to delete you account?";
        this._refindToolsService.warningDialogWithCheckbox(msg, "Yes", "Erase account analysis data")
            .then(async () => {

                // removed the selected mail acccount and refresh the accounts list
                await this._refindServiceProxyTyped.DeleteFullAccount(false);

                let url = AppConsts.appBaseUrl + "/account/start";
                console.log("Account Deleted, redirecting to " + url)
                
                this._authService.logout(false);
                this._sessionService.logout();
                this._dataService.reset();
                this._router.navigate(['account/start']);
            });
    }

    aboutAccount(): void {

        const wrapper = document.createElement('div');
        var title = "Refind for Email - Version 1.0";
        wrapper.innerHTML  = `<p>
            Build Level: ${this.appSession.tenant.edition.displayName}<BR>
            Build Branch: ${this.appSession.application.gitBranch}<BR>
            Build Commit ${this.appSession.application.gitCommit}<BR>
            Release Date: ${this.appSession.application.releaseDate.format('DD/MM/YYYY')}<BR>
        </p>
        `;
        this._refindToolsService.infoDialogHtmlBody(title,wrapper, "Ok")
            .then(async () => {
        //   this._dataService.reset();
        //         this._router.navigate(['account/start']);
            }
            );
    }
}

@Component({
    templateUrl: './refind.topbar.component.html',
    selector: 'topbar',
    encapsulation: ViewEncapsulation.None
})

export class TopBarComponent extends TopBarComponentBase implements OnInit {

    constructor(
        injector: Injector,
        _abpSessionService: AbpSessionService,
        _abpMultiTenancyService: AbpMultiTenancyService,
        _profileServiceProxy: ProfileServiceProxy,
        _userLinkServiceProxy: UserLinkServiceProxy,
        _authService: AppAuthService,
        _impersonationService: ImpersonationService,
        _linkedAccountService: LinkedAccountService,
        _refindServiceProxyTyped: RefindServiceProxyTyped,
        _refindToolsService: RefindToolsService,
        _dataService: RefindUserDataService,
        _router: Router,
        _sessionService: AppSessionService
    ) {
        super(injector,
            _abpSessionService,
            _abpMultiTenancyService,
            _profileServiceProxy,
            _userLinkServiceProxy,
            _authService,
            _impersonationService,
            _linkedAccountService,
            _refindServiceProxyTyped,
            _refindToolsService,
            _dataService,
            _router,
            _sessionService);
    }
    logout(): void {

        let logoutUrl = "";

        if (this.appSession.user.userName == "admin") {
            logoutUrl = "/account/login-admin";
        }
        else {
            logoutUrl = abp.setting.get('LogoutUrl');
        }

        this._authService.logout(true, logoutUrl);
    }
    showLanguagesDropdown(): Boolean {
        return false;
    }
    showChatPanel(): Boolean {
        return false;
    }
    ngOnInit() { super.ngOnInit(); }



}
