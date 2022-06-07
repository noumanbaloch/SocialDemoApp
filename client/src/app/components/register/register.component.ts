import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {}
  constructor(private _accountService: AccountService) { }

  ngOnInit(): void {
    console.log(this.model)
  }

  register(){
    this._accountService.register(this.model).subscribe( {
      next: response => {
        console.log(response)
      },
      error: error => console.log(error)
    })

  }


  cancel()
  {
   this.cancelRegister.emit(false);
  }

}
