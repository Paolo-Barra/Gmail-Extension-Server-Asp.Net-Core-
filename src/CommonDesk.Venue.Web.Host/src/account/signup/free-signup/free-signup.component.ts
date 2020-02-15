import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-free-signup',
  templateUrl: './free-signup.component.html',
  styleUrls: ['./free-signup.component.scss']
})
export class FreeSignupComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateToLogin() {
    this.router.navigate(['/account/login'], {
      state: {
        isFreeAccount: true
      }
    })
  }
}
