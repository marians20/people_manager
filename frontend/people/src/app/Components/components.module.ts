import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheMaterialModule } from '../material.module';

import { DataAdaptersModule } from './../data-adapters/data-adapters.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PeopleComponent } from './people/people.component';

const components = [
  PageNotFoundComponent,
  HeaderComponent,
  DashboardComponent,
  PeopleComponent,
];

@NgModule({
  declarations: [ ...components],
  imports: [
CommonModule,
  TheMaterialModule,
  DataAdaptersModule,
  ],
  exports: [...components]
})
export class ComponentsModule { }
