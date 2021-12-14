import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  user$: Observable<User> = this.activatedRoute.params.pipe(
    switchMap( params => this.userService.read(params['id']) )
  );

  items: ITableCol[] = this.config.userTableColumns;

  constructor(
    private config: ConfigService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  onSend(user: User): void {
    this.userService.update(user).subscribe(
      user => this.router.navigate(['/', 'users']),
    );
  }

}
