import { Component, Injector, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { EntityDtoOfInt64, UserListDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import { CreateOrEditUserModalComponent } from './create-or-edit-user-modal.component';
import { EditUserPermissionsModalComponent } from './edit-user-permissions-modal.component';
import { ImpersonationService } from './impersonation.service';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from 'primeng/fileupload';
import { finalize } from 'rxjs/operators';
//import { RefindServiceProxy } from '@app/refind/shared/service-proxies/refind-service-proxy';
import { RefindToolsService } from '@app/refind/refind-tools.service';
import { RefindServiceProxyTyped } from '@app/refind/shared/service-proxies/refind-service-proxy-typed';

@Component({
    templateUrl: './users.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./users.component.less'],
    animations: [appModuleAnimation()]
})
export class UsersComponentBase extends AppComponentBase {

    @ViewChild('createOrEditUserModal') createOrEditUserModal: CreateOrEditUserModalComponent;
    @ViewChild('editUserPermissionsModal') editUserPermissionsModal: EditUserPermissionsModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('ExcelFileUpload') excelFileUpload: FileUpload;

    public _impersonationService: ImpersonationService;
    public _userServiceProxy: UserServiceProxy;
    public _fileDownloadService: FileDownloadService;
    public _activatedRoute: ActivatedRoute;
    public _httpClient: HttpClient;
//    public _common: RefindServiceProxy; 
    public tools: RefindToolsService;

    uploadUrl: string;

    //Filters
    advancedFiltersAreShown = false;
    filterText = '';
    selectedPermission = '';
    role = '';
    onlyLockedUsers = false;

    constructor(
        injector: Injector,

    ) {
        super(injector);
        this._impersonationService = injector.get(ImpersonationService);
        this._userServiceProxy = injector.get(UserServiceProxy);
        this._fileDownloadService = injector.get(FileDownloadService);
        this._activatedRoute = injector.get(ActivatedRoute);
        this._httpClient = injector.get(HttpClient);
        this.tools = injector.get(RefindToolsService);
        this.filterText = this._activatedRoute.snapshot.queryParams['filterText'] || '';
        this.uploadUrl = AppConsts.remoteServiceBaseUrl + '/Users/ImportFromExcel';
    }

    getUsers(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);

            return;
        }

        this.primengTableHelper.showLoadingIndicator();


        this._userServiceProxy.getUsers(
            this.filterText,
            this.permission ? this.selectedPermission : undefined,
            this.role !== '' ? parseInt(this.role) : undefined,
            this.onlyLockedUsers,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    unlockUser(record): void {
        this._userServiceProxy.unlockUser(new EntityDtoOfInt64({ id: record.id })).subscribe(() => {
            this.notify.success(this.l('UnlockedTheUser', record.userName));
        });
    }

    getRolesAsString(roles): string {
        let roleNames = '';

        for (let j = 0; j < roles.length; j++) {
            if (roleNames.length) {
                roleNames = roleNames + ', ';
            }

            roleNames = roleNames + roles[j].roleName;
        }

        return roleNames;
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    exportToExcel(): void {
        this._userServiceProxy.getUsersToExcel(
            this.filterText,
            this.permission ? this.selectedPermission : undefined,
            this.role !== '' ? parseInt(this.role) : undefined,
            this.onlyLockedUsers,
            this.primengTableHelper.getSorting(this.dataTable))
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createUser(): void {
        this.createOrEditUserModal.show();
    }

    uploadExcel(data: { files: File }): void {
        const formData: FormData = new FormData();
        const file = data.files[0];
        formData.append('file', file, file.name);

        this._httpClient
            .post<any>(this.uploadUrl, formData)
            .pipe(finalize(() => this.excelFileUpload.clear()))
            .subscribe(response => {
                if (response.success) {
                    this.notify.success(this.l('ImportUsersProcessStart'));
                } else if (response.error != null) {
                    this.notify.error(this.l('ImportUsersUploadFailed'));
                }
            });
    }

    onUploadExcelError(): void {
        this.notify.error(this.l('ImportUsersUploadFailed'));
    }

    deleteUser(user: UserListDto): void {
        if (user.userName === AppConsts.userManagement.defaultAdminUserName) {
            this.tools.warn(this.l('{0}UserCannotBeDeleted', AppConsts.userManagement.defaultAdminUserName));
            return;
        }

        abp.message.confirm(
            this.l('UserDeleteWarningMessage', user.userName),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._userServiceProxy.deleteUser(user.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
}
@Component({
    templateUrl: './users.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./users.component.less'],
    animations: [appModuleAnimation()],
    providers: [
        UsersComponentBase
    ]
})
export class UsersComponent extends UsersComponentBase {
    constructor(
        injector: Injector,
        protected refindServiceProxyTyped: RefindServiceProxyTyped,
    ) {
        super(injector);
        console.log(this.dataTable);
    }
    async deleteUser(user: UserListDto) {

        if (user.userName === AppConsts.userManagement.defaultAdminUserName) {
            this.tools.warn(this.l('{0}UserCannotBeDeleted', AppConsts.userManagement.defaultAdminUserName));
            return;
        }

        abp.message.confirm(
            this.l('UserDeleteWarningMessage', user.userName),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    // delete occurs in two stages. 1 - delete the user in ANZ
                    this._userServiceProxy.deleteUser(user.id).subscribe(async () => {
                        // now delete the syncservice user
                        let mid = this.tools.mailAccountBuilder(user.emailAddress);
                        let did = "Portal";
                        let response = await this.refindServiceProxyTyped.DeleteAnyAccountOnDeviceAsync(user.userAccountId, did, user.emailAddress, mid);
                        if (response.Success) {
                            this.reloadPage();
                            this.tools.success("The User was succesfully removed.");
                        }
                        else {
                            this.reloadPage();
                            this.tools.error("UC:DeleteUser:Unable To Delete account on Refind Server:Error=" + response.Message);
                        }
                    });
                }
            }
        );
    }
}
