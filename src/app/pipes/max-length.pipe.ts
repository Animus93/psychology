import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength',
})
export class MaxLengthPipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (!value) {
      return '';
    }
    return value.length > maxLength
      ? value.substring(0, maxLength) + '...'
      : value;
  }
}
