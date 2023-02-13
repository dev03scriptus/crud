import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesAddEditComponent } from './employees-add-edit/employees-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../pipe/filter.pipe';
import { SpinnerLoaderComponent } from '../spinner-loader/spinner-loader.component';


@NgModule({
  declarations: [
    EmployeesListComponent,
    EmployeesAddEditComponent,
    FilterPipe,
    SpinnerLoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
