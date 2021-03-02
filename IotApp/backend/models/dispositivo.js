const mongoose = require('mongoose');

const dispSchema = mongoose.Schema({
    nombre:{type:String, require: true},
    descripcion:{ type:String, require: true},
    estatus:{ type:Boolean, default: false},
    tipo:{type: Number, default: 1},
    nivel:{type: Number, default: 0},
    last_conn:{type:Date},
});

module.exports = mongoose.model('Dispositivo', dispSchema);