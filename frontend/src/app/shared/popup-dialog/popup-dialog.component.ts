import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss']
})
export class PopupDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; type: 'success' | 'error' },
    public dialogRef: MatDialogRef<PopupDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
