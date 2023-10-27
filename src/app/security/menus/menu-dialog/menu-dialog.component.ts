import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss']
})

export class MenuDialogComponent {

  menuDialogForm!: FormGroup;
  name: string = '';
  link: string = '';
  description: string = '';
  orden: number = 0;
  nivel: number = 0;

  constructor(
    public dialogRef: MatDialogRef<MenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
