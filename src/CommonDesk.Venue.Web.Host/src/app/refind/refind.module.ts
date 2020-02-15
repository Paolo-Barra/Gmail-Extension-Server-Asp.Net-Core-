import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { CountoModule } from 'angular2-counto';
import { ModalModule, TabsModule, TooltipModule, BsDropdownModule, PopoverModule } from 'ngx-bootstrap';
import { BsDatepickerModule, BsDatepickerConfig, BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
//import { AutoCompleteModule, EditorModule, FileUploadModule as PrimeNgFileUploadModule, InputMaskModule, PaginatorModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { DragDropModule } from 'primeng/dragdrop';
import { TreeDragDropService } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgxBootstrapDatePickerConfigService } from '@assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';
import { GroupsComponent } from './groups/groupList/groups.component';
import { DevicesComponent } from './devices/devices.component';
import { MailAccountComponent } from './mail-accounts/mail-accounts.component';
import { RecipesComponent } from './recipes/recipes-inuse/recipes-inuse.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { gmailDownloadComponent } from './downloads/Gmail/gmailDownload.component';
import { OutlookDownloadComponent } from './downloads/Outlook/outlookDownload.component';
import { GroupsDetailsComponent } from './groups/groupDetails/group-details.component';
import { LogoutComponent } from './logout/external_logout.component';
import { RecipeListComponent } from './recipes/recpiesTemplateList/recipes-template-list.component';
import { RecipeCreateOrEditComponent } from './recipes/recipesCreateOrEdit/recipes-CreateOrEdit.component';
import { RefindDashboardComponentWeb, RefindDashboardComponentMobile } from '../refind/dashboard/refind.dashboard.component';
//import { PlotlyModule } from 'angular-plotly.js';
import { RefindRoutingModule } from './refind-routing.module';
import { SharedModule } from '../../shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardPieChartComponent } from './dashboard/refind.DashboardPieChart.Component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DisplayRecipeWizardFieldsComponent } from './edit-recipe/recipe-wizard-fields/recipe-wizard-fields.component';
import { TestingComponent } from './testing/testing.component';
import { RecipeWizardHeadersComponent } from './edit-recipe/recipe-wizard-headers/recipe-wizard-headers.component';
import { RecipeWizardPageLeadinComponent } from './edit-recipe/recipe-wizard-page-leadin/recipe-wizard-page-leadin.component';
import { RecipeWizardPageFooterComponent } from './edit-recipe/recipe-wizard-page-footer/recipe-wizard-page-footer.component';
import { DisplayWizardSummaryComponent } from './edit-recipe/display-wizard-summary/display-wizard-summary.component';
import { MailAccountLogicComponent } from './mail-accounts/mail.accounts.logic.component';
import { GroupsLogicComponent } from './groups/groupList/groups.logic.component';
import { DevicesLogicComponent } from './devices/devices.logic.component';
import { RecipesTemplateLogic } from './recipes/recpiesTemplateList/recipes-template-list.logic';
import { CookbookWizardFieldsComponent } from './edit-recipe/cookbook-wizard-fields/cookbook-wizard-fields.component';
import { RecipeTablePipe } from './edit-recipe/display-wizard-summary/recipe-table.pipe';
import { WizardSummaryTableComponent } from './edit-recipe/wizard-summary-table/wizard-summary-table.component';
import { GroupsDetailsLogicComponent } from './groups/groupDetails/group-details.logic.component';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { NgxSmoothDnDModule } from "ngx-smooth-dnd";
import { GroupCardComponent } from './groups/group-edit/group-card/group-card.component';
import { GroupEditLogic } from './groups/group-edit/group-edit.logic.component';
import { ScrollEventModule } from "ngx-scroll-event";
import { SelectGroupModalComponent } from './groups/select-group-modal/select-group-modal.component';
import { MatCheckboxModule, MatSliderModule, MatButtonModule, MatButtonToggleModule, MatIconModule } from '@angular/material';
import { CreateGroupModalComponent } from './groups/create-group-modal/create-group-modal.component';
import { SelectModalComponent } from './groups/select-modal/select-modal.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WelcomeStatusListener } from './welcome/welcomeStatusListener';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { RecommendationLogicComponent } from './recommendation/recommendation.logic.component';
import { GroupOverviewComponent } from './groups/group-overview/group-overview.component';
import { AccountCreationComponent } from './recommendation/components/account-creation/account-creation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SubscriptionComponent } from './subscription/subscription.component';
import { HelpComponent } from './help/help.component';
import { StatusComponent } from './status/status.component';
import { StatusLogicComponent } from './status/StatusLogicComponent.';
import { RefindHelpComponent } from './refind-help/refind-help.component';

// just for chart library
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { TreeviewModule, TreeviewComponent } from 'ngx-treeview';
 

NgxBootstrapDatePickerConfigService.registerNgxBootstrapDatePickerLocales();

@NgModule({
    entryComponents: [
        SelectGroupModalComponent,
        CreateGroupModalComponent,
        SelectModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        AppCommonModule,
        UtilsModule,
        CountoModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        TableModule,
        TreeModule,
        DragDropModule,
        ContextMenuModule,
        PaginatorModule,
        SharedModule,
        MatProgressBarModule,
        MatSliderModule,
        MatExpansionModule,
        MatButtonModule,
        MatButtonToggleModule,

        // COMMONDESK
        RefindRoutingModule,
        NgxSmoothDnDModule,
        ScrollEventModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        PopoverModule,
        MatIconModule,

        NgxChartsModule,        // for charts 
        NgbModule,              // for angular.bootstrap 

                // 
                TagInputModule,
                TreeviewModule.forRoot()

    ],
    exports:
        [
            DisplayRecipeWizardFieldsComponent,
            CookbookWizardFieldsComponent,
            RecipeWizardHeadersComponent,
            RecipeWizardPageLeadinComponent,
            RecipeWizardPageFooterComponent,
            DisplayWizardSummaryComponent,
            TreeviewComponent,
        ],
    // entryComponents: [
    //     DashboardComponent,
    //     DashboardComponentMobile,
    //     DashboardComponentWeb,
    // ],

    declarations: [
        GroupsComponent,
        MailAccountComponent,
        DevicesComponent,
        RecipesComponent,
        DownloadsComponent,
        GroupsDetailsComponent,
        LogoutComponent,
        RefindHelpComponent,

        DisplayRecipeWizardFieldsComponent,
        CookbookWizardFieldsComponent,
        RecipeWizardHeadersComponent,
        RecipeWizardPageLeadinComponent,
        RecipeWizardPageFooterComponent,
        DisplayWizardSummaryComponent,

        RecipeListComponent,
        RecipeCreateOrEditComponent,
        RefindDashboardComponentMobile,
        RefindDashboardComponentWeb,
        gmailDownloadComponent,
        OutlookDownloadComponent,
        WelcomeComponent,
        EditRecipeComponent,
        TestingComponent,
        RecipeTablePipe,
        WizardSummaryTableComponent,
        GroupEditComponent,
        GroupCardComponent,
        SelectGroupModalComponent,
        CreateGroupModalComponent,
        SelectModalComponent,
        RecommendationComponent,
        GroupOverviewComponent,
        AccountCreationComponent,
        SubscriptionComponent,
        HelpComponent,
        StatusComponent,



        //DashboardComponent
        //NotificationsComponent

    ],
    providers: [
        TreeDragDropService,
        DashboardPieChartComponent,
        MailAccountLogicComponent,
        GroupsLogicComponent,
        GroupEditLogic,
        DevicesLogicComponent,
        RecommendationLogicComponent,
        RecipesTemplateLogic,
        GroupsDetailsLogicComponent,
        WelcomeStatusListener,
        StatusLogicComponent,
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale }
    ]
})
export class RefindModule { }
