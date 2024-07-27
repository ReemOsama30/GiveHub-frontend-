import { Component, OnInit } from '@angular/core';
import { DonorService } from '../../Services/donorService/donor.service';
import { ActivatedRoute } from '@angular/router';
import { DonationService } from '../../Services/donationService/donation.service';
import { CommonModule } from '@angular/common';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';
import { AwardedBadgeService } from '../../Services/awardedBadgeService/awarded-badge.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, BlankNavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  donor: any = null;
  donorName: string = "";
  badges: any[] = [];
  donorId: string = "";
  moneyDonation: any = null;
  inkindDonation: any = null;

  constructor(
    private donorService: DonorService,
    private route: ActivatedRoute,
    private donationService: DonationService,
    private awardBadgeService: AwardedBadgeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];  // Treat the ID as a string

      this.donorService.getdonorByID(id).subscribe(
        (res: any) => {
          this.donor = res.message;
          this.donorName = res.message.name;
          this.donorId = res.message.donorId;
          console.log("donor id is reem", res);
        },
        (error) => {
          console.error('Error fetching donor:', error);
        }
      );

      this.donationService.getmoneyDonationByDonorID(id).subscribe(
        (res: any) => {
          this.moneyDonation = res.message;
          console.log(this.moneyDonation);
        },
        (error) => {
          console.error('Error fetching money donations:', error);
        }
      );

      this.donationService.getInkindDonationByDonorID(id).subscribe(
        (res: any) => {
          this.inkindDonation = res.message;
        },
        (error) => {
          console.error('Error fetching in-kind donations:', error);
        }
      );

      this.awardBadgeService.getBadgesByUserID(id).subscribe(
        (res: any) => {
          this.badges = res.message;
          console.log("the badges are", this.badges);
        }
      );
    });
  }

  getFullImageUrl(relativePath: string): string {
    return `https://localhost:44377${relativePath}`;
  }

}
