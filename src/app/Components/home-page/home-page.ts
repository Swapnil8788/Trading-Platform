import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from './chart/chart';

@Component({
  selector: 'app-home-page',
  imports: [ChartComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  @ViewChild('chartComponent') chartComponent!: ChartComponent;
  
  beginTradingDay(): void {
    this.chartComponent.beginTrading();
  }
  stopTradingDay(): void {
    this.chartComponent.stopTrading();
  }
}
