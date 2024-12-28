import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { SharedService } from '../../services/shared/shared.service';
import { Subject, takeUntil } from 'rxjs';
import { YieldResult } from '../../models/yield.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit, OnDestroy {

  public chart: any;

  public yieldResult!: YieldResult;
  
  private unsubscribe = new Subject<void>();

  constructor(
    private sharedService: SharedService,
    private elementRef: ElementRef
  ) {}

  public ngOnInit() {
    console.log('Line Chart Init')
    this.sharedService.data$.pipe(takeUntil(this.unsubscribe)).subscribe((data: YieldResult) => {
      this.yieldResult = data;
      console.log(this.yieldResult)
      if (Object.keys(this.yieldResult).length > 0) {
        this.createChart();
      }
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public createChart(){
    if (
      this.chart &&
      Object.keys(this.yieldResult).length > 0
    ) {
      this.chart.destroy();
    }
    
    const labels = ["Year 1", "Year 2", "Year 3"];
    const netMonthlyIncme = [
      this.yieldResult.year1?.netIncomeMonthly,
      this.yieldResult.year2?.netIncomeMonthly, 
      this.yieldResult.year3?.netIncomeMonthly]; 
    const netYield = [
      this.yieldResult.year1?.annualYield,
      this.yieldResult.year2?.annualYield,
      this.yieldResult.year3?.annualYield,
    ]; 

    let htmlRef = this.elementRef.nativeElement.querySelector(`#MyChart`);

    this.chart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Net monthly income (€)',
            data: netMonthlyIncme,
            backgroundColor: 'rgba(64, 161, 96, 0.5)', 
            borderColor: 'rgba(64, 161, 96, 0.5)',
            borderWidth: 1,
            yAxisID: 'y', 
          },
          {
            label: 'Return on investment (%)',
            data: netYield,
            type: 'line', 
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4, 
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: true, 
          },
          legend: {
            position: 'bottom',
          },
        },
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Net monthly income (€)',
            },
            beginAtZero: true,
          },
          y1: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'Return on investment (%)',
            },
            beginAtZero: true,
            grid: {
              drawOnChartArea: false, 
            },
          },
        },
      },
    });
  }
}
