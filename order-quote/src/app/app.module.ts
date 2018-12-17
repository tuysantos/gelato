import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxErrorsModule } from '@hackages/ngxerrors';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuoteComponent } from './components/quote/quote.component';
import { RecipientComponent } from './components/recipient/recipient.component';
import { ProductComponent } from './components/product/product.component';
import { StepComponent } from './components/step/step.component';
import { OrderComponent } from './components/order/order.component';
import { QuoteService } from './services/quote.service';
import { LoginComponent } from './components/login/login.component';
import { QuoteInterceptor } from './quote.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuoteComponent,
    RecipientComponent,
    ProductComponent,
    StepComponent,
    OrderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxErrorsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: QuoteInterceptor, multi: true },
    StorageService, AuthService, QuoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
