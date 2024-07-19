import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private projectId: number | null = null;
  private charityId: number | null = null;
  private projectName :string ='';
  constructor() {}

  setProjectName(name:string):void{
    this.projectName=name;
  }
  getProjectName():string |null{
    return this.projectName;
  }
  setProjectId(id: number): void {
    this.projectId = id;
  }

  getProjectId(): number | null {
    return this.projectId;
  }

  setCharityId(id: number): void {
    this.charityId = id;
  }

  getCharityId(): number | null {
    return this.charityId;
  }
}
