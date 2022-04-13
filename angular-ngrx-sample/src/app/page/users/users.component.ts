import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { StatefulUserService } from 'src/app/service/stateful-user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  readonly list$: Observable<readonly User[]> =  this.userState.list$;

  cols: ITableCol[] = this.config.userTableColumns;

  constructor(
    private config: ConfigService,
    private router: Router,
    private userState: StatefulUserService,
  ) { }

  onEdit(user: User): void {
    this.router.navigate(['/', 'users', 'edit', user.id]);
  }

  onRemove(user: User): void {
    this.userState.removeOne(user);
  }

}
