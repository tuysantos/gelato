import { TestBed, inject } from '@angular/core/testing';

import { QuoteService } from './quote.service';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('QuoteService', () => {
  let quoteData = {
    id:1,
    productName: 'xpto'
  };
  
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthService ],
      imports: [
        HttpClientTestingModule
      ]
  }));

  it('should return 4 products', inject([HttpTestingController, QuoteService], 
    (httpMock: HttpTestingController, 
    quoteService: QuoteService)=>{
      let products: any[];
      quoteService.getProductIds().subscribe(data =>{
        products = data;
        expect(products.length).toEqual(4);
        expect(products[0].id).toEqual('cards_pf_bc_pt_350-gsm-coated-silk_cl_4-4_ct_glossy-lamination_ver_variable')
      });
  }));

  it('should return 9 currencies with GBP as default', inject([HttpTestingController, QuoteService], 
    (httpMock: HttpTestingController, 
    quoteService: QuoteService)=>{
      let currencies: any[];
      quoteService.getCurrencies().subscribe(data =>{
        currencies = data;
        expect(currencies.length).toEqual(9);
        expect(currencies[0].id).toEqual('GBP')
      });
  }));

  xit('should return a quote', inject([HttpTestingController, QuoteService], 
    (httpMock: HttpTestingController, 
    quoteService: QuoteService)=>{
      let quote = {
        recipient: {
          firstName:'Paul',
          lastName:'Smith',
          address1:'First Line of address',
          address2:'Second Line of address',
          city:'London',
          postcode:'W12 0BG',
          email:'paul_smith@gmail.com',
          phone:'07542365102',
          countryIsoCode: 'No',
          currencyIsoCode: 'GBP'
        },
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
      spyOn(quoteService, 'getOrderQuote').and.returnValue(
        quoteData
      );

      // quoteService.getOrderQuote(quote).subscribe(data =>{
      //   expect(data).toEqual('xpto')
      // });
  }));
});
