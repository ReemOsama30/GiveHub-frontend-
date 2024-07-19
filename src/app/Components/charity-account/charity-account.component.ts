import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharityService } from '../../Services/charityService/charity.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';

@Component({
  selector: 'app-charity-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,BlankNavbarComponent],
  templateUrl: './charity-account.component.html',
  styleUrls: ['./charity-account.component.css']  // Changed to styleUrls
})
export class CharityAccountComponent {

  id: string = "";
  selectedFile: File | null = null;  // Changed type to File | null
  charityData = {
    name: localStorage.getItem('charityName') ?? '',
    description: '',
    websiteUrl: '',
    imgUrl: '',
  };
  isLoading = false;
  msgError = '';

  constructor(private _CharityService: CharityService,
              private _Router: Router,
              private authservice: AuthService) { }

              ngOnInit() {
                this._CharityService.getAccountID(this.charityData.name).subscribe({
                  next: (res) => {
                    console.log(this.charityData.name);
                    console.log("Account ID:", res);  // Log the actual account ID
                  },
                  error: (err) => {
                    console.log(this.charityData.name);
                    console.log(this.charityData);
                    console.log('error :',err);
                  }
                });
              }
  charityForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    websiteUrl: new FormControl('', [Validators.required]),
    imgUrl: new FormControl('', [Validators.required]),
  });

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      // Check if selectedFile is not null before accessing its name property
      if (this.selectedFile) {
        this.charityData.imgUrl = this.selectedFile.name;
      }
    }
  }

  onSubmit(): void {
    if (this.charityForm.valid && this.selectedFile) {
      const charityName = this.charityForm.get('name')?.value;
  console.log(charityName);
      // Subscribe to the getAccountID method
      this._CharityService.getAccountID(charityName).subscribe(
        (accountId: any) => {
          
          const charityData = {
            name: this.charityForm.get('name')?.value,
            description: this.charityForm.get('description')?.value,
            websiteUrl: this.charityForm.get('websiteUrl')?.value,
            imgUrl: this.selectedFile,
            applicationUserId: accountId.message
          };
  
          const formData = new FormData();
          formData.append('name', this.charityForm.get('name')?.value);
          formData.append('description', this.charityForm.get('description')?.value);
          formData.append('websiteUrl', this.charityForm.get('websiteUrl')?.value);
          if (this.selectedFile) {
            formData.append('imgUrl', this.selectedFile, this.selectedFile.name);
          }
          formData.append('applicationUserId', accountId.message);







          // Log the charity data
          console.log("The charity form data", charityData);
  
          
          
          
          
          
          //Submit the charity data
          this._CharityService.addcharity(formData).subscribe({
            next: (response) => {
              console.log(response.message);
        this._Router.navigate([`/login`]);  // Assuming route structure
            },
            error: (error) => {
              console.error('Error saving charity data:', error.error);
            }
          });
        },
        (error) => {
          console.error('Error fetching account ID:', error);
          // Handle error
        }
      );
    } else {
      console.error('Form is invalid or file is not selected');
    }
  }}