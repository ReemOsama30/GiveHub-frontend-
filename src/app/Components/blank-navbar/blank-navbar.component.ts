import { Component, OnInit, Renderer2, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DonorService } from '../../Services/donorService/donor.service';
import { HomeComponent } from '../home/home.component';
import { CharityService } from '../../Services/charityService/charity.service';

@Component({
  selector: 'app-blank-navbar',
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.css',
  standalone: true,
  imports: [RouterLinkActive, RouterModule, CommonModule, RouterLink, HomeComponent]
})
export class BlankNavbarComponent implements OnInit {
  accountType: string | null = null;
  accountId: number | null = null;


  constructor(private _AuthService: AuthService,
              private donorService: DonorService,
              private renderer: Renderer2,
              private el: ElementRef,
              private charityService:CharityService
  ) { }

  ngOnInit() {
    this.accountType = this._AuthService.getUserAccountType();
    console.log('accccount type is', this.accountType);

    const userId = this._AuthService.getUserId();
    console.log("user id in string is => ", userId);

    if (this.accountType == 'donor') {
      if (userId) {
        this.donorService.getDonorID(userId).subscribe({
          next: (response) => {
            console.log('response is =>>', response);
            this.accountId = response

          },
          error: (err) => {
            console.error('Error fetching projects:', err);
          }

        })

      }
    }else{
      if (userId) {
        this.charityService.getCharityID(userId).subscribe({
          next: (response) => {
            console.log('response is =>>', response);
            this.accountId = response

          },
          error: (err) => {
            console.error('Error fetching projects:', err);
          }

        })

      }

    }

  }
  logOutUser(): void {
    this._AuthService.logOut();
  }

  ngAfterViewInit(): void {
    const teamFundraisingLink = this.el.nativeElement.querySelector('#teamFundraisingLink');
    const teamSection = document.querySelector('#our-expert-team'); // Use document instead of this.el.nativeElement

    if (teamFundraisingLink && teamSection) {
      this.renderer.listen(teamFundraisingLink, 'click', () => {
        teamSection.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      console.error('Required elements not found');
    }
  }
}

