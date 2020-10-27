import { Injectable, Type } from '@angular/core';
import { Person } from 'src/app/models';
import { RestService } from './../../data-adapters/rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { EnvironmentService } from 'src/app/environment.service';

@Injectable({ providedIn: 'root' })
export class PeopleDataSource extends MatTableDataSource<Person> {
    constructor(
        private rest: RestService,
        env: EnvironmentService) {
        super();
        rest.baseUrl = `${env.getValue('serverUrl')}/${env.getValue('peopleUrl')}`;
    }

    public load(): void {
        this.rest.get<Person>().subscribe(data => this.data = data);
    }
}