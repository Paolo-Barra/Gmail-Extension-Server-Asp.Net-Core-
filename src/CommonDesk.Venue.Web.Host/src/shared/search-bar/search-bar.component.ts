import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'refind-group-search',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  active: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  test() {
    console.log("asfasdf");

    this.active = !this.active;
  }
}
