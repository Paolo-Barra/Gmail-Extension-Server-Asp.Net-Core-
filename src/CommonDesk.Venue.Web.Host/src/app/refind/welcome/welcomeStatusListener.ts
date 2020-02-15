import { Router, ActivatedRoute } from '@angular/router';
import { ServerEventsClient, ServerEventConnect, ServerEventJoin, ServerEventLeave, ServerEventUpdate, ServerEventMessage } from '@servicestack/client';
import { Injector, Injectable } from '@angular/core';
import * as _ from 'lodash';
import { RefindServiceProxyTyped } from '@rshared/service-proxies/refind-service-proxy-typed';
import { AppConsts } from '@shared/AppConsts';
import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';
import { RefindToolsService } from '../refind-tools.service';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';
import { RecommendationLogicComponent } from '../recommendation/recommendation.logic.component';

@Injectable()
export class WelcomeStatusListener 
{
    percentCompletex: number;
    percentComplete: number;
    statusMessages:string;
    VenueServerSideEventsRoot: string;
    interval: any;
    gclient: any;
    channels: any;
    AnalysisList:Rt.AccountAnalysisItem[];
    RecomendationList:Rt.AccountRecommendItem[];
    AccountAlreadyExists: Boolean = false;
    parent: RecommendationLogicComponent;

    constructor(
        injector: Injector,
        public router: Router,
        public refindServiceProxyTyped: RefindServiceProxyTyped,
        public tools: RefindToolsService,
        public dataService: RefindUserDataService,
    ) 
    {
    }

    logAnalysis(row:Rt.AccountAnalysisItem)
    {
        console.log(`AccountAnalysisItem:Title=${row.Title}:Finding=${row.Finding}:Action=${row.Action}:Importance=${row.Importance}:HelpUrl=${row.HelpUrl}`);
    }
    logRecomendation(row:Rt.AccountRecommendItem)
    {
        console.log(`AccountRecommendItem:Title=${row.Title}:Recommendations=${row.Recommendations}:RecipeTitle=${row.RecipeTitle}:HelpUrl=${row.HelpUrl}`);
    }

    ngOnDestroy(): void {

        console.log("WSL:ngOnDestroy:");
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    async testAccountExist() 
    {
        this.AccountAlreadyExists = false;
        let response = await this.refindServiceProxyTyped.UserAccountExists();
                
        if(response.AccountExists === true)
        {
            // Now check if the mail account has already been imported
            // If we have only added the portal account we need to allow importing the mail sync account on the sync service        
            if(response.CreationState == Rt.AccountCreationState.MailImported) 
            {
                this.AccountAlreadyExists = true;
            }            
        }  
    }


    ngOnInit(): void 
    {
        console.log("WSL:ngOnInit:")
        try 
        {
            this.refindServiceProxyTyped.Init();
            this.tools.assert(this.dataService.getUserAccountId(),    "WSL:newInit:userAccountId == null");
 
            this.percentComplete = 0;
            
            // this.getAccountAnalysis();
            // this.testAccountExist();
 
        }
        catch (e) {
            this.tools.warn("WL:newInit:Error"+e);
        }
    }
    setParent( p: RecommendationLogicComponent)
    {
        this.parent  = p;
    }
    private async getAccountAnalysis() {
        try {
            const response = await this.refindServiceProxyTyped.GetRecomendation("123",Rt.AccountCreationReportType.AccountAnalysis);
            if (response.Success) {
                this.AnalysisList = response.aList;
                this.AnalysisList.map(this.logAnalysis);

                this.RecomendationList = response.rList
                this.RecomendationList.map(this.logRecomendation);

            }
            else
            {
                this.tools.warn("RCOEL:getAccountAnalysis:failed");
            }
            // const response1 = await this.refindServiceProxyTyped.GetRecomendation("123",RefindTypes.AccountCreationReportType.AccountRecomend);
            // if (response1.Success) {
            //     this.RecomendationList = response1.Recommend.Rlist;
            // }
        }
        catch (error) {
            this.tools.error("RCOEL:getAccountAnalysis" + error.Message);
        }

    }


    public startListiner(): void {
        // This was used to update the account cration chart
        // Problem was we were always POST errors with the heartbeat.  Somehow the heartbeat 
        // would get the internal port for the service and append this to the external address
        // Also the SSE framework has little support. We will use SignalR in the future 
        // https://docs.servicestack.net/typescript-server-events-client

        console.log("WSL:init:Starting");

        this.VenueServerSideEventsRoot = AppConsts.refindBackendUrl + "/sse";        
        console.log("WSL:init:VenueServerSideEventsRoot=" + this.VenueServerSideEventsRoot);

        try {
            this.channels = [this.dataService.getUserAccountId()];
            this.gclient = new ServerEventsClient(this.VenueServerSideEventsRoot, this.channels,
                {
                    handlers:
                    {
                        onConnect: (sub: ServerEventConnect) => {
                            // Successful SSE connection
                            this.updateProgressMessage("Connecting...");
                            console.log("WSL:onConnect:User='ve connected! welcome " + sub.displayName);
                        },
                        onJoin: (msg: ServerEventJoin) => {
                            this.updateProgressMessage("Joining...");
                            // User has joined subscribed channel
                            console.log("WSL:onJoin:User=" + msg.displayName + ":Has Joined");
                        },
                        onLeave: (msg: ServerEventLeave) => {
                            // User has left subscribed channel
                            console.log("WSL:onLeave:User=" + msg.displayName + "Has exited");
                        },
                        onUpdate: (msg: ServerEventUpdate) => {
                            // User's subscribed channels have changed
                            console.log("WSL:onUpdate:User=" + msg.displayName + " channels subscription were updated");
                        },
                        onMessage: (msg: ServerEventMessage) => {
                            // this.updateGeneralMessage(msg);
                            //console.log(msg);
                        },
                        StatsUpdatedServerEvent: (msg: Rt.StatsUpdatedServerEvent) => {
                            // Display progress messages 
                            if(msg.Command == Rt.ServerStatusCommand.AccountCreationPhease1Complete || 
                                msg.Command == Rt.ServerStatusCommand.AccountCreationPhease2Complete)
                            {
                                // allow the close button to be clicked
                                this.parent.progressStateDisabledFlag = false;
                            }
                            
                            this.updateProgressMessage(msg.Message);
                            console.log("WSL:StatsUpdatedServerEvent:Message="+msg.Message);
                        },
                        ServerEventWithMessage: (msg: Rt.ServerEventWithMessage) => {
                            console.log("WSL:ServerEventWithMessage=" + msg.Message);
                        },
                        AccountCreationProgressGuageEvent: (msg: Rt.AccountCreationProgressGuageEvent) => {
                        
                            if(msg.PercentComplete == 100)
                            {
                                this.tools.info("Your account has been created");
                            }
                            this.updateProgressPercentage(msg.PercentComplete);
                            console.log("WSL:AccountCreationProgressGuageEvent:Percent="+msg.PercentComplete);

                            //this.updateProgressMessage(msg.Message);
                            //console.log(msg);
                        }
                    },
                    onException: (e: Error) => {
                        this.updateProgressMessage(`An Error Occured=${e.message}`);
                        console.log("WSL:onException:=" + e.name + ': ' + e.message);
                        console.log(e);
                        this.cancelConnection();
                    },
                    onReconnect: (e: Error) => {
                        this.updateProgressMessage("Reconnecting...");
                        console.log("WSL:onReconnect:" + e)
                    }
                }).start();
        } catch (e) {
            console.log("WSL:init::Init SignalR failed:Error=" + e);
        }
        console.log("WSL:init:Stopping");
    }
    updateAccoutFromServer(mid:number)
    {
        this.tools.warn("updateAccoutFromServer="+mid);
    }

    updateProgressPercentage(val:number)
    {
        //this.tools.warn("updateProgressPercentage="+val);
        this.percentComplete = val;
    }
    updateProgressMessage(msg:string)
    {
        this.statusMessages = msg;
//        this.tools.warn("updateProgressMessage="+msg);
    }
    updateGeneralMessage(m:ServerEventMessage)
    {
        if(m.type == "ServerEventMessage")
        {
  
        }
        else
        {
            var jp = JSON.parse(m.json);
            this.tools.error(`updateGeneralMessage:unknown:type=${m.type}:Json=`+jp);
        }
    }

    cancelConnection(): void 
    {
        try {
            console.log("WSL:cancelConnection:");
            this.gclient.unsubscribeFromChannels(this.channels);
            this.gclient.stop();
        } catch (e) {
            console.log("WSL:cancelConnection:Error=" + e.name + ': ' + e.message);
        }
    }
}

