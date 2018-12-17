import { Component, OnInit } from '@angular/core';
import { Recipient, Product, ProductOrder, Quote, ProductData } from 'src/app/Model/data.model';
import { StorageService } from 'src/app/services/storage.service';
import { QuoteService } from 'src/app/services/quote.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'quote-view',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  public isLoggedIn = false;
  public isRecipientDone = false;
  public isProductDone = false;
  public hasQuote = false;
  public activeStep = 0;
  public step1HasData = false;
  public step2HasData = false;
  public quote: Quote;
  public quoteResult: ProductData[];
  public quoteCurrency: string;

  constructor(private storageService: StorageService, private quoteService: QuoteService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.storageService.getIsLogged();
    if(this.activeStep === 0){
      this.isRecipientDone = true;
    }else {
      if(this.activeStep === 1){
        this.isProductDone = true;
      }
    }
  }

  setActiveStep(index: number): void {
    this.activeStep = index;
  }

  setRecipientData(recipient: Recipient): void{
    if(recipient){
      this.storageService.setRecipient(recipient);
      this.step1HasData = true;
      this.setActiveStep(1);
      this.isRecipientDone = true;
      this.isProductDone = true;
    }
  }

  resetRecipientData(): void{
    this.storageService.resetRecipient();
    this.step1HasData = false;
    this.isRecipientDone = false;
    this.setActiveStep(0);
  }

  setProductData(product: ProductOrder): void{
    if(product){
      let recipient = this.storageService.getRecipient();
      this.storageService.setProduct(product);
      this.step2HasData = true;
      this.setActiveStep(2);
      this.isProductDone = true;
      this.quote = this.buildOrder();
      /*this.quoteService.getOrderQuote(this.quote).pipe(take(1))
      .subscribe(data => {
        this.quoteResult = data;
        this.setActiveStep(3);
      });*/

      //mock result
      this.quoteResult = [
        {id: '1', name: 'name1', price: 300},
        {id: '2', name: 'name2', price: 350},
        {id: '3', name: 'name3', price: 400},
        {id: '4', name: 'name4', price: 450},
        {id: '5', name: 'name5', price: 500}
      ];
      this.getCurrencySymbol(recipient.currencyIsoCode);
      this.setActiveStep(2);
      this.hasQuote = true;
    }
  }

  public buildOrder(): Quote{
    let product = this.storageService.getProduct();
    let recipient = this.storageService.getRecipient();
    let quote: Quote;
    //Mock data
    return quote = {
      recipient: recipient,
      order: {
        orderReferenceId: 84110,
        customerReferenceId: 85110,
        currencyIsoCode: "NOK"
        },
      product: {
        "itemReferenceId": 86110,
        "productUid": "cards_pf_bc_pt_350-gsm-coated-silk_cl_4-4_ct_glossy-lamination_ver_variable",
        "pdfUrl": "https://www.dropbox.com/s/nh7kdv6jam5bfsy/B-C-Eivind.pdf?dl=1",
        "quantity": 278
      }
    };

    /*return quote = {
      recipient: recipient,
      order: {
        orderReferenceId: 84110,
        customerReferenceId: 85110,
        currencyIsoCode: recipient.currencyIsoCode
        },
      product: {
        "itemReferenceId": 86110,
        "productUid": product.id,
        "pdfUrl": "https://www.dropbox.com/s/nh7kdv6jam5bfsy/B-C-Eivind.pdf?dl=1",
        "quantity": product.qty
      }
    }*/
  }

  resetProductData(): void{
    this.storageService.resetProduct();
    this.step2HasData = false;
    this.isProductDone = false;
    this.setActiveStep(1);
  }

  getCurrencySymbol(currency: string): void{
    this.quoteService.getCurrencies().pipe(take(1)).subscribe(data => {
      let currencies = data;
      
      for(let i=0; i<currencies.length; i++){
        if(currencies[i].id === currency){
          this.quoteCurrency = currencies[i].symbol;
          break;
        }
      }
    });
  }
}
