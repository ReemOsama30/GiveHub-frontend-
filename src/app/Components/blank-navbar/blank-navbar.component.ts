import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
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
  accountType: string = "";
  accountId: string |null= "";


  constructor(
    private authService: AuthService,
    private donorService: DonorService,
    private renderer: Renderer2,
    private el: ElementRef,
    private charityService: CharityService
  ) { }

  ngOnInit() {
    this.accountType = this.authService.getUserAccountType();
    console.log('Retrieved accountType:', this.accountType);

    this.accountId  = this.authService.getUserId();

 
  }

 

  logOutUser(): void {
    this.authService.logOut();
  }
}
