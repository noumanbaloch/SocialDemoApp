import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _accountService: AccountService, private _toastService : ToastrService) {}
  canActivate(): Observable<boolean> {
    return this._accountService.currentUser$.pipe(
      map( user => {
        if(user) return true;
        this._toastService.error("You are not authenticated");
      })
    )
  }

}
