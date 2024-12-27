import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { YieldResult } from '../../models/yield.model';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared/shared.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-card-result',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card-result.component.html',
  styleUrl: './card-result.component.scss'
})
export class CardResultComponent implements OnInit, OnDestroy{

  public yieldResult!: YieldResult;

  private unsubscribe = new Subject<void>();

  constructor(
    private sharedService: SharedService
  ) {}

  public ngOnInit() { 
    this.sharedService.data$.pipe(takeUntil(this.unsubscribe)).subscribe((data: YieldResult) => {
      this.yieldResult = data;
      console.log(this.yieldResult)
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
