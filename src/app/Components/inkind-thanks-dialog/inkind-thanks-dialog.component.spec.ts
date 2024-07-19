import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InkindThanksDialogComponent } from './inkind-thanks-dialog.component';

describe('InkindThanksDialogComponent', () => {
  let component: InkindThanksDialogComponent;
  let fixture: ComponentFixture<InkindThanksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InkindThanksDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InkindThanksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
