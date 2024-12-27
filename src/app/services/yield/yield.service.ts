import { Injectable } from '@angular/core';
import { YieldResult } from '../../models/yield.model';

@Injectable({
  providedIn: 'root'
})
export class YieldService {

  constructor() { }

  public calculateYield(purchasePrice: number, monthlyRent: number, annualCharges: string): YieldResult {
    const commission1 = (monthlyRent * 12) * 0.30;
    const commission2 = (monthlyRent * 12) * 0.25;
    const commission3 = (monthlyRent * 12) * 0.20;

    const annualRent = monthlyRent * 12;

    const parsedAnnuelCharges: number = parseInt(annualCharges, 10)
    const netIncomeYear1 = annualRent - (commission1 + parsedAnnuelCharges);
    const netIncomeYear2 = annualRent - (commission2 + parsedAnnuelCharges);
    const netIncomeYear3 = annualRent - (commission3 + parsedAnnuelCharges);

    const netIncomeMonthly1 = netIncomeYear1 / 12;
    const netIncomeMonthly2 = netIncomeYear2 / 12;
    const netIncomeMonthly3 = netIncomeYear3 / 12;

    const annualYield1 = (netIncomeYear1 / purchasePrice) * 100;
    const annualYield2 = (netIncomeYear2 / purchasePrice) * 100;
    const annualYield3 = (netIncomeYear3 / purchasePrice) * 100;

    return {
        year1: {
            netIncomeMonthly: netIncomeMonthly1,
            annualYield: annualYield1
        },
        year2: {
            netIncomeMonthly: netIncomeMonthly2,
            annualYield: annualYield2
        },
        year3: {
            netIncomeMonthly: netIncomeMonthly3,
            annualYield: annualYield3
        }
    };
  }
}
