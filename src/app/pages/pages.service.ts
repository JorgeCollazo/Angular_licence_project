import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from '../security/security.service';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';
import { Company, ResponseCompany } from './companies/interface/company.interface';
import { environment } from 'src/environment/environment';
import Swal from 'sweetalert2';
import { Product, ProductServicePrice, ResponseProducto } from './products/interface/productoData.interface';
import { Device, ResponseDevice } from './devices/interface/device.interface';
import { License, ResponseLicense } from './licenses/interface/license.interface';
import { Entity, EntityDto, ResponseEntity } from './entities/interface/entity.interface';
import { CompanyTypeData } from './company_types/interface/company_type.interface';
import { LicenseType, ResponseLicenseType } from './license_types/interface/licenseType.interface';
import { Subsidiary } from './subsidiaries/interface/subsidiary.interface';
import { ResponseService, Service } from './services/interface/serviceData.interface';
import { Price, ResponsePrice } from './precio/interface/precioData.interface';
import { DeviceType, DeviceTypeResponse } from './device_types/interface/device_type.interface';
import { ResponseStatusTypes, StatusType } from './status_types/interface/status_license.interface';
import { ResponseStatus, Status } from './status/interface/status.interface';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http: HttpClient, private securityService: SecurityService ) { }


/***************** Companies *****************/

getCompanies(): Observable<ResponseCompany>{

    const headers = this.securityService.setHeadersAuth();

    return this.http.get<ResponseCompany>(`${environment.apiURL}/GrupoEntidad`, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al cargar la lista de compañías';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  saveCompany(company: Partial<Company>): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.post(`${environment.apiURL}/GrupoEntidad`, company, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al salvar la compañía';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  deleteCompany(grp_Ent_Id: number): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/GrupoEntidad/${grp_Ent_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar la compañía seleccionada';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
  }

  editCompany(company: Company): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/GrupoEntidad/${company.grp_Ent_Id}`, company, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar la compañía';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }


  /*********************** Company Types ********************/

  getCompanyTypes(): Observable<any>{

    const headers = this.securityService.setHeadersAuth();

    return this.http.get<{company: CompanyTypeData[]}>(`${environment.apiURL}/TipoEntidad`, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al cargar la lista de tipos de compañias';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  saveCompanyType(company: Partial<CompanyTypeData>): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.post(`${environment.apiURL}/TipoEntidad`, company, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al salvar el tipo de entidad';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  editCompanyType(companyType: CompanyTypeData): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/TipoEntidad/${companyType.mant_cod}`, companyType, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar el tipo de compañía';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  /***************** Entities *****************/

  getEntities(): Observable<ResponseEntity> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.get<ResponseEntity>(`${environment.apiURL}/Entidad`, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al cargar la lista de entidades';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  deleteEntity(grp_Ent_Id: number): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/Entidad/${grp_Ent_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar la entidad seleccionada';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
  }

  saveEntity(entity: Partial<Entity>): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.post(`${environment.apiURL}/Entidad`, entity, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al salvar la entidad';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  editEntity(entity: Entity): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    console.log('entity>>>>>>>>>>>', entity);

    return this.http.put(`${environment.apiURL}/Entidad/${entity.mant_ent_id}`, entity, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar la entidad';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  /***************** Subsidiaries *****************/

  getSubsidiaries(): Observable<any>{

    const headers = this.securityService.setHeadersAuth();

    return this.http.get<{menu: Entity[]}>(`${environment.apiURL}/SubGrpEntidad`, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al cargar la lista de sucursales';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  deleteSubsidiary(grp_Ent_Id: number) {

    const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/SubGrpEntidad/${grp_Ent_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar la sucursal seleccionada';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
  }

  editSubsidiary(subsidiary: Subsidiary): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/SubGrpEntidad/${subsidiary.subGrp_Id}`, subsidiary, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar la sucursal';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

  saveSubsidiary(subsidiary: Partial<Subsidiary>): Observable<any> {

    const headers = this.securityService.setHeadersAuth();

    return this.http.post(`${environment.apiURL}/SubGrpEntidad`, subsidiary, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al salvar la sucursal';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
  }

/***************** Products *****************/

getProductos(): Observable<ResponseProducto>{

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<ResponseProducto>(`${environment.apiURL}/Producto`, {headers: headers})
    .pipe(
      catchError(err => {
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

saveProduct(product: Partial<Product>): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.post(`${environment.apiURL}/Producto`, product, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al salvar el Producto';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

deleteProduct(producto_Id: number): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/Producto/${producto_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar el producto seleccionado';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
}

editProduct(product: Product): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/Producto/${product.producto_Id}`, product, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar el producto';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
}

/***************** Devices *****************/

getDevices(): Observable<ResponseDevice> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<ResponseDevice>(`${environment.apiURL}/Dispositivo`, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

saveDevice(device: Partial<Device>): Observable<ResponseDevice> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.post<ResponseDevice>(`${environment.apiURL}/Dispositivo`, device, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

deleteDevice(device_id: number): Observable<DeviceTypeResponse> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete<DeviceTypeResponse>(`${environment.apiURL}/Dispositivo/${device_id}`, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
    )
}

editDevice(device: Device): Observable<ResponseDevice> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.put<ResponseDevice>(`${environment.apiURL}/Dispositivo/${device.id_Disp}`, device, {headers: headers})
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(() => new Error(err));
        }),
        shareReplay()
      )
}

/***************** Device Types*****************/

getDeviceTypes(): Observable<DeviceTypeResponse>{

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<DeviceTypeResponse>(`${environment.apiURL}/TipoDispositivo`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al cargar la lista de tipos de dispositivos';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

saveDeviceType(deviceType: Partial<DeviceType>): Observable<DeviceTypeResponse> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.post<DeviceTypeResponse>(`${environment.apiURL}/TipoDispositivo`, deviceType, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al salvar el tipo de dispositivo';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

editDeviceType(deviceType: DeviceType): Observable<DeviceTypeResponse> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.put<DeviceTypeResponse>(`${environment.apiURL}/TipoDispositivo/${deviceType.iD_Tipo_Disp}`, deviceType, {headers: headers})
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(() => new Error(err));
        }),
        shareReplay()
      )
  }

deleteDeviceType(device_type_id: number): Observable<DeviceTypeResponse> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete<DeviceTypeResponse>(`${environment.apiURL}/TipoDispositivo/${device_type_id}`, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
    )
}

/***************** Licenses *****************/

getLicenses(): Observable<ResponseLicense> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<ResponseLicense>(`${environment.apiURL}/Licencia`, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

deleteLicense(lic_Id: number): Observable<ResponseLicense> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete<ResponseLicense>(`${environment.apiURL}/Licencia/${lic_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
    )
}

saveLicense(license: Partial<License>): Observable<ResponseLicense> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.post<ResponseLicense>(`${environment.apiURL}/Licencia`, license, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

editLicense(license: License): Observable<ResponseLicense> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.put<ResponseLicense>(`${environment.apiURL}/Licencia/${license.lic_Id}`, license, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

/***************** License Types *****************/

getLicenseType(): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<{licenses: LicenseType[]}>(`${environment.apiURL}/TipoLicencia`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al cargar la lista de tipos de licencias';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

saveLicenseType(licenseType: Partial<LicenseType>): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.post(`${environment.apiURL}/TipoLicencia`, licenseType, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al salvar el tipo de licencia';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

deleteLicenseType(tipo_Lic_Id: number): Observable<ResponseLicenseType> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete<ResponseLicenseType>(`${environment.apiURL}/TipoLicencia/${tipo_Lic_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
    )
}

editLicenseType(licenseType: LicenseType): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.put(`${environment.apiURL}/TipoLicencia/${licenseType.tipo_Lic_Id}`, licenseType, {headers: headers})
      .pipe(
        catchError(err => {
          const message = 'Error al editar el tipo de Licencia';

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
          })

          console.log(err);
          return throwError(() => new Error(message));
        }),
        shareReplay()
      )
}

/***************** Services *****************/

getServices(): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<{services: Service[]}>(`${environment.apiURL}/Servicio`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al cargar la lista de servicios';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}

getServicesByProduct(id_product: number): Observable<ResponseService> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<ResponseService>(`${environment.apiURL}/Servicio/servicios-por-producto/${id_product}`, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

deleteService(service_Id: number): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/Servicio/${service_Id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar el servicio seleccionada';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
}

saveService(service: Partial<Service>): Observable<ResponseService> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.post<ResponseService>(`${environment.apiURL}/Servicio`, service, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

saveProductServiceAmount(service: Partial<ProductServicePrice>) : Observable<ResponseService> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.post<ResponseService>(`${environment.apiURL}/Servicio/monto-servicios`, service, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

editService(service: Service): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.put(`${environment.apiURL}/Servicio/${service.servicio_Id}`, service, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al editar el servicio';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
      shareReplay()
    )
}





/***************** Prices *****************/

getPrices(): Observable<ResponsePrice> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<ResponsePrice>(`${environment.apiURL}/Precio`, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

deletePrice(price_id: number): Observable<any> {

  const headers = this.securityService.setHeadersAuth();

    return this.http.delete(`${environment.apiURL}/Precio/${price_id}`, {headers: headers})
    .pipe(
      catchError(err => {
        const message = 'Error al eliminar el precio seleccionado';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })

        console.log(err);
        return throwError(() => new Error(message));
      }),
    )
}

editPrice(price: Price): Observable<ResponsePrice> {

const headers = this.securityService.setHeadersAuth();

  return this.http.put<ResponsePrice>(`${environment.apiURL}/Precio/${price.id_Precio}`, price, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

savePrice(price: Partial<Price>): Observable<ResponsePrice> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.post<ResponsePrice>(`${environment.apiURL}/Precio`, price, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

/***************** Status Types *****************/

getStatusTypes(): Observable<ResponseStatusTypes> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<ResponseStatusTypes>(`${environment.apiURL}/TipoEstado`, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

saveStatusType(statusType: Partial<StatusType>): Observable<ResponseStatusTypes> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.post<ResponseStatusTypes>(`${environment.apiURL}/TipoEstado`, statusType, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

editStatusType(statusType: StatusType): Observable<ResponseStatusTypes> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.put<ResponseStatusTypes>(`${environment.apiURL}/TipoEstado/${statusType.iD_Tpest}`, statusType, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

deleteStatusType(statusTypeID: number): Observable<ResponseStatusTypes> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.delete<ResponseStatusTypes>(`${environment.apiURL}/TipoEstado/${statusTypeID}`, {headers: headers})
  .pipe(
    catchError(err => {
      console.log(err);
      return throwError(() => new Error(err));
    }),
  )
}

/***************** Status *****************/

getStatus(): Observable<ResponseStatus> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.get<ResponseStatus>(`${environment.apiURL}/Estado`, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

saveStatus(status: Partial<Status>): Observable<ResponseStatus> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.post<ResponseStatus>(`${environment.apiURL}/Estado`, status, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

editStatus(status: Status): Observable<ResponseStatus> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.put<ResponseStatus>(`${environment.apiURL}/Estado/${status.id_est}`, status, {headers: headers})
    .pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      shareReplay()
    )
}

deleteStatus(statusID: number): Observable<ResponseStatus> {

  const headers = this.securityService.setHeadersAuth();

  return this.http.delete<ResponseStatus>(`${environment.apiURL}/Estado/${statusID}`, {headers: headers})
  .pipe(
    catchError(err => {
      console.log(err);
      return throwError(() => new Error(err));
    }),
  )
}


/***************** Payments *****************/
/***************** CxC *****************/

}
