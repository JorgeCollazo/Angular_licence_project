import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResponseStatusTypes, StatusType } from '../interface/status_license.interface';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-status-types-dialog',
  templateUrl: './status-types-dialog.component.html',
  styleUrls: ['./status-types-dialog.component.scss']
})
export class StatusTypesDialogComponent implements OnDestroy {

  statusTypeDialogForm!: FormGroup;
  disableClose: boolean = false;
  user_id: number;
  isSelectDisabled: boolean = true;
  isEditing: boolean;
  editStatusType$: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<StatusTypesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StatusType,
    private fb: FormBuilder,
    private pageService: PagesService,
    private toastr: ToastrService
  ) {
    this.isEditing = !!data;
    this.user_id = Number(localStorage.getItem('_userID'));
    this.statusTypeDialogForm = fb.group({
      name: [data ? data.nombre : ''],
      description: [data ? data.descripcion : ''],
    });
  }

  ngOnDestroy(): void {
    this.editStatusType$.unsubscribe();
  }

  onSaveClick(): void {
    if(this.statusTypeDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      const dataDialog: Partial<StatusType> = {
        nombre: this.statusTypeDialogForm.value.name,
        descripcion: this.statusTypeDialogForm.value.description,
        usuario_Id: this.user_id
      }

      this.pageService.saveStatusType(dataDialog)
      .subscribe({
        next: (res: ResponseStatusTypes) => {
          if(res.success) {
            this.toastr.success('Tipo de estado añadido correctamente', 'Exito', {progressBar: true});
            this.dialogRef.close({isRefreshing: true});
          } else {
            this.toastr.error('No ha sido posible añadir tipo de estado correctamente', 'Error', {progressBar: true});
          }
        },
        error: () => {
          this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
        },
      })
    }
  }

  editStatusType() {

    const dataDialog: StatusType = {
      nombre: this.statusTypeDialogForm.value.name,
      descripcion: this.statusTypeDialogForm.value.description,
      usuario_Id: this.user_id,
      iD_Tpest: this.data.iD_Tpest,
    };
    this.editStatusType$ = this.pageService.editStatusType(dataDialog)
    .subscribe({
      next: (res: ResponseStatusTypes) => {
        if(res.success) {
          this.toastr.success('Campos actualizados correctamente', 'Exito', {progressBar: true});
          this.dialogRef.close({isRefreshing: true});
        } else {
          this.toastr.error('No ha sido posible editar el campo correctamente', 'Error', {progressBar: true});
        }
      },
      error: () => {

      },
    })
  }

  close() {
    this.dialogRef.close({isRefreshing: false});
  }

}
