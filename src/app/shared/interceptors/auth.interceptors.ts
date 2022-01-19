import { PersistanceService } from './../services/persistance.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';
  constructor(private persistanceService:PersistanceService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(this.addAuthenticationToken(req));
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

    let token=this.persistanceService.get('token') ?? " ";
    return request.clone({
      headers: request.headers.set(
        this.AUTH_HEADER,
        'Bearer ' + token
      ),
    });
  }
}
