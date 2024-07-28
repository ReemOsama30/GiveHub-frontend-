import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-with-search',
  standalone: true,
  imports: [RouterLinkActive, RouterModule, CommonModule, RouterLink],
  templateUrl: './nav-with-search.component.html',
  styleUrl: './nav-with-search.component.css'
})
export class NavWithSearchComponent {
  accountType: string  ="";

  constructor(private _AuthService:AuthService){}

  ngOnInit() {
    this.accountType = this._AuthService.getUserAccountType();

  }
  logOutUser():void{
    this._AuthService.logOut();
  }

}
