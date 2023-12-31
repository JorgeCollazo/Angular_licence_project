/* Angular imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Third-party imports */
import { MaterialModule } from './material/material.module';

/* Project imports */

import { AuthModule } from './auth/auth.module';
import { NavigationComponent } from '../app/layout/navigation/navigation.component';
import { RegisterComponent } from './auth/register/register.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { SublevelMenuComponent } from './layout/sidenav/sublevel-menu.component';
import { SecurityModule } from './security/security.module';
import { SharedModule } from './shared/shared/shared.module';
import { CompaniesComponent } from './pages/companies/companies.component';
import { GenericDialogComponent } from './layout/generic-dialog/generic-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    SidenavComponent,
    SublevelMenuComponent,
    CompaniesComponent,
    GenericDialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    MaterialModule,
    SecurityModule,
    SharedModule,
    ReactiveFormsModule,

  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
