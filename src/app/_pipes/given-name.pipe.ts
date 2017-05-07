import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'givenName'
})
export class GivenNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      let spaceIndex = value.indexOf(' ');
      if (spaceIndex !== -1) {
        return value.slice(spaceIndex+1);
      }
    }
    return value;
  }

}
