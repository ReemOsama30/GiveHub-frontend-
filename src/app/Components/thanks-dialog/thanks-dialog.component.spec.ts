import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksDialogComponent } from './thanks-dialog.component';

describe('ThanksDialogComponent', () => {
  let component: ThanksDialogComponent;
  let fixture: ComponentFixture<ThanksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThanksDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThanksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
