import { Component, OnInit, Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { Socket } from 'ngx-socket-io';
import { MedicionService } from '../../services/medicion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
 

//import io from 'socket.io-client';

//const socket = io('http://localhost:3000');

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.component.html',
  styleUrls: ['./medicion.component.css']
})
export class MedicionComponent implements OnInit {
  constructor(private db: MedicionService,
    private socket: Socket,
    public dialog: MatDialog) {

  }
  chart;
  dato_m = "";
  contador: number = 0;
  getMessage() {
    return this.socket
      .fromEvent("data").subscribe((data: any) => {
        //console.log("sss1");
        //console.log(data);
        this.dato_m = data.value;
        try {
          let t = JSON.parse(data);
          //console.log(t);
          
          //this.chart.data.labels.push(this.contador);
          // this.chart.data.datasets.forEach(element => {
          //   console.log(element);
          //   element.data.push(t.dato1);
          //   //element.data.push(t.dato2);
          // });
          
          

          this.contador = this.contador + 1;
          if(this.contador%10==0){
            this.chart.data.datasets[0].data.push(t.dato1);
          }
          if(this.contador%30==0){
            this.chart.data.datasets[1].data.push(t.dato2);
          }
          if(this.contador%30==0){
            this.chart.data.labels.push(moment().format('HH:mm:ss'));
          }
          this.chart.update();
        } catch {
          console.log("no llego");
        }
      });


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