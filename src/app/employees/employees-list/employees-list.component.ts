import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserColumnList } from 'src/app/constants/table-column.constants';
import { Employees } from 'src/app/core/models/employees.model';
import { CommonService } from 'src/app/core/models/services/common.service';
import { EmployeesService } from 'src/app/core/models/services/employees.service';
import { ITableColumn } from 'src/app/modules/table-column.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent {
  tableColumns = UserColumnList;
  columnIndex: number;
  sortTitle: string;
  @Input() public loading = true;
  employeesData: Employees[] = [];
  sortCaption: string;
  search:string = '';
  auth:string = ''
  isHttps:boolean = false
  sortIndex: number;

  constructor(
    private employeesService: EmployeesService,  
    private commonService: CommonService,
    private router:Router  
  ){}

  ngOnInit(): void {
    this.getMarketingTemplatesData()  
  }

  getMarketingTemplatesData() {
    this.loading = true;
    this.employeesService.getEmployeesData().subscribe(response => {
      this.loading = false
      const employees = localStorage.getItem('employeData');
      if (employees !== null) {
        this.employeesData = [...JSON.parse(employees),...this.employeesData]
      }else{
        localStorage.setItem('employeData',JSON.stringify(response.entries))
      }
    }, error => {
      this.loading = false
    })
  }

  handleSorting(columnObj: ITableColumn, type: string, columnIndex: number) {
    if (this.sortTitle !== columnObj.title || type !== this.sortCaption) {
      this.sortTitle = columnObj.title
      this.sortCaption = type;
      this.columnIndex = columnIndex;
      const sortInfo = {
        columnObj,
        sortDirection: type, 
        items: this.employeesData
      }
      const sortedData: Employees[] = this.commonService.sortList(sortInfo) as Employees[];
  
      this.employeesData = [
        ...sortedData
      ];
    }
  }

  editEmployee(index:number){
    this.router.navigate(['edit',index])
  }

  deleteEmployee(index:number){
    this.employeesData.splice(index,1)
    localStorage.setItem('employeData',JSON.stringify(this.employeesData))
  }
}
