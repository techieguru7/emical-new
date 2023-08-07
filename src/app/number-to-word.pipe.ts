import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {
  private units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  private teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  private tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  private thousands = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  transform(value: any): string {
    if (isNaN(value)) {
      return '';
    }

    if (value === 0) {
      return 'Zero';
    }

    let numStr = '';
    const chunks = [];

    while (value) {
      chunks.push(value % 1000);
      value = Math.floor(value / 1000);
    }

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      if (chunk) {
        numStr = this.convertChunkToWords(chunk) + ' ' + this.thousands[i] + ' ' + numStr;
      }
    }

    return numStr.trim();
  }

  private convertChunkToWords(chunk: number): string {
    if (chunk === 0) {
      return '';
    }

    if (chunk < 10) {
      return this.units[chunk];
    }

    if (chunk < 20) {
      return this.teens[chunk - 10];
    }

    if (chunk < 100) {
      return this.tens[Math.floor(chunk / 10)] + ' ' + this.units[chunk % 10];
    }

    return this.units[Math.floor(chunk / 100)] + ' Hundred ' + this.convertChunkToWords(chunk % 100);
  }
}
