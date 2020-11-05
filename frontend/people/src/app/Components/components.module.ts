import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TheMaterialModule } from '../material.module';

import { DataAdaptersModule } from './../data-adapters/data-adapters.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PeopleComponent } from './people/people.component';
import { PeopleFormComponent } from './people/people-form/people-form.component';

const components = [
  PageNotFoundComponent,
  HeaderComponent,
  DashboardComponent,
  PeopleComponent,
  PeopleFormComponent,
];
/**
 *
 *
 * @export
 * @class ComponentsModule
 */
@NgModule({
  declarations: [ ...components],
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  TheMaterialModule,
  DataAdaptersModule,
  ],
  exports: [...components]
})

export class ComponentsModule { }
