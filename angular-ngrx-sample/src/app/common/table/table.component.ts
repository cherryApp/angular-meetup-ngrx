import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITableCol } from 'src/app/service/config.service';

export interface ITableData {
  [key: string]: any;
  id?: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T extends ITableData> implements OnInit {

  @Input() cols: ITableCol[] = [];
  @Input() rows: readonly T[] | null = [];
  @Input() title: string = 'table';

  @Output() startEdit: EventEmitter<T> = new EventEmitter<T>();
  @Output() startRemove: EventEmitter<T> = new EventEmitter<T>();

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(entity: T): void {
    this.startEdit.emit(entity);
  }

  onRemove(entity: T): void {
    this.startRemove.emit(entity);
  }

}
