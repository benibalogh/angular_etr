import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'givenName'
})
export class GivenNamePipe implements PipeTransform {

  // removes the first part of a name (before the first space character)
  transform(value: any, args?: any): any {
    if (value) {
      let spaceIndex = value.indexOf(' ');
      if (spaceIndex !== -1) {
        return value.slice(spaceIndex + 1);
      }
    }
    return value;
  }

}
