/*configuracionPrecios */
var configuracionPreciosView = require('../views/reference'),
configuracionPreciosModel = require('../models/dataAccess'),
moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var configuracionPrecios = function (conf) {
this.conf = conf || {};

this.view = new configuracionPreciosView();
this.model = new configuracionPreciosModel({
    parameters: this.conf.parameters
});

this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
};
};

configuracionPrecios.prototype.get_ConfPrecios = function (req, res, next) {
    
        var self = this;
    
        var params = [];
    
        self.model.query('[Precio].[SEL_Configuracion_SP]', params, function (error, result) {
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
    };
    configuracionPrecios.prototype.get_TiposConf = function (req, res, next) {
        
            var self = this;
        
            var params = [];
        
            self.model.query('[Precio].[SEL_TiposConfiguracion_SP]', params, function (error, result) {
                self.view.expositor(res, {
                    error: error,
                    result: result
                });
            });
        };
        configuracionPrecios.prototype.get_Base = function (req, res, next) {
            
                var self = this;
            
                var params = [];
            
                self.model.query('[Precio].[SEL_Base_SP]', params, function (error, result) {
                    self.view.expositor(res, {
                        error: error,
                        result: result
                    });
                });
            };
            configuracionPrecios.prototype.get_Operacion = function (req, res, next) {
                
                    var self = this;
                
                    var params = [];
                
                    self.model.query('[Precio].[SEL_Operacion_SP]', params, function (error, result) {
                        self.view.expositor(res, {
                            error: error,
                            result: result
                        });
                    });
                };
                configuracionPrecios.prototype.get_Grupo = function (req, res, next) {
                    
                        var self = this;
                    
                        var params = [];
                    
                        self.model.query('[Precio].[SEL_Grupo_SP]', params, function (error, result) {
                            self.view.expositor(res, {
                                error: error,
                                result: result
                            });
                        });
                    };
    module.exports = configuracionPrecios;