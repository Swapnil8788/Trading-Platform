import { Component, OnInit } from '@angular/core';
import { Data } from '../../Services/data';

@Component({
  selector: 'app-random-stock-price',
  imports: [],
  templateUrl: './random-stock-price.html',
  styleUrl: './random-stock-price.scss',
})
export class RandomStockPrice implements OnInit {
  constructor(private dataService: Data) {}

  ngOnInit(): void {
  }
}
