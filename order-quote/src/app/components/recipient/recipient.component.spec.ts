import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RecipientComponent } from './recipient.component';
import { QuoteService } from 'src/app/services/quote.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { NgxErrorsModule } from '@hackages/ngxerrors';
import { of as ObservableOf} from 'rxjs';
import { Recipient } from 'src/app/Model/data.model';

describe('RecipientComponent', () => {
  let component: RecipientComponent;
  let fixture: ComponentFixture<RecipientComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let submitEl: DebugElement;
  let QtyEl: DebugElement;

  class QuoteServiceMock {
    getCurrencies() {
      return ObservableOf([
        {id:'GBP', name:'Pound Sterling'},
        {id:'EUR', name:'Euro'},
        {id:'NOK', name:'Norwegian Krone'},
        {id:'USD', name:'US Dollar'},
        {id:'UAH', name:'Hryvnia'},
        {id:'CHF', name:'Swiss Franc'},
        {id:'ZAR', name:'Rand'},
        {id:'RUR', name:'Russian Ruble'},
        {id:'DKK', name:'Danish Krone'}
      ]);
    }
  }
  class StorageServiceMock {
    getProduct () {
      return ObservableOf({
        id: '',
        qty: 0
    });
    };
    getRecipient(): Recipient{
      return null;
    }
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientComponent ],
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
    fixture = TestBed.createComponent(RecipientComponent);
    component = fixture.componentInstance;

    component.form = formBuilder.group({
      firstName: [ '', [ Validators.required ]],
      lastName: [ '', [ Validators.required ]],
      address1: [ '', [ Validators.required ]],
      address2: [ '', [ Validators.required ]],
      city: [ '', [ Validators.required ]],
      postcode: [ '', [ Validators.required ]],
      email: [ '', [ Validators.required, Validators.email ]],
      phone: [ '', [ Validators.required ]]
    })

    fixture.detectChanges();
  });

  it('should submit the form', () => {
    let myRecipient: Recipient;
    component.form.controls['firstName'].setValue('Paul');
    component.form.controls['lastName'].setValue('Smith');
    component.form.controls['address1'].setValue('First Line of address');
    component.form.controls['address2'].setValue('Second Line of address');
    component.form.controls['city'].setValue('London');
    component.form.controls['postcode'].setValue('W12 0BG');
    component.form.controls['email'].setValue('paul_smith@gmail.com');
    component.form.controls['phone'].setValue('07542365102');
    component.countryIsoCode = 'No';
    component.currencyIsoCode = 'GBP';

    component.recipientEvent.subscribe((recipient)=> myRecipient = recipient);
    component.onSubmit();
    fixture.detectChanges();
    expect(component.form.valid).toBe(true);
    expect(myRecipient.firstName).toEqual('Paul');
    expect(myRecipient.lastName).toEqual('Smith');
  });

  it('should be invalid form', () => {
    let myRecipient: Recipient;
    component.form.controls['firstName'].setValue('Paul');
    component.form.controls['lastName'].setValue('Smith');
    component.form.controls['address1'].setValue('');
    component.form.controls['address2'].setValue('');
    component.form.controls['city'].setValue('London');
    component.form.controls['postcode'].setValue('W12 0BG');
    component.form.controls['email'].setValue('paul_smith@gmail.com');
    component.form.controls['phone'].setValue('07542365102');
    component.countryIsoCode = 'No';
    component.currencyIsoCode = 'GBP';

    component.recipientEvent.subscribe((recipient)=> myRecipient = recipient);
    component.onSubmit();
    fixture.detectChanges();
    expect(component.form.valid).toBe(false);
    expect(component.form.value.address1).toEqual('');
    expect(component.form.value.address2).toEqual('');
  });
});
