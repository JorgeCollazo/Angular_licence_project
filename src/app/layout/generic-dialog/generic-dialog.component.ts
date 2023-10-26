import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericDialogComponent implements OnInit {
  
  genericForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<GenericDialogComponent>, private fb: FormBuilder) {
    
    this.genericForm = this.fb.group({
      name: ['', [Validators.required]],
      link: ['', [Validators.required]],
      description: ['', [Validators.required]],
      order: ['', [Validators.required]],
      level: ['', [Validators.required]],
      active: ['', [Validators.required]],
    })
  }

  ngOnInit() {
  }

  saveDataForm() {
    console.log("this.genericForm>>>>>>>", this.genericForm);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
