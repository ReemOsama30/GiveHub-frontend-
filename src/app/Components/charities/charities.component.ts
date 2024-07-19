import { Component, OnInit } from '@angular/core';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';
import { CharityService } from '../../Services/charityService/charity.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-charities',
  standalone: true,
  imports: [BlankNavbarComponent,CommonModule,RouterLink],
  templateUrl: './charities.component.html',
  styleUrl: './charities.component.css'
})
export class CharitiesComponent implements OnInit {
  charities :any=[];
  constructor(private _CharityService:CharityService, private _Router: Router){}

  ngOnInit(): void {
    this.getAllCharities();
  }
  getAllCharities():void{
    this._CharityService.getAllCharities().subscribe({
      next:(response)=>{
        console.log(response.message)
        this.charities=response.message
      }
    })
  }

  getFullImageUrl(relativePath: string): string {
    return `https://localhost:44377${relativePath}`;
  }
}
