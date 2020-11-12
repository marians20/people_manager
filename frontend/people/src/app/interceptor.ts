import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { finalize, map, catchError } from 'rxjs/operators';
import { SpinnerOverlayService } from './Components/spinner-overlay/spinner-overlay.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from './Components/login/login.service';
import { Auth } from './auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(
    private preloader: SpinnerOverlayService,
    private snackBar: MatSnackBar,
    private login: Login,
    private auth: Auth) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.preloader.show();
    const API_KEY = 'peoplemanagement';
    const headers = { 'x-api-key': API_KEY };
    if (this.auth.isAuthenticated) {
      headers['authorization'] = `bearer ${this.auth.existingToken}`;
    }
    const req = httpRequest.clone({ setHeaders: headers });
    console.log(req);
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(event);

          return event;
        }
      }),
      catchError((error: any): Observable<HttpEvent<any>> => {
        this.preloader.hide();
        console.log(error);
        if (error.status === 403) {
          this.auth.logout();
          this.login.show().subscribe((data) => console.log(data));
        } else if (error.status === 401) {
          this.auth.logout();
          this.login.show().subscribe((data) => console.log(data));
        }

        this.openSnackBar(JSON.stringify(error.error));
        return new Observable<HttpEvent<any>>(null);
      }),
      finalize(() => this.preloader.hide())
    );
  }

  private openSnackBar(message: string, duration: number = 500): void {
    this.snackBar.open(message, 'Close', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}