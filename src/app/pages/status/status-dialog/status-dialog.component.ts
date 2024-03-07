import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseStatus, Status } from '../interface/status.interface';
import Swal from 'sweetalert2';
import { ResponseStatusTypes, StatusType } from '../../status_types/interface/status_license.interface';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss']
})
export class StatusDialogComponent implements OnInit, OnDestroy {

  statusDialogForm!: FormGroup;
  disableClose: boolean = false;
  user_id: number;
  isSelectDisabled: boolean = true;
  isEditing: boolean;
  editStatusType$: Subscription = new Subscription();
  getStatusTypes$: Subscription = new Subscription();
  statusTypes: StatusType[] = [];

  constructor(
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Status,
    private fb: FormBuilder,
    private pageService: PagesService,
    private toastr: ToastrService
  ) {
console.log('data>>>>>>>>>>>>>>>>', data);

    this.isEditing = !!data;
    this.user_id = Number(localStorage.getItem('_userID'));
    this.statusDialogForm = fb.group({
      name: [data ? data.nombre : ''],
      code: [data ? data.cod : ''],
      status_type: [data ? data.id_tpest : null],
      sw_activo: [data ? data.sw_activo : false],
    });
  }

  ngOnInit(): void {
    this.getStatusTypes();
    }

  ngOnDestroy(): void {
    this.editStatusType$.unsubscribe();
    this.getStatusTypes$.unsubscribe();
  }

  onSaveClick(): void {
    if(this.statusDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      const dataDialog: Partial<Status> = {
        nombre: this.statusDialogForm.value.name,
        cod: this.statusDialogForm.value.code,
        sw_activo: Number(this.statusDialogForm.value.sw_activo),
        id_tpest: this.statusDialogForm.value.status_type
      }

      this.pageService.saveStatus(dataDialog)
      .subscribe({
        next: (res: ResponseStatus) => {
          if(res.success) {
            this.toastr.success('Estado añadido correctamente', 'Exito', {progressBar: true});
            this.dialogRef.close({isRefreshing: true});
          } else {
            this.toastr.error('No ha sido posible añadir el estado correctamente', 'Error', {progressBar: true});
          }
        },
        error: () => {
          this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
        },
      })
    }
  }

  editStatus() {

    const dataDialog: Status = {
      nombre: this.statusDialogForm.value.name,
        cod: this.statusDialogForm.value.code,
        sw_activo: Number(this.statusDialogForm.value.sw_activo),
        id_tpest: this.statusDialogForm.value.status_type,
        id_est: this.data.id_est,
    };
    this.editStatusType$ = this.pageService.editStatus(dataDialog)
    .subscribe({
      next: (res: ResponseStatus) => {
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

  getStatusTypes() {
    this.getStatusTypes$ = this.pageService.getStatusTypes().subscribe((res: ResponseStatusTypes) => {
      this.statusTypes = res.tipoEstados;
    });
  }

  close() {
    this.dialogRef.close({isRefreshing: false});
  }

}
