import { Injectable } from '@angular/core';
import { Observable, of as ObservableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiEndPointURL;

  constructor(private storageService: StorageService) { }

  public login(user: string, password: string): Observable<boolean> {
    return ObservableOf(this.isValidUser(user, password)).pipe(
      map(response => {
        if(response){
          this.toggleLogin('true');
          this.storageService.setUserName(user);
          this.storageService.setUserPassword(password);
          this.storageService.setHeader();
        }
        return response;
      })
    );
  }

  public logOut(): Observable<boolean> {
    this.storageService.resetHeader();
    this.storageService.setIsLogged('false');
    this.storageService.resetUserCredentials();
    this.storageService.resetData();
    return ObservableOf(true);
  } 

  public toggleLogin(status: string): void {
    this.storageService.setIsLogged(status);
    this.storageService.resetHeader();
  }

  private isValidUser(user: string, pwd: string): boolean {
    this.toggleLogin('false');
    return (user === 'admin') && (pwd === 'supersecret');
  }
}
