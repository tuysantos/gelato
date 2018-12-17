import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { ProductOrder, Recipient } from '../Model/data.model';

describe('StorageService', () => {
  let store = {};
  const userName = 'USER_NAME';
  const userPassword = 'USER_PASSWORD';
  const _isLogged = 'IS_LOGGED';
  const userRecipient = 'USER_RECIPIENT';
  const userProduct = 'USER_PRODUCT';

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StorageService]
  }));

  beforeEach(() => {
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
  });

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });

  it('should store userName', inject([StorageService], (service: StorageService)=>{
    service.setUserName('admin');
    expect(localStorage.getItem(userName)).toEqual('admin')
  }));

  it('should have a valid header', inject([StorageService], (service: StorageService)=>{
    let product : ProductOrder = {
      id: 'cards_pf_bc_pt_350-gsm-coated-silk_cl_4-4_ct_glossy-lamination_ver_variable',
      qty: 23
    };
    let recipient: Recipient = {
      'countryIsoCode': 'NO',
      'currencyIsoCode': 'NOK',
      'addressLine1': 'Snarøyveien 30C',
      'addressLine2': 'Gelato AS',
      'city': 'Fornebu',
      'postcode': '1360',
      'firstName': 'Eivind',
      'lastName': 'Ingebrigtsen',
      'email': 'eivind@gelato.com',
      'phone': '+4793685139'};
    service.setProduct(product);
    service.setRecipient(recipient);

    expect(JSON.parse(localStorage.getItem(userRecipient))).toEqual(recipient);
    expect(JSON.parse(localStorage.getItem(userProduct))).toEqual(product);

    service.resetData();
    expect(localStorage.getItem(userRecipient)).toEqual(null);
    expect(localStorage.getItem(userProduct)).toEqual(null);
  }));
});
