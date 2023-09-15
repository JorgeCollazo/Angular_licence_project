/* Angular imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Third-party imports */
import { MaterialModule } from './material/material.module';

/* Project imports */

import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { NavigationComponent } from '../app/layout/navigation/navigation.component';
import { RegisterComponent } from './auth/register/register.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { SublevelMenuComponent } from './layout/sidenav/sublevel-menu.component';
import { SidenavMenuComponent } from './layout/sidenav-menu/sidenav-menu.component';
import { HeaderPageComponent } from './layout/header-page/header-page.component';
import { UserListComponent } from './security/users/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    SidenavComponent,
    SublevelMenuComponent,
    SidenavMenuComponent,
    HeaderPageComponent,
    UserListComponent         // TODO: Remove from here
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
  ],
  exports: [
    // HeaderPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
