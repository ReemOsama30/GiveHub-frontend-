import { Component, OnInit, Renderer2, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DonorService } from '../../Services/donorService/donor.service';
import { HomeComponent } from '../home/home.component';
import { CharityService } from '../../Services/charityService/charity.service';
import AccountType from '../../Enums/AccountType';


@Component({
  selector: 'app-blank-navbar',
  templateUrl: './blank-navbar.component.html',
  styleUrls: ['./blank-navbar.component.css'],
  standalone: true,
  imports: [RouterLinkActive, RouterModule, CommonModule, RouterLink, HomeComponent]
})
export class BlankNavbarComponent implements OnInit {
  accountType: AccountType = AccountType.Donor;
  accountId: number | null = null;
  accountNumber: number = 0;

  constructor(
    private _AuthService: AuthService,
    private donorService: DonorService,
    private renderer: Renderer2,
    private el: ElementRef,
    private charityService: CharityService,
 
  ) { }

  ngOnInit() {
    this.accountType = this._AuthService.getUserAccountType();
    console.log('Retrieved accountType:', this.accountType);

    this.accountNumber = this.convertAccountTypeToNumber(this.accountType);
    console.log('Converted accountNumber:', this.accountNumber);

    const userId = this._AuthService.getUserId();
    console.log('Retrieved userId:', userId);

    if (this.accountType === AccountType.Donor) {
      if (userId) {
        this.donorService.getDonorID(userId).subscribe({
          next: (response) => {
            this.accountId = response;
            console.log('Donor ID:', this.accountId);
          },
          error: (err) => {
            console.error('Error fetching donor ID:', err);
          }
        });
      }
    } else if (this.accountType === AccountType.Charity) {
      if (userId) {
        this.charityService.getCharityID(userId).subscribe({
          next: (response) => {
            this.accountId = response;
            console.log('Charity ID:', this.accountId);
          },
          error: (err) => {
            console.error('Error fetching charity ID:', err);
          }
        });
      }
    }
  }

  convertAccountTypeToNumber(accountType: AccountType): number {
    switch(accountType) {
      case AccountType.Admin:
        return 0;
      case AccountType.Charity:
        return 1;
      case AccountType.Donor:
        return 2;
      default:
        console.error('Unexpected accountType:', accountType);
        return -1;
    }
  }

  logOutUser(): void {
    this._AuthService.logOut();
   
    
  }

 
}
