var cotizacionGraficaView = require('../views/reference'),
cotizacionGraficaModel = require('../models/dataAccess'),
moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');
var jsonxml = require('jsontoxml');


var cotizacionGrafica = function (conf) {
this.conf = conf || {};

this.view = new cotizacionGraficaView();
this.model = new cotizacionGraficaModel({
    parameters: this.conf.parameters
});

this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);



    cotizacionGrafica.prototype.getCotizacionEstatus = function (req, res, next) {
        
            var self = this;
        
            var params = [];
        
            self.model.query('[Catalogo].[SEL_Marcas_SP]', params, function (error, result) {
                self.view.expositor(res, {
                    error: error,
                    result: result
                });
            });
        };



};
};


module.exports = cotizacionGrafica;