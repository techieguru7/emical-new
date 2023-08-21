import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-emical',
  templateUrl: './emical.component.html',
  styleUrls: ['./emical.component.css'],
})
export class EmicalComponent implements OnInit {
  frequencydata = [
    { id: 1, name: 'Annualy' },
    { id: 2, name: 'Half-Yearly' },
    { id: 3, name: 'Quaterly' },
  ];

  currencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'CNY', 'RUB', 'SGD']; // Replace with your list of currency options
  selectedCurrency: string = 'INR';
  ctx: any;
  config: any;
  chartData: number[] = [];
  chartDatalabels: any[] = [];
  myData: any[] = [];

  tabval = 0;
  yearsArray: any = [];
  min = 100000;
  max = 10000000;
  math = Math;
  monthly_interest_amount: any = 0;
  monthly_principal_amount: any = 0;
  balance_principal: any = 0;
  table_list: any = [];
  convertTxt = '';
  data = {};
  plusbtnSign: any;
  extraEmiFrequency: any = 0;

  @Input() amount = 5000000;
  @Input() interestRate = 9;
  @Input() tenure = 20;
  @Input() emi = 0;
  @Input() extraPreEmi: any = 0;
  tenureInMonths: any;
  // charts
  monthsTenure: any;
  totalInterest: any;
  totalPayable: any;
  no_Months: any = [];
  monthNames: any = [];
  myChart: any;
  tenureVal: any = 'Years';
  panelOpenState = false;
  TotalInterestPaid: any;
  TotalPayableAmount: any;
  myType: any;
  width: any;
  height: any;
  myOptions: any;
  position: any;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    ////console.log(changes);
    // this.description = this.getDescription();
  }

  ngOnInit() {
    this.calculate();
    this.googlePie();
    // this.Pie();
  }

  formatLabel(value: number): string {
    if (value >= 10000) {
      ////console.log(value,'va')
      return Math.round(value / 10000) + 'k';
    }

    return `${value}`;
  }

  inputUpdate(val: any) {
    // //console.log(val)
    this.amount = val.value;
    //this.calculate()
  }

  selectFreq() {
    //console.log(this.extraEmiFrequency);
  }

  calculate() {
    if (this.extraPreEmi && this.extraPreEmi > 12) {
      this.extraPreEmi = 0;
    }
    this.TotalInterestPaid = 0;
    this.TotalPayableAmount = 0;
    let count = 0;
    if (this.tenure == 0) {
      this.tenure = 1;
    }
    if (this.amount == 0 || this.amount == 10000000) {
      this.amount = 1000000;
    }
    if (this.tenureVal == 'Months' && this.tenure > 360) {
      this.tenure = 12;
    } else if (this.tenureVal == 'Years' && this.tenure > 30) {
      this.tenure = 1;
    }
    const principal = this.amount;
    const rateOfInterest = this.interestRate / 100 / 12;
    if (this.tenureVal == 'Years') {
      this.tenureInMonths = this.tenure * 12;
    } else {
      this.tenureInMonths = this.tenure;
    }
    const numerator =
      rateOfInterest * Math.pow(1 + rateOfInterest, this.tenureInMonths);
    const denominator = Math.pow(1 + rateOfInterest, this.tenureInMonths) - 1;
    this.emi = principal * (numerator / denominator);
    this.totalInterest = this.emi * this.tenureInMonths - principal;
    this.totalInterest = Math.round(this.totalInterest);
    this.totalPayable = 0;
    this.totalPayable = Number(this.amount) + Number(this.totalInterest);
    ////console.log(this.totalPayable);
    // if (this.tenureVal == 'y') {
    //   this.totalPayable = this.emi * (this.tenure * 12) + this.extraPreEmi;
    // } else {
    //   this.totalPayable = this.emi * (this.tenure) + this.extraPreEmi;
    // }

    this.monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    //this.pieChartFnc()

    // initialization
    this.balance_principal = 0;
    this.monthly_interest_amount = 0;
    this.monthly_principal_amount = 0;
    this.balance_principal = 0;
    this.balance_principal = this.amount;
    this.table_list = [];

    for (let i = 1; i <= this.tenureInMonths; i++) {
      if (this.balance_principal > 0) {
        if (this.balance_principal < this.emi && this.extraPreEmi) {
          this.monthly_interest_amount =
            ((this.interestRate / 12) * this.balance_principal) / 100;
          this.monthly_principal_amount = this.balance_principal;
          this.balance_principal =
            this.balance_principal - this.monthly_principal_amount;
          if (this.extraPreEmi) {
            if (i % 12 == 0) {
              this.balance_principal =
                this.balance_principal - this.emi * this.extraPreEmi;
              this.monthly_principal_amount =
                this.monthly_principal_amount + this.emi * this.extraPreEmi;
            }
          }
        } else {
          this.monthly_interest_amount =
            ((this.interestRate / 12) * this.balance_principal) / 100;
          this.monthly_principal_amount =
            this.emi - this.monthly_interest_amount;
          this.balance_principal =
            this.balance_principal - this.monthly_principal_amount;
          if (this.extraPreEmi) {
            if (i % 12 == 0) {
              this.balance_principal =
                this.balance_principal - this.emi * this.extraPreEmi;
              this.monthly_principal_amount =
                this.monthly_principal_amount + this.emi * this.extraPreEmi;
              ////console.log(this.balance_principal,count),
            }
          }
        }
        // For graph Data
        this.TotalInterestPaid =
          this.TotalInterestPaid + this.monthly_interest_amount;
        this.TotalPayableAmount =
          this.TotalPayableAmount +
          (this.monthly_interest_amount + this.monthly_principal_amount);
        //
        var Percentage = 100 - (this.balance_principal / this.amount) * 100;
        this.table_list.push({
          year: this.monthNames[i - 1],
          expanded: false,
          monthly_interest: this.monthly_interest_amount,
          month_principal: this.monthly_principal_amount,
          totalPaid:
            this.monthly_interest_amount + this.monthly_principal_amount,
          balance: this.balance_principal,
          balance_percentage: Percentage,
          extra: 0,
        });
      }
    }
    //this.Pie();
    this.googlePie();
    //console.log(this.TotalInterestPaid,'r6')
    this.yearsArray = this.groupArray(this.table_list, 12);

   // console.log(this.yearsArray);

    for (let index = 11; index < this.table_list.length; index += 12) {
      if (this.extraPreEmi) {
        for (let j = 0; j < this.extraPreEmi; j++) {
          //  this.table_list[index]['balance'] -= this.emi * this.extraPreEmi;
          this.table_list[index]['extra'] = this.emi * this.extraPreEmi;
        }
      }
    }
    //console.log(this.table_list.length)
  }

  groupArray(array: any[], groupSize: any) {
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

  calculateTotal(group: any[], val: any): any {
    if (val == 'principle') {
      return group.reduce((total, item) => total + item.month_principal, 0);
    }
    if (val == 'extra') {
      return group.reduce((total, item) => total + item.extra, 0);
    }
    if (val == 'interest') {
      return group.reduce((total, item) => total + item.monthly_interest, 0);
    }
    if (val == 'totalP') {
      return group.reduce((total, item) => total + item.totalPaid, 0);
    }
  }

  calculateTotalPercentage(group: any[]): number {
    return group.reduce((total, item) => total + item.balance_percentage, 0);
  }

  toggleRow(index: number): void {
   // console.log(index);
    this.yearsArray[index].expanded = !this.yearsArray[index].expanded;
  }





  setYearsMonths(val: string) {
    this.tenureVal = val;
    if (this.tenureVal == 'Years') {
      this.tenure = this.tenure / 12;
      this.tenure = Math.round(this.tenure * 10) / 10;
      //  //console.log(this.tenure, 'y')
    } else {
      this.tenure = this.tenure * 12;
      this.tenure = Math.trunc(this.tenure);
      // //console.log(this.tenure, 'm')
    }
  }

  tabChange(val: any) {
    val = val.index;
    ////console.log(val)
    if (val == 0) {
      // Home loan
      this.amount = 5000000;
      this.interestRate = 9;
      this.tenure = 20;
    } else if (val == 1) {
      // Personal loan
      this.amount = 875000;
      this.interestRate = 11.5;
      this.tenure = 3;
    } else {
      //Car Loan
      this.amount = 500000;
      this.interestRate = 8.65;
      this.tenure = 5;
    }
    this.calculate();
  }

  googlePie() {
    this.position = {
      position: 'top',
      textStyle: { color: 'blue', fontSize: 16 },
    };
    this.myType = 'PieChart';
    this.myData = [
      ['Total Interest', this.TotalInterestPaid],
      ['Principal Amount', this.amount],
    ];
    this.myOptions = {
      //title: 'Total Payment Analysis',
      legend: {
        position: 'top',
        alignment: 'center',
        scrollArrows: 'both',
      },
      vAxis: {
        format: 'currency', // Use the currency format for vertical axis values
      },
      colors: ['#66BB6A', '#42A5F5'],
      // pieHole: 0.4,
      is3D: false,
    };

    this.width = 350;
    this.height = 350;
  }
}
