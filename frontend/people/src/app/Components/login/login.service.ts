import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from './login.component';
import { Auth } from 'src/app/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class Login {

    constructor(
        private dialog: MatDialog,
        private auth: Auth) {
    }

    public show(): Observable<any> {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        return this.dialog.open(LoginComponent, dialogConfig).afterClosed()
            .pipe(map((data) => this.auth.getToken(data)));
      }
}