import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {

  private selectedAccountTypeSubject = new BehaviorSubject<string>('');
  selectedAccountType$ = this.selectedAccountTypeSubject.asObservable();

  setSelectedAccountType(accountType: string) {
    this.selectedAccountTypeSubject.next(accountType);
  }
}
