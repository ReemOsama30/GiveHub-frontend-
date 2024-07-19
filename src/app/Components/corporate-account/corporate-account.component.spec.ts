import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAccountComponent } from './corporate-account.component';

describe('CorporateAccountComponent', () => {
  let component: CorporateAccountComponent;
  let fixture: ComponentFixture<CorporateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorporateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
