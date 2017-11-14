var pedidosView = require('../views/reference'),
    pedidosModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var pedidos = function(conf) {
this.conf = conf || {};

this.view = new pedidosView();
this.model = new pedidosModel({
    parameters: this.conf.parameters
});

this.response = function() {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
};
};

module.exports = pedidos;
