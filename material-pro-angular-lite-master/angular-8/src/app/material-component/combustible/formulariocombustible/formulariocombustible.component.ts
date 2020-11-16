import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder,Validators } from '@angular/forms'
import { CombustibleService } from '../../../services/combustible.service';



@Component({
  selector: 'app-formulariocombustible',
  templateUrl: './formulariocombustible.component.html',
  styleUrls: ['./formulariocombustible.component.css']
})
export class FormulariocombustibleComponent implements OnInit {

  per={litros_comprados:'',fecha_adquirida:'',tipo_de_combustible:'',chofer:'',placa_sisterna:'',_id:''};

  error=[];
  form = this.fb.group({
    litros_comprados: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
    fecha_adquirida: ['',[Validators.required,Validators.maxLength(20)]],
    tipo_de_combustible: ['',[Validators.required,Validators.maxLength(10), Validators.pattern("^[a-zA-Z]+$")]],
    chofer: ['',[Validators.required,Validators.maxLength(10), Validators.pattern("^[a-zA-Z]+$")]],
    placa_sisterna: ['',[Validators.required,Validators.maxLength(7)]],
  });
  constructor(
    public dialogRef: MatDialogRef<FormulariocombustibleComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public fb:FormBuilder,
    public db:CombustibleService
  ) {
    this.per=data;

   }
  enviar(){
    
    if(this.per._id){
      this.db.edit(this.per._id,this.per).subscribe((server:any)=>{
        console.log("2ssssssss33333");
        if(server.estado==1)
          this.dialogRef.close({});
        else
          this.error=server.err.message;
      })
    }else{
      console.log(this.per);
      this.db.add(this.per).subscribe((serve:any)=>{
        if(serve.estado==1){
          //this.lista.push(serve.Empleado);
          this.dialogRef.close({data:serve.combustible});
        }else{
          //if(isArray(serve.err.errors)){
            this.error=serve.err.message;
          //}else
          //this.error=[serve.err.errors];
          //console.log(this.error[0].ci.message);
        }
      });
    }
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
