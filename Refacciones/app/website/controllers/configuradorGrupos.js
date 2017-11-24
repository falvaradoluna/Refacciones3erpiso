var configuradorGruposView = require('../views/reference'),
configuradorGruposModel = require('../models/dataAccess'),

moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');

var configuradorGrupos = function (conf) {
    this.conf = conf || {};

    this.view = new configuradorGruposView();
    this.model = new configuradorGruposModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
};
};

configuradorGrupos.prototype.get_Grupos = function (req, res, next) {
    
        var self = this;
    
        var params = [];
    
        self.model.query('[Precio].[SEL_Grupo_SP]', params, function (error, result) {
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
    };









module.exports = configuradorGrupos;
