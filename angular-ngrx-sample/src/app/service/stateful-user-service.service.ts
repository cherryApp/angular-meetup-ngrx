import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { pluck } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

interface StatefulComponentState {
  list?: User[];
  selected?: User;
}

@Injectable({
  providedIn: 'root'
})
export class StatefulUserService extends RxState<StatefulComponentState> {
  readonly list$ = this.select(pluck('list'));

  readonly selected$ = this.select(pluck('selected'));

  private apiUrl: string = environment.apiUrl;

  private entityName: string = 'users';

  private url: string = `${this.apiUrl}${this.entityName}`;

  constructor(
    private http: HttpClient,
  ) {
    super();
    this.loadAll();
  }

  loadAll(): void {
    this.http.get<User[]>(`${this.url}`).subscribe(
      users => this.set({ list: users }),
    );
  }

  async loadOne(id: number): Promise<void> {
    const reduceFn = (oldState) => ({
      selected: (oldState.list || [] as User[]).find(u => u.id == id),
    });

    this.select('list').subscribe(
      l => this.set(reduceFn),
    );
  }

  updateOne(user: User): void {
    this.http.patch<User>(
      `${this.url}/${user.id}`,
      user,
    ).subscribe(
      updatedUser => this.set(oldState => {
        const list = [...oldState.list];
        const index = oldState.list.findIndex( u => u.id === user.id);
        (list as User[]).splice(index, 1, updatedUser);
        return { list };
      }),
    )
  }

  removeOne(user: User): void {
    const reduceFn = (oldState) => {
      const list = [...oldState.list];
      (list as User[]).splice(oldState.list.indexOf(user), 1);
      return { list };
    }

    this.http.delete<User>(`${this.url}/${user.id}`).subscribe(
      () => this.set(reduceFn),
    );
  }
}
