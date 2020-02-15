import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { IGroupSelect } from '../group.interfaces';
import { GroupEditLogic } from '../group-edit/group-edit.logic.component';
import { BsModalRef } from 'ngx-bootstrap';
import { RefindToolsService } from '@app/refind/refind-tools.service';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.css']
})
export class CreateGroupModalComponent implements OnInit {

  /**
   * Send the create new group record from this component or from the logic service? 
   * If the light app is a concern then we will need to add the create group rest call to the group service
   * 
   */

  @Input('modalRef') modalRef: BsModalRef;
  @Input('hideModal') hideModal: Function;

  createGroupForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private groupEditLogic: GroupEditLogic,
    private tools: RefindToolsService
  ) {
    this.createGroupForm = this._formBuilder.group({
      groupName: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  isValid(): boolean {
    this.submitted = true;
    return this.createGroupForm.valid;
  }

  async onSubmit() {
    const isFormValid = this.isValid();
    this.submitted = true;

    if (!isFormValid) {
      return;
    }
    const newGroupName = this.createGroupForm.controls.groupName.value;

    if (this.groupEditLogic.groupsData.groups.findIndex(item => item.Category === newGroupName) !== -1) {
      await this.tools.warn(`Group '${newGroupName}' already exists`, "Invalid Group");
      return;
    }
    try {
      await this.groupEditLogic.createGroup(newGroupName);
    }
    catch (error) {
      this.tools.error("An error occurred when creating a group");
    }

    this.hideModal();
  }
 


}
