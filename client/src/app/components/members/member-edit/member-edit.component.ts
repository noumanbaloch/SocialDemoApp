import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if(this.editForm.dirty)
    {
      $event.returnValue = true;
    }
  }
  constructor(private _accountService: AccountService,
              private _memberService: MembersService,
              private _toastrService: ToastrService) {
                this._accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
               }

  ngOnInit(): void {
    debugger;
    this.loadMember();
  }

  loadMember() {
    this._memberService.getMember(this.user.userName).subscribe(member => this.member = member);
  }

  updateMember(){
    this._memberService.updateMember(this.member).subscribe(() => {
      this._toastrService.success("Profile updated successfully");
      this.editForm.reset(this.member);
    })

  }

}
