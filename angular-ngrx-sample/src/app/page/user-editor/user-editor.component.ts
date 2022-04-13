import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, pluck, switchMap, tap } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { StatefulUserService } from 'src/app/service/stateful-user-service.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  user$: Observable<User> = this.userState.select('selected');

  items: ITableCol[] = this.config.userTableColumns;

  constructor(
    private config: ConfigService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userState: StatefulUserService,
  ) { }

  ngOnInit(): void {
    this.userState.loadOne(this.activatedRoute.snapshot.params['id']);
  }

  onSend(user: User): void {
    this.userState.updateOne(user);
    this.router.navigate(['/', 'users']);
  }

}
