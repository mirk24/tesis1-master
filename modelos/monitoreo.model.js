var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquema = new Schema({
    temp_actual: String,
    lectura_actual: String,
    fecha: Date,
    estado:Number,
},
{
    collection:'monitoreos'
}
);
module.exports = mongoose.model('Monitoreo', esquema);