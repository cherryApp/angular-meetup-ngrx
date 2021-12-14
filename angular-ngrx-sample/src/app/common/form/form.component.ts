import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ITableCol } from 'src/app/service/config.service';

export interface IFormEntity {
  [key: string]: any;
  id?: number;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent<T extends IFormEntity> implements OnInit {

  @Input() entity!: T;

  @Input() items: ITableCol[] = [];

  @Output() onSend: EventEmitter<T> = new EventEmitter<T>();

  group: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.buildForm();
  }

  checkInputTypes(type: string): boolean {
    return ['text', 'date', 'hidden', 'password'].includes(type);
  }

  buildForm(): void {
    const formSettings: {[key: string]: FormControl} = {};
    this.items.forEach( item => {
      formSettings[item.key] = new FormControl(
        this.entity[item.key],
        item.validators,
      );
    });
    this.group = new FormGroup(formSettings);
  }

  send(): void {
    this.onSend.emit(this.entity);
  }

}
