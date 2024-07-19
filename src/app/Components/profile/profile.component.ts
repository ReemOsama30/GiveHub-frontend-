import { Component } from '@angular/core';
import { DonorService } from '../../Services/donorService/donor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationService } from '../../Services/donationService/donation.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';
import { AwardedBadgeService } from '../../Services/awardedBadgeService/awarded-badge.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,ProfileComponent,BlankNavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] 
})
export class ProfileComponent {

  donor:any=null;
  donorName:string=""
badges:any=[];
donorid:number=0;
  moneyDonation:any=null;
  inkindDonation:any=null;
  constructor(private donorService:DonorService,private route:ActivatedRoute,private DonationService:DonationService,private awardBadgeService:AwardedBadgeService)
  {

  }




  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];

      this.donorService.getdonorByID(id).subscribe(
        (res: any) => {
          this.donor = res.message; 
         this.donorName=res.message.name;
         this.donorid=res.message.donorId;
         console.log("donor id is",this.donor.id)
         // console.log(res);
        },
        (error) => {
          console.error('Error fetching donor:', error);
      
        }
      );


 

      
    this.DonationService.getmoneyDonationByDonorID(id).subscribe(

(res:any)=>{
  this.moneyDonation=res.message;
  console.log(this.moneyDonation);
},
(error)=>{
  console.error('Error fetching donor:', error);
         
}


    );



    this.DonationService.getInkindDonationByDonorID(id).subscribe(

      (res:any)=>{
        this.inkindDonation=res.message;
      },
      (error)=>{
        console.error('Error fetching donor:', error);
               
      }
      
      
          );
          
    this.awardBadgeService.getBadgesByUserID(id).subscribe(

      (res:any)=>{
        this.badges=res.message
        console.log("the badges are",this.badges);
      }
    )
  

    });



  }

  getFullImageUrl(relativePath: string): string {
    return `https://localhost:44377${relativePath}`;
  }

}