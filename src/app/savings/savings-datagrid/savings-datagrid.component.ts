import { Component, Input, OnInit } from '@angular/core';
import { Goal } from './../models/goal.model';
import { Month } from './../models/month.model';

@Component({
  selector: 'app-savings-datagrid',
  templateUrl: './savings-datagrid.component.html',
  styleUrls: ['./savings-datagrid.component.scss']
})
export class SavingsDatagridComponent implements OnInit {

  @Input() goal: Goal;
  @Input() months: Month[];

  constructor() { }

  ngOnInit() { }

  monthlyGoal(): number {
    return this.goal.amount / this.goal.months;
  }

  forcastedAmount(month: Month, index: number): number {
    if (month.amount) {
      return month.amount;
    }

    const notEmptySlicedMonths = this.months
      .slice(0, index)
      .filter(element => element.amount);

    if (notEmptySlicedMonths.length === 0) {
      return this.monthlyGoal();
    }

    const previousMonthSum = notEmptySlicedMonths
      .map(element => element.amount)
      .reduce((sum, current) => sum + current);

    return previousMonthSum / notEmptySlicedMonths.length;
  }

  amountSum(): number {
    return this.months
      .map(month => month.amount ? month.amount : 0)
      .reduce((sum, current) => sum + current);
  }

  forecastedAmountSum(): number {
    return this.months
      .map((month, index) => this.forcastedAmount(month, index))
      .reduce((sum, current) => sum + current);
  }

}