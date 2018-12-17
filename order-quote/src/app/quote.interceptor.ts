import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { Observable } from 'rxjs';


@Injectable()
export class QuoteInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('user credentials', this.storageService.getUserName() + ':' + this.storageService.getUserPassword());
      console.log('user credentials', btoa(this.storageService.getUserName() + ':' + this.storageService.getUserPassword()))
    request = request.clone({
      setHeaders: {
        'X-API-KEY': this.storageService.getHeader(),
        Authorization: 'Basic ' +  btoa(this.storageService.getUserName() + ':' + this.storageService.getUserPassword()),
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Origin' : 'http://localhost:4200'
      }
    });

    return next.handle(request);
  }
}