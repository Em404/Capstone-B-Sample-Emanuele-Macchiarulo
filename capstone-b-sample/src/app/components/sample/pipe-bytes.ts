import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytes'
})
export class BytesPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(value) / Math.log(1024));
    const convertedValue = parseFloat((value / Math.pow(1024, i)).toFixed(2));

    return convertedValue + ' ' + sizes[i];
  }
}
