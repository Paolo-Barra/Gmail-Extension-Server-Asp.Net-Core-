import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreationProgressComponent } from './account-creation-progress.component';

describe('AccountCreationProgressComponent', () => {
  let component: AccountCreationProgressComponent;
  let fixture: ComponentFixture<AccountCreationProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCreationProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreationProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
