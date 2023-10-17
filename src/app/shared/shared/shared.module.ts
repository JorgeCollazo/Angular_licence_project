import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from 'src/app/layout/generic-table/generic-table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { HeaderPageComponent } from 'src/app/layout/header-page/header-page.component';


@NgModule({
  declarations: [
    GenericTableComponent,
    HeaderPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    GenericTableComponent,
    HeaderPageComponent
  ]
})

export class SharedModule { }
