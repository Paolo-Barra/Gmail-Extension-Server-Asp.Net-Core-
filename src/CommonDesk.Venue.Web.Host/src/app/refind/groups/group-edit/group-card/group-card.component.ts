import { Component, Input, HostListener, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { IGroupMailItem, IReassignCategoryResult, IGroupItem, ICardClickEvent } from '../../group.interfaces';
import { GroupEditLogic } from '../group-edit.logic.component';
import { Observable } from 'rxjs';



@Component({
  selector: 'refind-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent implements AfterViewInit, OnInit {

  isCardInOperation: boolean;
  isCardOperationSuccessful: boolean;
  isCardOperationFailed: boolean;

  @Input('mail') mail: IGroupMailItem;
  @Input('active') active: boolean = false;
  @Input('onSaveBehaviour') onSaveBehavior: Observable<IReassignCategoryResult>;
  @Input('column') column: IGroupItem;
  @Input('cardIndex') cardIndex: number;

  @Output() cardClickEvent: EventEmitter<ICardClickEvent> = new EventEmitter<ICardClickEvent>();
  @Output() cardHoverEvent: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(
    private logic: GroupEditLogic
  ) {
    this.isCardInOperation = false;
    this.isCardOperationSuccessful = false;
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.isCardInOperation = this.logic.isCardInOperation(this.mail.Id);
    }, 100);

    this.onSaveBehavior.subscribe((value) => {
      if (value.initialValue) {
        return;
      }
      this.isCardInOperation = false;

      if (value.data[this.mail.Id]) {
        if (value.data[this.mail.Id].success === true) {
          this.isCardOperationSuccessful = true;
          this.isCardOperationFailed = false;
        }
        else if (value.data[this.mail.Id].success === false) {
          this.isCardOperationSuccessful = false;
          this.isCardOperationFailed = true;
        }
      }
      else {
        this.isCardOperationSuccessful = false;
      }
    });
  }

  ngAfterViewInit(): void { }

  @HostListener('click', ['$event'])
  onCardClick($event: MouseEvent) {
    this.cardClickEvent.emit({
      data: {
        mail: this.mail,
        column: this.column,
        index: this.cardIndex
      },
      operation: $event.shiftKey || $event.ctrlKey ? 'add' : 'remove'
    });
  }


  @HostListener('mouseenter') onMouseEnter() {
    this.cardHoverEvent.emit(true);
  }



  @HostListener('mouseleave') onMouseExit() {
    this.cardHoverEvent.emit(false);
  }

}
