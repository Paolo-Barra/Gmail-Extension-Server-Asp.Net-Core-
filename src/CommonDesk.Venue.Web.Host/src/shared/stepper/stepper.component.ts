import { Component, OnInit, Input } from '@angular/core';


export interface IStepperItem {

  active: boolean;
  completed: boolean;
  title?: string;
  description?: string;

}

@Component({
  selector: 'stepper-progress',
  templateUrl: './stepper.component.html',
  styleUrls: ['./styles/progress-tracker.scss']
})
export class StepperComponent {

  @Input() steps: IStepperItem[];
  @Input() activeIndex: number;
  @Input() currentPage: string;

  constructor() { }
}
