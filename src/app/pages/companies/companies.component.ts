import { Component } from '@angular/core';
import { ColumnConfig } from 'src/app/layout/generic-table/columnConfig.interface';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  companiesColumns: ColumnConfig[] = [
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
