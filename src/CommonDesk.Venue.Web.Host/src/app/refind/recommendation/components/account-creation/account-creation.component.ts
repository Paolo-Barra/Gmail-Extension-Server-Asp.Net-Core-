import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-creation',
  styleUrls: ['./account-creation.component.css'],
  templateUrl: './account-creation.component.html',

})
export class AccountCreationComponent implements OnInit {

  header:string;
  bodyrows:string[];

  constructor() { }

  ngOnInit() {
    this.header = "header";
    this.bodyrows[0] = "row1";
    this.bodyrows[1] = "row2";
    this.bodyrows[2] = "row3";
    this.bodyrows[3] = "row4";
  }

}
