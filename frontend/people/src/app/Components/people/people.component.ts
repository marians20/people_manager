import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { QueryDto } from '../../data-adapters/dtos';
import { People, Person } from 'src/app/models';
import { PeopleDataSource } from './people.datasource';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PeopleFormComponent } from './people-form/people-form.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
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
  public pageSize = 10;
  public pageNumber = 1;
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

  public get selectedCount(): number {
    return this.selection.selected.length;
  }

  public get isSelected(): boolean {
    return this.selectedCount > 0;
  }

  public get isMultipleSelected(): boolean {
    return this.selectedCount > 1;
  }

  public get isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return this.selectedCount === numRows;
  }

  public get selected(): People {
    return this.selection.selected;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  private getQueryDto(): QueryDto {
    if (this.displayedColumns.indexOf(this.sort.active) > -1) {
      return {
        sort: {
          field: this.sort.active,
          direction: this.sort.direction
        },
        pageSize: this.paginator.pageSize,
        pageNumber: this.paginator.pageIndex + 1
      };
    }

    return {
      sort: {
        field: null,
        direction: null
      },
      pageSize: this.paginator.pageSize,
      pageNumber: this.paginator.pageIndex + 1
    };
  }

  public create(): void {
    this.showDialog({
      title: 'Add person',
      subtitle: 'Add person form',
      person: new Person()
    }).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${JSON.stringify(result)}`);
      if (!result) {
        return;
      }
      this.dataSource.add(result).subscribe(() => this.dataSource.load(this.getQueryDto())
        .subscribe(() => console.log('DataLoaded')));
    });
  }

  public delete(): void {
    let data;
    if (this.isMultipleSelected) {
      data = {
        title: 'Delete people',
        subtitle: `Are you sure that you want to delete ${this.selectedCount} people?`
      };
    } else {
      data = {
        title: 'Delete person',
        subtitle: `Are you sure that you want to delete ${this.selected[0].firstName} ${this.selected[0].lastName}?`
      };
    }

    this.showDialog(data).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${JSON.stringify(result)}`);
      if (!result) {
        return;
      }
      this.dataSource.delete(this.selected).subscribe(() => this.dataSource.load(this.getQueryDto())
        .subscribe(() => this.selection.clear()));
    });
  }

  public edit(person: Person): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Edit person',
      subtitle: 'Edit person form',
      person
    };

    this.showDialog({
      title: 'Edit person',
      subtitle: 'Edit person form',
      person
    }).afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.dataSource.update(person.id, result).subscribe(() => this.dataSource.load(this.getQueryDto())
        .subscribe(() => console.log('DataLoaded')));
    });
  }

  private showDialog(data: any): MatDialogRef<any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    return this.dialog.open(PeopleFormComponent, dialogConfig);
  }

}
