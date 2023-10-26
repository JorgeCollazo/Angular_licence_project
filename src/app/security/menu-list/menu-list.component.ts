import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { IMenu } from 'src/app/auth/menu.interface';
import { ColumnConfig } from 'src/app/layout/generic-table/columnConfig.interface';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  
  tableData: IMenu[] = [];
  displayedColumns: string[] = ['orden', 'nombre', 'link', 'nivel', 'descripcion', 'estado', 'mostrar', 'acciones'];
  menuColumns: ColumnConfig[] = [
    {
      name: 'orden',
      headerText: 'Orden',
      cellTemplate: (row) => row.orden
    },
    {
      name: 'nombre',
      headerText: 'Nombre',
      cellTemplate: (row) => row.menu
    },
    {
      name: 'link',
      headerText: 'Link',
      cellTemplate: (row) => row.link
    },
    {
      name: 'nivel',
      headerText: 'Nivel',
      cellTemplate: (row) => row.link
    },
    {
      name: 'descripcion',
      headerText: 'Descripción',
      cellTemplate: (row) => row.link
    },
    {
      name: 'estado',
      headerText: 'Estado',
      cellTemplate: (row) => row.estado
    },
    {
      name: 'mostrar',
      headerText: 'Mostrar',
      cellTemplate: (row) => row.muestra
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
      showShow: true,
      showAdmin: true,
    }

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
      // this.navData = navbarData;
      this.tableData = this.authService.decrypParm(localStorage.getItem('_menu'));
    }

}
