import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _toastrService: ToastrService, private _router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        debugger;
        if(error){
          switch(error.status)
          {
            case 400:
              if(error.error.errors){
                const modelStateErrors = [];
                for(const key in error.error.errors)
                {
                  modelStateErrors.push(error.error.errors[key]);
                }

                throw modelStateErrors.flat();
              }
              else {
                this._toastrService.error(error.statusText === 'OK' ? 'Bad Request': error.statusText);
              }
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this._router.navigateByUrl('/server-error', navigationExtras);
              break;
            case 401:
              this._toastrService.error(error.statusText === 'OK' ? 'Unauthorized': error.statusText)
              break;
            case 404:
              this._router.navigateByUrl('/not-found');
              break;
            default:
              this._toastrService.error("Something went wrong");
              console.log(error);
              break;

          }
        }
        return throwError(error);
      })
    );
  }
}
