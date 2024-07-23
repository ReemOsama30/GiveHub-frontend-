import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NgIf } from '@angular/common';
import { NavCharityRegisterComponent } from '../nav-charity-register/nav-charity-register.component';
import { CharityService } from '../../Services/charityService/charity.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
@Component({
  selector: 'app-charity-register',
  templateUrl: './charity-register.component.html',
  styleUrl: './charity-register.component.css',
  standalone: true,
  imports: [NavCharityRegisterComponent, ReactiveFormsModule, NgIf, RouterLink]
})
export class CharityRegisterComponent {
  userData: any = {
    userName: '',
    password: '',
    email: '',
    name:'',
    description: '',
    websiteUrl: '',
    imgUrl: '',
    
  };
  
  selectedFile: File | null = null;  
  msgError: string = '';
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router, 
    private _ngZone: NgZone, private charityServics: CharityService,public dialog: MatDialog) { }
 
    registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    websiteUrl: new FormControl('', [Validators.required]),
    imgUrl: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()_+\-=\[\]{}|;':"\\,.<>\/?]).{6,20}$/)]),
    rePassword: new FormControl(''),
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  
  
  }, { validators: [this.confirmPassword, this.confirmEmail] } as FormControlOptions);


  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (rePassword?.value == null || rePassword?.value == '') {
      rePassword?.setErrors({ required: true })
    }
    else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true })
    }
  }



  confirmEmail(group: FormGroup): void {
    let email = group.get('email');
    let confirmEmail = group.get('confirmEmail');
    if (confirmEmail?.value == ' ') {
      confirmEmail?.setErrors({ required: true });
    }
    else if (email?.value != confirmEmail?.value) {
      confirmEmail?.setErrors({ mismatch: true });
    }
  }

  handleForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('userName', this.userData.userName);
      formData.append('password', this.userData.password);
      formData.append('email', this.userData.email);
      formData.append('name', this.userData.name);
      formData.append('description', this.userData.description);
      formData.append('websiteUrl', this.userData.websiteUrl);
      if (this.selectedFile) {
      formData.append('imgUrl', this.selectedFile); 
      }
      console.log(formData)
      this._AuthService.setCharityRegister(formData).subscribe({
        next: (response) => {
          console.log(response)
          this.isLoading = false;
          if (response.isPass == true) {

            console.log(this.charityServics.getAccountID(response.message.userName));
            this.charityServics.getAccountID(response.message.userName);
            this.openSuccessDialog();
            this._Router.navigate(['/login']);
          }

        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          if (err.status == 400) {
            this.msgError = err.error.message.errors[0].errorMessage;
          }
          console.log(err);
        }
      });

    }

    else {
      this.registerForm.markAllAsTouched();
    }
  }




  openSuccessDialog(): void {
    this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      height: '260px'
    });
  }
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      // Check if selectedFile is not null before accessing its name property
      if (this.selectedFile) {
        this.userData.imgUrl = this.selectedFile.name;
      }
    }
  }



}
