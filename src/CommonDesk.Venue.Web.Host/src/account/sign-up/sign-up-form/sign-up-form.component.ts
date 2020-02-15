import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent {

  registerForm: FormGroup;
  submitted: boolean = false;
  accountTypes: string[] = [
    'Personal',
    'Business'
  ];
  numberOfAccounts: number[] = [
    1
  ];

  constructor(private formBuilder: FormBuilder) {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      accountType: ['', Validators.required],
      numberOfEmailAccounts: ['1', Validators.required]
    });
  }

  valid(): boolean {
    this.submitted = true;
    return this.registerForm.valid;
  }

  onSubmit() {
    console.log(this.registerForm);
  }
}
