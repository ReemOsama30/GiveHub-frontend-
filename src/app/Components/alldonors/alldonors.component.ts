import { Component, OnInit } from '@angular/core';
import { UserCardComponent } from "../user-card/user-card.component";
import { DonorService } from '../../Services/donorService/donor.service';
import { CommonModule } from '@angular/common';
import { NavWithSearchComponent } from "../nav-with-search/nav-with-search.component";
import { BlankNavbarComponent } from "../blank-navbar/blank-navbar.component";

@Component({
  selector: 'app-alldonors',
  standalone: true,
  imports: [UserCardComponent, CommonModule, NavWithSearchComponent, BlankNavbarComponent],
  templateUrl: './alldonors.component.html',
  styleUrl: './alldonors.component.css'
})


export class AlldonorsComponent implements OnInit {
  AllDonorsProfile:any=[];
  constructor(private donorService:DonorService)
  {

  }
ngOnInit(): void {
this.AllDonorsProfile=this.donorService.getDonorsProfile()
.subscribe(
 ( donors:any )=>{ this.AllDonorsProfile = donors.message

console.log(this.AllDonorsProfile)
 },

  (error) =>{ console.error('Error fetching donor profiles:', error)}
);
}



getFullImageUrl(relativePath: string): string {
  return `https://localhost:44377${relativePath}`;
}

}
