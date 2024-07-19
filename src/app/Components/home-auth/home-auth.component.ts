import { Component } from '@angular/core';
import { AuthNavbarComponent } from '../auth-navbar/auth-navbar.component';
import { HomeComponent } from '../home/home.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home-auth',
  standalone: true,
  imports: [AuthNavbarComponent,HomeComponent, RouterOutlet,FooterComponent],
  templateUrl: './home-auth.component.html',
  styleUrl: './home-auth.component.css'
})
export class HomeAuthComponent {

}
