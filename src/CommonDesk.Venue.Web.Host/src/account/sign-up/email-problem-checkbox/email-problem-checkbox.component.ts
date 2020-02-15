import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";

@Component({
  selector: 'app-email-problem-checkbox',
  templateUrl: './email-problem-checkbox.component.html',
  styleUrls: ['./email-problem-checkbox.component.css']
})
export class EmailProblemCheckboxComponent {

  emailProblemsArray: string[] = [
    'Recieved advertisements from websites I have visited',
    'I subscribe to many mailing lists',
    'I recieved many emails during the day that are not associated with business',
    'I recieved many emails at night that are not personal in nature'
  ];

  emailProblemForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.emailProblemForm = this.formBuilder.group({
      emailProblems: this.mapToCheckboxArrayGroup(this.emailProblemsArray)
    });
  }


  private mapToCheckboxArrayGroup(data: string[]): FormArray {

    const array = this.formBuilder.array(data.map((i, index) => {
      return this.formBuilder.group({
        id: index,
        name: i,
        selected: false
      });
    }));
    return array;
  }



  get emailProblemsFormArray(): FormArray {
    const array = this.emailProblemForm.get('emailProblems') as FormArray;
    return array;
  }


}
