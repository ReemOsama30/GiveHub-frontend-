

import { Component } from '@angular/core';
import { ProjectService } from '../../Services/projectService/project.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CharityService } from '../../Services/charityService/charity.service';
import { AuthService } from '../../Services/auth.service';
import { CategoryService } from '../../Services/categoryService/category.service';
import { error } from 'console';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule,FormsModule,BlankNavbarComponent,ReactiveFormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  selectedFile: any;
  nweProj: any = {
    title: '',
    description: '',
    fundingGoal: '',
    amountRaised:'0',
    imgPath :'',
    state:'Initiated',
    charityId:'',
    location:'',
    categoryId:''
  };
  id:number=0
  categories: any[] = []; 


  constructor(
     private _ProjectService: ProjectService,
     private _Router: Router,
     private charityService:CharityService,
     private authservice:AuthService,
     private categoryService:CategoryService

  ) {}
  
  ngOnInit() {
    const userId = this.authservice.getUserId();
    if (userId) {
      this.charityService.getCharityID(userId).subscribe({
        next: (id: number) => {
          this.nweProj.charityId = id.toString();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Failed to get charity ID:', err);
        }
      });

      this.categoryService.getCategories().subscribe({
        next: (response: any) => {
          this.categories = response.message; 
          console.log('al array hana', this.categories);
        },
        error: (error) => {
          console.error('Failed to fetch categories:', error);
        }
      });
      
    }
  }
  
  projectStates = [];

  projectForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    fundingGoal: new FormControl('', [Validators.required]),
    amountRaised: new FormControl(0, [Validators.required]),
    location: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    imgPath: new FormControl('', [Validators.required]),
    state: new FormControl(0, [Validators.required]),
     charityId: new FormControl('')
  });

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.projectForm.patchValue({ imgPath: this.selectedFile.name });
    }

  }



  range(size: number) {
    return Array.from({ length: size }, (_, i) => i);
  }

   getStateLabel(value: number): string {
    switch (value) {
      case 0:
        return 'Initiated';
      case 1:
        return 'Completed';
      case 2:
        return 'InProgress';
      case 3:
        return 'Paused';
      case 4:
        return 'Canceled';
      default:
        return 'Unknown';
    }
  }

  
  onSubmit() {
    if (this.projectForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.projectForm.get('title')?.value);
      formData.append('description', this.projectForm.get('description')?.value);
      formData.append('fundingGoal', this.projectForm.get('fundingGoal')?.value);
      formData.append('amountRaised', this.projectForm.get('amountRaised')?.value);
      formData.append('location', this.projectForm.get('location')?.value);
      formData.append('categoryId', this.projectForm.get('categoryId')?.value); 
      formData.append('imgPath', this.selectedFile);
      formData.append('state', this.projectForm.get('state')?.value);
      formData.append('charityId', this.nweProj.charityId);

      this._ProjectService.postProject(formData).subscribe({
        next: (response) => {
          console.log('project added Al hamd llah :', response);
          this._Router.navigate([`/charity/${response.message.charityId}`]);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 400) {
            console.log('Client Error:', err.error);
          } else {
            console.error('Server Error:', err);
          }
        }
      });
    }
  }
  
  
  

}
