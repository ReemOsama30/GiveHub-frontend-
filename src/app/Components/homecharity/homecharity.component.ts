import { Component } from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { DonorComponent } from '../donor/donor.component';
import { CharitiesComponent } from '../charities/charities.component';
import { CharityComponent } from '../charity/charity.component';

@Component({
  selector: 'app-homecharity',
  standalone: true,
  imports: [ProjectComponent,DonorComponent,CharitiesComponent,CharityComponent],
  templateUrl: './homecharity.component.html',
  styleUrl: './homecharity.component.css'
})
export class HomecharityComponent {

}
