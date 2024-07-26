
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode
import { Observable } from 'rxjs';
import AccountType from '../Enums/AccountType';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  accountType: string | null = null;

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }


  setRegister(userData: any): Observable<any> {
    return this._HttpClient.post(`https://localhost:44377/api/Account/register`, userData);

  }

  setCharityRegister(userData: any): Observable<any> {
    return this._HttpClient.post(`https://localhost:44377/api/Account/Charity-register`, userData);

  }
  setDonorRegister(userData: any): Observable<any> {
    return this._HttpClient.post(`https://localhost:44377/api/Account/Donor-register`, userData);

  }


  setLogIn(userData: any): Observable<any> {
    return this._HttpClient.post(`https://localhost:44377/api/Account/log-in`, userData)
  }

 

  decodeUserData(): void {
    const token = localStorage.getItem('eToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userData = decodedToken;
        console.log('Decoded token:', decodedToken);
         let userId = this.getUserId();
      let userAccountType = this.getUserAccountType();
      console.log(userId);
      console.log(userAccountType);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      console.error('No token found in localStorage.');

    }
  }

  getUserAccountType(): AccountType {
    const token = localStorage.getItem('eToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const accountTypeStr = decodedToken['AccountType'];
      console.log('Decoded token AccountType:', accountTypeStr);
      
      return this.convertStringToAccountType(accountTypeStr);
    }
    return AccountType.Donor;
  }

  private convertStringToAccountType(accountTypeStr: string): AccountType {
    switch (accountTypeStr) {
      case 'Admin':
        return AccountType.Admin;
      case 'Charity':
        return AccountType.Charity;
      case 'Donor':
        return AccountType.Donor;
      default:
        console.error('Unexpected AccountType in token:', accountTypeStr);
        return AccountType.Donor; // or handle as needed
    }
  }

  getUserId(): string | null {
    const token = localStorage.getItem('eToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    }
    return null;
  }

  logOut(): void {
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login']);
   
  }
}