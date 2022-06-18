import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}
  constructor(public _accountService: AccountService,
     private _router: Router,
     private _toastService: ToastrService) { }

  ngOnInit(): void {
  }

  login()
  {
    this._accountService.login(this.model).subscribe({
      next: response =>
      {
        this._router.navigateByUrl('/members');
        console.log(response)
      },
    });

  }

  logout()
  {
    this._accountService.logout();
    this._router.navigateByUrl('/');
  }


  }
