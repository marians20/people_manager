import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
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

export class PeopleComponent implements OnInit, AfterViewInit  {
  public people: People;
  private isLoadingResults: boolean;
  private isRateLimitReached: boolean;

  displayedColumns: string[] = ['firstName', 'lastName', 'cnp'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dataSource: PeopleDataSource) {
  }

  ngAfterViewInit(): void {
    console.log(this.sort.active, this.sort.direction, this.paginator.pageIndex);
    this.dataSource.load(this.sort.active, this.sort.direction, this.paginator.pageIndex).subscribe();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.dataSource.load(this.sort.active, this.sort.direction, this.paginator.pageIndex);
      }),
      map(data => {
        this.isLoadingResults = false;
        return data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return observableOf([]);
      })
    ).subscribe();
  }

  ngOnInit(): void { }
}
