import { Component } from '@angular/core';
import { CharityService } from '../../Services/charityService/charity.service';
import { ProjectService } from '../../Services/projectService/project.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartModule, Chart } from 'angular-highcharts';
import { CategoryService } from '../../Services/categoryService/category.service';
import { InkindDonationService } from '../../Services/inkind-donationService/inkind-donation.service';
import { MoneyDonationService } from '../../Services/moneyDonationSevice/money-donation.service';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';

enum ProjectState {
  Initiated,
  Completed,
  InProgress,

  Canceled
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [RouterModule, CommonModule, ChartModule, BlankNavbarComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})

export class ReportComponent {
  charityId: string  = '';
  charity: any = null;
  charityName: string = "";
  charityDescription: string = "";
  projects: any[] = [];
  numberOfProjects: number | null = null;
  categories: any[] = [];


  projectsByCategoryChart = new Chart({
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Number of Projects by Category'
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Categories'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Projects'
      }
    },
    series: [{
      type: 'bar',
      name: 'Projects',
      data: []
    }]
  });






  fundingVsAmountRaisedChart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Funding Goal vs Amount Raised'
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Projects'
      }
    },
    yAxis: {
      title: {
        text: 'Amount'
      }
    },
    series: [{
      type: 'column',
      name: 'Funding Goal',
      data: []
    }, {
      type: 'column',
      name: 'Amount Raised',
      data: []
    }]
  });

  kindDonationChart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'In-Kind Donations'
    },
    xAxis: {
      categories: [],
      crosshair: true
    },
    tooltip: {
      shared: true
    },
    series: [{
      type: 'line',
      name: 'In-Kind Donations',
      data: []
    }]
  });

  moneyDonationChart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Money Donations'
    },
    xAxis: {
      categories: [],
      crosshair: true
    },
    tooltip: {
      shared: true
    },
    series: [{
      type: 'line',
      name: 'Money Donations',
      data: []
    }]
  });

  projectStatePieChart = new Chart({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Projects by State'
    },
    series: [{
      type: 'pie',
      name: 'Projects by State',
      data: []
    }]
  });


  constructor(
    private charityService: CharityService,
    private projectService: ProjectService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private inkindDonationService: InkindDonationService,
    private moneyDonationService: MoneyDonationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.charityId = id ? id : ''; // Ensure charityId is a string
      console.log('charity id is ==>', this.charityId);

      this.charityService.getcharityById(this.charityId).subscribe({
        next: (res: any) => {
          this.charityName = res.message.name;
          this.charityDescription = res.message.description;
        },
        error: (err) => {
          console.error('Error fetching charity:', err);
        }
      });

      this.projectService.getAllprojectForCharityId(this.charityId).subscribe({
        next: (res: any) => {
          this.projects = res.message;
          console.log('project res info ==>', this.projects);
          this.numberOfProjects = res.message.length;
          console.log('number of projects is ==>', this.numberOfProjects);

          this.updateProjectsByCategoryChart();
          this.updateFundingVsAmountRaisedChart();
          this.updateKindDonationChart();
          this.updateMoneyDonationChart();
          this.updateProjectStatePieChart();

        },
        error: (err) => {
          console.error('Error fetching projects:', err);
        }
      });
    });
  }

  updateProjectsByCategoryChart() {

    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.message;

        const categoryNames: any = [];
        const projectCounts: any = [];

        this.categories.forEach(category => {
          const projectsForCategory = this.projects.filter(project => project.categoryId === category.id);
          categoryNames.push(category.name);
          projectCounts.push(projectsForCategory.length);
        });


        this.projectsByCategoryChart = new Chart({
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Number of Projects by Category'
          },
          xAxis: {
            categories: categoryNames,
            title: {
              text: 'Categories'
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Number of Projects'
            }
          },
          series: [{
            type: 'bar',
            name: 'Projects',
            data: projectCounts,
            color: '#50B848'
          }]
        });
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  updateFundingVsAmountRaisedChart() {
    const projectTitles = this.projects.map(project => project.title);
    const fundingGoals = this.projects.map(project => project.fundingGoal);
    const amountsRaised = this.projects.map(project => project.amountRaised);

    this.fundingVsAmountRaisedChart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Funding Goal vs Amount Raised'
      },
      xAxis: {
        categories: projectTitles,
        title: {
          text: 'Projects'
        }
      },
      yAxis: {
        title: {
          text: 'Amount'
        }
      },
      series: [{
        type: 'column',
        name: 'Funding Goal',
        data: fundingGoals,
        color: '#008500'
      }, {
        type: 'column',
        name: 'Amount Raised',
        data: amountsRaised,
        color: '#50B848'
      }]
    });
  }
  updateKindDonationChart() {
    if (this.charityId !== null) {
      this.inkindDonationService.getIKindDonationWithCharityId(this.charityId).subscribe({
        next: (res: any) => {
          const inkindDonations = res.message;

          const inkindDonationData = inkindDonations.map((donation: any) => ({
            name: donation.projectName,
            y: donation.quantity,
            description: donation.itemDescription,
            donorName: donation.donorName
          }));

         
          const categories = inkindDonationData.map((d: any) => d.name);

          this.kindDonationChart = new Chart({
            chart: {
              type: 'line'
            },
            title: {
              text: 'In-Kind Donations Distribution'
            },
            xAxis: {
              categories: categories,
              crosshair: true
            },
            tooltip: {
              shared: true,
              pointFormat: 'Donor: {point.donorName}' 
                 
            },
            plotOptions: {
              line: {
                dataLabels: {
                  enabled: true,
                  //formatter: function () {
                   // const point = this.point as any; 
                   // return `<b>Amout: ${this.y}</b><br>Donor: ${point.donorName}`;
                  //}

                },
                enableMouseTracking: true
              }
            },
            series: [{
              type: 'line',
              name: 'In-Kind Donations',
              data: inkindDonationData.map((d: any) => ({
                y: d.y,
                donorName: d.donorName
              })),
              color: '#50B848'
            }]
          });
        },
        error: (err) => {
          console.error('Error fetching in-kind donations:', err);
        }
      });
    }
  }


  updateMoneyDonationChart() {
    if (this.charityId !== null) {
      this.moneyDonationService.getMoneyDonationWithCharityId(this.charityId).subscribe({
        next: (res: any) => {
          const moneyDonations = res.message;

          const moneyDonationData = moneyDonations.map((donation: any) => ({
            name: donation.projectName,
            y: donation.amount,
            donorName: donation.donorName
          }));

          const categories = moneyDonationData.map((d: any) => d.name);

          this.moneyDonationChart = new Chart({
            chart: {
              type: 'line'
            },
            title: {
              text: 'Money Donations Distribution'
            },
            xAxis: {
              categories: categories,
              crosshair: true
            },
            tooltip: {
              shared: true,
              pointFormat: 'Donor: {point.donorName}' 
            },
            plotOptions: {
              line: {
                dataLabels: {
                  enabled: true,
                 
                },
                enableMouseTracking: true
              }
            },
            series: [{
              type: 'line',
              name: 'Money Donations',
              data: moneyDonationData.map((d: any) => ({
                y: d.y,
                donorName: d.donorName
              })),
              color: '#008000'
            }]
          });
        },
        error: (err) => {
          console.error('Error fetching money donations:', err);
        }
      });
    }
  }

  updateProjectStatePieChart() {
    if (this.projects.length === 0) {
      return;
    }

    const stateCounts: any = {
      [ProjectState.Initiated]: 0,
      [ProjectState.Completed]: 0,
      [ProjectState.InProgress]: 0,

      [ProjectState.Canceled]: 0
    };

    this.projects.forEach(project => {
      stateCounts[project.state]++;
    });

    const stateData = Object.keys(stateCounts).map((stateKey: string) => ({
      name: ProjectState[stateKey as keyof typeof ProjectState],
      y: stateCounts[stateKey]
    }));


    this.getProjectStatePieChart(stateData);
  }

  getProjectStatePieChart(data: any[]) {
    const shadesOfGreen = ['#90ee90', '#03c03c', '#006400', '#177245']; 
  
    this.projectStatePieChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Total Projects by Project State'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          colors: shadesOfGreen 
        }
      },
      series: [{
        type: 'pie',
        name: 'Number of Projects',
        data: data,
      }]
    });
  }
  
  printReport() {
    window.print();
  }

}
