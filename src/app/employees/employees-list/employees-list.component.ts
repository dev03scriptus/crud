import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() sort = new EventEmitter<string>();
  employeesData: Employees[] = [];
  sortCaption: string;
  sortIndex: number;

  constructor(
    private employeesService: EmployeesService,  
    private commonService: CommonService  
  ){}

  ngOnInit(): void {
    this.getMarketingTemplatesData()  
  }

  getMarketingTemplatesData() {
    let employeesData: Array<Employees> = [];
    this.loading = true;
    this.employeesService.getEmployeesData().subscribe(response => {
      const employees = localStorage.getItem('employeData');
      this.employeesData = response.entries;
      if (employees !== null) {
        console.log(JSON.parse(employees));
        
        this.employeesData = [...JSON.parse(employees),...this.employeesData]
        console.log(employeesData);
      }

    }, error => {
      // this.loading = false;
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
}
