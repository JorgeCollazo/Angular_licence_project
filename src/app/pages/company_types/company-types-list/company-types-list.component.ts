import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CompanyTypeData } from '../interface/company_type.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PagesService } from '../../pages.service';
import { CompanyTypesDialogComponent } from '../company-types-dialog/company-types-dialog.component';

@Component({
  selector: 'app-company-types-list',
  templateUrl: './company-types-list.component.html',
  styleUrls: ['./company-types-list.component.scss']
})
export class CompanyTypesListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name','status', 'actions'];
  dataSource: MatTableDataSource<CompanyTypeData>;
  getCompanyTypes$: Subscription = new Subscription();
  isSpinnerLoading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private pagesService: PagesService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getCompanyTypes$ = this.pagesService.getCompanyTypes().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.tiposEntidades);
      this.isSpinnerLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.getCompanyTypes$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCompanyTypeDialog(): void {
    const dialogRef = this.dialog.open(CompanyTypesDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getCompanyTypes$ = this.pagesService.getCompanyTypes().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.tiposEntidades);
        this.isSpinnerLoading = false;
      });
    });
  }

  editCompanyType(companyType: CompanyTypeData) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = companyType;

    const dialogRefEdit = this.dialog.open(
      CompanyTypesDialogComponent,
      dialogConfig
    );

    dialogRefEdit.afterClosed().subscribe((result) => {
      this.getCompanyTypes$ = this.pagesService.getCompanyTypes().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.tiposEntidades);
      });
    });
  }

  deleteCompanyType(companyType: CompanyTypeData) {

  }
}
