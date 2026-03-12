import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomStockPrice } from './random-stock-price';

describe('RandomStockPrice', () => {
  let component: RandomStockPrice;
  let fixture: ComponentFixture<RandomStockPrice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomStockPrice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomStockPrice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
