import { Component, OnInit } from '@angular/core';
import { ConfigService, INavItem } from 'src/app/service/config.service';

@Component({
  selector: '[appNavigation]',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navItems: INavItem[] = this.config.navItems;

  constructor(
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

}
