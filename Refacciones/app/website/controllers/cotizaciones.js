var cotizacionesView = require('../views/reference'),
cotizacionesModel = require('../models/dataAccess'),
moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var cotizaciones = function(conf) {
this.conf = conf || {};

this.view = new cotizacionesView();
this.model = new cotizacionesModel({
    parameters: this.conf.parameters
});

this.response = function() {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
};
};

cotizaciones.prototype.get_Marcas = function(req, res, next) {
    
    var self = this;
    
    var params = [];
    
    self.model.query('[Catalogo].[SEL_Marcas_SP]', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
    };

    cotizaciones.prototype.get_Marcas2 = function(req, res, next) {
        
        var self = this;
        
        var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
        ];
        
        self.model.query('[Catalogo].[SEL_Marcas_SP]', params, function(error, result) {
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
        };

        cotizaciones.prototype.get_tipoDirecciones = function(req, res, next) {
        
        var self = this;
        
        var params = [];
        
        self.model.query('[Catalogo].[SEL_DireccionTipo_SP]', params, function(error, result) {
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
        };
    
        cotizaciones.prototype.get_colonia = function(req, res, next) {
            
            var self = this;
            
            var params = [{ name: 'CodigoPostal', value: req.query.CodigoPostal, type: self.model.types.STRING }];
            
            self.model.query('[Catalogo].[SEL_CodigoPostal_SP]', params, function(error, result) {
                self.view.expositor(res, {
                    error: error,
                    result: result
                });
            });
            };

module.exports = cotizaciones;
