import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharityService {

  constructor(private _httpClient:HttpClient) { }
  getAllCharities():Observable<any>
  {
    return this._httpClient.get(`https://localhost:44377/api/charity`);

  }

  getCharityByID(IdInt:string):Observable<any>
  {
    return this._httpClient.get(`https://localhost:44377/api/charity/getByCharityId/${IdInt}`);

  }

  getcharityById(id:string):Observable<any>{
    return this._httpClient.get(`https://localhost:44377/api/charity/getByCharityId/${id}`)
 }



  getCharityID(id:string)
  {
    return this._httpClient.get<number>(`https://localhost:44377/api/charity/getCharityID/${id}`);


  }


  addcharity(charity:any):Observable<any>{
return this._httpClient.post(`https://localhost:44377/api/charity`,charity);
  }


  getAccountID(name:string): Observable<string>{
    let id=this._httpClient.get<string>(`https://localhost:44377/api/charity/getAccountID/${name}`);
    return id;

  }
}
