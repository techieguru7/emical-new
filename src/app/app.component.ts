import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'emicalc';
  constructor(private titleService: Title,
    private metaTagService: Meta) {
    this.titleService.setTitle("Loan EMI calculator");

    this.metaTagService.addTags([
      { name: 'description', content: 'EMI Calculator for home, car, and personal loans using our online loan EMI calculator. Get accurate loan repayment estimates based on loan amount, interest rate, and loan tenure.' },
      { name: 'keywords', content: 'loan EMI calculator, loan calculator,Interest Rate Calculator, EMI calculator, loan repayment, loan interest calculator, loan interest, loan amount calculator, loan affordability, monthly EMI,Monthly EMI Calculation,emi Calculator,emi,loan,home loan,EMI Calculator App,emi,Loan,calculator,calc, car loan, personal loan,home loan emi,mortgage lenders,bank loan,calculator,EMI Calculator Online,Bank loan emi,Loan Interest Calculation' },
      { name: 'canonical', href: 'https://emical.net/' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'writer', content: 'Technie Guru'
      },
      { charset: 'UTF-8' }
    ]);
  }
}
