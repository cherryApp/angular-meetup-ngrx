import { Component, Input, OnInit } from '@angular/core';
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
  @Input() rows: T[] | null = [];
  @Input() title: string = 'table';

  constructor() { }

  ngOnInit(): void {
  }

}
