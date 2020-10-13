var Combustible=require('../modelos/combustible.model');
function listaCombustible(req, res){
    Combustible.find({estado:1},(err,resul)=>{
         res.status(200).json({mgs:'todo legal',estado:1, lista:resul});
    })
   
}

function nuevoCombustible(req, res){
    req.body.estado=1;
    let est= new Combustible(req.body);
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
function editarCombustible(req, res){
    console.log(req.params.id);
    Combustible.findByIdAndUpdate(req.params.id,req.body,(err,resultado)=>{
        if (err)
            return res.status(200).json({estado:0,error:err});
        if (!resultado)
            return res.status(200).json({estado:0,error:'ops paso algo malo'});
        else
            return res.status(200).json({estado:1,estaciones:resultado});
    });
}

function borrarCombustible(req, res){
    res.status(200).json({mgs:'todo legal3'});
}

function buscarCombustible(req, res){
    res.status(200).json({mgs:'todo legal4'});
}




module.exports={
    lista:listaCombustible,
    nuevo:nuevoCombustible,
    editar:editarCombustible,
    borrar:borrarCombustible,
    buscar:buscarCombustible
}