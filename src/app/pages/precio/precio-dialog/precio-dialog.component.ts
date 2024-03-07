import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Price, ResponsePrice } from '../interface/precioData.interface';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-precio-dialog',
  templateUrl: './precio-dialog.component.html',
  styleUrls: ['./precio-dialog.component.scss']
})
export class PrecioDialogComponent {

  priceDialogForm: FormGroup;
  isEditing: boolean = false;
  userID: number;
  editPrice$: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<PrecioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Price,
    private fb: FormBuilder,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {
    this.userID = Number(localStorage.getItem('_userID'));
    this.isEditing = !!data;
    this.priceDialogForm = fb.group({
      nombre: [data ? data.nombre : ''],
      descripcion: [data ? data.descripcion : ''],
      monto: [data ? data.monto : 0],
      activeChbx: [data ? data.sw_Activo : false]
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.editPrice$.unsubscribe();
  }

  onSaveClick(): void {
    if(this.priceDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      const dataDialog: Partial<Price> = {
        nombre: this.priceDialogForm.value.nombre,
        descripcion: this.priceDialogForm.value.descripcion,
        monto: parseFloat(this.priceDialogForm.value.monto) ? parseFloat(this.priceDialogForm.value.monto) : 0,
        usuario_Id: this.userID,
        sw_Activo: Number(this.priceDialogForm.value.activeChbx),
      }

      this.pagesService.savePrice(dataDialog)
        .subscribe({
          next: (res: ResponsePrice) => {
            if(res.success) {
              this.toastr.success('Precio añadido correctamente', 'Exito', {progressBar: true});
              this.dialogRef.close({isRefreshing: true});
            } else {
              this.toastr.error('No ha sido posible añadir el precio correctamente', 'Error', {progressBar: true});
            }
          },
          error: () => {
            this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
          },
        })
    }
  }

  editPrice() {

    const dataDialog: Price = {
      nombre: this.priceDialogForm.value.nombre,
      descripcion: this.priceDialogForm.value.descripcion,
      monto: this.priceDialogForm.value.monto,
      sw_Activo: Number(this.priceDialogForm.value.activeChbx),
      id_Precio: this.data.id_Precio,
      usuario_Id: this.userID
    };
    this.editPrice$ = this.pagesService.editPrice(dataDialog)
    .subscribe({
      next: (res: ResponsePrice) => {
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
