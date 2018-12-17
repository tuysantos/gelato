import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuoteService } from 'src/app/services/quote.service';
import { take } from 'rxjs/operators';
import { Currency, Recipient } from 'src/app/Model/data.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'recipient-view',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit {
  public form: FormGroup;
  currencies: Currency[];
  recipient: Recipient;
  countryIsoCode: string = 'Yes';
  currencyIsoCode: string;

  @Output() recipientEvent: EventEmitter<Recipient> = new EventEmitter<Recipient>();

  constructor(private quoteService: QuoteService, private storageService: StorageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.getCurrencies();
    this.getCurrentRecipient();
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      firstName: [ '', [ Validators.required ]],
      lastName: [ '', [ Validators.required ]],
      address1: [ '', [ Validators.required ]],
      address2: [ '', [ Validators.required ]],
      city: [ '', [ Validators.required ]],
      postcode: [ '', [ Validators.required ]],
      email: [ '', [ Validators.required, Validators.email ]],
      phone: [ '', [ Validators.required ]]
    });
  }

  public getCurrencies(): void{
    this.quoteService.getCurrencies()
      .pipe(
        take(1)
      ).subscribe((response) => {
        this.currencies = response;
        this.currencyIsoCode = this.currencies[0].id;
      });
  }

  public selectCurrency(value: string): void {
    this.currencyIsoCode = value;
  }

  public selectIso(value: string): void {
    this.countryIsoCode = value;
  }

  public getCurrentRecipient():void {
    this.recipient = this.storageService.getRecipient();
    if(this.recipient){
      this.form.setValue({
        address1 : this.recipient.addressLine1,
        address2 : this.recipient.addressLine2,
        city : this.recipient.city,
        postcode : this.recipient.postcode,
        firstName : this.recipient.firstName,
        lastName : this.recipient.lastName,
        email : this.recipient.email,
        phone : this.recipient.phone
      });      
      this.countryIsoCode = this.recipient.countryIsoCode;
      this.currencyIsoCode = this.recipient.currencyIsoCode;
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.recipient = {
        countryIsoCode: this.countryIsoCode,
        currencyIsoCode: this.currencyIsoCode,
        addressLine1: this.form.value.address1,
        addressLine2: this.form.value.address2,
        city: this.form.value.city,
        postcode: this.form.value.postcode,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone
      };
      this.recipientEvent.emit(this.recipient);
    }
  }

}
