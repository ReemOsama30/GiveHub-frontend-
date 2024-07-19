import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private _httpclient:HttpClient) { }



  getmoneyDonationByDonorID(id:number){
    return this._httpclient.get(`https://localhost:44377/api/MoneyDonation/donor/${id}`);

  }

  getInkindDonationByDonorID(id:number){
    return this._httpclient.get(`https://localhost:44377/api/InKindDonation/donor/${id}`);

  }

}
