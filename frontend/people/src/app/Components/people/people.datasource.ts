import { Injectable } from '@angular/core';
import { People, Person } from 'src/app/models';
import { RestService } from './../../data-adapters/rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { EnvironmentService } from 'src/app/environment.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryDto } from 'src/app/data-adapters/dtos';

@Injectable({ providedIn: 'root' })
export class PeopleDataSource extends MatTableDataSource<Person> {
    constructor(
        private rest: RestService,
        env: EnvironmentService) {
        super();
        rest.baseUrl = `${env.getValue('serverUrl')}/${env.getValue('peopleUrl')}`;
    }

    public load(queryDto: QueryDto): Observable<People> {
        const params = queryDto.sort && queryDto.sort.field ? {
            sortField: queryDto.sort.field,
            sortDirection: queryDto.sort.direction
        } : {};

        return this.rest.get<Person>(params).pipe(
            map(data => {
                this.data = data;
                return data;
            }));
    }

    public add(person: Person): Observable<any> {
        return this.rest.post(person);
    }
}