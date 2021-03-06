import { AfterViewInit, Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MonitoreosService } from '../../services/monitoreos.service';
import { FormulariomonitoreosComponent } from './formulariomonitoreos/formulariomonitoreos.component';
import { Socket } from 'ngx-socket-io';
import { MatSort, MatPaginator } from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';

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

  displayedColumns: string[] = ['temp_actual', 'lectura_actual', 'fecha', 'perdida'];
  lista = [];
  dataSource = new MatTableDataSource<any>();
  fechasDisponibles = new Array();
  fechaActual = null;
  dato_m = "";
  fecha_hoy = new Date();
  fecha_hoy1 = new Date();
  perdida_dia = 0;
  consumo_dia = 0;

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
  getMessage() {
    return this.socket
      .fromEvent("dataSerial").subscribe((dataSerial: any) => {
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
        this.lista = this.lista.map(function(item){
          item.fecha_hora = moment(item.fecha).format("HH:mm");
          item.fecha = moment(item.fecha).format("DD/MM/YYYY");
          return item;
        });
        this.calcularCombustibleSegunFecha();
        this.calcularPerdidasSegunFecha();
      } else {
        this.lista = this.dataSource.data = [];
      }
    })

  }

  open() {
    const dialogRef = this.dialog.open(FormulariomonitoreosComponent, {
      width: '750px',
      data: { temp_actual: '', lectura_actual: '', fecha: '', perdida: '' }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.lista.push(result.data);
      this.dataSource.data = this.lista;
      console.log(this.lista);
    });
  }

  calcularPerdidasSegunFecha() {
    const fecha = moment(this.fecha_hoy1).format("DD/MM/YYYY"); 
    var rest = 0;
    var suma = 0;
    let datosFecha = this.lista.filter(function (item) {
      console.log(fecha, item.fecha);
      return item.fecha === fecha; 
    });
    let perdidas = datosFecha.reduce(function (curr, next) {
      rest = curr;
      suma ++;
      curr += parseFloat(next.perdida);
      console.log(curr);
      return curr;
    }, 0);
    console.log(datosFecha, perdidas);
    this.dataSource.data = datosFecha;
    this.perdida_dia =perdidas;
    
  }

  calcularCombustibleSegunFecha() {
    const fecha = moment(this.fecha_hoy).format("DD/MM/YYYY");
    var rest = 0; 
    var resta = 0;
    var resultado = 0;
    var suma = 0;
    let datosFecha = this.lista.filter(function (item) {
      return item.fecha === fecha; 
    });
    let consumo = datosFecha.reduce(function (curr1, next) {
      rest = parseFloat(next.lectura_actual);
      if(rest < resta){
        resultado = resta - rest;
        suma += resultado;
        console.log(suma);
      }
      resta = rest;
      return suma;
    }, 0);

    // console.log(datosFecha, consumo);

     this.dataSource.data = datosFecha;
     this.consumo_dia =consumo;
    
  }

}
