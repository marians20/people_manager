import { Component, OnInit } from '@angular/core';
import { People, Person } from 'src/app/models';
import { RestService } from './../../data-adapters/rest.service';

@Component({
  selector: 'ppl-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  public people: People;
  constructor(private rest: RestService) { 
    rest.baseUrl = 'http://localhost:3000/people';
  }

  ngOnInit(): void {
    this.rest.get<Person>().subscribe(data => this.people = data);
  }

  public getFullName(person: Person): string {
    const result = `${person.firstName} ${person.lastName}`;

    console.log(result);

    return result;
  }

}
