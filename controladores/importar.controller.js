var Importar=require('../modelos/importar.model');
//import * as moment from 'moment';
var moment = require('moment');
function listaImportar(req, res){
    Importar.find({estado:1},(err,resul)=>{
         res.status(200).json({mgs:'todo legal',estado:1, lista:resul});
    })
}
function nuevoImportar(req, res){
    console.log('asdasd');

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
      console.log(req.files);
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.file;
      
      var fs = require('fs');
 
      //var contents = fs.readFileSync(sampleFile, 'utf8');
      csvData = req.files.file.data.toString('utf8');
      i=0;
      console.log('consultaaaa');
      Importar.find({estado:1},(err,resul)=>{
        //res.status(200).json({mgs:'todo legal',estado:1, lista:resul});
   })
      csvData.split(/\r?\n/).forEach(function(line){
        if(i!=0)
        {
            //console.log(line);
            items=line.split(",");
            //console.log(items[5]);
            /*fecha:  Date,
    volumen: Number,
    precio:   Number,
    totalventa: Number,
    vendedor: String,
            */
           try{
           let fecha1=items[3].split("-");
           let aux=fecha1[2].split(" ");
           
           console.log("fecha");
           
           console.log(aux);
           let hora=aux[1].split(":");
            let fe=new Date(aux[0],fecha1[1]-1,fecha1[0]
                ,hora[0],hora[1],hora[2]
                );
              //  aux[0]+'-'+(fecha1[1]-1)+'-'+fecha1[0]
            let tt=moment(fe);
            console.log(fe);
            console.log(tt.format('YYYY-MM-DD[T00:00:00.000Z]').toString());
            console.log(new Date(Date.now()).toISOString());
            console.log(new Date(tt.format('YYYY-MM-DD[T00:00:00.000Z]')).toISOString());
           }catch(e){console.log(e);}
            let est= new Importar();
             //let yy=                
                //est.fecha=new Date(Date.now());
                est.fecha=items[2];
                    //tt.format('YYYY-MM-DD[T00:00:00.000Z]')).toISOString();
                //new Date(Date.now()).toISOString();
                //tt.format('YYYY-MM-DD[T00:00:00.000Z]').toString();//fe;//.toISOString(),
                est.volumen=items[5];
                est.precio=Number(items[6].split(" ")[0]);
                est.totalventa=Number(items[10].split(" ")[0]);
                est.vendedor=items[18];
                est.estado=1;
            //}            );
            //console.log(error = cat.validateSync());
             est.save( (err,nuevo)=>{
                if (err)
                   console.log(err);
               
            });
        };
        i++;

      })

     
    
}



module.exports={

    lista:listaImportar,
    nuevo: nuevoImportar,

}
