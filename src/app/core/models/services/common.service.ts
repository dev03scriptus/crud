import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ITableColumn } from 'src/app/modules/table-column.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private toastrService : ToastrService,
  ) { }

  sortComparer(firstValue: string | number | boolean, secondValue: string | number | boolean, fieldType: 'string' | 'number' | 'boolean') {
    if (fieldType === 'number') {
      return ((firstValue || 0) as number) - ((secondValue || 0) as number);
    }

    if (fieldType === 'boolean') {
      return (firstValue === secondValue) ? 0 : firstValue ? 1 : -1;
    }
    return ((firstValue || '') as string).toLowerCase() > ((secondValue || '') as string).toLowerCase() ? 1 : -1;
  }
  
  sortList(data: {
    items: Array<Record<string, any>>,
    columnObj: ITableColumn,
    sortDirection: string
  }) {
    const {items, columnObj, sortDirection } = data;

    if (!items.length) {
      return [];
    }
    const fieldType = (typeof columnObj.getValue!(items[0]));
    if (!fieldType) {
      return [];
    }
    return items.sort((a, b) => {
      const firstValue = columnObj.getValue!(a); 
      const secondValue = columnObj.getValue!(b); 
      if (sortDirection === 'desc') {
         return this.sortComparer(secondValue,firstValue, fieldType as any);
      }
      return this.sortComparer(firstValue, secondValue, fieldType as any);
    })
  }

  showWarning(message:string, title:string){
    // this.toastrService.warning(message, title)
  }

  showSuccess(message:string){
    this.toastrService.info(message ,'SUCCESS');
  }

}

