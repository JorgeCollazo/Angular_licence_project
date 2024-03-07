import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CompaniesListComponent } from './companies/companies-list/companies-list.component';
import { CompaniesDialogComponent } from './companies/companies-dialog/companies-dialog.component';
import { SharedModule } from '../shared/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EntitiesListComponent } from './entities/entities-list/entities-list.component';
import { EntitiesDialogComponent } from './entities/entities-dialog/entities-dialog.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { DeviceDialogComponent } from './devices/device-dialog/device-dialog.component';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { LicenseTypeListComponent } from './license_types/license-type-list/license-type-list.component';
import { LicenseTypeDialogComponent } from './license_types/license-type-dialog/license-type-dialog.component';
import { LicenseListComponent } from './licenses/license-list/license-list.component';
import { LicenseDialogComponent } from './licenses/license-dialog/license-dialog.component';
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { PaymentDialogComponent } from './payments/payment-dialog/payment-dialog.component';
import { CxcListComponent } from './cxc/cxc-list/cxc-list.component';
import { CxcDialogComponent } from './cxc/cxc-dialog/cxc-dialog.component';
import { SubsidiariesListComponent } from './subsidiaries/subsidiaries-list/subsidiaries-list.component';
import { SubsidiariesDialogComponent } from './subsidiaries/subsidiaries-dialog/subsidiaries-dialog.component';
import { CompanyTypesListComponent } from './company_types/company-types-list/company-types-list.component';
import { CompanyTypesDialogComponent } from './company_types/company-types-dialog/company-types-dialog.component';
import { ServicesListComponent } from './services/services-list/services-list.component';
import { ServicesDialogComponent } from './services/services-dialog/services-dialog.component';
import { PrecioListComponent } from './precio/precio-list/precio-list.component';
import { PrecioDialogComponent } from './precio/precio-dialog/precio-dialog.component';
import { ProductServicesListComponent } from './products/product-services-list/product-services-list.component';
import { DeviceTypeListComponent } from './device_types/device-type-list/device-type-list.component';
import { DeviceTypeDialogComponent } from './device_types/device-type-dialog/device-type-dialog.component';
import { StatusTypesListComponent } from './status_types/status-types-list/status-types-list.component';
import { StatusTypesDialogComponent } from './status_types/status-types-dialog/status-types-dialog.component';
import { StatusDialogComponent } from './status/status-dialog/status-dialog.component';
import { StatusListComponent } from './status/status-list/status-list.component';
import { ProductServicesDialogComponent } from './products/product-services-dialog/product-services-dialog.component';


@NgModule({
  declarations: [
    CompaniesListComponent,
    CompaniesDialogComponent,
    EntitiesListComponent,
    EntitiesDialogComponent,
    ProductListComponent,
    ProductDialogComponent,
    DeviceDialogComponent,
    DeviceListComponent,
    LicenseTypeListComponent,
    LicenseTypeDialogComponent,
    LicenseListComponent,
    LicenseDialogComponent,
    PaymentListComponent,
    PaymentDialogComponent,
    CxcListComponent,
    CxcDialogComponent,
    SubsidiariesListComponent,
    SubsidiariesDialogComponent,
    CompanyTypesListComponent,
    CompanyTypesDialogComponent,
    ServicesListComponent,
    ServicesDialogComponent,
    PrecioListComponent,
    PrecioDialogComponent,
    ProductServicesListComponent,
    DeviceTypeListComponent,
    DeviceTypeDialogComponent,
    StatusTypesListComponent,
    StatusTypesDialogComponent,
    StatusDialogComponent,
    StatusListComponent,
    ProductServicesDialogComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
