var Monitoreo=require('../modelos/monitoreo.model');

function listaMonitoreo(req, res){
    Monitoreo.find({estado:1},(err,resul)=>{
         res.status(200).json({mgs:'todo legal',estado:1, lista:resul});
    })
}
function nuevoMonitoreo(req, res){
    req.body.estado=1;
    let est= new Monitoreo(req.body);
    est.save(
        (err,nuevo)=>{
            if (err)
                return res.status(200).json({estado:0,error:err});
            if (!nuevo)
                return res.status(200).json({estado:0,error:'ops paso algo malo'});
            else
                return res.status(200).json({estado:1,estaciones:nuevo});
        }
    )
}
//url:dominio.com/api/persona/id put
function editarMonitoreo(req, res){
    console.log(req.params.id);
    Estaciones.findByIdAndUpdate(req.params.id,(err,resultado)=>{
        if (err)
            return res.status(200).json({estado:0,error:err});
        if (!resultado)
            return res.status(200).json({estado:0,error:'ops paso algo malo'});
        else
            return res.status(200).json({estado:1,estaciones:resultado});
    });
}


//function buscarPersona(req, res){
//  Estaciones.findOne({})
//}



module.exports={

    lista:listaMonitoreo,
    nuevo: nuevoMonitoreo,
    editar: editarMonitoreo

}
