import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private stockPriceSubject = new BehaviorSubject<number>(146);
  stockPrice$ = this.stockPriceSubject.asObservable();
  intervalId: any;

  

  generateRandomStockPrice(): void {
   if(this.intervalId){
    return;
   }
    this.intervalId = setInterval(() => {
      const lastPrice = this.stockPriceSubject.value;
      let randomPrice: number;
      if(Math.random() > 0.5){
        randomPrice = lastPrice + (Math.random() * 5);
      }else{
        randomPrice = lastPrice - (Math.random() * 5);
      }
      this.stockPriceSubject.next(randomPrice);
    }, 1000);
  }
  stopGeneratingRandomStockPrice(): void{
    clearInterval(this.intervalId);
    this.intervalId = null
  }
}
