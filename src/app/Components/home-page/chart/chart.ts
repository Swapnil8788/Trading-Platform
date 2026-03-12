import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';
import { Data } from '../../../Services/data';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.html',
  styleUrl: './chart.scss',
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  startTime: Date = new Date(new Date().setHours(9,30,10,0));
  
  constructor(private dataService: Data) {}

  ngOnInit(): void {
    this.dataService.stockPrice$.subscribe((price)=>{
      this.stockPriceData.push(price);
      this.startTime.setSeconds(this.startTime.getSeconds() + 2);
      this.timeData.push(this.startTime.toLocaleTimeString() + "AM");
      this.chart?.update();    
    })
  }

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart<'line'> | null = null;
  private stockPriceData: number[] = [];
  private timeData: string[] = ["9:30:00 AM","9:30:02 AM","9:30:04 AM","9:30:06 AM","9:30:08 AM","9:30:10 AM"];
  // we need to wait till viewchild is initialized
  ngAfterViewInit(): void {
    this.initChart();
  }

  // we need to destroy the chart when the component is destroyed
  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private initChart(): void {
    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: this.timeData,
        datasets: [
          {
            label: 'Stock Price',
            data: this.stockPriceData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            fill: true,
            tension: 0.3,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Stock Price',
              font: {
                size: 12,
                weight: 'bold'
              },
            },
          },
        },
      },
    };

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, config);
    }
  }
  public beginTrading(): void {
    this.dataService.generateRandomStockPrice();
    
  }
  public stopTrading(): void {
    this.dataService.stopGeneratingRandomStockPrice();
  }
}
