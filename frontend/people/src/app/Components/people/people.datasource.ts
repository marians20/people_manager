import { Injectable } from '@angular/core';
import { People, Person } from 'src/app/models';
import { RestService } from './../../data-adapters/rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { EnvironmentService } from 'src/app/environment.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PeopleDataSource extends MatTableDataSource<Person> {
    constructor(
        private rest: RestService,
        env: EnvironmentService) {
        super();
        rest.baseUrl = `${env.getValue('serverUrl')}/${env.getValue('peopleUrl')}`;
    }

    public load(sortActive: string, sortDirection: string, pageIndex: number): Observable<People> {
        return this.rest.get<Person>().pipe(
            map(data => {
                this.data = data;
                return data;
            }));
    }
}