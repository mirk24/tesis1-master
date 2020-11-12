import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as Chartist from 'chartist';
import { Chart } from 'chart.js';
import { MatSnackBar } from "@angular/material/snack-bar"
import { ChartType, ChartEvent } from 'ng-chartist';
import { MonitoreosService } from '../services/monitoreos.service';
import { MatTableDataSource } from '@angular/material/table';
import { VentasService } from '../services/ventas.service';
import { Router } from '@angular/router';
import { Console } from 'console';
import * as moment from 'moment';
declare var require: any;

const data: any = require('./data.json');

export interface Chart {
	type: ChartType;
	data: Chartist.IChartistData;
	options?: any;
	responsiveOptions?: any;
	events?: ChartEvent;
}

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	lista = [];
	constructor(
		private db: MonitoreosService,
		private db1: VentasService,
		private router: Router) {
		if (!localStorage.getItem('token')) {
			router.navigate(['login'])
		}

	}
	dataSource = new MatTableDataSource<any>();
	fecha_hoy = new Date();

	ngAfterViewInit() { }


	cargarDatosTabla() {
		this.db.list().subscribe((dato: any) => {
			console.log(dato)
			if (dato.estado == 1) {
				this.lista = dato.lista;
				this.dataSource.data = this.lista;
				this.obtenerUltimosCincoDias();
				console.log('pppppp');
			}
			else {
				this.lista = this.dataSource.data = [];
			}
		})

	}

	obtenerUltimosCincoDias() {
		this.fecha_hoy.setHours(23, 59, 59, 999);
		var _this = this;
		var cincoDiasAtras = new Date(this.fecha_hoy);
		var resta = 0;
		var fechaC = new Date();
		var fechaA = new Date(moment(this.fecha_hoy).format("DD/MM/YYYY"));
		var resultado = 0;
		var rest = 0;
		var suma = 0;
		var aux = 0;
		cincoDiasAtras.setHours(0, 0, 0, 0);
		cincoDiasAtras.setDate(cincoDiasAtras.getDate() - 6);

		var datosUltimosCincoDias = this.lista.filter(function (item) {
			const itemFecha = new Date(item.fecha);
			return itemFecha >= cincoDiasAtras && itemFecha <= _this.fecha_hoy;
		});
		console.log(datosUltimosCincoDias);
			let consumo = datosUltimosCincoDias.reduce(function (curr1, next) {
				fechaC =new Date(moment(next.fecha).format("DD/MM/YYYY"));
				console.log(fechaA);
				console.log(fechaC);
				if(fechaA.getTime() == fechaC.getTime())
				{
					rest = parseFloat(next.lectura_actual);
					if(rest < resta){
						resultado = resta - rest;
						suma += resultado;
					  }
					  resta = rest;
					console.log("entro");
				}
				else{
					aux = suma ;
					suma = 0;
					console.log(suma);
					console.log(aux);
				}
					
				
				fechaA = fechaC;
				console.log(rest);
				console.log(suma);
				return suma;
				
			  }, 0);
		
		
		//console.log(consumo);
	}

	ngOnInit() {
		this.cargarDatosTabla();
	}
	// Barchart
	barChart1: Chart = {
		type: 'Bar',
		data: data['Bar'],
		options: {
			seriesBarDistance: 15,
			high: 12,

			axisX: {
				showGrid: false,
				offset: 20
			},
			axisY: {
				showGrid: true,
				offset: 40
			},
			height: 360
		},

		responsiveOptions: [
			[
				'screen and (min-width: 640px)',
				{
					axisX: {
						labelInterpolationFnc: function (
							value: number,
							index: number
						): string {
							return index % 1 === 0 ? `${value}` : null;
						}
					}
				}
			]
		]
	};

	// This is for the donute chart
	donuteChart1: Chart = {
		type: 'Pie',
		data: data['Pie'],
		options: {
			donut: true,
			height: 260,
			showLabel: false,
			donutWidth: 20
		}
	};
}
