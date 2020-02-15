import { OnInit, Injector, ViewChild, Injectable } from '@angular/core';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindServiceProxyTyped } from '../shared/service-proxies/refind-service-proxy-typed';
import { NotificationService } from '../../../shared/notification.service';
import { RefindToolsService } from '../refind-tools.service';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';


@Injectable()
export class DevicesLogicComponent implements OnInit {
    
    getDevicerecords: Rt.DeviceRecord[];
    userAccountId: string;
    deviceId: string;

    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector,
        public refindServiceProxyTyped: RefindServiceProxyTyped,
        public tools: RefindToolsService,
        public dataService: RefindUserDataService
        ) {
    
    }

    ngOnInit() {
        this.userAccountId = this.dataService.getUserAccountId();
        this.deviceId = this.dataService.getDeviceId();
        this.tools.assert(this.userAccountId,"DLC:ngOnInit:userAccountId == null");
        this.tools.assert(this.deviceId,"DLC:ngOnInit:deviceId == null");

        this.refindServiceProxyTyped.Init();
        
        this.getDevices();
    } 

    async getDevices() { 
        let response = await this.refindServiceProxyTyped.ListDevicesAsync();
        if(response.Success)
        {
            this.getDevicerecords = response.Devices; 
        }

        // let data: {}; 
        // data = {
        //     "UserAccountId": this.userAccountId,
        //     "DeviceId": this.deviceId
        // } 

        // this.common.Device(data, 'ListDevices', 
        // result => { 
        //     if(result.Success)
        //     {
        //         this.getDevicerecords = result.Devices; 
        //     }
        //     else
        //     {
        //         //abp.notify.error("DC:GetDevices:Error="+ result.Message);
        //         console.log("DC:GetDevices:Error="+result.Message);
        //     }
        // });        
    }
}
