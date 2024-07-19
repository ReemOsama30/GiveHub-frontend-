import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';
import { AuthNavbarComponent } from '../auth-navbar/auth-navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirstVisitService } from '../../Services/first-visitService/first-visit.service';

@Component({
    selector: 'app-blank-layout',
    templateUrl: './blank-layout.component.html',
    styleUrl: './blank-layout.component.css',
    standalone: true,
    imports: [BlankNavbarComponent, RouterOutlet, FooterComponent,AuthNavbarComponent,
        CommonModule,FormsModule
    ]
})
export class BlankLayoutComponent  {
    // isFirstVisit = true;

    // constructor(private firstVisitService: FirstVisitService) {}
  
    // ngOnInit(): void {
    //   this.isFirstVisit = this.firstVisitService.isFirstVisit();
    //   if (this.isFirstVisit) {
    //     this.firstVisitService.markAsVisited();
    //   }
    // }
}
