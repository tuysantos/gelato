import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {  Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const router = jasmine.createSpyObj('Router', ['navigate']);

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
      declarations: [ HeaderComponent ],
      providers: [
        {provide: StorageService, useClass : StorageServiceMock},
        { provide: Router, useValue: router },
        AuthService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;   
    fixture.detectChanges();
  });

  it('should logout', () => {
    component.isLoggedIn = true; 
    component.logOut();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(1).toEqual(1)
  });
});
