import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from 'src/app/models';

@Component({
  selector: 'ppl-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.scss']
})
export class PeopleFormComponent implements OnInit {
  public personForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {title: string, subtitle: string, person: Person},
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      firstName: this.data.person.firstName,
      lastName: this.data.person.lastName,
      cnp: this.data.person.cnp
    });
  }

  public onSubmit(formValue): void {
  }

}
