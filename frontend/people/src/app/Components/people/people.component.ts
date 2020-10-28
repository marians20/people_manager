import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { QueryDto } from '../../data-adapters/dtos';
import { People } from 'src/app/models';
import { PeopleDataSource } from './people.datasource';
/**
 * @export
 * @class PeopleComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 * @documentation https://material.angular.io/components/table/examples
 */
@Component({
  selector: 'ppl-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})

export class PeopleComponent implements OnInit, AfterViewInit {
  public people: People;
  private isLoadingResults: boolean;

  displayedColumns: string[] = ['firstName', 'lastName', 'cnp'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dataSource: PeopleDataSource) {
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataSource.load(this.getQueryDto());
        }),
        map(data => {
          this.isLoadingResults = false;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe();
  }

  ngOnInit(): void { }

  private getQueryDto(): QueryDto {
    if (this.displayedColumns.indexOf(this.sort.active) > -1) {
      return {
        sort: {
          field: this.sort.active,
          direction: this.sort.direction
        }
      }
    }

    return {sort: {
      field: null,
      direction: null
    }};
  }
}
