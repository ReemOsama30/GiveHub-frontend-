import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountTypeService } from '../../Services/account-type.service';
import { UserAccountTypeComponent } from '../user-account-type/user-account-type.component';

@Component({
    selector: 'app-user-account-type-layout',
    templateUrl: './user-account-type-layout.component.html',
    styleUrl: './user-account-type-layout.component.css',
    standalone: true,
    imports: [UserAccountTypeComponent]
})
export class UserAccountTypeLayoutComponent  {
  // constructor(private _accountTypeService: AccountTypeService) { }

  // ngOnInit(): void {
  // }
  // handleAccountTypeSelection(accountType: string) {
  //   this._accountTypeService.setSelectedAccountType(accountType);
  // }
}
