import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { QueryDto } from '../../data-adapters/dtos';
import { People, Person } from 'src/app/models';
import { PeopleDataSource } from './people.datasource';
import { MatDialog } from '@angular/material/dialog';
import { PeopleFormComponent } from './people-form/people-form.component';
import { SelectionModel } from '@angular/cdk/collections';
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

  public initialSelection = [];
  public allowMultiSelect = true;
  public selection = new SelectionModel<Person>(this.allowMultiSelect, this.initialSelection);

  private isLoadingResults: boolean;

  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'cnp'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dataSource: PeopleDataSource,
    public dialog: MatDialog) {
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

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  private getQueryDto(): QueryDto {
    if (this.displayedColumns.indexOf(this.sort.active) > -1) {
      return {
        sort: {
          field: this.sort.active,
          direction: this.sort.direction
        }
      };
    }

    return {
      sort: {
        field: null,
        direction: null
      }
    };
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(PeopleFormComponent, { data: { title: 'Add person', subtitle: 'Add person form' } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${JSON.stringify(result)}`);
    });
  }

  public tableRowClick(row: Person) {
    console.log(row);
  }
}
