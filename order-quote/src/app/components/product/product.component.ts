import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductOrder } from 'src/app/Model/data.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { QuoteService } from 'src/app/services/quote.service';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'product-view',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public form: FormGroup;
  @Output() productEvent: EventEmitter<any> = new EventEmitter<any>();
  product: ProductOrder;
  products: any[];
  productUid: string;
  selectedProduct : ProductOrder;

  constructor(private quoteService: QuoteService, private storageService: StorageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.quoteService.getProductIds().pipe(take(1)).subscribe((response) => {
      this.products = response;
      this.productUid = this.products[0].id;
      this.createForm();
      this.getCurrentProduct();
    });
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      qty: [ '', [ Validators.required, Validators.pattern('^[1-9][0-9]{0,2}$') ]]
    });
  }

  public getCurrentProduct(): void{
    this.product = this.storageService.getProduct();
    if(this.product){
       this.form.setValue({
         qty : this.product.qty
       });
       this.productUid = this.product.id;
    }
  }

  selectProduct(id: string): void {
    this.productUid = id;
  }

  public onSubmit(): void{
    //const numInput = document.querySelector('input');
    // this.selectedProduct = {
    //   id: this.productUid,
    //   qty: JSON.parse(numInput.value)
    // }

    this.selectedProduct = {
      id: this.productUid,
      qty: this.form.value.qty
    }

    if(this.form.valid){
      this.productEvent.emit(this.selectedProduct);
    }
  }

}
