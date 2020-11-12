import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnvironmentService } from './environment.service';

@Injectable({providedIn: 'root'})
export class Auth {
    private tokenKey = 'jwt';

    constructor(
        private env: EnvironmentService,
        private httpClient: HttpClient) {
    }

    public get existingToken(): string {
        return localStorage.getItem(this.tokenKey);
    }

    public get isAuthenticated(): boolean {
        return this.existingToken ? true : false;
    }

    public logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    public saveToken(jwt: string): void {
        localStorage.setItem(this.tokenKey, jwt);
    }

    public getToken(data: object): Observable<any> {
        return this.httpClient.post(`${this.env.getValue('serverUrl')}/${this.env.getValue('loginUrl')}`, data)
        .pipe(map(response => {
            if (response['token']) {
                this.saveToken(response['token']);
            }

            return response;
        }));
    }

    public refreshToken(): void {

    }
}