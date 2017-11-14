var altaDireccionesView = require('../views/reference'),
altaDireccionesModel = require('../models/dataAccess'),
moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var altaDirecciones = function(conf) {
this.conf = conf || {};

this.view = new altaDireccionesView();
this.model = new altaDireccionesModel({
    parameters: this.conf.parameters
});

this.response = function() {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
};
};

altaDirecciones.prototype.get_altaDirecciones = function(req, res, next) {

var self = this;

var params = [{ name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
];

self.model.query('[Catalogo].[SEL_Direcciones_SP]', params, function(error, result) {
    self.view.expositor(res, {
        error: error,
        result: result
    });
});
};

module.exports = altaDirecciones;
