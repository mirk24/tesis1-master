var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquema = new Schema({
    nombre_est:  String,
    ubicacion: String,
    numero_playas:   Number,
    numero_disp: Number,
    numero_tanques: Number,
    telefono: Number,
    encargado:{ref:'Usuario',type:mongoose.Types.ObjectId},
    tanques:{cantidad_max: Number, cantidad_min: Number, cantidad_actual: Number, tipo_tanque: String},
    estado:Number,

},{
    collection:'estacion'
});

module.exports = mongoose.model('Estacion', esquema);