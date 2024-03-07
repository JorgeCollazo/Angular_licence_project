import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PagesService } from '../../pages.service';
import { Product } from '../interface/productoData.interface';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { License, ResponseLicense } from '../../licenses/interface/license.interface';
import { ResponseService, Service } from '../../services/interface/serviceData.interface';
import { Device, ResponseDevice } from '../../devices/interface/device.interface';

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
  services: Service[] = [];
  devices: Device[] = [];
  getLicenses$: Subscription = new Subscription();
  getServices$: Subscription = new Subscription();
  getDevices$: Subscription = new Subscription();
  editProduct$: Subscription = new Subscription();
  isEditing : boolean;
  arrServicesIDs: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {

    this.isEditing = !!data
    if(this.isEditing)
      this.arrServicesIDs = data.services_Id.split(',').map(Number);


    this.userID = Number(localStorage.getItem('_userID'));
    this.productDialogForm = fb.group({
      name: [data ? data.nombre : '', Validators.required],
      description: [data ? data.descripcion : ''],
      license_id: [data ? data.lic_Id : null, Validators.required],
      servicio_Id: [data ? this.arrServicesIDs : null],
      device_id: [data ? data.dispositivo_Id : null],
      activeChbx: [data ? data.sw_Activo : false]
    });
  }

  ngOnInit(): void {
    this.getLicenses$ = this.pagesService.getLicenses().subscribe((res: ResponseLicense) => {
      this.licenses = res.licencias;
    });

    this.getServices$ = this.pagesService.getServices().subscribe((res: ResponseService) => {
      this.services = res.servicios;
    });

    this.getDevices$ = this.pagesService.getDevices().subscribe((res: ResponseDevice) => {
      this.devices = res.dispositivos;
    });
  }

  ngOnDestroy(): void {
    this.getLicenses$.unsubscribe();
    this.getServices$.unsubscribe();
    this.getDevices$.unsubscribe();
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
        dispositivo_Id: this.productDialogForm.value.device_id,
        lic_Id: this.productDialogForm.value.license_id,
        sw_Activo: Number(this.productDialogForm.value.activeChbx),
        services_Id: this.productDialogForm.value.servicio_Id.join(',')
      }
      this.pagesService.saveProduct(dataDialog)
      .subscribe({
        next: (response) => {
          if(response.success) {
            this.toastr.success('Producto añadido correctamente', 'Exito', {progressBar: true});
            this.dialogRef.close({isRefreshing: true});
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
      dispositivo_Id: this.productDialogForm.value.device_id,
      sw_Activo: Number(this.productDialogForm.value.activeChbx),
      descripcion: this.productDialogForm.value.description,
      usuario_Id: this.userID,
      lic_Id: this.productDialogForm.value.license_id,
      services_Id: this.productDialogForm.value.servicio_Id.join(',')
    };

    this.editProduct$ = this.pagesService.editProduct(dataDialog)
    .subscribe({
      next: (response) => {
        if(response.success) {
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
