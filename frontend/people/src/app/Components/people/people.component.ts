import { Component, OnInit } from '@angular/core';
import { People } from 'src/app/models';
import { RestService } from './../../data-adapters/rest.service';
import { PeopleDataSource } from './people.datasource';

@Component({
  selector: 'ppl-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  public people: People;

  displayedColumns: string[] = ['firstName', 'lastName', 'cnp'];

  constructor(
    private rest: RestService,
    public dataSource: PeopleDataSource) {
  }

  ngOnInit(): void {
    this.dataSource.load();
  }
}
