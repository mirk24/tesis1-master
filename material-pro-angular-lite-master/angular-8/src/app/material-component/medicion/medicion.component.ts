import { Component, OnInit, Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { Socket } from 'ngx-socket-io';
import { MedicionService } from '../../services/medicion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import * as moment from 'moment';


//import io from 'socket.io-client';

//const socket = io('http://localhost:3000');

// interface Alertas {
//   isGasolinaBaja: boolean,
//   isVentaIrregular: boolean,
//   isTemperaturaAlta: boolean
// };

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.component.html',
  styleUrls: ['./medicion.component.css']
})

export class MedicionComponent implements OnInit {
  constructor(
    private db: MedicionService,
    private socket: Socket,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }
  chart: any;
  dato_m: string = "";
  contador: number = 0;
  mensajesAlerta = {
    isTemperaturaAlta: "Nivel de temperatura alto en el tanque ",
    isVentaIrregular: "Cambio considerable en el volumen del tanque",
    isGasolinaBaja: "Nivel de gasolina bajo en el tanque"
  };
  nivelActual = -1;
  getMessage() {
    return this.socket
      .fromEvent("data").subscribe((data: any) => {
        this.dato_m = data.value;
        try {
          let t = JSON.parse(data);
          //Incremento del contador a medida que llega informacion
          //Cada 30 intervalos son 6 segundos en promedio
          this.contador = this.contador + 1;
          if (this.contador % 10 == 0) {
            this.chart.data.datasets[0].data.push(t.dato1);
          }
          if (this.contador % 50 == 0) {
            this.comprobarAlertas(t);
            this.chart.data.datasets[1].data.push(t.dato2);
            this.chart.data.labels.push(moment().format('HH:mm:ss'));
          }

          if (this.contador % 150 === 0) {
            if (this.nivelActual !== -1) {
              if ((this.nivelActual - t.dato1) >= 1000) {
                this.mostrarAlertaVentaIrregular();
              }
            }
            this.nivelActual = t.dato1;
          }

          this.chart.update();
        } catch (Error){
          console.log(`No llego por lo siguiente: ${Error.message}`);
        }
      });
  }

  mostrarAlertaGasolinaBaja() {
    this.mostrarMensajeError(this.mensajesAlerta.isGasolinaBaja);
  }

  mostrarAlertaVentaIrregular() {
    this.mostrarMensajeError(this.mensajesAlerta.isVentaIrregular);
  }

  mostrarAlertaTemperaturaAlta() {
    this.mostrarMensajeError(this.mensajesAlerta.isTemperaturaAlta);
  }

  mostrarMensajeError(texto: string){
    this.snackBar.open(texto, "Cerrar", { duration: 5000 });
  }

  comprobarAlertas(info) {
    if (info.dato1 < 420) {
      this.mostrarAlertaGasolinaBaja()
    }
    if (info.dato2 > 18) {
      this.mostrarAlertaTemperaturaAlta();
    }
  }

  ngOnInit() {
    this.getMessage();
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Nivel de Combustible',
            backgroundColor: 'rgb(30, 136, 229)',
            borderColor: 'rgb(30, 136, 229)',

            fill: false,
          },
          {
            label: 'Temperatura',
            backgroundColor: 'rgb(230, 136, 229)',
            borderColor: 'rgb(230, 136, 229)',

            fill: false,
          },
        ]
      },

    })
  }
}