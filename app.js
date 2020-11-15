var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
///////////////conexion a base de datos
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mitesis', { useNewUrlParser: true });
var db = mongoose.connection;
var moment = require('moment');
db.on('error', function (err) {
  console.log(err);
  return;
});
db.once('open', function () {
  // we're connected!
  console.log('todo legal');
});
mongoose.set('debug', true)
//////////////////////////////////////

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');


/////////////////////dominio.com/persona/////////////////////////
var perRouter = require('./routes/persona');
var estRouter = require('./routes/estacion');
var moniRouter = require('./routes/monitoreo');
var combustible = require('./routes/combustible');
var ventas = require('./routes/importar');
fileUpload = require("express-fileupload");
var app = express();
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());


/*+++++++CONEXION DE ARDUINO LADO DEL CLIENTE++++++++*/


const Serialport = require('serialport');
const Readline = Serialport.parsers.Readline;
var express = require('express');
var app2 = express();
var server = require('http').Server(app2);
var io = require('socket.io')(server);
app2.set('view engine', 'html');
server.listen(process.env.PORT || 3800);
monitoreo = require("./modelos/monitoreo.model");

const port = new Serialport('COM4', {
  baudRate: 2400
});

const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

parser.on('open', function () {
  console.log('connection is opened');
});

var infoArduino = new Array();

const guardarMonitoreo = function (info) {
  if (infoArduino.length < 50) {
    infoArduino.push(info);
  }
  if (infoArduino.length == 50) {
    var q = new monitoreo();
    var calc = 0;
    var total = 0;
    try {
      q.temp_actual = Math.round(infoArduino[infoArduino.length - 1].dato2);
      q.lectura_actual = Math.round(infoArduino[infoArduino.length - 1].dato1);
      q.fecha = new Date(); //Guardar fecha con formato usando moment
      q.estado = 1;
      if (q.temp_actual >= 15 && q.temp_actual <= 22) {
        calc = (0.99475 * q.lectura_actual);
      }
      if (q.temp_actual > 22 && q.temp_actual <= 35) {
        calc = (0.98972 * q.lectura_actual);
      }
      total = q.lectura_actual - calc;
      q.perdida = Math.round(total);
      //q.save();
    } catch (Error) { console.log(Error.message) };
    infoArduino = new Array();

  }

}


io.sockets.on('connection', function (socket) {
  parser.on('data', function (data) {
    console.log(data);
    if (data != '') {
      try {
        js = JSON.parse(data);
        guardarMonitoreo(js);
      }
      catch { }
    }
    socket.emit('data', data);
  });
});

/**************** */

app.use('/', indexRouter);
app.use('/users', usersRouter);

//////////////////////Rutas/////////////////////////////////

app.use('/api/persona', perRouter);
app.use('/api/estacion', estRouter);
app.use('/api/monitoreo', moniRouter);
app.use('/api/ventas', ventas);
app.use('/api/combustible', combustible);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
