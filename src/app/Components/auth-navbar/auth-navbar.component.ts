import { Component,Renderer2,AfterViewInit, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-auth-navbar',
    templateUrl: './auth-navbar.component.html',
    styleUrl: './auth-navbar.component.css',
    standalone: true,
    imports: [RouterLink, RouterLinkActive]
})
export class AuthNavbarComponent {
constructor(private renderer: Renderer2 ,private el: ElementRef){}

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
