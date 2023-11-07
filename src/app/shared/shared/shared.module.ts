import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { HeaderPageComponent } from 'src/app/layout/header-page/header-page.component';
import { FooterPageComponent } from 'src/app/layout/footer-page/footer-page.component';
@NgModule({
  declarations: [
    HeaderPageComponent,
    FooterPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderPageComponent,
    FooterPageComponent
  ]
})

export class SharedModule { }
