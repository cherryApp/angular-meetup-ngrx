import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends {id?: number}> {

  private apiUrl: string = environment.apiUrl;

  constructor(
    protected http: HttpClient,
    @Inject('string') protected entityName: string,
  ) { }

  readAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${this.entityName}`);
  }

  read(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.entityName}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}${this.entityName}`,
      entity,
    );
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.apiUrl}${this.entityName}/${entity.id}`,
      entity,
    );
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${this.entityName}/${id}`);
  }

}
