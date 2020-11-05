import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ppl-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.scss']
})
export class PeopleFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, subtitle: string}) { }

  ngOnInit(): void {
  }

}
