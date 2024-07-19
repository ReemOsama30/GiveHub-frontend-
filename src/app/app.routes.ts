import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';
import { UserAccountTypeComponent } from './Components/user-account-type/user-account-type.component';
import { UserAccountTypeLayoutComponent } from './Components/user-account-type-layout/user-account-type-layout.component';
import { CharityRegisterComponent } from './Components/charity-register/charity-register.component';
import { DonorComponent } from './Components/donor/donor.component';
import { CharityComponent } from './Components/charity/charity.component';
import { ProjectComponent } from './Components/project/project.component';
import { CharitiesComponent } from './Components/charities/charities.component';

import { HomeAuthComponent } from './Components/home-auth/home-auth.component';
import { HomecharityComponent } from './Components/homecharity/homecharity.component';
import { LogincharityComponent } from './Components/logincharity/logincharity.component';

import { CharityDetailsComponent } from './Components/charity-details/charity-details.component';
import { CharityAccountComponent } from './Components/charity-account/charity-account.component';
import { authGuard } from './Guards/auth.guard';

import { DonorAccountComponent } from './donor-account/donor-account.component';
import { MoneyDonationComponent } from './Components/money-donation/money-donation.component';
import { InkindDonationComponent } from './Components/inkind-donation/inkind-donation/inkind-donation.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ReportComponent } from './Components/report/report.component';
import { UserCardComponent } from './Components/user-card/user-card.component';
import { AlldonorsComponent } from './Components/alldonors/alldonors.component';


export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: 'homeauth', component: HomeAuthComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logincharity', component: LogincharityComponent },
      { path: 'register', component: UserAccountTypeComponent },
      { path: 'donnerregister', component: RegisterComponent },
      { path: 'charityregister', component: CharityRegisterComponent },

      { path: 'donor', component: DonorComponent, canActivate: [authGuard] },
      { path: 'charity/:id', component: CharityComponent, canActivate: [authGuard] },
      { path: 'project', component: ProjectComponent, canActivate: [authGuard] },
      { path: 'charities', component: CharitiesComponent, canActivate: [authGuard] },
      { path: 'charityAccount', component: CharityAccountComponent },
      { path: 'charity-details/:id', component: CharityDetailsComponent },
      {path:'donoraccount',component:DonorAccountComponent},
      {path :'moneyDonation',component:MoneyDonationComponent},
      {path:'inkindDonation',component:InkindDonationComponent},
      {path:"donorprofile/:id",component:ProfileComponent},
      {path:'report/:id',component:ReportComponent}
      ,
      {path:'allDonors',component:AlldonorsComponent}
    ]
  },
  {
    path: '', component: BlankLayoutComponent, children: [
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
      { path: 'homecharity', component: HomecharityComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'donor', component: DonorComponent },
      { path: 'charity/id', component: CharityComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'charities', component: CharitiesComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }

  
];