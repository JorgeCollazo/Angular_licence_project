import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PagesService } from '../../pages.service';
import { Product } from '../interface/productoData.interface';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { License, ResponseLicenses } from '../../licenses/interface/license.interface';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})

export class ProductDialogComponent implements OnInit, OnDestroy {

  productDialogForm!: FormGroup;
  disableClose: boolean = false;
  userID: number;
  isSelectDisabled: boolean = true;
  licenses: License[] = [];
  getLicenses$: Subscription = new Subscription();
  editProduct$: Subscription = new Subscription();
  isEditing : boolean;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {
    this.isEditing = !!data
    this.userID = Number(localStorage.getItem('_userID'));
    this.productDialogForm = fb.group({
      name: [data ? data.nombre : ''],
      description: [data ? data.descripcion : ''],
      license_id: [data ? data.tipo_Lic_Id : 0],
      activeChbx: [data ? data.sw_Activo : false]
    });
  }

  ngOnInit(): void {
    this.getLicenses$ = this.pagesService.getLicenses().subscribe((res: ResponseLicenses) => {
      this.licenses = res.licencias;
    });
  }

  ngOnDestroy(): void {
    this.getLicenses$.unsubscribe();
  }

  onSaveClick(): void {
    if(this.productDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      })
    } else {
      const dataDialog: Partial<Product> = {
        nombre: this.productDialogForm.value.name,
        descripcion: this.productDialogForm.value.description,
        usuario_Id: this.userID,
        tipo_Lic_Id: this.productDialogForm.value.license_id,
        sw_Activo: Number(this.productDialogForm.value.activeChbx),
      }
      this.pagesService.saveProduct(dataDialog)
      .subscribe({
        next: (response) => {
          if(response.success) {
            this.toastr.success('Producto añadido correctamente', 'Exito', {progressBar: true});
            this.close();
          } else {
            this.toastr.error('No ha sido posible añadir el producto correctamente', 'Error', {progressBar: true});
          }
        },
        error: () => {
          this.toastr.error('Ha habido un error en el servidor', 'Error', {progressBar: true});
        },
      })
    }
  }

  editProduct() {

    const dataDialog: Product = {
      nombre: this.productDialogForm.value.name,
      producto_Id: this.data.producto_Id,
      sw_Activo: Number(this.productDialogForm.value.activeChbx),
      descripcion: this.productDialogForm.value.description,
      usuario_Id: this.userID,
      tipo_Lic_Id: this.productDialogForm.value.license_id,
    };
    this.editProduct$ = this.pagesService.editProduct(dataDialog)
    .subscribe({
      next: (response) => {
        if(response.success) {
          this.toastr.success('Campos actualizados correctamente', 'Exito', {progressBar: true});
          this.dialogRef.close({editing: true});
        } else {
          this.toastr.error('No ha sido posible editar el campo correctamente', 'Error', {progressBar: true});
        }
      },
      error: () => {

      },
    })
  }

  close() {
    this.dialogRef.close({editing: false});
  }
}
