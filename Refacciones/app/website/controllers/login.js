var LoginView = require('../views/reference'),
    LoginModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var Login = function(conf) {
    this.conf = conf || {};

    this.view = new LoginView();
    this.model = new LoginModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


// Login.prototype.get_usuario = function(req, res, next) {

//     var self = this;

//     var params = [{ name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }];

//     self.model.query('SEL_USUARIO_SP', params, function(error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// };

Login.prototype.get_usuario = function(req, res, next) {

    var self = this;

    var params = [{ name: 'rfc', value: req.query.rfc, type: self.model.types.STRING },
        { name: 'Pwd', value: req.query.Pwd, type: self.model.types.STRING }
    ];

    self.model.query('[Seguridad].[SEL_ValidacionAcceso_SP]', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Login;
