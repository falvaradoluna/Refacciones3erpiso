        var cargaArchivosView = require('../views/reference'),
        cargaArchivosModel = require('../models/dataAccess'),
        moment = require('moment');
    var phantom = require('phantom');
    var path = require('path');
    var webPage = require('webpage');
    var request = require('request');
    var jsonxml = require('jsontoxml');
    
    
    var cargaArchivos = function (conf) {
        this.conf = conf || {};
    
        this.view = new cargaArchivosView();
        this.model = new cargaArchivosModel({
            parameters: this.conf.parameters
        });
    
        this.response = function () {
            this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
        };
    };
    
    cargaArchivos.prototype.get_Marcas = function (req, res, next) {
        
            var self = this;
        
            var params = [];
        
            self.model.query('[Catalogo].[SEL_Marcas_SP]', params, function (error, result) {
                self.view.expositor(res, {
                    error: error,
                    result: result
                });
            });
        };
    
    
        cargaArchivos.prototype.get_Campos = function (req, res, next) {
            
                var self = this;
            
                var params = [];
            
                self.model.query('[Precio].[SEL_ArchivoPrecioCampos_SP]', params, function (error, result) {
                    self.view.expositor(res, {
                        error: error,
                        result: result
                    });
                });
            };
    
    module.exports = cargaArchivos;
    