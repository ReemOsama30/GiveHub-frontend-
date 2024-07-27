import { Component } from '@angular/core';
import { BlankNavbarComponent } from '../../blank-navbar/blank-navbar.component';
import { DonorService } from '../../../Services/donorService/donor.service';
import { AuthService } from '../../../Services/auth.service';
import { InkindDonationService } from '../../../Services/inkind-donationService/inkind-donation.service';
import { SharedService } from '../../../Services/sharedService/shared.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { MatDialog } from '@angular/material/dialog';

import { ThanksDialogComponent } from '../../thanks-dialog/thanks-dialog.component';
import { Router } from '@angular/router';
import { InkindThanksDialogComponent } from '../../inkind-thanks-dialog/inkind-thanks-dialog.component';

@Component({
  selector: 'app-inkind-donation',
  standalone: true,
  imports: [BlankNavbarComponent, FormsModule, CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './inkind-donation.component.html',
  styleUrl: './inkind-donation.component.css'
})
export class InkindDonationComponent {

  donorName: string | null = null;
  donorEmail: string | null = null;
  projectName: string | null = null;

  inKindDonation: any = {
    donationDate: '',
    donorId: '',
    projectId: '',
    charityId: '',
    itemDescription: '',
    quantity: ''
  }

  constructor(
    private donorService:DonorService,
    private authService:AuthService,
    private inkindDonationService:InkindDonationService,
    private sharedService:SharedService,
    public dialog: MatDialog,
    private router:Router

  ){}


  donationForm: FormGroup = new FormGroup({
    donationDate: new FormControl('', [Validators.required]),
    donorId: new FormControl(0, [Validators.required]),

    projectId: new FormControl(''),
    charityId: new FormControl(''),
    itemDescription: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required])

  });



  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.donorService.getDonorDetails(userId).subscribe({
        next: (response: any) => {
          if (response.isPass) {
            this.donorName = response.message.userName;
            this.donorEmail = response.message.email;
            console.log("Donor Details:", response.message);
          } else {
            console.error("Failed to fetch donor details.");
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Failed to get donor details:', err);
        }
      });

      this.donorService.getDonorID(userId).subscribe({
        next: (id: string) => {
          this.donationForm.get('donorId')?.setValue(id);
          console.log("donor id:", id);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Failed to get donor ID:', err);
        }
      });

    }

    this.projectName = this.sharedService.getProjectName();
    console.log('project name is....', this.projectName);

    const projectId = this.sharedService.getProjectId();
    if (projectId !== null) {
      this.donationForm.get('projectId')?.setValue(projectId);


      console.log("donor id:", projectId);
    }

    const charityId = this.sharedService.getCharityId();
    if (charityId !== null) {
      this.donationForm.get('charityId')?.setValue(charityId);
      console.log("donor id:", charityId);
    }
  }



  onSubmit() {
    if (this.donationForm.valid) {
      const donationData = {
        donationDate: this.donationForm.get('donationDate')?.value,
        donorId: this.donationForm.get('donorId')?.value,
        projectId: this.donationForm.get('projectId')?.value,
        charityId: this.donationForm.get('charityId')?.value,
        itemDescription: this.donationForm.get('itemDescription')?.value,
        quantity: this.donationForm.get('quantity')?.value
      };



      this.inkindDonationService.postInKindDonation(donationData).subscribe({
        next: (response) => {
          console.log('Done', response.message);
          console.log("donation data is ", donationData);
          //alert("Done")
          this.openThanksDialog();
          // alert('Donation Done successfully Thank You');
           this.router.navigate(['donor']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == 400) {
            console.log('Error:', err.error);
          }
        }
      });
    }
  }



  openThanksDialog(): void {
    this.dialog.open(InkindThanksDialogComponent, {
      width: '400px',
      height: '230px'
    });
  }
}
