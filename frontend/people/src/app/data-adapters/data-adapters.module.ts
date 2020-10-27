import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { TheMaterialModule } from './../material.module';
import { RestService } from './rest.service';

@NgModule({
  declarations: [],
  imports: [
CommonModule,
  HttpClientModule,
  TheMaterialModule,
  ],
  exports: [],
  providers: [RestService]
})
export class DataAdaptersModule { }
