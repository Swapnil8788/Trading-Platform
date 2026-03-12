import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.html',
  styleUrl: './chart.scss',
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart<'line'> | null = null;
  private stockPriceData: number[] = [12, 19, 15, 25, 22, 37, 2, 14,16, 13, 35,89, 31];
  private timeData: string[] = ["9:30:00AM", "9:30:02AM", "9:30:04AM", "9:30:06AM", "9:30:08AM", "9:30:10AM", "9:30:12AM", "9:30:14AM", "9:30:16AM", "9:30:18AM", "9:30:20AM", "9:30:22AM", "9:30:24AM","9:30:26AM","9:30:28AM"];
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
}
