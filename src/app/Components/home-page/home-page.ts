import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from './chart/chart';
import { NgClass, NgIf } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [ChartComponent, NgClass,NgIf, DecimalPipe, FormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  @ViewChild('chartComponent') chartComponent!: ChartComponent;
  stockPrice: number = 146;
  stockPriceChange: number = 0;
  isGain: boolean = false;
  triggerPrice: number | null = null;
  triggerPriceHit: boolean = false
  isFeedActive: boolean = false;

  beginTradingDay(): void {
    this.isFeedActive = true;
    this.chartComponent.beginTrading();
  }
  stopTradingDay(): void {
    this.isFeedActive = false;
    this.chartComponent.stopTrading();
  }
  
  onStockPriceUpdated(price: number): void {
    this.triggerPriceHit = false;
    if(this.triggerPrice && this.triggerPrice >= price){
      console.log("Trigger price hit", this.triggerPrice, price)
      this.triggerPriceHit = true;
    }
    if(price >= this.stockPrice){
      this.isGain = true;
    }else{
      this.isGain = false;
    }
    this.stockPriceChange = Number((price - this.stockPrice).toFixed(2));
    this.stockPrice = Number(price.toFixed(2));
  }
}
