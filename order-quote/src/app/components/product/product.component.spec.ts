import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ProductComponent } from './product.component';
import {By} from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgxErrorsModule } from '@hackages/ngxerrors';

import { StorageService } from 'src/app/services/storage.service';
import { QuoteService } from 'src/app/services/quote.service';
import { of as ObservableOf} from 'rxjs';
import { ProductOrder } from 'src/app/Model/data.model';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let submitEl: DebugElement;
  let QtyEl: DebugElement;

  class QuoteServiceMock {
    getProductIds() {
      return ObservableOf([
        {id:'cards_pf_bc_pt_350-gsm-coated-silk_cl_4-4_ct_glossy-lamination_ver_variable', name:'Cards 350gsm glossy lamination ver variable'},
        {id:'cards_pf_bc_pt_350-gsm-coated-silk_cl_4-4_ct_glossy-lamination_hor_variable', name:'Cards 350gsm glossy lamination hor variable'},
        {id:'cards_pf_a5_pt_350-gsm-coated-silk_cl_4-4_ver', name:'Cards A5 350gsm ver variable'},
        {id:'cards_pf_a5_pt_350-gsm-coated-silk_cl_4-4_hor', name:'Cards A5 350gsm hor variable'}
      ]);
    }
  }
  class StorageServiceMock {
    getProduct () {
      return ObservableOf({
        id: '',
        qty: 0
    });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      providers: [
        {provide: QuoteService, useClass : QuoteServiceMock},
        {provide: StorageService, useClass : StorageServiceMock},
        {provide: FormBuilder, useValue: formBuilder}
      ],
      imports: [
        ReactiveFormsModule, FormsModule, NgxErrorsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    component.form = formBuilder.group({
      qty: [ '', [ Validators.required, Validators.pattern('^[1-9][0-9]{0,2}$') ]]
    })

    submitEl = fixture.debugElement.query(By.css('button'));
    QtyEl = fixture.debugElement.query(By.css('input[type=number]'));
    fixture.detectChanges();
  });


  it('should create component and on submit should emit an event', ()=> {
    let productOrder: ProductOrder;
    component.form.controls['qty'].setValue(23);
    component.productUid = 'cards_pf_a5_pt_350-gsm-coated-silk_cl_4-4_ver';
    component.productEvent.subscribe((product)=> productOrder = product);
    submitEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.form.valid).toBe(true);
    expect(productOrder.id).toBe('cards_pf_a5_pt_350-gsm-coated-silk_cl_4-4_ver');
    expect(productOrder.qty).toBe(23);
  });

});
