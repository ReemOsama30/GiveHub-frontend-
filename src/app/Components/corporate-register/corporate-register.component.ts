import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlOptions, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NgIf } from '@angular/common';
import { NavCorporateRegisterComponent } from '../nav-corporate-register/nav-corporate-register.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
@Component({
    selector: 'app-corporate-register',
    templateUrl: './corporate-register.component.html',
    styleUrl: './corporate-register.component.css',
    standalone: true,
    imports: [NavCorporateRegisterComponent, ReactiveFormsModule, NgIf,RouterLink]
})
export class CorporateRegisterComponent {
  userData: any = {
    userName: '',
    password: '',
    email: '',
    accountType:'corporate'
  };
  msgError: string = '';
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router,private _ngZone: NgZone
    ,public dialog: MatDialog
  ) { }
  registerForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    // confirmEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()_+\-=\[\]{}|;':"\\,.<>\/?]).{6,20}$/)]),
    rePassword: new FormControl(''),
   accountType:new FormControl('')
  },{validators:[this.confirmPassword,this.confirmEmail]} as FormControlOptions );


  confirmPassword(group:FormGroup):void{
    const password =group.get('password');
    const rePassword=group.get('rePassword');
    if(rePassword?.value==null||rePassword?.value=='')
      {
        rePassword?.setErrors({required:true})
      }
    else if(password?.value != rePassword?.value)
      {
        rePassword?.setErrors({mismatch:true})
      }
  }


  confirmEmail(group: FormGroup): void {
    let email = group.get('email');
    let confirmEmail = group.get('confirmEmail');
    if(confirmEmail?.value == ' ')
      {
        confirmEmail?.setErrors({required:true});
      }
    else if(email?.value != confirmEmail?.value){
      confirmEmail?.setErrors({mismatch:true});
    }
  }

  handleForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      console.log(this.registerForm.value);
      this._AuthService.setRegister(this.userData).subscribe({
        next: (response) => {
          console.log(response)
          this.isLoading = false;
          if(response.isPass==true)
            {
              this.openSuccessDialog();
              this._Router.navigate(['/login']);
            }
            
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          if(err.status==400)
            {
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
      height: '230px'
    });
  }

}
