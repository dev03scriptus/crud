import { Pipe, PipeTransform } from '@angular/core';
import { Employees } from '../core/models/employees.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Employees[], search:string, auth:string, isHttps:boolean) {
    search = search.toLowerCase();
    if (search !== '') {
      items = items.filter((response) =>response.API.toLowerCase().includes(search));
    }
    if(auth && isHttps){
      items = items.filter((response) => response.Auth === auth && response.HTTPS === isHttps);
    }
    if(auth || isHttps){
      items = items.filter((response) => response.Auth === auth || response.HTTPS === isHttps);
    }
    return items;
  }

}
