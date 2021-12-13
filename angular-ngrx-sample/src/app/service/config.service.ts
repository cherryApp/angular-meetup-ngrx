import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

export interface INavItem {
  href: string;
  text: string;
  icon?: string;
}

export interface ITableCol {
  key: string;
  title: string;
  type: string;
  validators?: ValidatorFn[];
  hide?: 'table' | 'form' | 'all';
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

  userTableColumns: ITableCol[] = [
    {
      title: '#',
      key: 'id',
      type: 'hidden',
      hide: 'form',
    },
    {
      title: 'Name',
      key: 'name',
      type: 'text',
      validators: [
        Validators.required,
        Validators.pattern(/[\w\s]{5,}/i),
      ],
    },
    {
      title: 'Email',
      key: 'email',
      type: 'text',
      validators: [
        Validators.required,
        Validators.email,
      ],
    },
    {
      title: 'Category',
      key: 'category',
      type: 'text',
      validators: [
        Validators.required,
        Validators.pattern(/[\w\s]{5,}/i),
      ],
    },
  ];

  productTableColumns: ITableCol[] = [
    {
      title: '#',
      key: 'id',
      type: 'hidden',
      hide: 'form',
    },
    {
      title: 'Name',
      key: 'name',
      type: 'text',
      validators: [
        Validators.required,
        Validators.pattern(/[\w\s]{5,}/i),
      ],
    },
    {
      title: 'Price',
      key: 'price',
      type: 'number',
      validators: [
        Validators.required,
      ],
    },
    {
      title: 'Category',
      key: 'category',
      type: 'text',
      validators: [
        Validators.required,
        Validators.pattern(/[\w\s]{5,}/i),
      ],
    },
  ];

  constructor() { }
}
