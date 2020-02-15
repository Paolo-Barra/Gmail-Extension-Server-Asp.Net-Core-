import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }
  login(): void {
    this.router.navigateByUrl('account/login');
  }

  signUp(): void {
    this.router.navigateByUrl('account/signup');
  }

}
