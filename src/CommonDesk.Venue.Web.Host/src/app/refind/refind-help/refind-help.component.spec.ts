import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefindHelpComponent } from './refind-help.component';

describe('RefindHelpComponent', () => {
  let component: RefindHelpComponent;
  let fixture: ComponentFixture<RefindHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefindHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefindHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
