import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeSignupComponent } from './free-signup.component';

describe('FreeSignupComponent', () => {
  let component: FreeSignupComponent;
  let fixture: ComponentFixture<FreeSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
