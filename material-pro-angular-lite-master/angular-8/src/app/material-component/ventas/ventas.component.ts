import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatPaginator } from '@angular/material';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { data } from 'jquery';
import * as moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})

export class VentasComponent implements OnInit {
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

  constructor(private db: VentasService,
    public dialog: MatDialog) {

  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['fecha', 'volumen', 'precio', 'totalventa', 'vendedor'];
  lista = [];
  dataSource = new MatTableDataSource<any>();
  totaldia = 0;
  fecha_inicio = new Date();
  fecha_fin = new Date();
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit() {
    this.db.list().subscribe((dato: any) => {
      console.log("pppppp");
      if (dato.estado == 1) {
        this.lista = dato.lista;
        this.dataSource.data = this.lista;
        this.lista = this.lista.map(function (item) {
          item.fecha_display = moment(item.fecha).format("DD/MM/YYYY");
          return item;
        });

      } else {
        this.lista = this.dataSource.data = [];

      }
    })
  }
  getTotalCost() {
    return this.lista.map(t => t.totalventa).reduce((acc, value) => acc + value, 0);
  }
  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.db.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }
  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  calcularPerdidasSegunFecha() {
    this.fecha_fin.setHours(23, 59, 59, 999);
    var _this = this;
    if (this.fecha_inicio && this.fecha_fin && this.fecha_fin >= this.fecha_inicio) {
      let datosFecha = this.lista.filter(function (item) {
        const fecha_format = new Date(item.fecha);
        return fecha_format <= _this.fecha_fin && fecha_format >= _this.fecha_inicio;
      });
      let totales = datosFecha.reduce(function (curr, next) {
        curr += parseFloat(next.totalventa);
        return curr;
      }, 0);
      this.dataSource.data = datosFecha;
      this.totaldia = totales;
    }
  }

}

