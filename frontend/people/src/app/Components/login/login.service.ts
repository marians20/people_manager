import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from './login.component';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'src/app/environment.service';

@Injectable({
    providedIn: 'root'
})
export class Login {

    constructor(
        private env: EnvironmentService,
        private dialog: MatDialog,
        private httpClient: HttpClient) {
    }

    public show(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        this.dialog.open(LoginComponent, dialogConfig).afterClosed()
        .subscribe((data) => {
            this.httpClient.post(`${this.env.getValue('serverUrl')}/${this.env.getValue('loginUrl')}`, data)
            .subscribe(response => {
                console.log(response);
            });
        });
      }
}