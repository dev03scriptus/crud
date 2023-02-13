import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesAddEditComponent } from './employees-add-edit/employees-add-edit.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';

const routes: Routes = [
  {
    path: '', component: EmployeesListComponent 
  },
  {
    path: 'add', component: EmployeesAddEditComponent 
  },
  {
    path: 'edit/:id',
    component: EmployeesAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
