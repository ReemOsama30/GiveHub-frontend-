import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private projectId: number | null = null;
  private charityId: string | null = null;
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

  setCharityId(id: string): void {
    this.charityId = id;
  }

  getCharityId(): string | null {
    return this.charityId;
  }
}
