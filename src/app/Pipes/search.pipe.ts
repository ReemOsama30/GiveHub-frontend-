import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone:true
})
export class SearchPipe implements PipeTransform {

  transform(projects: any[], term: string): any[] {
    if (!projects || !term) {
      return projects;
    }
    term = term.toLowerCase().trim(); // Convert search term to lowercase and trim spaces
    return projects.filter(project => 
      project.location.toLowerCase().includes(term)
     
    );
  }

}

