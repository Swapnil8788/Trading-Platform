import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart';

@Component({
  selector: 'app-home-page',
  imports: [ChartComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
