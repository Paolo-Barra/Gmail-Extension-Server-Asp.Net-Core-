import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupsComponent, } from './groups/groupList/groups.component';
import { DevicesComponent, } from './devices/devices.component';
import { MailAccountComponent } from './mail-accounts/mail-accounts.component';
import { RecipesComponent } from './recipes/recipes-inuse/recipes-inuse.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { gmailDownloadComponent } from './downloads/Gmail/gmailDownload.component';
import { OutlookDownloadComponent } from './downloads/Outlook/outlookDownload.component';

import { GroupsDetailsComponent } from './groups/groupDetails/group-details.component';
import { LogoutComponent } from './logout/external_logout.component';
import { RecipeListComponent } from './recipes/recpiesTemplateList/recipes-template-list.component';
import { RecipeCreateOrEditComponent } from './recipes/recipesCreateOrEdit/recipes-CreateOrEdit.component';
import { WelcomeComponent } from "./welcome/welcome.component";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";

//import { NotificationsComponent } from '../shared/layout/notifications/notifications.component';
import { RefindDashboardComponentWeb, RefindDashboardComponentMobile } from '../refind/dashboard/refind.dashboard.component';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { GroupOverviewComponent } from './groups/group-overview/group-overview.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { HelpComponent } from './help/help.component';
import { StatusComponent } from './status/status.component';
//import { DashboardComponent } from '@app/main/dashboard/dashboard.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: 'welcome', component: WelcomeComponent, data: {} },
                    { path: 'edit-recipe', component: EditRecipeComponent, data: {} },

                    { path: 'userStatus', component: StatusComponent, data: { reload: false } }, //data: { permission: 'Pages.Refind.Dashboard' } },
                    { path: 'dashboard', component: RefindDashboardComponentWeb, data: { reload: false } }, //data: { permission: 'Pages.Refind.Dashboard' } },
                    // { path: 'admindashboard', component: DashboardComponent, data: {reload: false } }, //data: { permission: 'Pages.Refind.Dashboard' } },
                    { path: 'groupslist', component: GroupsComponent, data: { reload: false } },
                    { path: 'groupsedit', component: GroupEditComponent, data: { reload: false } },//permission: 'Pages.Refind.Groups'} },
                    { path: 'groups/overview', component: GroupOverviewComponent, data: { reload: false } },
                    { path: 'groupDetails', component: GroupsDetailsComponent, data: { reload: false } },//permission: 'Pages.Refind.GroupDetails'} },
                    { path: 'devices', component: DevicesComponent, data: { reload: false } },//permission: 'Pages.Refind.Devices'} },
                    { path: 'recommend', component: RecommendationComponent, data: { reload: false } },//permission: 'Pages.Refind.Devices'} },
                    { path: 'mail-accounts', component: MailAccountComponent, data: { reload: false } },//permission: 'Pages.Refind.MailAccounts'} },
                    { path: 'recipes', component: RecipesComponent, data: { reload: false } },//permission: 'Pages.Refind.Recipes'} },
                    { path: 'downloads', component: DownloadsComponent, data: { reload: false } },//permission: 'Pages.Refind.Downloads'} },
                    { path: 'external_logout', component: LogoutComponent, data: { reload: false } },//permission: 'Pages.Refind.ExternalLogout'} },
                    { path: 'recipes/list', component: RecipeListComponent, data: { reload: false } },//permission: 'Pages.Refind.RecipeTemplateList'} },
                    { path: 'recipesTemplateList', component: RecipeListComponent, data: { reload: false } },//permission: 'Pages.Refind.RecipeTemplateList'} },
                    { path: 'recipes/CreateOrEdit', component: RecipeCreateOrEditComponent, data: { reload: false } },//permission: 'Pages.Refind.RecipeCreateEdit'} },
                    { path: 'downloads/gmail', component: gmailDownloadComponent, data: { reload: false } },//permission: 'Pages.Refind.DownloadGmail'} },
                    { path: 'downloads/outlook', component: OutlookDownloadComponent, data: { reload: false } },//permission: 'Pages.Refind.DownloadOutlook'} },
                    { path: 'subscription', component: SubscriptionComponent, data: { reload: false } },
                    { path: 'help', component: HelpComponent, data: { reload: false } }

                    
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RefindRoutingModule { }
