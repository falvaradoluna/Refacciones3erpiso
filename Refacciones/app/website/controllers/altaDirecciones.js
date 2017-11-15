var altaDireccionesView = require('../views/reference'),
    altaDireccionesModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var altaDirecciones = function (conf) {
    this.conf = conf || {};

    this.view = new altaDireccionesView();
    this.model = new altaDireccionesModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

altaDirecciones.prototype.get_Direcciones = function (req, res, next) {

    var self = this;

    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }];

    self.model.query('[Catalogo].[SEL_Direcciones_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
altaDirecciones.prototype.get_tipoDirecciones = function (req, res, next) {

    var self = this;

    var params = [];

    self.model.query('[Catalogo].[SEL_DireccionTipo_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

altaDirecciones.prototype.get_colonia = function (req, res, next) {

    var self = this;

    var params = [{
        name: 'CodigoPostal',
        value: req.query.CodigoPostal,
        type: self.model.types.STRING
    }];

    self.model.query('[Catalogo].[SEL_CodigoPostal_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

altaDirecciones.prototype.post_insertDir = function (req, res, next) {
    var self = this;

    var params = [{
            name: 'idUsuario',
            value: req.body.idUsuario,
            type: self.model.types.INT
        },
        {
            name: 'idTipoDireccion',
            value: req.body.idTipoDireccion,
            type: self.model.types.INT
        },
        {
            name: 'idColonia',
            value: req.body.idColonia,
            type: self.model.types.INT
        },
        {
            name: 'Calle',
            value: req.body.Calle,
            type: self.model.types.STRING
        },
        {
            name: 'NumeroExterior',
            value: req.body.NumeroExterior,
            type: self.model.types.STRING
        },
        {
            name: 'NumeroInterior',
            value: req.body.NumeroInterior,
            type: self.model.types.STRING
        },
        {
            name: 'Entre',
            value: req.body.Entre,
            type: self.model.types.STRING
        },
        {
            name: 'Y',
            value: req.body.Y,
            type: self.model.types.STRING
        },
        {
            name: 'Nota',
            value: req.body.Nota,
            type: self.model.types.STRING
        }
    ];

    this.model.post('[Catalogo].[INS_Direccion_SP]', params, function (error, result) {

        self.view.expositor(res,  {
            error: error,
            result: result
        });
    });
};

module.exports = altaDirecciones;