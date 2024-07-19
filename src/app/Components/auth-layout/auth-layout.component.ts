import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthNavbarComponent } from '../auth-navbar/auth-navbar.component';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.css'],
    standalone: true,
    imports: [RouterOutlet,AuthNavbarComponent]
})
export class AuthLayoutComponent  {
  
  
}
