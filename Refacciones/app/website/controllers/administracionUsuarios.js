var administracionUsuariosView = require('../views/reference'),
    administracionUsuariosModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var administracionUsuarios = function (conf) {
    this.conf = conf || {};

    this.view = new administracionUsuariosView();
    this.model = new administracionUsuariosModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

administracionUsuarios.prototype.get_Usuarios = function (req, res, next) {

    var self = this;

    var params = [];

    self.model.query('[Seguridad].[SEL_UsuariosAdministracion_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
administracionUsuarios.prototype.get_Roles = function (req, res, next) {

    var self = this;

    var params = [];

    self.model.query('[Seguridad].[SEL_Roles_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
administracionUsuarios.prototype.get_Clientes = function (req, res, next) {

    var self = this;

    var params = [];

    self.model.query('[Catalogo].[SEL_Cliente_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
administracionUsuarios.prototype.post_insertUsu = function (req, res, next) {
    var self = this;

    var params = [
        {
            name: 'usuario',
            value: req.body.usuario,
            type: self.model.types.STRING
        },
        {
            name: 'contrasenia',
            value: req.body.contrasenia,
            type: self.model.types.STRING
        },
        {
            name: 'idRol',
            value: req.body.idRol,
            type: self.model.types.INT
        },
        {
            name: 'nombreCompleto',
            value: req.body.nombreCompleto,
            type: self.model.types.STRING
        },
        {
            name: 'correoElectronico',
            value: req.body.correoElectronico,
            type: self.model.types.STRING
        },
        {
            name: 'idCliente',
            value: req.body.id,
            type: self.model.types.INT
        }
    ];

    this.model.post('[Seguridad].[INS_Usuario_SP]', params, function (error, result) {

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

administracionUsuarios.prototype.post_DeleteUsu = function (req, res, next) {
    var self = this;

    var params = [
        {
            name: 'idUsuario',
            value: req.body.idUsuario,
            type: self.model.types.INT
        }
    ];

    this.model.post('[Seguridad].[DEL_Usuario_SP]', params, function (error, result) {

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
module.exports = administracionUsuarios;