import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[appHeader]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string | null = '';

  constructor() { }

  ngOnInit(): void {
  }

}
