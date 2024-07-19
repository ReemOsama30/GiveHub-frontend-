import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css',
    standalone: true
})
export class NotFoundComponent {
  constructor(private _Router:Router){}
  navigateBack(){
    this._Router.navigate(['/home']);
  }
}
