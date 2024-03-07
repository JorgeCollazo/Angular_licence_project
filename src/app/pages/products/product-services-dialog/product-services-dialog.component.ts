import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Service } from '../../services/interface/serviceData.interface';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { ProductServicePrice } from '../interface/productoData.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-services-dialog',
  templateUrl: './product-services-dialog.component.html',
  styleUrls: ['./product-services-dialog.component.scss']
})
export class ProductServicesDialogComponent implements OnInit, OnDestroy {

  isEditing: boolean = false;
  userID: number;
  productServiceDialogForm: FormGroup;
  editProductService$: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<ProductServicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {service: ProductServicePrice, productID: number},
    private fb: FormBuilder,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {
    this.userID = Number(localStorage.getItem('_userID'));
    this.isEditing = data.service.monto !== 0;
    this.productServiceDialogForm = fb.group({
      monto: [data ? data.service.monto : 0],
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.editProductService$.unsubscribe();
  }

  onSaveClick() {

    if(this.productServiceDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {

      const dataDialog: Partial<ProductServicePrice> = {
        monto: Number(this.productServiceDialogForm.value.monto),
        servicio_Id: this.data.service.servicio_Id,
        producto_Id: Number(this.data.productID),
        idproducto_servicio_precio: Number(this.data.service.idproducto_servicio_precio),
      }

      this.pagesService.saveProductServiceAmount(dataDialog)
      .subscribe({
        next: (response) => {
          if(response.success) {
            this.toastr.success('Monto añadido correctamente', 'Exito', {progressBar: true});
            this.dialogRef.close({isRefreshing: true});
          } else {
            this.toastr.error('No ha sido posible añadir el monto correctamente', 'Error', {progressBar: true});
          }
        },
        error: () => {
          this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
        },
      })
    }
  }

  // editProductServicePrice() {

  //   const dataDialog: ProductServicePrice = {
  //       monto: this.productServiceDialogForm.value.monto,
  //       servicio_Id: this.data.service.servicio_Id,
  //       id_producto: this.data.service.id_producto,
  //   };
  //   this.editService$ = this.pagesService.editService(dataDialog)
  //   .subscribe({
  //     next: (response) => {
  //       if(response.success) {
  //         this.toastr.success('Campos actualizados correctamente', 'Exito', {progressBar: true});
  //         this.dialogRef.close({isRefreshing: true});
  //       } else {
  //         this.toastr.error('No ha sido posible editar el campo correctamente', 'Error', {progressBar: true});
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   })
  // }

  close() {
    this.dialogRef.close({isRefreshing: false});
  }

}
