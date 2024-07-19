import { Component } from '@angular/core';
import {RouterLink,ActivatedRoute} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CharityService } from '../../Services/charityService/charity.service';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';
import {CharityComponent} from '../charity/charity.component'

@Component({
  selector: 'app-charity-details',
  standalone: true,
  imports: [RouterLink,CommonModule,BlankNavbarComponent,CharityComponent],
  templateUrl: './charity-details.component.html',
  styleUrl: './charity-details.component.css'
})
export class CharityDetailsComponent {
  charityId:string|null='';
  charityData_DB: any;

  constructor(private route: ActivatedRoute,private http: HttpClient,private _CharityService:CharityService){
    this.route.paramMap.subscribe(params => { 
      this.charityId = params.get('id');
    
    });
    if(this.charityId!=null){

      this.getCharitiy( this.charityId);
    }
  }
  
  getCharitiy(Id: string) {
    const IdInt: number = Number(Id);
    this._CharityService.getCharityByID(IdInt).subscribe({
      next:((response)=>{
     this.charityData_DB = response.message;
     console.log(this.charityData_DB );
      }),
      error:((err)=>{
        this.charityData_DB = err.message;
      })
    })
  }
  getFullImageUrl(relativePath: string): string {
    return `https://localhost:44377${relativePath}`;
  }
}
