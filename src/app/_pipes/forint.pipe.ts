import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forint'
})
export class ForintPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const original: string = value.toString();
      let converted = '';
      let l = original.length;
      if (l >= 4) {
        let i: number;
        for (i = l - 3; i > 0; i -= 3) {
          let triplet = original.slice(i, i + 3);
          converted = '.' + triplet + converted;
        }
        let left = 3 + i;
        converted = original.substr(0, left) + converted;
      }
      converted = converted + ' Ft';
      return converted;
    }
  }

}
