import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Service } from '../interface/serviceData.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../products/interface/productoData.interface';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services-dialog',
  templateUrl: './services-dialog.component.html',
  styleUrls: ['./services-dialog.component.scss']
})
export class ServicesDialogComponent implements OnInit, OnDestroy {

  isEditing: boolean = false;
  userID: number;
  serviceDialogForm: FormGroup;
  products: Product[] = [];
  editService$: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<ServicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service,
    private fb: FormBuilder,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {
    this.userID = Number(localStorage.getItem('_userID'));
    this.isEditing = !!data;
    this.serviceDialogForm = fb.group({
      nombre: [data ? data.nombre : ''],
      description: [data ? data.descripcion : ''],
      activeChbx: [data ? data.sw_Activo : false],
    });
  }

  ngOnInit(): void {
    this.pagesService.getProductos().subscribe((res) => {
      this.products = res.productos;
    })
  }

  ngOnDestroy(): void {
    this.editService$.unsubscribe();
  }

  onSaveClick() {

    if(this.serviceDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      const dataDialog: Partial<Service> = {
        nombre: this.serviceDialogForm.value.nombre,
        descripcion: this.serviceDialogForm.value.description,
        usuario_Id: this.userID,
        sw_Activo: Number(this.serviceDialogForm.value.activeChbx),
      }
      this.pagesService.saveService(dataDialog)
      .subscribe({
        next: (response) => {
          if(response.success) {
            this.toastr.success('Servicio añadido correctamente', 'Exito', {progressBar: true});
            this.dialogRef.close({isRefreshing: true});
          } else {
            this.toastr.error('No ha sido posible añadir el servicio correctamente', 'Error', {progressBar: true});
          }
        },
        error: () => {
          this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
        },
      })
    }
  }

  editService() {

    const dataDialog: Service = {
      nombre: this.serviceDialogForm.value.nombre,
      descripcion: this.serviceDialogForm.value.description,
      usuario_Id: this.userID,
      sw_Activo: Number(this.serviceDialogForm.value.activeChbx),
      servicio_Id: this.data.servicio_Id,
    };
    this.editService$ = this.pagesService.editService(dataDialog)
    .subscribe({
      next: (response) => {
        if(response.success) {
          this.toastr.success('Campos actualizados correctamente', 'Exito', {progressBar: true});
          this.dialogRef.close({isRefreshing: true});
        } else {
          this.toastr.error('No ha sido posible editar el campo correctamente', 'Error', {progressBar: true});
        }
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  close() {
    this.dialogRef.close({isRefreshing: false});
  }

}
