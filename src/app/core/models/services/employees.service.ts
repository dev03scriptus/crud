import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from "../../../../environments/environment";
import { Employees } from '../employees.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  apiUri= environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getEmployeesData(): Observable<{count: number,entries: Employees[]}>{
    return this.httpClient.get<{count: number,entries: Employees[]}>(this.apiUri +'entries');
  }

  getColumnSortKey(columnName: string, type: string) {
    let columnSortKey = columnName.split(' ').join('');
    if (type === 'desc') {
      columnSortKey = '-' + columnSortKey;
    }
    return columnSortKey;
  }

  getCategories(): Observable<{count: number,categories:string[]}>{
    return this.httpClient.get<{count: number,categories:string[]}>(this.apiUri +'categories');
  }
}
