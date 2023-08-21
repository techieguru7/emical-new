import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'emicalc';
  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router: Router
  ) {
   // this.router.events.subscribe((event) => console.log(event));

    this.titleService.setTitle(
      'EMI Calculator for Home loan, Car loan & Personl loan'
    );
    this.metaTagService.addTags([
      {
        name: 'description',
        content:
          'EMI Calculator for home loan, car loan and personal loans. Get accurate loan repayment estimates based on loan amount, interest rate, Prepayment emi/Extra EMI and tenure.',
      },
      {
        name: 'keywords',
        content:
          'loan EMI calculator,Home Loans,Prepayment,Pay extra Emi,Loan Terms,Car Loans,Personal Loans, loan calculator,Interest Rate Calculator,Home loan EMI calculator for first time buyers, EMI calculator, loan repayment,how to save interest on loan, loan interest, loan amount calculator, Interest save, monthly EMI, Monthly EMI Calculation,emi Calculator,emi,loan,home loan,EMI Calculator App,emi,Loan,calculator,extra emi, car loan, personal loan,home loan emi,mortgage lenders,bank loan,calculator,EMI Calculator Online,Bank loan emi,Loan Interest Calculation,EMI,Home loan india',
      },
      { name: 'canonical', href: 'https://emical.net/' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'writer',
        content: 'Technie Guru',
      },
      { charset: 'UTF-8' },
    ]);
  }
}
