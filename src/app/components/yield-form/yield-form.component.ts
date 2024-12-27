import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { YieldResult } from '../../models/yield.model';

@Component({
  selector: 'app-yield-form',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './yield-form.component.html',
  styleUrl: './yield-form.component.scss'
})
export class YieldFormComponent {

  
  public faCoffee = faCoffee;
  
  public yieldForm: FormGroup;
  public yieldResult!: YieldResult;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.yieldForm= this.fb.group({
      purchasePrice: ['',[
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/),
      ]],
      monthlyRent: ['', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/),
      ]],
      annualCharges: ['', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/),
      ]],
      
    })
  }

  public onSubmit() {
    if (this.yieldForm.invalid) {
      this.toastr.clear();
      const fieldNames: { [key: string]: string } = {
        purchasePrice: 'Purchase price',
        monthlyRent: 'Monthly rent',
        annualCharges: 'Annual rental charges',
      };
      Object.keys(this.yieldForm.controls).forEach(field => {
        const control = this.yieldForm.get(field);
        const readableName = fieldNames[field] || field; 
        if (control?.invalid) {
          if (control.errors?.['required']) {
            this.toastr.error(`${readableName} is required.`, 'Form error');
          }
          if (control.errors?.['pattern']) {
            this.toastr.error(`${readableName} must be a valid number.`, 'Form error');
          }
        }
        control?.markAsTouched({ onlySelf: true });
      });
    } else {
      this.yieldResult = this.calculateYield(
        this.yieldForm.get('purchasePrice')?.value,
        this.yieldForm.get('monthlyRent')?.value,
        this.yieldForm.get('annualCharges')?.value
      )
    }
  }

  public calculateYield(purchasePrice: number, monthlyRent: number, annualCharges: string): YieldResult {
    const commission1 = (monthlyRent * 12) * 0.30;
    const commission2 = (monthlyRent * 12) * 0.25;
    const commission3 = (monthlyRent * 12) * 0.20;

    const annualRent = monthlyRent * 12;

    console.log('annualRent')
    console.log(annualRent)
    console.log('commission1')
    console.log(commission1)

    console.log('annualCharges')
    console.log(annualCharges)

    const pd: number = parseInt(annualCharges, 10)
    const netIncomeYear1 = annualRent - (commission1 + pd);
    const netIncomeYear2 = annualRent - (commission2 + pd);
    const netIncomeYear3 = annualRent - (commission3 + pd);

    const netIncomeMonthly1 = netIncomeYear1 / 12;
    const netIncomeMonthly2 = netIncomeYear2 / 12;
    const netIncomeMonthly3 = netIncomeYear3 / 12;

    const annualYield1 = (netIncomeYear1 / purchasePrice) * 100;
    const annualYield2 = (netIncomeYear2 / purchasePrice) * 100;
    const annualYield3 = (netIncomeYear3 / purchasePrice) * 100;


    console.log('netIncomeYear1')
    console.log(netIncomeYear1)

    console.log('netIncomeMonthly1')
    console.log(netIncomeMonthly1)

    console.log('annualYield1')
    console.log(annualYield1)

    console.log('purchasePrice')
    console.log(purchasePrice)

    console.log('monthlyRent')
    console.log(monthlyRent)

    console.log('annualCharges')
    console.log(annualCharges)

    console.log('annualRent - (commission1 + annualCharges) = ');
console.log(annualRent - (commission1 + pd));

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
