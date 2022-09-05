import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import TokenStorageService from './token-storage.service';
import { TOKENS_ENDPOINT } from '../constants/constants';

const TOKEN_HEADER_KEY = 'Authorization';
const TOKEN_TYPE = 'Bearer ';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = req;

    if (req.url.endsWith(TOKENS_ENDPOINT)) {
      const refreshToken = this.tokenStorageService.getRefreshToken();
      if (refreshToken) {
        authReq = req.clone({
          headers: req.headers.set(TOKEN_HEADER_KEY, `${TOKEN_TYPE}${refreshToken}`),
        });
      }
      return next.handle(authReq);
    }

    const token = this.tokenStorageService.getToken();
    if (token) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, `${TOKEN_TYPE}${token}`) });
    }
    return next.handle(authReq);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
