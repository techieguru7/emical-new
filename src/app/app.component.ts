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
          'loan EMI calculator,extra emi payment on loan,extra emi warikoo,less interest on loan,Extra repayments calculator for loan,Easy EMI Calcualtor,Personal Loans, mortgage Extra repayments calculator,pay extra emi yearly,pay extra emi quaterly, repayment on home loan emi, pay extra emi half-yearly,how to save interest on home loan,Emi frequency payment,loan amount calculator, monthly EMI, Quaterly Prepayment,Monthly EMI Calculation,emi Calculator,EMI Calculator App,calculator,extra emi,check online loan calculator,Home loan india',
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
