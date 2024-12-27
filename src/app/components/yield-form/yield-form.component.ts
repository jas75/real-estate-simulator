import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    private fb: FormBuilder
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
    console.log(this.yieldForm)
  }


}
