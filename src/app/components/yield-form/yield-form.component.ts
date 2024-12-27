import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
  
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.yieldForm= this.fb.group({
      purchasePrice: ['',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]],
      monthlyRent: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]],
      annualCharges: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
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
    }
  }


}
