import { Component, Input } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employees } from 'src/app/core/models/employees.model';
import { CommonService } from 'src/app/core/models/services/common.service';
import { EmployeesService } from 'src/app/core/models/services/employees.service';

@Component({
  selector: 'app-employees-add-edit',
  templateUrl: './employees-add-edit.component.html',
  styleUrls: ['./employees-add-edit.component.scss']
})
export class EmployeesAddEditComponent {
  employeData: Employees[] | any = [];
  employeeId:string
  categoriesData:Array<string> = [];
  submitted:boolean = false
  @Input() public loading = true;

  empForm = this.fb.group({
    API: ['', Validators.required],
    Description: ['', Validators.required],
    Auth: ['', Validators.required],
    HTTPS: ['', Validators.required],
    Cors: ['', Validators.required],
    Link: ['', Validators.required],
    Category: ['', Validators.required]
  });

  constructor(
    public fb: FormBuilder ,
    public commonService:CommonService,
    private activatedRoute:ActivatedRoute,
    private employeesService:EmployeesService
  ){
  }

  ngOnInit(): void {
    const getEmployess = localStorage.getItem('employeData')
    if(getEmployess !== null){
      this.employeData = JSON.parse(getEmployess)
    }
    this.getcategoriesData()
    this.activatedRoute.params.subscribe(result => {
      if(result['id']){
       this.employeeId = result['id']
        const patchEmployeeData = this.employeData[result['id']]
        this.empForm.setValue(patchEmployeeData)
      }
    })
  }

  onSubmit() {
    this.submitted = true
    if(this.empForm.invalid){
      return
    }
    if(this.employeeId){
      this.employeData[this.employeeId] = this.empForm.value
    }else{
      this.employeData = [this.empForm.value,...this.employeData]
    }
    localStorage.setItem('employeData', JSON.stringify(this.employeData));
    this.commonService.showSuccess("Employe added successfully.");
    this.empForm.reset();
  }

  getcategoriesData() {
    this.loading = true;
    this.employeesService.getCategories().subscribe(response => {
      this.categoriesData = response.categories
    }, error => {
      this.loading = false;
    })
  }

}
