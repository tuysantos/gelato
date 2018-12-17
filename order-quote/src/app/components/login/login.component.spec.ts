import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {By} from "@angular/platform-browser";
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Observable, of as ObservableOf} from 'rxjs';
import { NgxErrorsModule } from '@hackages/ngxerrors';
import { HeaderComponent } from '../header/header.component';
import { QuoteComponent } from '../quote/quote.component';
import { Router } from '@angular/router';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const router = jasmine.createSpyObj('Router', ['navigate']);
  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;
  let loginResult = false;

  class AuthServiceMock {
    login (user: string, pwd: string): Observable<boolean> {
      return ObservableOf(true);
    }
  }

  class StorageServiceMock {
    resetHeader() {

    };
    resetUserCredentials(){

    };
    resetData() {

    };
    setIsLogged(status: string): void{

    };
    setUserName(user: string):void{};
    setUserPassword(password: string):void{};
    setHeader():void{};
    getIsLogged(){};
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, QuoteComponent ],
      providers: [
        {provide: StorageService, useClass : StorageServiceMock},
        {provide: FormBuilder, useValue: formBuilder},
        { provide: Router, useValue: router },
        AuthService
      ],
      imports: [
        ReactiveFormsModule, FormsModule, NgxErrorsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      TestBed.configureTestingModule({
       declarations: [ LoginComponent, HeaderComponent ]
       
      });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    component.form = formBuilder.group({
      userName: [ '', [ Validators.required ]],
      password: [ '', [ Validators.required ]]
    })

    submitEl = fixture.debugElement.query(By.css('button'));
    loginEl = fixture.debugElement.query(By.css('input[type=text]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
    fixture.detectChanges();
  });

  it('should be invalid user and password', ()=>{
    component.form.controls['userName'].setValue('admin');
    component.form.controls['password'].setValue('123456');
    loginResult = false;
    component.isLoggedIn = false;
    component.onSubmit();
    fixture.detectChanges();
    expect(component.form.valid).toBe(true);
    expect(component.error).toEqual(true);
    expect(component.errorMessage).toEqual('Invalid user or password');
  });

  it('should accept user and password', ()=>{
    component.form.controls['userName'].setValue('admin');
    component.form.controls['password'].setValue('supersecret');
    loginResult = false;
    component.isLoggedIn = false;

    component.onSubmit();
    fixture.detectChanges();
    expect(component.form.valid).toBe(true);
    expect(component.error).toEqual(false);
  });
});
