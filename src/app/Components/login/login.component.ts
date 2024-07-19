
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf]
})
export class LoginComponent {
  isLoading: boolean = false;
  msgError: string | null = null;
  userNameTouched: boolean = false;
  passwordTouched: boolean = false;

  logInForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()_+\-=\[\]{}|;':"\\,.<>\/?]).{6,20}$/)]),
  });

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  handleForm(): void {
    if (this.logInForm.valid) {
      this.isLoading = true;
      this._AuthService.setLogIn(this.logInForm.value).subscribe({
        next: (response) => {
          console.log(response);
          
         
          if (response.isPass === true) {
            localStorage.setItem('token', response.message.token);
            this.isLoading = false;
            localStorage.setItem('eToken', response.message.token);
            this._AuthService.decodeUserData();
            this._Router.navigate(['/home']);
          }
          else{
            this.isLoading = false;
            this.msgError = "Password or username invalid"; 
            console.log( this.msgError);
          }
        },
       
      });
    } else {
      this.logInForm.markAllAsTouched();
    }
  }

  onBlur(fieldName: string): void {
    if (fieldName === 'userName') {
      this.userNameTouched = true;
    } else if (fieldName === 'password') {
      this.passwordTouched = true;
    }
  }


}