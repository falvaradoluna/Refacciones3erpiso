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
configuracionPrecios.prototype.get_Marca = function (req, res, next) {

    var self = this;

    var params = [];

    self.model.query('[Catalogo].[SEL_Marcas_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
configuracionPrecios.prototype.get_ClientesAsignados = function (req, res, next) {

    var self = this;

    var params = [{
        name: 'idConfiguracion',
        value: req.query.id,
        type: self.model.types.INT
    }];

    self.model.query('[Precio].[SEL_ConfiguracionClientesMarca_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
configuracionPrecios.prototype.get_Cliente = function (req, res, next) {

    var self = this;

    var params = [];

    self.model.query('[Catalogo].[SEL_Cliente_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
configuracionPrecios.prototype.post_ConfPrecios = function (req, res, next) {
    var self = this;

    var params = [{
            name: 'idTipoConfiguracion',
            value: req.body.idTipoConfiguracion,
            type: self.model.types.INT
        },
        {
            name: 'idGrupoPartes',
            value: req.body.idGrupoPartes,
            type: self.model.types.INT
        },
        {
            name: 'idBase',
            value: req.body.idBase,
            type: self.model.types.INT
        },
        {
            name: 'idOperacion',
            value: req.body.idOperacion,
            type: self.model.types.INT
        },
        {
            name: 'porcentaje',
            value: req.body.porcentaje,
            type: self.model.types.INT
        },
        {
            name: 'configuracionNombre',
            value: req.body.configuracionNombre,
            type: self.model.types.STRING
        }
    ];

    this.model.post('[Precio].[INS_Configuracion_SP]', params, function (error, result) {

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
configuracionPrecios.prototype.post_ConfClientes = function (req, res, next) {
    var self = this;

    var params = [{
            name: 'idCliente',
            value: req.body.idCliente,
            type: self.model.types.INT
        },
        {
            name: 'idConfiguracion',
            value: req.body.idConfiguracion,
            type: self.model.types.INT
        },
        {
            name: 'idMarca',
            value: req.body.idMarca,
            type: self.model.types.INT
        }
       
    ];

    this.model.post('[Precio].[INS_ClienteConfiguracionMarca_SP]', params, function (error, result) {

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
module.exports = configuracionPrecios;