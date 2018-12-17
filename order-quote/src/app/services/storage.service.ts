import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recipient, Product, ProductOrder } from '../Model/data.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private userName = 'USER_NAME';
  private userPassword = 'USER_PASSWORD';
  private _isLogged = 'IS_LOGGED';
  private userRecipient = 'USER_RECIPIENT';
  private userProduct = 'USER_PRODUCT';
  private hasClientStorage = false;
  constructor() {
    this.hasClientStorage = window.localStorage !== undefined;
   }

  public getHeader(): null | string {
    if (!this.hasClientStorage) {
      return null;
    }
    return localStorage.getItem(environment.header);
  }

  public setHeader(): void {
    localStorage.setItem(environment.header, environment.headerValue);
  }

  public resetHeader(): void {
    localStorage.removeItem(environment.header);
  }

  public getUserName(): null | string {
    if (!this.hasClientStorage) {
      return null;
    }
    return localStorage.getItem(this.userName);
  }

  public setUserName(user: string): void {
    localStorage.setItem(this.userName, user);
  }

  public getUserPassword(): null | string {
    if (!this.hasClientStorage) {
      return null;
    }
    return localStorage.getItem(this.userPassword);
  }

  public setUserPassword(pwd: string): void {
    localStorage.setItem(this.userPassword, pwd);
  }

  public resetUserCredentials(): void{
    localStorage.removeItem(this.userName);
    localStorage.removeItem(this.userPassword);
  }

  public setIsLogged(value: string): void {
    localStorage.setItem(this._isLogged, value);
  }

  public getIsLogged(): boolean {
    return JSON.parse(localStorage.getItem(this._isLogged));
  }

  public setRecipient(recipient: Recipient): void{
    localStorage.setItem(this.userRecipient, JSON.stringify(recipient));
  }

  public getRecipient(): Recipient{
    return JSON.parse(localStorage.getItem(this.userRecipient));
  }

  public resetRecipient(): void{
    localStorage.removeItem(this.userRecipient);
  }

  public setProduct(product: ProductOrder): void{
    localStorage.setItem(this.userProduct, JSON.stringify(product));
  }

  public getProduct(): ProductOrder{
    return JSON.parse(localStorage.getItem(this.userProduct));
  }

  public resetProduct(): void{
    localStorage.removeItem(this.userProduct);
  }

  public resetData(): void {
    this.resetRecipient();
    this.resetProduct();
  }
}
