import { Component } from '@angular/core';
import { ColumnConfig } from 'src/app/layout/generic-table/columnConfig.interface';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent {

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dialogInstance?: RoleDialogComponent;
  roleColumns: ColumnConfig[] = [
    {
      name: 'id',
      headerText: 'ID',
      cellTemplate: (row) => row.id.toString()
    },
    {
      name: 'name',
      headerText: 'Name',
      cellTemplate: (row) => row.name
    },
    {
      name: 'progress',
      headerText: 'Progress',
      cellTemplate: (row) => row.progress
    },
    {
      name: 'fruit',
      headerText: 'Fruit',
      cellTemplate: (row) => row.fruit
    },
  ];
}
