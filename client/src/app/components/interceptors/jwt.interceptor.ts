import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User;
    this._accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
    if(currentUser)
    {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }
    return next.handle(request);
  }
}
