import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefindLightRecipesComponent } from "./refind-light-recipes/refind-light-recipes.component";
import { RefindLightDashboardComponent } from './refind-light.dashboard/refind-light.dashboard.component';
import { RefindLightMailAccountsComponent } from './refind-light.mailaccounts/refind-light.mailaccounts.component';
import { RefindLightGroupsComponentMobile, RefindLightGroupsComponentGmail } from './refind-light.groups/refind-light.groups.component';
import { RefindLightDevicesComponent } from './refind-light.devices/refind-light.devices.component';
import { RefindLightTemplateGmailComponent } from './refind-light-template-gmail/refind-light-template-gmail.component';
import { RefindLightRecipeCreateOrEditComponent } from './refind-light-recipes-create-or-edit/refind-light-recipes-createOrEdit.component';
import { RefindLightGroupsDetailsComponent } from './refind-light.groups/refind-light-group-details/refind-light-group-details.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: RefindLightDashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RefindLightRecipesComponent,
    pathMatch: 'full'
  },
  {
    path: 'recipesCreateOrEdit',
    component: RefindLightRecipeCreateOrEditComponent,
    pathMatch: 'full'
  },
  {
    path: 'mailaccounts',
    component: RefindLightMailAccountsComponent,
    pathMatch: 'full'
  },
  {
    path: 'groupDetails',
    component: RefindLightGroupsDetailsComponent,
    pathMatch: 'full'    
  },
  {
    path: 'groups-mobile',
    component: RefindLightGroupsComponentMobile,
    pathMatch: 'full'
  },
  {
    path: 'groups',
    component: RefindLightGroupsComponentGmail,
    pathMatch: 'full'
  },
  {
    path: 'devices',
    component: RefindLightDevicesComponent,
    pathMatch: 'full'
  },
  {
    path: 'templateList',
    component: RefindLightTemplateGmailComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    , { enableTracing: false }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
