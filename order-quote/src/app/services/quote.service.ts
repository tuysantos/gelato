import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of as ObservableOf} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Currency } from '../Model/data.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  baseUrl = environment.apiEndPointURL;

  constructor(public httpClient: HttpClient) { }

  public getOrderQuote(params: any): Observable<any> {
    const url = `${this.baseUrl}/api/quote`;
    return this.httpClient.post(url, params, {
      withCredentials: true
    }).pipe(
      map(response => response)
    );
  }

  public getCurrencies(): Observable<Currency[]> {
    return ObservableOf(this.getMockedCurrencies());
  }
  
  private getMockedCurrencies(): Currency[]{
    return [
      {id:'GBP', name:'Pound Sterling', symbol:'£'},
      {id:'EUR', name:'Euro', symbol:'€'},
      {id:'NOK', name:'Norwegian Krone', symbol:'kr'},
      {id:'USD', name:'US Dollar', symbol:'$'},
      {id:'UAH', name:'Hryvnia', symbol:'₴'},
      {id:'CHF', name:'Swiss Franc', symbol:'CHF'},
      {id:'ZAR', name:'Rand', symbol:'R'},
      {id:'RUR', name:'Russian Ruble', symbol:'₽'},
      {id:'DKK', name:'Danish Krone', symbol:'kr'}
    ];
  }

  public getProductIds(): Observable<any[]> {
    return ObservableOf(this.getMockedProductIds());
  }

  private getMockedProductIds(): any[] {
    return [
      {id:'cards_pf_bc_pt_350-gsm-coated-silk_cl_4-4_ct_glossy-lamination_ver_variable', name:'Cards 350gsm glossy lamination ver variable'},
      {id:'cards_pf_bc_pt_350-gsm-coated-silk_cl_4-4_ct_glossy-lamination_hor_variable', name:'Cards 350gsm glossy lamination hor variable'},
      {id:'cards_pf_a5_pt_350-gsm-coated-silk_cl_4-4_ver', name:'Cards A5 350gsm ver variable'},
      {id:'cards_pf_a5_pt_350-gsm-coated-silk_cl_4-4_hor', name:'Cards A5 350gsm hor variable'}
    ]
  }
}
