import { Component, OnInit, Input } from '@angular/core';
import { increaseElementDepthCount } from '@angular/core/src/render3/state';
import { ProductData } from 'src/app/Model/data.model';

@Component({
  selector: 'order-view',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Input() orderData: ProductData[];
  @Input() quoteCurrency: string;

  constructor() { }

  ngOnInit() {
  }

}
