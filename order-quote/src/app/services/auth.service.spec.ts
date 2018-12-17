import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

describe('AuthService', () => {

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

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthService,
      {provide: StorageService, useClass : StorageServiceMock}]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should login with correct credentials', inject([AuthService], (service: AuthService)=>{
    service.login('admin', 'supersecret').subscribe(data =>{
      expect(data).toBe(true);
    });
  }));

  it('should not login with incorrect credentials', inject([AuthService], (service: AuthService)=>{
    service.login('admin', 'pasword123').subscribe(data =>{
      expect(data).toBe(false);
    });
  }));

  it('should logout', inject([AuthService], (service: AuthService)=>{
    service.logOut().subscribe(data =>{
      expect(data).toBe(true);
    });
  }));
});
