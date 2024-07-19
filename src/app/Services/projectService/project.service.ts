import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _httpClient:HttpClient) { }
  
  getAllProjects():Observable<any>
  {
    return this._httpClient.get(`https://localhost:44377/api/project`);
  }
  postProject(projecData:any):Observable<any>
  {
    
    return this._httpClient.post(`https://localhost:44377/api/project`,projecData)
  }
  getAllprojectForCharityId(id:number):Observable<any>
  {
    return this._httpClient.get(`https://localhost:44377/api/project/charity/${id}`)
  }
  getProjectsByPage(page: number):Observable<any>
  {
   return this._httpClient.get(`https://localhost:44377/api/project/page?page=${page}`);
  }
  

 getProjectsByCategory(categoryName:string):Observable<any>
 {
  return this._httpClient.get(`https://localhost:44377/api/project/category/${categoryName}`);
 }



}
