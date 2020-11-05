import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { SpinnerOverlayService } from './Components/spinner-overlay/spinner-overlay.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private preloader: SpinnerOverlayService) {
  }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.preloader.show(0);
    const API_KEY = 'peoplemanagement';
    const req = httpRequest.clone({ setHeaders: { 'x-api-key': API_KEY } });
    console.log(req);
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(event);
          return event;
        }
      }),
      finalize(() => this.preloader.hide())
    );
  }
}