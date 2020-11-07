import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ppl-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, subtitle: string}) { }

  ngOnInit(): void {
  //   this.keydownEvents().subscribe(event => {
  //     if (event.key === "Escape") {
  //         this.onCancel();
  //     }
  // });
  }
}
