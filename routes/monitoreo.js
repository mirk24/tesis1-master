var express = require('express');
var router = express.Router();
var control=require('../controladores/monitoreo.controller');
/* GET home page. */

/* method get -> listar buscar
*  method post -> insertar
*  method put -> editar
*  method delete -> borrar*/

// url -> dominio.com/api/persona
router.get('/', control.lista);
router.post('/', control.nuevo);
router.put('/:id', control.editar);


module.exports = router;