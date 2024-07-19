import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-user-account-type',
    templateUrl: './user-account-type.component.html',
    styleUrls: ['./user-account-type.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class UserAccountTypeComponent {
  @Output() accountTypeSelected = new EventEmitter<string>();

  selectAccountType(accountType: string) {
    this.accountTypeSelected.emit(accountType);
  }
}
