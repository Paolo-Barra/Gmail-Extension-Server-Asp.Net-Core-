import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailProblemCheckboxComponent } from './email-problem-checkbox.component';

describe('EmailProblemCheckboxComponent', () => {
  let component: EmailProblemCheckboxComponent;
  let fixture: ComponentFixture<EmailProblemCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailProblemCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailProblemCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
