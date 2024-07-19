import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MoneyDonationService } from '../../Services/moneyDonationSevice/money-donation.service';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';
import { SharedService } from '../../Services/sharedService/shared.service';
import { DonorService } from '../../Services/donorService/donor.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { ThanksDialogComponent } from '../thanks-dialog/thanks-dialog.component';
import { PaypalButtonComponent } from '../paypal-button/paypal-button.component';



@Component({
  selector: 'app-money-donation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BlankNavbarComponent,
    FooterComponent,
    PaypalButtonComponent
  ],
  templateUrl: './money-donation.component.html',
  styleUrls: ['./money-donation.component.css'],
})
export class MoneyDonationComponent implements OnInit {
  donationForm: FormGroup;
  projectName: string | null = '';
  paymentMethod: string = 'paypal';
  projectId: number = 0;
  donorId: number = 0;
  userId: string = '';
  donorName: string = ''; 
  donorEmail: string = ''; 

  constructor(
    private donorService: DonorService,
    private authService: AuthService,
    private moneyDonationService: MoneyDonationService,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private _Router: Router,
    public dialog: MatDialog
  ) {
    this.donationForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      organization: ['', Validators.required],
      paymentMethod: ['paypal'],
      projectId: ['', Validators.required],
      donorId: ['', Validators.required],
      charityId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId() as string;
    console.log('userId:', this.userId);
    if (this.userId !== null) {
      this.donorService.getDonorDetails(this.userId).subscribe({
        next: (res) => {
          console.log('message :', res.message);
          this.donorEmail=res.message.email;
          this.donorName=res.message.userName;
          this.donationForm.get('email')?.setValue(res.message.email);
          this.donationForm.get('fullName')?.setValue(res.message.userName);
          this.projectName = this.sharedService.getProjectName();
          this.donationForm.get('organization')?.setValue(this.projectName);
          console.log('project Name:', this.projectName);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.error('User ID is null');
    }
    this.donationForm.controls['paymentMethod'].setValue(this.paymentMethod);
    console.log(this.paymentMethod);
    const amount = this.donationForm.controls['amount'].value;
    this.donationForm.controls['amount'].setValue(amount);
    this.projectId = this.sharedService.getProjectId() as number;
    this.donationForm.controls['projectId'].setValue(this.projectId);
    this.donorService.getDonorID(this.userId).subscribe({
      next: (res) => {
        console.log('donor id :', res);
        this.donorId = res;
        this.donationForm.controls['donorId'].setValue(this.donorId);
      },
    });
    const charityId = this.sharedService.getCharityId();
    this.donationForm.controls['charityId'].setValue(charityId);
    console.log(this.donationForm);
  }

  onAmountChange(event: any): void {
    const newAmount = event.target.value;
    localStorage.setItem('Amount', newAmount);
    //console.log('New Amount set to:', localStorage.getItem('Amount'));
  }
  onSubmit() {
    if (this.donationForm.valid) {
      const formData = new FormData();
      formData.append('donationDate', new Date().toISOString());
      formData.append('donorId', this.donationForm.controls['donorId'].value);
      formData.append(
        'projectId',
        this.donationForm.controls['projectId'].value
      );
      formData.append(
        'charityId',
        this.donationForm.controls['charityId'].value
      );
      formData.append('amount', this.donationForm.controls['amount'].value);
      formData.append(
        'paymentMethod',
        this.donationForm.controls['paymentMethod'].value
      );
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      this.moneyDonationService.postMoneyDonation(formData).subscribe({
        next: (response) => {
          console.log('Done', response.message);
          console.log('donation data is ', formData);
          this.openThanksDialog();
         // alert('Donation Done successfully Thank You');
          this._Router.navigate(['donor']);
        },
        error: (err) => {
          console.log('Error:', err.error);
        },
      });
    }
  }


  openThanksDialog(): void {
    this.dialog.open(ThanksDialogComponent, {
      width: '400px',
      height: '230px'
    });
  }
}
