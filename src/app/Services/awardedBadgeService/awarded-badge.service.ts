import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwardedBadgeService {

  constructor(private httpClient:HttpClient) { }


  getBadgesByUserID( donorId:number):Observable<any>
  {
return this.httpClient.get(`https://localhost:44377/api/AwardedBadges/user/${donorId}`);
  }
}
