import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit {
  ngOnInit(): void {
   console.log(this.donor)
  }
  @Input() donor: any;
  getFullImageUrl(relativePath: string): string {
    return `https://localhost:44377${relativePath}`;
  }

  
}
