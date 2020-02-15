import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from '@shared/utils/cookie.service';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RefindUserDataService } from '@refindRoot/refind-user-data.service';

const SIGN_UP_CODE: string = 'refind5172';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../login/social-login.scss']
})
export class SignupComponent implements OnInit {


  @ViewChild("accessCodeValidation", { read: ElementRef }) accessCodeValidation: ElementRef;

  registerForm: FormGroup;
  submitted: boolean = false;
  agreeCheckbox: boolean = false;

  isAccessCodeCookieValidated: boolean = false;

  accountTypeArray: string[] = [
    'Free Account (Beta)',
    'Individual Account',
    'Company Account'
  ];

  isAccessCodeValid: boolean = false;

  // Taken from https://www.regextester.com/19 email regex validator
  emailRegexValidator: string = "^[ ]*[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)[ ]*$";

  constructor(
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private router: Router,
    protected dataService: RefindUserDataService,
  ) {
    this.registerForm = this.formBuilder.group({
      accessCode: [''],
      name: new FormControl({ value: '', disabled: true }, Validators.required),
      email: new FormControl({ value: '', disabled: true }, Validators.compose([Validators.required, Validators.pattern(this.emailRegexValidator)])),
      accountType: new FormControl("Free Account (Beta)")
    });
  }

  ngOnInit() {
    let signUpCodeValid = this.cookieService.get('signup-valid');
    this.isAccessCodeValid = signUpCodeValid === "1";

    if (this.isAccessCodeValid) {
      this.registerForm.get('name').enable();
      this.registerForm.get('email').enable();

      this.isAccessCodeCookieValidated = true;
    }
  }

  handleOnBetaSignUpCode() {
    const { value } = this.registerForm.get('accessCode');

    if (value === SIGN_UP_CODE) {
      this.isAccessCodeValid = true;
      this.cookieService.set('signup-valid', '1', 30);
      this.accessCodeValidation.nativeElement.innerHTML = "Access code is valid";
      this.accessCodeValidation.nativeElement.style.color = 'green';
      this.registerForm.get('name').enable();
      this.registerForm.get('email').enable();
    }
    else {
      this.isAccessCodeValid = false;
      this.accessCodeValidation.nativeElement.innerHTML = "Invalid access code";
      this.accessCodeValidation.nativeElement.style.color = 'red';
      this.registerForm.get('name').disable();
      this.registerForm.get('email').disable();
    }
  }

  handleCheckbox($event: { checked: boolean }) {
    this.agreeCheckbox = $event.checked;    
  }


  handleSubmit($event) {

    this.submitted = true;
    const accountType = this.registerForm.get('accountType').value;

    if (this.registerForm.valid) {

      // Store the email so we can validate if we have been granted consent before and then present login or consent oauth page
      let email = this.registerForm.get('email').value.trim();
      console.log("Email for oauth consent validation="+email);
      this.dataService.setConsentEmail(email);

      if (accountType === "Free Account (Beta)") {
        this.router.navigate(['/account/login'], {
          state: {
            isFreeAccount: true
          }
        })
      }
      else {
        this.router.navigate(['/account/signup/company'])
      }
    }
    else {
      alert("Form is invalid");
    }
    //todo logic to handle form submit
  }
}
