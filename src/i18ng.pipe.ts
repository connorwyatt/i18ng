import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'i18ng'
})
export class i18ngPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value;
  }
}
