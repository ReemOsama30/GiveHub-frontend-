import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirstVisitService {

  private readonly VISITED_KEY = 'visited';

  constructor() { }

  isFirstVisit(): boolean {
    const visited = localStorage.getItem(this.VISITED_KEY);
    return !visited;
  }

  markAsVisited(): void {
    localStorage.setItem(this.VISITED_KEY, 'true');
  }
}
