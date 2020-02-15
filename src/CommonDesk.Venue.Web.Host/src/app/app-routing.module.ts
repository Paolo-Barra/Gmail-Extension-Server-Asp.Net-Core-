import { NgModule } from '@angular/core';
import { NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from './shared/common/auth/auth-route-guard';
import { NotificationsComponent } from './shared/layout/notifications/notifications.component';
import { RefindDashboardComponentMobile, RefindDashboardComponentWeb, RefindDashboardComponentGmail } from '@app/refind/dashboard/refind.dashboard.component';
import { PostCreateOauthLandingPageComponent } from '@refindRoot/post-create-oauth-landing-page/post-create-oauth-landing-page.component';
import { PostLoginOauthLandingPageComponent, PostLoginOauthLandingPageComponentMobile, PostLoginOauthLandingPageComponentGmail } from '@refindRoot//post-login-oauth-landing-page/post-login-oauth-landing-page.component';
import { LoginComponentMobile, LoginComponentGmail } from '@refindRoot/login-component-mobile/LoginComponentMobile';
import { GroupsDetailsComponent } from './refind/groups/groupDetails/group-details.component';
import { RecipeListComponent } from './refind/recipes/recpiesTemplateList/recipes-template-list.component';
import { RefindRouteGuard } from './shared/common/auth/refind-route-guard';
import { TestingComponent } from './refind/testing/testing.component';


@NgModule({
    imports: [
        
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                canActivate: [AppRouteGuard], 
                canActivateChild: [AppRouteGuard],
                children: [
                    {
                        path: '',
                        children: [
                            { path: 'notifications', component: NotificationsComponent },
                            { path: '', redirectTo: '/app/main/dashboard', pathMatch: 'full' }
                        ],
                        pathMatch: 'full'
                    },
                    {
                        path: 'main',
                        loadChildren: './refind/refind.module#RefindModule',
                        data: { preload: true }
                    },
                    {
                        path: 'admin',
                        loadChildren: './admin/admin.module#AdminModule', //Lazy load admin module
                        data: { preload: true }
                        //     data: { preload: true },
                        //     canLoad: [AppRouteGuard]
                        // }, 
                    }
                ]
            },
            {
                path: 'refind',                
                children: [
                    
                    // These routes do not require to validate with a Guard class, we need to allow access to these routes when a session is not created yet
                   
                    { path: 'testing', component: TestingComponent, data: {reload: false }},//permission: 'Pages.Refind.Dashboard' } },
                    //{ path: 'login-mobile', component: LoginComponentMobile, data: {reload: false }},//permission: 'Pages.Refind.Dashboard' } },
                    //{ path: 'login-gmail', component: LoginComponentGmail, data: { }},//permission: 'Pages.Refind.Dashboard' } },
                    { path: 'postCreateOauthLandingPage', component: PostCreateOauthLandingPageComponent, data: { }},//permission: 'Pages.Refind.Dashboard' } },
                    { path: 'postLoginOauthLandingPage', component: PostLoginOauthLandingPageComponent, data: { }},//permission: 'Pages.Refind.Dashboard' } },
                    //{ path: 'postLoginOauthLandingPageMobile', component: PostLoginOauthLandingPageComponentMobile, data: { }},//permission: 'Pages.Refind.Dashboard' } },
                    //{ path: 'postLoginOauthLandingPageGmail', component: PostLoginOauthLandingPageComponentGmail, data: { }},//permission: 'Pages.Refind.Dashboard' } },

                    // The following routes require to check if there is an active session, we use the RefindRouteGuard to validate the session or redirect to login if required

                    { path: 'dashboard-mobile', component: RefindDashboardComponentMobile, data: { }},//permission: 'Pages.Refind.Dashboard' } },
                    //{ path: 'dashboard-gmail', component: RefindDashboardComponentGmail, data: {  }},//permission: 'Pages.Refind.Dashboard' } },
                    //{ path: 'groups-gmail', component: GroupsComponentGmail, data: { } },//permission: 'Pages.Refind.Groups'} },
                    //{ path: 'groups-mobile', component: GroupsComponentMobile, data: { } },//permission: 'Pages.Refind.Groups'} },
                    //{ path: 'groupDetails-mobile', component: GroupsDetailsComponentMobile, data: {} },//permission: 'Pages.Refind.GroupDetails'} },
                    //{ path: 'groupDetails-gmail', component: GroupsDetailsComponentGmail, data: { } },//permission: 'Pages.Refind.GroupDetails'} },
                    //{ path: 'recipes/CreateOrEdit-gmail', component: RecipeCreateOrEditComponentGmail, data: { } },//permission: 'Pages.Refind.RecipeCreateEdit'} },
                    //{ path: 'recipes/templatelist-gmail', component: RecipeListComponentGmail, data: { } },//permission: 'Pages.Refind.RecipeTemplateList'} },
                    //{ path: 'recipes/recipelist-gmail', component: RecipesComponentGmail, data: { } },//permission: 'Pages.Refind.Recipes'} },              
                ],
            }
            
        ])
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
    constructor(
        private router: Router
    ) {
        router.events.subscribe((event) => {

            if (event instanceof RouteConfigLoadStart) {
                abp.ui.setBusy();
            }

            if (event instanceof RouteConfigLoadEnd) {
                abp.ui.clearBusy();
            }

            if (event instanceof NavigationEnd) {
                document.querySelector('meta[property=og\\:url').setAttribute('content', window.location.href);
            }
        });
    }
}
