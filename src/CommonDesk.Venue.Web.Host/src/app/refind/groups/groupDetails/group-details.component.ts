
import { Component, OnInit, ViewEncapsulation, Injector, ViewChild, Pipe, PipeTransform, AfterViewInit, AfterContentInit, OnDestroy, OnChanges, AfterViewChecked } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { GroupsDetailsLogicComponent } from './group-details.logic.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


@Component({
    templateUrl: './group-details.component.html',
    styleUrls: [ './group-details.component.css'],
    animations: [appModuleAnimation()]
})
export class GroupsDetailsComponent implements OnInit,OnDestroy {
    // , AfterViewInit,AfterContentInit,OnChanges,AfterViewChecked {

    public logic : GroupsDetailsLogicComponent

    constructor(injector: Injector)
    {
        this.logic = injector.get(GroupsDetailsLogicComponent);
    }

    autocompleteItemsAsObjects = [
        {value: 'amazon.com', id: 1, extra: 0,style: 'color: red' },
        {value: 'andoria.com', id: 2, extra: 1 ,style: 'color: green' },
        {value: 'balsam.com', id: 3, extra: 0,style: 'color: blue' },
        {value: 'catco.com', id: 4, extra: 0,style: 'color: red' },
        {value: 'davidson.', id: 5, extra: 0,style: 'color: red' },
        {value: 'emery.com', id: 6, extra: 0,style: 'color: red' },
        {value: 'fantastic.com', id: 6, extra: 0,style: 'color: red' },
    ];


    ngOnInit() {


        this.logic.ngOnInit();
        this.logic.groupDetailsUrl = 'app/main/groupDetails';
        this.logic.groupsListUrl = 'app/main/groupslist';
    }
    ngOnDestroy()
    {
        this.logic.ngOnDestroy();
    }
    consolelog(msg:string) {
        console.log(msg);
    }
    
    // ngOnChanges()
    // {
    //     this.logic.ngOnChanges();
    // }
    // ngAfterViewInit()
    // {
    //     this.logic.ngAfterViewInit();
    // }

    // ngAfterViewChecked()
    // {
    //     this.logic.ngAfterViewChecked();
    // }

    // ngAfterContentInit()
    // {
    //     this.logic.ngAfterContentInit();
    // }
    // ngDoCheck()
    // {
    //     this.logic.ngDoCheck();
    // }




}