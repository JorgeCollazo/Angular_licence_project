import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SecurityService } from '../../security.service';
import { Menu } from '../interfaces/menu.intereface';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss'],
})

export class MenuDialogComponent implements OnInit, OnDestroy {
  menuDialogForm!: FormGroup;
  disableClose: boolean = false;
  isSelectDisabled: boolean = true;
  parentMenus: Menu[] = [];
  isEditing: boolean;
  menus$: Subscription = new Subscription();
  saveMenus$: Subscription = new Subscription();
  editMenus$: Subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<MenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Menu,
    private fb: FormBuilder,
    private securityService: SecurityService,
    private toastr: ToastrService
  ) {

    this.isEditing = !!data;
    this.menuDialogForm = fb.group({
      name: [data ? data.nombre : null],
      link: [data ? data.link : ''],
      orden: [data ? data.orden : null],
      nivel: [data ? data.nivel : null],
      parent: [{ value: data ? data.padre : null, disabled: true }],
      description: [data ? data.descripcion : null],
      activeChbx: [data ? data.status : false],
      isSubmenuChbx: [(data && data.padre) ? true : false],
      showChbx: [data ? data.sw_display : true],
      adminChbx: [data ? data.sw_admin : false],
    });

  }

  ngOnInit(): void {
    this.menus$ = this.securityService.getMenu()
      .subscribe((res: any) => {
        this.parentMenus = res.menus.filter((menu: Menu) => menu.padre == 0)
      });
    const isChecked = this.data.padre !== 0;
    this.setParentSelect(isChecked);

  }

  ngOnDestroy(): void {
    this.menus$.unsubscribe();
    this.editMenus$.unsubscribe();
    this.saveMenus$.unsubscribe();
  }

  saveMenu(): void {
    if (this.menuDialogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario',
      });
    } else {

      const dataDialog: Menu = {
        nombre: this.menuDialogForm.value.name,
        status: Number(this.menuDialogForm.value.activeChbx),
        sw_admin: Number(this.menuDialogForm.value.adminChbx),
        descripcion: this.menuDialogForm.value.description,
        link: this.menuDialogForm.value.link,
        nivel: parseInt(this.menuDialogForm.value.nivel),
        sw_display: Number(this.menuDialogForm.value.showChbx),
        id_menu: -1,
        orden: parseInt(this.menuDialogForm.value.orden),
        padre: this.menuDialogForm.value.parent,
      };

      this.saveMenus$ = this.securityService.saveMenu(dataDialog)
      .subscribe({
        next: (response) => {
          if(response.success) {
            this.toastr.success('Menú añadido correctamente', 'Exito', {progressBar: true});
            this.close();
          } else {
            this.toastr.error('No ha sido posible añadir el menú correctamente', 'Error', {progressBar: true});
          }
                  },
        error: () => {

        },
      })
    }
  }

  editMenu() {

    const dataDialog: Menu = {
      nombre: this.menuDialogForm.value.name,
      status: Number(this.menuDialogForm.value.activeChbx),
      sw_admin: Number(this.menuDialogForm.value.adminChbx),
      descripcion: this.menuDialogForm.value.description,
      link: this.menuDialogForm.value.link,
      nivel: parseInt(this.menuDialogForm.value.nivel),
      sw_display: Number(this.menuDialogForm.value.showChbx),
      id_menu: this.data.id_menu,
      orden: parseInt(this.menuDialogForm.value.orden),
      padre: this.menuDialogForm.value.parent,
    };
    this.editMenus$ = this.securityService.editMenu(dataDialog)
    .subscribe({
      next: (response) => {
        if(response.success) {
          this.toastr.success('Menú editado correctamente', 'Exito', {progressBar: true});
          this.close();
        } else {
          this.toastr.error('No ha sido posible editar el menú correctamente', 'Error', {progressBar: true});
        }
                },
      error: () => {

      },
    })
  }

  setParentSelect(selection: boolean) {
    console.log('selection>>>>>>>>>', selection)
    selection
      ? this.menuDialogForm.get('parent')?.enable()
      : this.menuDialogForm.get('parent')?.disable();
  }

  close() {
    this.dialogRef.close();
  }
}
