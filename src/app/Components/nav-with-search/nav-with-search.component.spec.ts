import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavWithSearchComponent } from './nav-with-search.component';

describe('NavWithSearchComponent', () => {
  let component: NavWithSearchComponent;
  let fixture: ComponentFixture<NavWithSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavWithSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavWithSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
