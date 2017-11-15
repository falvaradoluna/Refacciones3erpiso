var cotizacionesView = require('../views/reference'),
    cotizacionesModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var cotizaciones = function (conf) {
    this.conf = conf || {};

    this.view = new cotizacionesView();
    this.model = new cotizacionesModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

cotizaciones.prototype.get_Marcas = function (req, res, next) {

    var self = this;

    var params = [];

    self.model.query('[Catalogo].[SEL_Marcas_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

cotizaciones.prototype.get_Refacciones = function (req, res, next) {

        var self = this;
    
        var params = [{
            name: 'idMarca',
            value: req.query.idMarca,
            type: self.model.types.INT
        },{
            name: 'descripcion',
            value: req.query.descripcion,
            type: self.model.types.STRING
        }
        ];

        self.model.query('[Operacion].[SEL_REFACCION_SP]', params, function (error, result) {
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
    };

module.exports = cotizaciones;
