import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGroupModalComponent } from './select-group-modal.component';

describe('SelectGroupModalComponent', () => {
  let component: SelectGroupModalComponent;
  let fixture: ComponentFixture<SelectGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
