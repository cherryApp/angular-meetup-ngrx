import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(
    public override http: HttpClient,
  ) {
    super(http, 'products');
  }

}
