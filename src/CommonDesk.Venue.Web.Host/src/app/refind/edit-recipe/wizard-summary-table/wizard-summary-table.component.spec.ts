import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardSummaryTableComponent } from './wizard-summary-table.component';

describe('WizardSummaryTableComponent', () => {
  let component: WizardSummaryTableComponent;
  let fixture: ComponentFixture<WizardSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardSummaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
