import { NgModule } from '@angular/core';
import { GroupByPipe } from './groupBy.pipe';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import * as plotly from "plotly.js/dist/plotly-basic.min.js";
// import { PlotlyModule } from 'angular-plotly.js';
import { MatStepperModule, MatRadioModule, MatSelectModule, MatInputModule, MatCheckboxModule, MatTableModule, MatTable } from "@angular/material/";
import { StepperComponent } from '@shared/stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '@shared/loader/loader.component';
import { TooltipModule, ModalModule } from 'ngx-bootstrap';
import { SearchBarComponent } from '@shared/search-bar/search-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//PlotlyModule.plotlyjs = plotly;

@NgModule({
    imports: [
        //PlotlyModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        MatTableModule,
        ModalModule,
        TooltipModule,
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [
        GroupByPipe,
        StepperComponent,
        LoaderComponent,
        SearchBarComponent
    ],
    exports: [
        GroupByPipe,
        //PlotlyModule,
        MatStepperModule,
        MatRadioModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        StepperComponent,
        LoaderComponent,
        ModalModule,
        TooltipModule,
        FormsModule,
        ReactiveFormsModule,
        SearchBarComponent,
        FontAwesomeModule
    ]
})

export class SharedModule { }