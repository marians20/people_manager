import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private _baseUrl: string;

  public set baseUrl(value: string) {
    this._baseUrl = value;
  }

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar) { }

  public get<T>(params?: any): Observable<T[]> {
    return this.httpClient.get<T[]>(this._baseUrl, { params }).pipe(
      map(response => {
        this.openSnackBar(`${response.length} item(s) retrieved.`);
        return response;
      })
    );
  }

  public getCount(params?: any): Observable<number> {
    return this.httpClient.get<number>(`${this._baseUrl}/count`, { params });
  }

  public post(data?: any): Observable<any> {
    return this.httpClient.post(this._baseUrl, data);
  }

  public put(id: number, data?: any): Observable<any> {
    return this.httpClient.put(`${this._baseUrl}/${id}`, data);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this._baseUrl}\\${id}`);
  }

  private openSnackBar(message: string, duration: number = 500): void {
    this.snackBar.open(message, 'Close', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
