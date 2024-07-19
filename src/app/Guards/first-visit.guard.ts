// first-visit.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirstVisitService } from '../Services/first-visitService/first-visit.service';

@Injectable({
  providedIn: 'root'
})
export class FirstVisitGuard implements CanActivate {
  constructor(private firstVisitService: FirstVisitService, private router: Router) {}

  canActivate(): boolean {
    if (this.firstVisitService.isFirstVisit()) {
      this.firstVisitService.markAsVisited();
      return true;
    }
    return false;
  }
}




