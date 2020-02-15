import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html',
  styleUrls: ['./company-signup.component.scss']
})
export class CompanySignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = true;

  constructor(private formBuilder: FormBuilder) {

    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: [''],
      company: ['']
    });

  }

  onSubmit() {
    console.log(this.registerForm);

  }

  ngOnInit() {

  }

}
