var administracionClientesView = require('../views/reference'),
administracionClientesModel = require('../models/dataAccess'),
moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');

var administracionClientes = function (conf) {
    this.conf = conf || {};

    this.view = new administracionClientesView();
    this.model = new administracionClientesModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
};
};

administracionClientes.prototype.get_Clientes = function (req, res, next) {
    
        var self = this;
    
        var params = [];
    
        self.model.query('[Catalogo].[SEL_Cliente_SP]', params, function (error, result) {
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
    };
    module.exports = administracionClientes;

