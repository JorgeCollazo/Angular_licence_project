import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from 'src/app/layout/generic-table/generic-table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { HeaderPageComponent } from 'src/app/layout/header-page/header-page.component';
import { FooterPageComponent } from 'src/app/layout/footer-page/footer-page.component';


@NgModule({
  declarations: [
    GenericTableComponent,
    HeaderPageComponent,
    FooterPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    GenericTableComponent,
    HeaderPageComponent,
    FooterPageComponent
  ]
})

export class SharedModule { }
