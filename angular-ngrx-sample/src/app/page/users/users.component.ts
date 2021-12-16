import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  list$: Observable<readonly User[]> = of([]);

  cols: ITableCol[] = this.config.userTableColumns;

  constructor(
    private config: ConfigService,
    private userService: UserService,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.userService.readAll().subscribe();
  }

  onEdit(user: User): void {
    this.router.navigate(['/', 'users', 'edit', user.id]);
  }

  onRemove(user: User): void {
    this.userService.delete(user.id).subscribe(
      () => {},
    );
  }

}
