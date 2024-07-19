import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Services/projectService/project.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';
import { SharedService } from '../../Services/sharedService/shared.service';
import { CategoryService } from '../../Services/categoryService/category.service';
import { NavWithSearchComponent } from '../nav-with-search/nav-with-search.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../Pipes/search.pipe';

enum ProjectState {
  Initiated,
  Completed,
  InProgress,
  Paused,
  Canceled
}

@Component({
  selector: 'app-donor',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BlankNavbarComponent,
    RouterOutlet,
    NavWithSearchComponent,
    FormsModule,
    SearchPipe
  ],
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  projects: any[] = [];
  categories: any[] = [];
  filteredProjects: any[] = [];
  selectedCategoryName: string = '';
  searchTerm: string = '';
  selectedBudget: string = '';
  currentPage: number = 1;
  PagesAvailable: boolean = true;

  constructor(
    private _projectService: ProjectService,
    private sharedService: SharedService,
    private router: Router,
    private categoryService: CategoryService
  ) { }


  ngOnInit(): void {
    this.getProjects();
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.message;
      },
      error: (error) => {
        console.error('Failed to fetch categories:', error);
      }
    });
  }

  getProjects(): void {
    this._projectService.getProjectsByPage(this.currentPage).subscribe({
      next: (response) => {
        console.log(response);
        if (response.message.length > 0) {
          this.projects = response.message;
          this.filteredProjects = this.projects;
          this.PagesAvailable = response.message.length === 6; // Adjust based on actual page size logic
        } else {
          this.PagesAvailable = false;
        }
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  onPageChange(page: number): void {
    if (page > 0 ) {
      this.currentPage = page;
      this.getProjects();
    }
  }

  applyFilters(): void {
    this.filteredProjects = this.projects.filter(project => {
      const categoryMatch = !this.selectedCategoryName || project.categoryName === this.selectedCategoryName;
      let budgetMatch = true;

      if (this.selectedBudget === 'min') {
        budgetMatch = project.fundingGoal < 1000;
      } else if (this.selectedBudget === 'range') {
        budgetMatch = project.fundingGoal >= 1000 && project.fundingGoal <= 5000;
      } else if (this.selectedBudget === 'max') {
        budgetMatch = project.fundingGoal > 5000;
      }

      const searchTermMatch = !this.searchTerm ||
        project.location.toLowerCase().includes(this.searchTerm.toLowerCase());

      return categoryMatch && budgetMatch && searchTermMatch;
    });
  }



  onFiltersChange(): void {
    this.applyFilters();
  }

  getFullImageUrl(relativePath: string): string {
    return `https://localhost:44377${relativePath}`;
  }

  onCategoryChange(event: Event): void {
    this.selectedCategoryName = (event.target as HTMLSelectElement).value;
    this.getProjects();
  }

  getStateString(state: ProjectState): string {
    switch (state) {
      case ProjectState.Initiated:
        return 'Initiated';
      case ProjectState.Completed:
        return 'Completed';
      case ProjectState.InProgress:
        return 'In Progress';
      case ProjectState.Paused:
        return 'Paused';
      case ProjectState.Canceled:
        return 'Canceled';
      default:
        return 'Unknown';
    }
  }

  onMoneyDonate(projectId: number, projectTitle: string, charityId: number): void {
    this.sharedService.setProjectId(projectId);
    this.sharedService.setProjectName(projectTitle);
    this.sharedService.setCharityId(charityId);
    this.router.navigate(['/moneyDonation']);
  }

  onInKindDonate(projectId: number, charityId: number, projectName: string): void {
    this.sharedService.setProjectId(projectId);
    this.sharedService.setCharityId(charityId);
    this.sharedService.setProjectName(projectName);
    this.router.navigate(['/inkindDonation']);
  }

  onSearchTermChange(): void {
    this.getProjects();
  }
  // getProjectsbyminfundinggoal(){
  //   this._projectService.getProjectsbyminfundinggoal().subscribe({
  //     next:(response)=>{
  //       this.projects = response.message;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching projects:', err);
  //     }
  //   })
  // }

  // getProjectsbyfundinggoalrange(){
  //   this._projectService.getProjectsbyfundinggoalrange().subscribe({
  //     next:(response)=>{
  //       this.projects = response.message;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching projects:', err);
  //     }
  //   })
  // }


  // getProjectbymaxfundinggoal(){
  //   this._projectService.getProjectbymaxfundinggoal().subscribe({
  //     next:(response)=>{
  //       this.projects = response.message;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching projects:', err);
  //     }
  //   })
  // }


  // onFundingGoalChange(event: any) {
  //   const selectedValue = event.target.value;
  //   if (selectedValue === 'min') {
  //     this.getProjectsbyminfundinggoal();
  //   } else if (selectedValue === 'range') {
  //     this.getProjectsbyfundinggoalrange();
  //   } else if (selectedValue === 'max') {
  //     this.getProjectbymaxfundinggoal();
  //   } else if(selectedValue == 'all'){
  //     this.getProjects();
  //   }

  // }


  // Assuming this method is in your Angular component
  getProgressPercentage(amountRaised: number, fundingGoal: number): number {
    return (amountRaised / fundingGoal) * 100;
  }



}
