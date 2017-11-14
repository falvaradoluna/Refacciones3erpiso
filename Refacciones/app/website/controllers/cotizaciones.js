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

module.exports = cotizaciones;
