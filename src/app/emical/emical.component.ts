import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-emical',
  templateUrl: './emical.component.html',
  styleUrls: ['./emical.component.css'],
})
export class EmicalComponent implements OnInit {
  currencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR','CNY','RUB','SGD']; // Replace with your list of currency options
  selectedCurrency: string = 'INR';
  ctx: any;
  config: any;
  chartData: number[] = [];
  chartDatalabels: any[] = [];
  tabval = 0;
  yearsArray:any = []
  min = 100000;
  max = 10000000;
  math = Math;
  monthly_interest_amount: any = 0;
  monthly_principal_amount: any = 0;
  balance_principal: any = 0;
  table_list: any = [];
  convertTxt = ''
  data = {};

  @Input() amount = 5000000;
  @Input() interestRate = 9
  @Input() tenure = 1;
  @Input() emi = 0;
  @Input() extraPreEmi = 1;
  tenureInMonths: any
  // charts
  monthsTenure: any;
  totalInterest: any;
  totalPayable: any;
  no_Months: any = [];
  monthNames: any = [];
  myChart: any;
  tenureVal: any = 'Years';
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {

    //console.log(changes);
    // this.description = this.getDescription();
  }



  ngOnInit() {
    this.calculate()
    this.Pie()
  }

  formatLabel(value: number): string {
    if (value >= 10000) {
      //console.log(value,'va')
      return Math.round(value / 10000) + 'k';
    }

    return `${value}`;
  }

  

  inputUpdate(val: any) {
    // console.log(val)
    this.amount = val.value;
    //this.calculate()
  }

  calculate() {
    //var this.tenureInMonths: any;
    if (this.tenure == 0) {
      this.tenure = 1
    }
    if (this.amount == 0 || this.amount == 10000000) {
      this.amount = 1000000
    }
    if (this.tenureVal == 'Months' && this.tenure > 360) {
      this.tenure = 12
    }
    else if (this.tenureVal == 'Years' && this.tenure > 30) {
      this.tenure = 1;
    }
    const principal = this.amount;
    const rateOfInterest = this.interestRate / 100 / 12;
    if (this.tenureVal == 'Years') {
      this.tenureInMonths = this.tenure * 12;
    } else {
      this.tenureInMonths = this.tenure;
    }
    const numerator = rateOfInterest * Math.pow(1 + rateOfInterest, this.tenureInMonths);
    const denominator = Math.pow(1 + rateOfInterest, this.tenureInMonths) - 1;
    this.emi = principal * (numerator / denominator);
    //this.emi= Math.round(this.emi)
    this.totalInterest = this.emi * this.tenureInMonths - principal;
    //this.emi = Math.round(this.emi)
    this.totalInterest = Math.round(this.totalInterest)
    //console.log(this.totalInterest);
    this.totalPayable = 0;
    this.totalPayable = Number(this.amount) + Number(this.totalInterest);
    //console.log(this.totalPayable);
    // if (this.tenureVal == 'y') {
    //   this.totalPayable = this.emi * (this.tenure * 12) + this.extraPreEmi;
    // } else {
    //   this.totalPayable = this.emi * (this.tenure) + this.extraPreEmi;
    // }

    this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.Pie();
    //this.pieChartFnc()

    // initialization
    this.balance_principal = 0;
    this.monthly_interest_amount = 0;
    this.monthly_principal_amount = 0;
    this.balance_principal = 0;
    this.balance_principal = this.amount;
    this.table_list = [];

    for (let i = 1; i <= this.tenureInMonths; i++) {
      this.monthly_interest_amount = (this.interestRate / 12) * this.balance_principal / 100;

      this.monthly_principal_amount = this.emi - this.monthly_interest_amount;

      this.balance_principal = this.balance_principal - this.monthly_principal_amount;
      
      this.table_list.push({ 'year': this.monthNames[i - 1], 'monthly_interest': this.monthly_interest_amount, 'month_principal': this.monthly_principal_amount, 'totalPaid': this.monthly_interest_amount + this.monthly_principal_amount, 'balance': this.balance_principal });
    }
    this.yearsArray = this.groupArray(this.table_list, 12);
    console.log(this.yearsArray)
     console.log(this.table_list)
  }

  groupArray(array:any[], groupSize:any) {
    const groupedArray = [];
    for (let i = 0; i < array.length; i += groupSize) {
      const group = [];
      for (let j = i; j < i + groupSize && j < array.length; j++) {
        group.push(array[j]);
      }
      groupedArray.push(group);
    }
    return groupedArray;
  }

  pieChartFnc() {
    this.data = {
      labels: ['Pricipal Amount','Total Ineterest'],
      datasets: [
        {
          data: [this.totalInterest, this.amount],
          backgroundColor: [
            "#66BB6A",
            "#42A5F5"
            // "#FFA726"
          ],

        }
      ]
    };
  }


  Pie() {
    if (typeof this.myChart !== 'undefined') {
      this.myChart.destroy();
    }
    this.chartData = []
    this.chartDatalabels = [];
    this.chartData.push(this.totalInterest);
    this.chartData.push(this.amount);
    this.myChart = []

    this.chartDatalabels.push('Total Ineterest');
    this.chartDatalabels.push('Pricipal Amount');

    this.ctx = document.getElementById('myChart');
    this.config = {
      type: 'pie',
      options: {
      },
      data: {
        labels: this.chartDatalabels,
        datasets: [{
          label: 'Chart Data',
          data: this.chartData,
          borderWidth: 1,
          borderColor: '#cad8ed',
          backgroundColor: ['#66BB6A', '#42A5F5'],
          scales: {
            xAxes: [{
              barPercentage: 0.4
            }]
          }

        }],
      }
    }
    this.myChart = new Chart(this.ctx, this.config);
  }

  setYearsMonths(val: string) {
    this.tenureVal = val;
    if (this.tenureVal == 'Years') {
      this.tenure = this.tenure / 12;
      this.tenure = Math.round(this.tenure * 10) / 10
      //  console.log(this.tenure, 'y')
    } else {
      this.tenure = this.tenure * 12;
      this.tenure = Math.trunc(this.tenure);
      // console.log(this.tenure, 'm')
    }
  }

  tabChange(val: any) {
    val = val.index
    //console.log(val)
    if (val == 0) {
      // Home loan
      this.amount = 5000000
      this.interestRate = 9
      this.tenure = 20

    } else if (val == 1) {
      // Personal loan
      this.amount = 875000
      this.interestRate = 11.5
      this.tenure = 3
    } else {
      //Car Loan
      this.amount = 500000
      this.interestRate = 8.65
      this.tenure = 5
    }
    this.calculate()
  }


}
