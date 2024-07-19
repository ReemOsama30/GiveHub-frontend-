import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-inkind-thanks-dialog',
  standalone: true,
  imports: [],
  templateUrl: './inkind-thanks-dialog.component.html',
  styleUrl: './inkind-thanks-dialog.component.css'
})
export class InkindThanksDialogComponent {
  constructor(public dialogRef: MatDialogRef<InkindThanksDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
