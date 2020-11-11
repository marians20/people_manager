import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class AppCookieService {
    private cookieStore = {};

    constructor() {
        this.parseCookies(document.cookie);
    }

    public parseCookies(cookies = document.cookie): void {
        this.cookieStore = {};
        if (!!cookies === false) { return; }
        const cookiesArr = cookies.split(';');
        for (const cookie of cookiesArr) {
            const cookieArr = cookie.split('=');
            this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
        }
    }

    public get(key: string): void {
        this.parseCookies();
        return !!this.cookieStore[key] ? this.cookieStore[key] : null;
    }

    public remove(key: string): void {
      document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
    }

    public set(key: string, value: string): void {
        document.cookie = key + '=' + (value || '');
    }
}