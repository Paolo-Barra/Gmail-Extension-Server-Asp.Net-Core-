import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import * as plotly from "plotly.js/dist/plotly-basic.min.js";
// import {PlotlyModule} from "angular-plotly.js";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RefindLightRecipesComponent } from './refind-light-recipes/refind-light-recipes.component';
import { RefindServiceProxy } from '../../../../src/app/refind/shared/service-proxies/refind-service-proxy';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardPieChartComponent } from '../../../../src/app/refind/dashboard/refind.DashboardPieChart.Component';
import { RefindLightDashboardComponent } from './refind-light.dashboard/refind-light.dashboard.component';
import { RefindLightMailAccountsComponent } from './refind-light.mailaccounts/refind-light.mailaccounts.component';
import { MailAccountLogicComponent } from '../../../../src/app/refind/mail-accounts/mail.accounts.logic.component';
import { RefindLightGroupsComponentMobile, RefindLightGroupsComponentGmail } from './refind-light.groups/refind-light.groups.component';
import { GroupsLogicComponent } from '../../../../src/app/refind/groups/groupList/groups.logic.component';
import { DevicesLogicComponent } from '../../../../src/app/refind/devices/devices.logic.component';
import { RefindLightDevicesComponent } from './refind-light.devices/refind-light.devices.component';
import { RefindLightTemplateGmailComponent } from './refind-light-template-gmail/refind-light-template-gmail.component';
import {RecipesTemplateLogic} from "../../../../src/app/refind/recipes/recpiesTemplateList/recipes-template-list.logic";
import {GroupByPipe} from "../../../../src/groupBy.pipe";
import {NotificationService} from "../../../../src/shared/notification.service";
import {RefindServiceProxyTyped} from "../../../../src/app/refind/shared/service-proxies/refind-service-proxy-typed";
import { RefindToolsService } from '../../../../src/app/refind/refind-tools.service';
import { ToastrModule } from 'ngx-toastr';
import { RecipesPageComponentLogic } from '../../../../src/app/refind/recipes/recipes-inuse/recipes-inuse-logic.component';
import { trigger } from '@angular/animations';
import { RefindLightRecipeCreateOrEditComponent } from './refind-light-recipes-create-or-edit/refind-light-recipes-createOrEdit.component';
import { DisplayRecipeWizardFieldsComponent } from '../../../../src/app/refind/edit-recipe/recipe-wizard-fields/recipe-wizard-fields.component';
import { RecipeWizardHeadersComponent } from '../../../../src/app/refind/edit-recipe/recipe-wizard-headers/recipe-wizard-headers.component';
import { RecipeWizardPageLeadinComponent } from '../../../../src/app/refind/edit-recipe/recipe-wizard-page-leadin/recipe-wizard-page-leadin.component';
import { RecipeWizardPageFooterComponent } from '../../../../src/app/refind/edit-recipe/recipe-wizard-page-footer/recipe-wizard-page-footer.component';
import { DisplayWizardSummaryComponent } from '../../../../src/app/refind/edit-recipe/display-wizard-summary/display-wizard-summary.component';
import { CookbookWizardFieldsComponent } from '../../../../src/app/refind/edit-recipe/cookbook-wizard-fields/cookbook-wizard-fields.component';
import { StepperComponent } from '../../../../src/shared/stepper/stepper.component';
import { RecipeCreateOrEditComponentLogic } from '../../../../src/app/refind/recipes/recipesCreateOrEdit/recipes-CreateOrEditLogic.component';
import { LocalStorageService } from '../../../../src/shared/utils/local-storage.service';
import { GroupsDetailsLogicComponent } from '../../../../src/app/refind/groups/groupDetails/group-details.logic.component';
import { RefindUserDataService } from '../../../../src/refindRoot/refind-user-data.service';
import { RefindLightGroupsDetailsComponent } from './refind-light.groups/refind-light-group-details/refind-light-group-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeviewModule } from 'ngx-treeview';

//PlotlyModule.plotlyjs = plotly;

@NgModule({
  declarations: [
    AppComponent,
    RefindLightRecipesComponent,
    RefindLightDashboardComponent,
    RefindLightMailAccountsComponent,
    RefindLightGroupsComponentGmail,
    RefindLightGroupsComponentMobile,
    RefindLightDevicesComponent,
    RefindLightTemplateGmailComponent,
    RefindLightRecipeCreateOrEditComponent,
    GroupByPipe,

    DisplayRecipeWizardFieldsComponent,
    CookbookWizardFieldsComponent,
    RecipeWizardHeadersComponent,
    RecipeWizardPageLeadinComponent,
    RecipeWizardPageFooterComponent,
    DisplayWizardSummaryComponent,
    RefindLightGroupsDetailsComponent,
    CookbookWizardFieldsComponent,
    StepperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //PlotlyModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    TreeviewModule.forRoot()
  ],
  providers: [
    
    RecipesPageComponentLogic,
    DashboardPieChartComponent,
    MailAccountLogicComponent,
    GroupsLogicComponent,
    DevicesLogicComponent,
    RecipesTemplateLogic,
    RecipeCreateOrEditComponentLogic,
    GroupsDetailsLogicComponent,
    NotificationService,
    RefindToolsService,
    RefindServiceProxyTyped,  
    LocalStorageService,
    RefindUserDataService,
    RefindServiceProxy,
    //WelcomeStatusListener,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function noAnimation() {
  return trigger('routerTransition', [
  ]);
}
