import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Employees } from 'src/app/core/models/employees.model';
import { CommonService } from 'src/app/core/models/services/common.service';

@Component({
  selector: 'app-employees-add-edit',
  templateUrl: './employees-add-edit.component.html',
  styleUrls: ['./employees-add-edit.component.scss']
})
export class EmployeesAddEditComponent {
  employeData: Employees[] | any = [];

  empForm = this.fb.group({
    API: ['', Validators.required],
    Description: ['', Validators.required],
    Auth: ['', Validators.required],
    Http: ['', Validators.required],
    Cors: ['', Validators.required],
    Link: ['', Validators.required],
    Category: ['', Validators.required]
  });

  constructor(
    public fb: FormBuilder ,
    public commonService:CommonService
  ){
  }

  ngOnInit(): void {
    const getEmployess = localStorage.getItem('employeData')
    if(getEmployess !== null){
      this.employeData = JSON.parse(getEmployess)
    }
  }

  onSubmit() {
    this.employeData = [...this.employeData,this.empForm.value]
    localStorage.setItem('employeData', JSON.stringify(this.employeData));
    this.commonService.showSuccess("Employe added successfully.");
    this.empForm.reset();

    // this.profileDetails[this.profileId] = this.profileForm.value;
    //   localStorage.setItem('data', JSON.stringify(this.profileDetails));
    //   this.isUpdate = true;
    //   setTimeout(() => {
    //     this.isUpdate = false;
    //   }, 3000);

  }

}
