import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DonorService } from '../Services/donorService/donor.service';
import { CommonModule } from '@angular/common';
import { BlankNavbarComponent } from '../Components/blank-navbar/blank-navbar.component';

@Component({
  selector: 'app-donor-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,BlankNavbarComponent],
  templateUrl: './donor-account.component.html',
  styleUrls: ['./donor-account.component.css']
})
export class DonorAccountComponent {
  selectedFile: File | null = null;
  donorData = {
    name: localStorage.getItem('donorName') ?? '',
    imgUrl: '',
  };
  isLoading = false;
  msgError = '';

  donorForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    imgUrl: new FormControl('', [Validators.required]),
  });

  constructor(private _Router: Router, private donorService: DonorService)  {}
 
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.donorData.imgUrl = this.selectedFile.name;
      }
    }
  }

  onSubmit() {
    if (this.donorForm.valid && this.selectedFile) {
      const donorName = this.donorForm.get('name')?.value;
      this.isLoading = true;
      console.log('Submitting with donor name:', donorName);

      this.donorService.getAccountID(donorName).subscribe(
        (accountId: any) => {
       
            console.log('Account ID received:', accountId);
  
            const formData: FormData = new FormData();
            formData.append('name', this.donorForm.get('name')?.value);
            if (this.selectedFile) {
              formData.append('img', this.selectedFile);
            }
            formData.append('applicationUserId', accountId.message);
  
          

          this.donorService.createDonor(formData).subscribe(
            response => {
              this.isLoading = false;
           
              this._Router.navigate(['/login']);  // Adjust the route as needed
            },
            error => {
              this.isLoading = false;
              console.error('Error creating donor:', error);
              this.msgError = 'An error occurred while creating the project';
            }
          );
        },
        error => {
          this.isLoading = false;
          console.error('Error fetching account ID:', error);
          this.msgError = 'An error occurred while fetching the account ID';
        }
      );
    }
  }
}
