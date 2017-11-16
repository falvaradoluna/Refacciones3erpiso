var administracionPreciosView = require('../views/reference'),
administracionPreciosModel = require('../models/dataAccess'),
moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var administracionPrecios = function(conf) {
    this.conf = conf || {};

    this.view = new administracionPreciosView();
    this.model = new administracionPreciosModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

/*
administracionPrecios.prototype.get_tipoDirecciones = function (req, res, next) {

    var self = this;

    var params = [];

    self.model.query('[Catalogo].[SEL_DireccionTipo_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


administracionPrecios.prototype.post_elimDir = function (req, res, next) {
    var self = this;

    var params = [{
        name: 'idDireccion',
        value: req.body.idDireccion,
        type: self.model.types.INT
    }];

    this.model.post('[Catalogo].[DEL_Direccion_SP]', params, function (error, result) {

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
*/

module.exports = administracionPrecios;
