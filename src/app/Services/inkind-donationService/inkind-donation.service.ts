import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InkindDonationService {

  constructor(private _httpClient:HttpClient) { }


  postInKindDonation(inkindDonation:any):Observable<any>
  {
    return this._httpClient.post(`https://localhost:44377/api/InKindDonation`, inkindDonation)

  }

  getIKindDonationWithCharityId(id:number)
  {
    
      return this._httpClient.get<number>(`https://localhost:44377/api/InKindDonation/charity/${id}`);
    
  }
 
}
