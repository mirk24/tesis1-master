import { AfterViewInit, Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MonitoreosService } from '../../services/monitoreos.service';
import { FormulariomonitoreosComponent } from './formulariomonitoreos/formulariomonitoreos.component';
import { Socket } from 'ngx-socket-io';
import { MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-monitoreos',
  templateUrl: './monitoreos.component.html',
  styleUrls: ['./monitoreos.component.css']
})

export class MonitoreosComponent implements OnInit {

  constructor(private db: MonitoreosService,
    private socket: Socket,
    public dialog: MatDialog) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['temp_actual', 'lectura_actual', 'fecha'];
  lista = [];
  dataSource = new MatTableDataSource<any>();
  fechasDisponibles = new Array();
  fechaActual = null;

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
  dato_m = "";
  getMessage() {
    return this.socket
      .fromEvent("dataSerial").subscribe((dataSerial: any) => {
        console.log("sss");
        //console.log(data);

        this.dato_m = dataSerial.value;
      });
  }

  ngOnInit() {
    this.getMessage();
    this.cargarDatosTabla();
  }

  cargarDatosTabla() {
    this.db.list().subscribe((dato: any) => {
      console.log(dato)
      if (dato.estado == 1) {
        this.lista = dato.lista;
        this.dataSource.data = this.lista;

        //Logica para obtener datos historicos

        this.fechasDisponibles = dato.lista.reduce(function (current, next) {
          if (current.indexOf(next.fecha) === -1) {
            current.push(next.fecha);
          }
          return current;
        }, []);
      } else {
        this.lista = this.dataSource.data = [];
      }
    })

  }

  open() {
    const dialogRef = this.dialog.open(FormulariomonitoreosComponent, {
      width: '750px',
      data: { temp_actual: '', lectura_actual: '', fecha: '' }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.lista.push(result.data);
      this.dataSource.data = this.lista;
      console.log(this.lista);
    });
  }

  calcularPerdidasSegunFecha(fecha) {
    let datosFecha = this.lista.filter(function (item) {
      return item.fecha === fecha;
    });
    let perdidas = datosFecha.reduce(function (curr, next) {
      curr += parseFloat(next.lectura_actual);
      return curr;
    }, 0);

    console.log(datosFecha, perdidas);

    //this.datasource.data = datosFecha // para una nueva tabla

    return [datosFecha, perdidas];
  }

}
