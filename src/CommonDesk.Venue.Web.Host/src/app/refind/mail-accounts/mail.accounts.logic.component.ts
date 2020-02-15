import { OnInit, ViewChild, Injectable } from '@angular/core';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import { RefindServiceProxyTyped } from '../shared/service-proxies/refind-service-proxy-typed';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindToolsService } from '../refind-tools.service';
import { IMailAccountData } from '../recipes/recipesCreateOrEdit/recipes.interfaces';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';

@Injectable()
export class MailAccountLogicComponent implements OnInit {

    public getMailAccountRecords: Rt.AccountRecord[];
    userAccountId: string;
    deviceId: string;

    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        public refindServiceProxyTyped: RefindServiceProxyTyped,
        public tools: RefindToolsService,
        public dataService: RefindUserDataService
    )
    {
    }

    ngOnInit() {

        this.userAccountId = this.dataService.getUserAccountId();
        this.deviceId = this.dataService.getDeviceId();
        this.tools.assert(this.userAccountId, "MALC:ngOnInit:userAccountId == null");
        this.tools.assert(this.deviceId, "MALC:ngOnInit:deviceId == null");

        this.refindServiceProxyTyped.Init();

        this.getMailAccounts();
    }

    async getMailAccounts() {
        let response = await this.refindServiceProxyTyped.GetAccountsAsync("");
        if (response.Success) {
            this.getMailAccountRecords = response.Result;
        }


        // let data: {}; 

        // data = {
        //     "UserAccountId": this.userAccountId,
        //     "DeviceId": this.deviceId
        // } 

        // this.common.mailAccount(data, 'GetAccounts', result => {  
        //     this.getMailAccountRecords = result.Result; 
        // });


    }


    async deleteMailAccount(mailAccount: IMailAccountData) {


        /**
         * Removed logic for deleting the user's last account.
         */
        // const mailAccounts = this.getMailAccountRecords;
        // if (mailAccounts.length === 1) {
        //     // this is the user's only mail account, notify that this will also delete the user's refind account.
        //     this.tools.warningDialog("You are deleting the last mail account. \n This will delete your entire refind account. Proceed?", "Ok").then(async () => {

        //         //
        //         this.tools.success("Mail account removed succesfully!");

        //         // TODO Delete the user's refind account if there is only one account
        //         // possibly, would have to log the user out as well and go back to the login page
        //         await this.getMailAccounts();
        //     });
        // }

        if (this.getMailAccountRecords.length === 1) {
            return this.tools.infoDialog("This is your only email account and it cant be deleted without deleting your entire account. If you want to delete your entire account, select the 'Delete my Account' on the upper right drop down.", "")
        }

        if (!mailAccount.IsMainAccount) {

            this.tools.warningDialog("Are you sure you want to delete this mail account?", "Yes")
                .then(async () => {
                    this.tools.success("Mail account removed successfully");


                    // removed the selected mail acccount and refresh the accounts list
                    await this.refindServiceProxyTyped.DeleteAnyAccountOnDeviceAsync(this.userAccountId, this.deviceId, mailAccount.Email, mailAccount.MailAccountId);
                    await this.getMailAccounts();
                });
        }
    }
}
