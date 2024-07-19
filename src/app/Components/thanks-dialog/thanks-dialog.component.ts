import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-thanks-dialog',
  standalone: true,
  imports: [],
  templateUrl: './thanks-dialog.component.html',
  styleUrl: './thanks-dialog.component.css'
})
export class ThanksDialogComponent {
  constructor(public dialogRef: MatDialogRef<ThanksDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
