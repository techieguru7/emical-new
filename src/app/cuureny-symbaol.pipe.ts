import { Pipe, PipeTransform } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';

@Pipe({ name: 'currencySymbol' })
export class CurrencySymbolPipe implements PipeTransform {
  transform(currencyCode: string): string {
    const locale = 'en'; // Replace 'en' with your desired locale if needed
    return getCurrencySymbol(currencyCode, 'narrow', locale);
  }
}
