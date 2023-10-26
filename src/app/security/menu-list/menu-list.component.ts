import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnConfig } from 'src/app/layout/generic-table/columnConfig.interface';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {

  displayedColumns: string[] = ['orden', 'nombre', 'link', 'descripcion', 'estado', 'acciones'];
  menuColumns: ColumnConfig[] = [
    {
      name: 'orden',
      headerText: 'Orden',
      cellTemplate: (row) => row.id.toString()
    },
    {
      name: 'nombre',
      headerText: 'Nombre',
      cellTemplate: (row) => row.fruit
    },
    {
      name: 'link',
      headerText: 'Link',
      cellTemplate: (row) => row.progress
    },
    {
      name: 'descripcion',
      headerText: 'Descripción',
      cellTemplate: (row) => row.fruit
    },
    {
      name: 'estado',
      headerText: 'Estado',
      cellTemplate: (row) => row.fruit
    },
  ];
  dialogData: Object = 
    {
      dialogTitle: 'Añadir Menú', 
      // formGroup: this.createRoleForm(),
      showNameControl: true,
      showLinkControl: true,
      showDescriptionControl: true,
      showOrderControl: true,
      showLevelControl: true,
      showActive: true,
    }

  constructor(private fb: FormBuilder) {}

  createRoleForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }
  
}
