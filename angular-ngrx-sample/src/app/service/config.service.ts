import { Injectable } from '@angular/core';

export interface INavItem {
  href: string;
  text: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  navItems: INavItem[] = [
    {
      href: '/',
      text: 'DashBoard',
      icon: 'dashboard',
    },
    {
      href: '/users',
      text: 'Users',
      icon: 'group',
    },
    {
      href: '/products',
      text: 'Products',
      icon: 'ballot',
    },
  ];

  constructor() { }
}
