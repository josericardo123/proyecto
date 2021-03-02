const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
//libreria de mqtt
var mqtt = require('mqtt');
//Solucion al error cors
const cors = require('cors');
//Carga de schemas
const Dispositivo = require('./models/dispositivo');
//Libreria de Websocket
const WebSocket = require('ws');

const app = express();

//servidor Websocket
const wss = new WebSocket.Server({port : 8000});

mongoose.connect("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connection database success!');
});

var mqttOptions = {
    clientId: "nodeserver1",
    //username: "steve",
    //password: "password",
    //clean: true
};

var mqttClient = mqtt.connect("mqtt://192.168.43.43", mqttOptions);

//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
//CORS
app.use(cors())

// //Middleware
// app.use((req, resp, next)=>{
//     console.log('primer middleware');
//     next();
// });

// app.use((req, resp, next)=>{
//     resp.send('Hello from express');
// });

//Otra posible solucion a CORS error
/* app.use((req, res, next)=>{
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With,XMLHttpRequest, Content-Type, Accept");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
      next();
    }); */

//Mqtt
mqttClient.on("connect", function(){
    console.log("Mqtt connected");
    mqttClient.subscribe('utpti/c10/#'); 
    // function (err){
    //     if (!err){
    //         mqttClient.publish('utpti/c10/cuh', 'Hello mqtt');
    //     }
    // });
});
   
//actions

app.get("/", (req, resp, next)=>{
    resp.send('Hello from express');
});

app.get("/api/hola", (req, resp, next)=>{
    console.log('Api ejecutandose');
    var objr={msj: 'ok'};
    resp.status(200).json(objr);
});

/*Esta acción es para guardar los dispositivos en la base de datos*/
app.post("/api/disp", (req, resp, next)=>{
    const disp= new Dispositivo();

    disp.nombre=req.body.nombre;
    disp.descripcion=req.body.descripcion;
    disp.estatus=req.body.estatus;
    disp.tipo=req.body.tipo;
    disp.nivel=req.body.nivel;

    disp.save(function(err, dato){
        if(err){
            console.error(err);
            resp.status(500).json({msj:'Error con la base de datos'});
        }
        else
            resp.status(200).json(dato);
    });
});

/* Esta acción se realiazo para verificar si se guarda los
dispositivos en la base de datos*/
/*
app.get("/api/disp/1", (req, resp, next)=>{
    const disp=new Dispositivo();

    disp.nombre='req.body.nombre';
    disp.descripcion='req.body.descripcion';
    disp.estatus=false;

    disp.save(function(err, dato){
        if(err){
            console.error(err);
            resp.status(500).json({msj:'Error con la base de datos'});
        }
        else
            resp.status(200).json(dato);
    });
});    */

/*Esta acción es para obtener el listado de dispositivos
desde la base de datos*/

app.get("/api/disp", (req, resp, next)=>{
    Dispositivo.find(function(err, disps){
        if(err){
            console.error(err);
            resp.status(500).json({msj: 'Error con la base de datos'});
        }
        else
            resp.status(200).json(disps);
    });
});

app.get("/api/disp/:id", (req, resp, next)=>{
  Dispositivo.findById(req.params.id, function(err, disp){
      if(err){
          console.error(err);
          resp.status(500).json({msj: 'Error con la base de datos'});
      }
      else
          resp.status(200).json(disp);
  });
});

/*
app.get("/api/disp/:id",(req, resp, next)=>{
    Dispositivo.findById(req.params.id,function(err, disp){
      if(err){
        console.error(err);
        resp.status(500).json({msj:'Error con la base de datos'});
      }
      else{
        if(disp == null){
          resp.status(500).json('No se encontro el dispositivo!');
        }else {
          var options={
            retain:true,
            qos:1
            };
          if (mqttClient.connected == true){
            //  room1/kitchen/tv1
            mqttClient.publish(disp.descripcion, "on" , options);
            resp.status(200).json('Mensaje enviado!');
          }else{
            resp.status(500).json('No se encontro el broker!');
          }
        }
      }
    });
  
  });   */


app.get("/api/disp/on/:id",(req, resp, next)=>{
    Dispositivo.findById(req.params.id,function(err, disp){
      if(err){
        console.error(err);
        resp.status(500).json({msj:'Error con la base de datos'});
      }
      else{
        if(disp == null){
          resp.status(500).json('No se encontro el dispositivo!');
        }else {
          var options={
            retain:true,
            qos:1
            };
          if (mqttClient.connected == true){
            //  room1/kitchen/tv1
            mqttClient.publish(disp.descripcion, "on" , options);
            resp.status(200).json('Mensaje enviado!');
          }else{
            resp.status(500).json('No se encontro el broker!');
          }
        }
      }
    });
  
  });

app.get("/api/disp/off/:id",(req, resp, next)=>{
    Dispositivo.findById(req.params.id,function(err, disp){
      if(err){
        console.error(err);
        resp.status(500).json({msj:'Error con la base de datos'});
      }
      else{
        if(disp == null){
          resp.status(500).json('No se encontro el dispositivo!');
        }else {
          var options={
            retain:true,
            qos:1
            };
          if (mqttClient.connected == true){
            //room1/kitchen/tv1
            mqttClient.publish(disp.descripcion, "off" , options);
            resp.status(200).json('Mensaje enviado!');
            
          }else{
            resp.status(500).json('No se encontro el broker!');
          }
        }
      }
    });
  
  });

//Mqtt events
mqttClient.on('message', function(topic, message, packet){
    console.log("message is "+ message);
    console.log("topic is "+ topic);
    Dispositivo.findOne({descripcion: topic}, function(err, disp){
        if(err){
            console.log(err);
        }
        else{
            if(disp == null){
                console.error('No se encontro el dispositivo!');
            }else{
                if(message == "encendido"){
                    disp.estatus=true;
                    disp.last_conn=Date.now();
                    disp.save(function(err, dato){
                        if(err){
                            console.error(err);
                        }
                        else
                        console.log('evento registrado!');
                        //console.log(dato);
                        wss.clients.forEach(function each(client) {
                          if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(dato));
                          }
                        });    
                    });
                }

                if(message == "apagado"){
                    disp.estatus=false;
                    disp.last_conn=Date.now();
                    disp.save(function(err, dato){
                        if(err){
                            console.error(err);
                        }
                        else
                        console.log('evento registrado!');
                        wss.clients.forEach(function each(client) {
                          if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(dato));
                          }
                        }); 
                    });
                }

            }
        }
    });
});

//Websocket events
wss.on('connection', ws => {
  console.log('new connection');
  ws.on('message', message => {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.on('error', error => {
    console.log(error);
  });

  ws.send(JSON.stringify('Servidor Websocket'));

});


module.exports=app;