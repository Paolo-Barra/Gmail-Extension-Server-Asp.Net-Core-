import { Component, OnInit, ViewChild,Output } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})

export class EditRecipeComponent implements OnInit {

  state: number;
  @ViewChild('stepper') stepper: MatStepper;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.state = 1;
    console.log(this.stepper);
  }

 goBack(stepper: MatStepper){
    stepper.previous();
 }

 goForward(stepper: MatStepper){
    stepper.next();
 }
  
 goStepNumber(stepper: MatStepper,index: number) {
    stepper.selectedIndex = index;
}

  navigateToDashboard(): void {
    
    this._router.navigate(['/app/main/recommend']);
  }
}

