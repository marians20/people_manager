import { Injectable } from '@angular/core';
import { People, Person } from 'src/app/models';
import { RestService } from './../../data-adapters/rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { EnvironmentService } from 'src/app/environment.service';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { QueryDto } from 'src/app/data-adapters/dtos';

@Injectable({ providedIn: 'root' })
export class PeopleDataSource extends MatTableDataSource<Person> {
    private _itemsCount = 0;

    constructor(
        private rest: RestService,
        env: EnvironmentService) {
        super();
        rest.baseUrl = `${env.getValue('serverUrl')}/${env.getValue('peopleUrl')}`;
    }

    public get itemsCount(): number {
        return this._itemsCount;
    }

    public load(queryDto: QueryDto): Observable<People> {
        const params = queryDto.sort && queryDto.sort.field ? {
            sortField: queryDto.sort.field,
            sortDirection: queryDto.sort.direction,
            pageSize: queryDto.pageSize,
            pageNumber: queryDto.pageNumber
        } : {
            pageSize: queryDto.pageSize,
            pageNumber: queryDto.pageNumber
        };

        return this.rest.get<Person>(params).pipe(
            map(data => {
                this.data = data;
                this.rest.getCount().subscribe(response => this._itemsCount = response);
                return data;
            }));
    }

    public add(person: Person): Observable<any> {
        return this.rest.post(person);
    }

    public update(id: number, person: Person): Observable<any> {
        return this.rest.put(id, person);
    }

    public delete(people: People): Observable<any> {
        return combineLatest(people.map(person => this.rest.delete(person.id)));
    }
}