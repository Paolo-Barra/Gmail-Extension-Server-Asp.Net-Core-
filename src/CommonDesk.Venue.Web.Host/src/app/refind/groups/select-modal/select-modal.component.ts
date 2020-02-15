import { Component, OnInit, Input } from '@angular/core';
import { IGroupSelect, IGroupItem } from '../group.interfaces';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { GroupEditLogic } from '../group-edit/group-edit.logic.component';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss']
})
export class SelectModalComponent implements OnInit {

  @Input('groupId') groupId: string;
  @Input('groupArray') groupArray: IGroupSelect;
  @Input('selectedGroupArray') selectedGroupArray: any[];
  @Input('hideModal') hideModal: Function;
  @Input('index') index: number;
  @Input('group') group: string;
  @Input('groupData') groupData: IGroupItem;

  selectForm: FormGroup;

  constructor(
    private groupEditLogic: GroupEditLogic
  ) { }



  ngOnInit() {

  }


  onSave(): void {
    this.groupEditLogic.handleOnGroupSelect(this.group, this.index);
    this.hideModal();
  }

  onChange(e) {

    this.group = e.target.value
  }

  get groupsArray() {

    let groups = this.groupArray.groups.filter(item => {
      return this.selectedGroupArray.find(selectedItem => selectedItem.Category === item.Category) === undefined;
    })

    return groups;

  }

}
