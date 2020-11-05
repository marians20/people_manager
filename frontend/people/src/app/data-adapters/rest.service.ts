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
      }),
      catchError((error) => {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
          this.openSnackBar(`${error.error.message}`, 2000);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${JSON.stringify(error.error)}`);
          this.openSnackBar(`${error.status} ${error.statusText} ${JSON.stringify(error.error)}`, 2000);
        }
        return this.handleError(error);
      })
    );
  }

  public post(data?: any): Observable<any> {
    return this.httpClient.post(this._baseUrl, data);
    // .pipe(
    //   catchError((error) => {
    //     if (error.error instanceof ErrorEvent) {
    //       // A client-side or network error occurred. Handle it accordingly.
    //       console.error('An error occurred:', error.error.message);
    //       this.openSnackBar(`${error.error.message}`, 2000);
    //     } else {
    //       const statusCode = +error.status;
    //       if ( statusCode < 200 || statusCode >= 300 ) {
    //         // The backend returned an unsuccessful response code.
    //         // The response body may contain clues as to what went wrong.
    //         console.error(
    //           `Backend returned code ${error.status}, ` +
    //           `body was: ${JSON.stringify(error.error)}`);
    //         this.openSnackBar(`${error.status} ${error.statusText} ${JSON.stringify(error.error)}`, 2000);
    //       }
    //     }
    //     return this.handleError(error);
    //   })
    // );
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
