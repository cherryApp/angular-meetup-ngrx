import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  list$: Observable<User[]> = this.userService.readAll();

  cols: ITableCol[] = this.config.userTableColumns;

  constructor(
    private config: ConfigService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onEdit(user: User): void {
    this.router.navigate(['/', 'users', 'edit', user.id]);
  }

}
