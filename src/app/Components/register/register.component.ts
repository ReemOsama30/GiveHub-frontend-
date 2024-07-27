import { Component, NgZone } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormControlOptions, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { AuthNavbarComponent } from '../auth-navbar/auth-navbar.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
declare var gapi: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true,
    imports: [AuthNavbarComponent, ReactiveFormsModule, NgIf, RouterLink]
})

export class RegisterComponent {
    selectedFile: File | null = null;
    userData: any = {
        userName: '',
        password: '',
        email: '',
        name: '',
        ProfileImg: '',
    };
    isArabic=true;
    msgError: string | null = null;
    isLoading: boolean = false;

    constructor(private _AuthService: AuthService, private _Router: Router, private _ngZone: NgZone, public dialog: MatDialog) { }

    registerForm: FormGroup = new FormGroup({
        userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()_+\-=\[\]{}|;':"\\,.<>\/?]).{6,20}$/)]),
        rePassword: new FormControl(''),
        accountType: new FormControl(''),
        name: new FormControl(''),
        imgUrl: new FormControl(''),
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
            formData.append('userName', this.registerForm.get('userName')?.value);
            formData.append('email', this.registerForm.get('email')?.value);
            formData.append('password', this.registerForm.get('password')?.value);
            formData.append('name', this.registerForm.get('name')?.value);
            formData.append('ProfileImg', this.selectedFile || '');

            this._AuthService.setDonorRegister(formData).subscribe({
                next: (response) => {
                    this.isLoading = false;
                    if (response.isPass == true) {
                        this.openSuccessDialog();
                        localStorage.setItem('donorName', this.registerForm.get('userName')?.value);
                        this._Router.navigate(['/login']);
                    }
                    else {
                        this.msgError = response.message.toString();
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

    initializeGoogleSignIn(): void {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: 'YOUR_GOOGLE_CLIENT_ID'
            });
        });
    }

    onFileChange(event: any): void {
        if (event.target.files.length > 0) {
            this.selectedFile = event.target.files[0];
            if (this.selectedFile) {
                this.userData.imgUrl = this.selectedFile.name;
            }
        }
    }

    handleGoogleSignIn(): void {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn().then((googleUser: any) => {
            const profile = googleUser.getBasicProfile();
            const idToken = googleUser.getAuthResponse().id_token;

            const user = {
                name: profile.getName(),
                email: profile.getEmail(),
                token: idToken
            };

            this._ngZone.run(() => {
                this.isLoading = true;
                this._AuthService.setRegister(user).subscribe({
                    next: (response) => {
                        this.isLoading = false;
                        if (response.message == 'success') {
                            this._Router.navigate(['/login']);
                        }
                    },
                    error: (err: HttpErrorResponse) => {
                        this.isLoading = false;
                        this.msgError = err.error.message;
                    }
                });
            });
        });
    }
}
