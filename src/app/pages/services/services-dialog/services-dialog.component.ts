import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Service } from '../interface/serviceData.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PagesService } from '../../pages.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../products/interface/productoData.interface';

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
      product: [data ? data.producto_Id : null]
    });
  }

  ngOnInit(): void {
    this.pagesService.getProductos().subscribe((res) => {
      this.products = res.productos;
    })
  }

  ngOnDestroy(): void {

  }

  onSaveClick() {}

  editService() {}

  close() {
    this.dialogRef.close({isRefreshing: false});
  }

}
