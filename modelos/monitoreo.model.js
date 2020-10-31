var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquema = new Schema({
    temp_actual: String,
    lectura_actual: String,
    fecha: Date,
    perdida: Number,
    estado: Number
},
    {
        collection: 'monitoreos'
    }
);

//Agregar una nueva propiedad al esquema llamado perdida
// en la propiedad perdida debe ir la formula de perdida de combustible
module.exports = mongoose.model('Monitoreo', esquema);