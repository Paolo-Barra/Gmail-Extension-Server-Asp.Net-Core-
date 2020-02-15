import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { IGroupSelect } from '../group.interfaces';
import { GroupEditLogic } from '../group-edit/group-edit.logic.component';

@Component({
  selector: 'select-group-modal',
  templateUrl: './select-group-modal.component.html',
  styleUrls: ['./select-group-modal.component.css']
})
export class SelectGroupModalComponent implements OnInit {

  @Input('groupId') groupId: string;
  @Input('groupArray') groupArray: IGroupSelect;
  @Input('selectedGroupArray') selectedGroupArray: any[];
  @Input('hideModal') hideModal: Function;

  selectGroupForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public groupEditLogic: GroupEditLogic
  ) { }

  private mapToCheckboxArrayGroup(data: any[]): FormArray {
    const formArray = this._formBuilder.array(data.map((i, index) => {
      return this._formBuilder.group({
        id: index,
        name: i,
        selected: i.selected
      });
    }));
    return formArray;
  }

  ngOnInit() {
    this.selectGroupForm = this._formBuilder.group({
      groups: this.mapToCheckboxArrayGroup(this.groupArray.groups)
    });

  }

  onSave(): void {


    const d = this.selectGroupForm.get('groups').value.map(group => {

      if (group.selected) {
        group.name.selected = true;
      }
      else {
        group.name.selected = false;
      }
      return group.name;
    });

    this.groupEditLogic.handleOnSelect(d);
    this.hideModal();
  }

  onChanges(): void {
    this.selectGroupForm.valueChanges.subscribe(({ groups }) => {

    });
  }

  get selectGroupFormArray(): FormArray {
    const array = this.selectGroupForm.get('groups') as FormArray;
    return array;
  }
}
