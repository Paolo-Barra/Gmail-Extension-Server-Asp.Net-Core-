import { Router, ActivatedRoute } from '@angular/router';
import { ServerEventsClient, ServerEventConnect, ServerEventJoin, ServerEventLeave, ServerEventUpdate, ServerEventMessage } from '@servicestack/client';
import {  Injector, Injectable } from '@angular/core';
import * as _ from 'lodash';
import { RefindServiceProxyTyped } from     '@rshared/service-proxies/refind-service-proxy-typed';
import { AppConsts } from                   '@shared/AppConsts';
import * as Rt from                '@shared/service-proxies/refind/ReFind.dtos';
import { RefindToolsService } from '../refind-tools.service';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';

@Injectable()
export class DashboardPieChartComponent {

    VenueServerSideEventsRoot: string;

    // plot_options: { displayModeBar: false; };
    // plotly_layout: { showlegend: boolean; legend: { x: number; y: number; yanchor: string; xanchor: string; 'orientation': string; bgcolor: string; }; aspectmode: string; margin: { t: number; b: number; }; };
    // plotly_data: { values: any; labels: any; type: string; mode: string; hole: number; name: string; marker: { colors: any[]; }; textposition: any; }[];
    screenWidth: number;
    screenHeight: number;
    value: boolean;
    messages_chart: any;
    SubviewMode: string;
    chart_labels: any;
    chart_data: any;
    total: number;
    categories_did_return: boolean;


    loading = false;
    account: any;
    userAccountId: any;
    accounts: any;
    accounts_did_return: any;
    account_id: any;
    categoriesData: any;
    viewMode: any;
    gclient: any;
    channels: any;

     
    interval: any;
    rfrequency: number = 10000;      // how often to reload chart 

    deviceId: string;

    constructor(
        injector: Injector,
        public refindServiceProxyTyped: RefindServiceProxyTyped,
        public router: Router,
        public tools: RefindToolsService,
        public dataService: RefindUserDataService
    ) 
    {
    }    
       newInit(): void {

        this.refindServiceProxyTyped.Init();

        this.userAccountId = this.dataService.getUserAccountId();
        this.deviceId = this.dataService.getDeviceId();
        this.tools.assert(this.userAccountId,"DPCC:ngOnInit:userAccountId == null");
        this.tools.assert(this.deviceId,"DPCC:ngOnInit:deviceId == null");

        // display chart immediatly
        console.log(`DC:Starting Chart Refresh ${this.rfrequency}`)
        console.log("DC:newInit:UserAccountId=" + this.userAccountId);

        this.viewMode = 'messages';
        this.SubviewMode = 'Summary';
        this.messages_chart = true;

        this.updateChart();

        // this.interval = setInterval(() => {
        //     // update chart every 10 seconds
        //     console.log(`DC:Refreshing Chart for Uid=${this.userAccountId}`)
        //     this.updateChart();
        // }, this.rfrequency);

    }

    newDestroy(): void {
        console.log(`DC:Stoping Chart Refresh`)
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    ngOnDestroy(): void {

        console.log("DC:ngOnDestroy:");
        this.newDestroy();
        //this.cancelConnection();
    }
    ngOnInit(): void {
        console.log("DC:ngOnInit:")
        this.newInit();
    }



    init(): void {
        // This was used to update the account cration chart
        // Problem was we were always POST errors with the heartbeat.  Somehow the heartbeat 
        // would get the internal port for the service and append this to the external address
        // Also the SSE framework has little support. We will use SignalR in the future 
        // https://docs.servicestack.net/typescript-server-events-client

        console.log("DC:init:Starting");

        this.VenueServerSideEventsRoot = abp.setting.get('VenueServerSideEventsRoot');
        console.log("DC:init:VenueServerSideEventsRoot=" + this.VenueServerSideEventsRoot);


        try {
            this.channels = [this.userAccountId];
            this.gclient = new ServerEventsClient(this.VenueServerSideEventsRoot, this.channels,
                {
                    handlers: 
                    {
                        onConnect: (sub: ServerEventConnect) => {  
                            // Successful SSE connection
                            console.log("DC:onConnect:User='ve connected! welcome " + sub.displayName);
                        },
                        onJoin: (msg: ServerEventJoin) => {        
                            // User has joined subscribed channel
                            console.log("DC:onJoin:User=" + msg.displayName + ":Has Joined");
                        },
                        onLeave: (msg: ServerEventLeave) => {      
                            // User has left subscribed channel
                            console.log("DC:onLeave:User=" + msg.displayName + "Has exited");
                        },
                        onUpdate: (msg: ServerEventUpdate) => {    
                            // User's subscribed channels have changed
                            console.log("DC:onUpdate:User=" + msg.displayName + " channels subscription were updated");
                        },
                        onMessage: (msg: ServerEventMessage) => {
                            console.log("DC:onMessage:User=[" + msg + "]");
                            this.updateChart();
                        },
                        StatsUpdatedServerEvent: (msg: ServerEventUpdate) => {
                            console.log("DC:StatsUpdatedServerEvent:User=[" + msg.toString() + "]");
                        },
                        ServerEventWithMessage: (msg: ServerEventMessage) => {
                            console.log("DC:ServerEventWithMessage:User=[" + msg.toString() + "]");
                        }
                    },
                    onException: (e: Error) => {
                        console.log("DC:onException:=" + e.name + ': ' + e.message);
                        this.cancelConnection();

                    },
                    onReconnect: (e: Error) => {
                        console.log("DC:onReconnect:" + e)
                    }
                }).start();
        } catch (e) {
            console.log("DC:init::Init SignalR failed:Error=" + e);
        }
        console.log("DC:init:refreshing");
        this.updateChart();

        this.viewMode = 'messages';
        this.SubviewMode = 'Summary';
        this.messages_chart = false;
        console.log("DC:init:Stopping");
    }
    cancelConnection(): void {
        try {
            console.log("DC:cancelConnection:");
            this.gclient.unsubscribeFromChannels(this.channels);
            this.gclient.stop();
        } catch (e) {
            console.log("DC:cancelConnection:Error=" + e.name + ': ' + e.message);
        }
    }

    async updateChart() {

        let response = await this.refindServiceProxyTyped.GetAccountsOnDeviceAsync();
        if(response.Success)
        {
            this.accounts_did_return = true;
            this.accounts = response.Result;
            if (this.accounts.length > 0) {
               let  match = this.accounts.filter(x => x.MailAccountId === "");
               if (match && match.length > 0) {
                   this.account = match[0];
               } else {
                   this.account = this.accounts[0];
               }
               this.account_id = this.account.MailAccountId;
               this.refresh_categories();
            }
            else {
                this.tools.warn("DC:No accounts were found.");
            }
        }

        // let data: {};
        // data = {
        //     'UserAccountId': this.userAccountId,
        //     'DeviceId': this.deviceId
        // }


        // this.common.mailAccount(data, 'GetAccountsOnDevice', (response) => {
        //      this.accounts_did_return = true;
        //      this.accounts = response.Result;


        //      if (this.accounts.length > 0) {
        //         let  match = this.accounts.filter(x => x.MailAccountId === "");
        //         if (match && match.length > 0) {
        //             this.account = match[0];
        //         } else {
        //             this.account = this.accounts[0];
        //         }
        //         this.account_id = this.account.MailAccountId;
        //         this.refresh_categories();
        //      }
        //      else {
        //          console.log("DC:No accounts were found.")
        //      }
        // });


    }

    change_filter(): any {
        this.account = this.accounts.filter(x => x.MailAccountId === this.account_id)[0];
        this.refresh_categories();
    }

    async refresh_categories() {
        // console.log("DC:refresh_categories:Start");
        // let data = {};
        // data = {
        //     'UserAccountId': this.userAccountId,
        //     'DeviceId': this.deviceId,

        //     'SourceOptions': 'MachineOnly',
        //     'MailAccountId': this.account_id,
        //     'IncludeStatistics': true
        // }

        // console.log("DC:refresh_categories:ListCategories");

        // this.common.Categories(data, 'ListCategories', response => {
        //     this.onGetCategories(response);
        //     this.categories_did_return = true;
        // });
        // console.log("DC:refresh_categories:ListCategories");

        let response = await this.refindServiceProxyTyped.ListCategoriesAsync(
            this.account_id,
            Rt.CategoryItemSourceOptions.MachineOnly,
            true
        );
        if(response.Success){
            this.onGetCategories(response);
            this.categories_did_return = true;
        }
    }

    onGetCategories(response) {
        console.log("DC:onGetCategories");
        this.categoriesData = response.Categories.map(function (x) {
            return {
                'label': x.Category,
                'value': x.Count,
                'id': x.CategoryId,
                'order': x.SortOrder,
                'message_count': x.TotalMessages,
                'percent': x.PercentOfTotal
            }
        });

        this.total = 0;
        this.categoriesData.forEach(x => { this.total = this.total + x.value; });

        this.chart_data = this.categoriesData.map(x => x.value / this.total * 100);
        this.chart_labels = this.categoriesData.map(x => x.label);
        this.make_chart(this.viewMode);
    }

    //@HostListener('window:resize', ['$event'])

    getScreenSize() {
        this.screenHeight = window.innerHeight - 150;
        this.screenWidth = window.innerWidth - 150;
        // console.log(this.screenHeight, this.screenWidth); 
        // chartSizeForDevice();
        this.make_chart('messages');
    }

    make_chart(chartType:string) {
        //chartSizeForDevice();
        let  values;
        if (chartType === 'messages') 
        {
            values = this.categoriesData.map(x => x.message_count);
        } 
        else if (chartType === 'person') 
        {
            values = this.categoriesData.map(x => x.value);
        }
        else 
        {
            console.log("DC:make_chart:asked to make unknown chart type="+chartType);
            return;
        }

        if( values.reduce((a,b)=> a+b,0) == 0)
        {
            // add up all values in array - if zero then
            // dont display array with no data in it you get strange errors 
            // Error: <path> attribute d: Expected number, "MNaN,NaNa75,75 0 …".
            console.log("Warning: No data to display. Chart not loaded!");
            return;  
        }
        let  valData = [];
        let  colors = [];


        for (let  i = 0; i < this.categoriesData.length; i++) {
            let val = this.categoriesData[i].label;
            valData.push(val);
            if (val === "Machines") {
                colors.push("#DE0D49");
            }
            if (val === "MailingList") {
                colors.push("#FCAC0D");
            }
            if (val === "InterstingPeople") {
                colors.push("#02A1D6");
            }
            if (val === "Contacts") {
                colors.push("#008C75");
            }
            if (val === "People") {
                colors.push("#04E6A6");
            }
        }

        // this.plot_options = { displayModeBar: false };

        // this.plotly_data = [
        //     {
        //         values: values,
        //         labels: this.categoriesData.map(x => x.label),
        //         type: 'pie',
        //         mode: 'markers+text',
        //         hole: .5,
        //         name: "Groups",
        //         marker: { colors: colors },
        //         textposition: this.get_text_positions(values),
        //     }
        // ];


        // this.plotly_layout = {
        //     showlegend: true,
        //     legend: {
        //         x: .5,
        //         y: -.5,
        //         yanchor: 'bottom',
        //         xanchor: 'center',
        //         'orientation': 'h',
        //         bgcolor: '#cccccc44',
        //     },
        //     aspectmode: 'cube',
        //     margin: {
        //         t: 0,
        //         b: 100
        //     },
        // }

    }

    get_text_positions(values) {
        return values.map(function (x) {
            if (x > 20) {
                return 'auto';
            }
            return 'none';
        });
    }

    get_account_progress_percent() {
        if (!this.account || !this.account.AccountStats) {
            return 0;
        }
        let  percent = (this.account.AccountStats.PercentComplete * 100).toFixed(1) + "%";
        return percent;
    }

    get_account_progress_style() {
        let  style = {
            width: this.get_account_progress_percent()
        };
        return style;
    }
    // gofromMessageDetails(group) { 
    //     this.router.navigate(['app/main/groupDetails'], {
    //         queryParams: {
    //             groupId: group.id,
    //         }
    //     });
    // }
    // gofromPeopleDetails(group) {
    //     this.router.navigate(['app/main/groupDetails'], {
    //         queryParams: {
    //             groupId: group.id,
    //         }
    //     });
    // }

    ByMessage() {
        this.viewMode = 'messages';
        this.SubviewMode = 'Summary';
        this.refresh_categories();
    }

    ByPerson() {
        this.viewMode = 'person';
        this.SubviewMode = 'Summary';
        this.refresh_categories();
    }

    getSummary() {
        this.SubviewMode = 'Summary';
        this.refresh_categories();
    }
    getDetails() {
        this.SubviewMode = 'Details';
        this.refresh_categories();
    }
    toggle_analysis() {

    }

    get_percentFromMessage(group) {
        let  dec = 0;
        let val = group.message_count;
        this.total = this.get_total_messages();
        dec = val / this.total;
        return (dec * 100).toFixed(1);
    }

    get_percentFromPeople(group) {
        let  dec = 0;
        let val = group.value;
        this.total = this.get_total_people();
        dec = val / this.total;
        return (dec * 100).toFixed(1);
    }

    get_total_messages() {
        let messages = this.categoriesData.map(x => x.message_count);
        return messages.length <= 0 ? 0 : messages.reduce((acc, cur) => acc + cur);
    }

    get_total_people() {
        let people = this.categoriesData.map(x => x.value);
        return people.length <= 0 ? 0 : people.reduce((acc, cur) => acc + cur);
    }


}
