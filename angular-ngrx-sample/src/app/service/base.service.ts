import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { id?: number }> {

  private apiUrl: string = environment.apiUrl;

  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  current$: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null);

  constructor(
    protected http: HttpClient,
    @Inject('string') protected entityName: string,
  ) { }

  readAll(): void {
    this.http.get<T[]>(`${this.apiUrl}${this.entityName}`).subscribe(
      list => this.list$.next(list),
    );
  }

  read(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.entityName}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}${this.entityName}`,
      entity,
    ).pipe(
      tap( () => this.readAll() ),
    );
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.apiUrl}${this.entityName}/${entity.id}`,
      entity,
    ).pipe(
      tap( () => this.readAll() ),
    );
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${this.entityName}/${id}`)
      .pipe(
        tap( () => this.readAll() ),
      );
  }

}
