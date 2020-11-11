import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationComponent } from './confirmation.component';

@Injectable({
    providedIn: 'root'
})
export class Confirmation {

    constructor(private dialog: MatDialog) {
    }

    public show(data: any): Observable<any> {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = data;
        return this.dialog.open(ConfirmationComponent, dialogConfig).afterClosed();
      }
}