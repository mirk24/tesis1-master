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
//import { Console } from 'console';
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
	datosQueDebesMandarDeLaVenta = [];
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
	dataBarChart = {
		labels: [],
		series: []
	};

	ngAfterViewInit() { }


	cargarDatosTabla() {
		this.db.list().subscribe((dato: any) => {
			console.log(dato)
			if (dato.estado == 1) {
				this.lista = dato.lista;
				this.dataSource.data = this.lista;
				this.obtenerConsumoUltimosCincoDias();
			}
			else {
				this.lista = this.dataSource.data = [];
			}
		});
		
		this.db1.list().subscribe((datos: any) => {
			console.log(datos);
			if(datos && datos.estado === 1){
				this.datosQueDebesMandarDeLaVenta = datos.lista;
				this.obtenerVentasUltimosCincoDias();
			}
		});
	}

	obtenerConsumoUltimosCincoDias() 
	{
		this.fecha_hoy.setHours(23, 59, 59, 999);
		let _this = this;
		let cincoDiasAtras = new Date(this.fecha_hoy);
		let suma = 0;
		let aux = 0;
		cincoDiasAtras.setHours(0, 0, 0, 0);
		cincoDiasAtras.setDate(cincoDiasAtras.getDate() - 4);

		// Este es el filtrado de los datos del consumo
		let consumoUltimosCincoDias = this.lista.filter(function (item) {
			const itemFecha = new Date(item.fecha);
			item.fechaFormato = moment(item.fecha).format("DD/MM/YYYY");
			return itemFecha >= cincoDiasAtras && itemFecha <= _this.fecha_hoy;
		});

		let consumo = consumoUltimosCincoDias.length > 0 ? consumoUltimosCincoDias.reduce(function (curr, next) {
			if (Object.keys(curr).indexOf(next.fechaFormato) === -1) {
				curr[next.fechaFormato] = 0;
			} else {
				suma = parseFloat(next.lectura_actual) < aux ? aux - parseFloat(next.lectura_actual) : 0
				curr[next.fechaFormato] += suma;
			}
			aux = parseFloat(next.lectura_actual);
			return curr;
		}, {}) : [];

		this.dataBarChart.labels = [].concat(Object.keys(consumo));
		this.dataBarChart.series = this.dataBarChart.series.concat([Object.values(consumo).map(item => parseFloat(item.toString()))]);
	}

	obtenerVentasUltimosCincoDias()
	{
		let _this = this;
		let cincoDiasAtras = new Date(this.fecha_hoy);
		cincoDiasAtras.setHours(0, 0, 0, 0);
		cincoDiasAtras.setDate(cincoDiasAtras.getDate() - 4);

		// Esta es el filtrado de los datos de las ventas
		let ventasUltimosCincoDias = this.datosQueDebesMandarDeLaVenta.filter(function(item){
			const itemFecha = new Date(item.fecha);
			item.fechaFormato = moment(item.fecha).format("DD/MM/YYYY");
			return itemFecha >= cincoDiasAtras && itemFecha <= _this.fecha_hoy;
		});
		
		let ventaGasolina = ventasUltimosCincoDias.length > 0 ? ventasUltimosCincoDias.reduce(function(curr, next){
			if (Object.keys(curr).indexOf(next.fechaFormato) === -1) {
				curr[next.fechaFormato] = next.volumen;
			} else {
				curr[next.fechaFormato] += next.volumen;
			}

			return curr;
		}, {}) : [];

		//Aqui se agrega los valores del filtrado de los datos de las ventas
		this.dataBarChart.series = this.dataBarChart.series.concat([Object.values(ventaGasolina).map(item => parseFloat(item.toString()))]);
	}

	ngOnInit() {
		this.cargarDatosTabla();
	}
	// Barchart
	barChart1: Chart = {
		type: 'Bar',
		data: this.dataBarChart,
		options: {
			seriesBarDistance: 15,
			

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
	// donuteChart1: Chart = {
	// 	type: 'Pie',
	// 	data: data['Pie'],
	// 	options: {
	// 		donut: true,
	// 		height: 260,
	// 		showLabel: false,
	// 		donutWidth: 20
	// 	}
	// };
}
