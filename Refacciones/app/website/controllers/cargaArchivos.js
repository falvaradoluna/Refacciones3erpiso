var configuradorGruposView = require('../views/reference'),
configuradorGruposModel = require('../models/dataAccess'),

moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');

var configuradorGrupos = function (conf) {
    this.conf = conf || {};

    this.view = new cargaArchivosView();
    this.model = new cargaArchivosModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
};
};