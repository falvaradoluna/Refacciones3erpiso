var pedidosView = require('../views/reference'),
    pedidosModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');
var jsonxml = require('jsontoxml');


var pedidos = function (conf) {
    this.conf = conf || {};

    this.view = new pedidosView();
    this.model = new pedidosModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

pedidos.prototype.get_Pedidos = function (req, res, next) {

    var self = this;

    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }
    ];

    self.model.query('[BPRO].[SEL_Pedido_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

pedidos.prototype.get_DetallePedido = function (req, res, next) {
    
        var self = this;
    
        var params = [{
            name: 'idPedido',
            value: req.query.idPedido,
            type: self.model.types.INT
        }
        ];
    
        self.model.query('[BPRO].[SEL_PedidoDetalle_SP]', params, function (error, result) {
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
    };

pedidos.prototype.get_Marcas = function (req, res, next) {

    var self = this;

    var params = [];

    self.model.query('[Catalogo].[SEL_Marcas_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

pedidos.prototype.get_Refacciones = function (req, res, next) {

    var self = this;

    var params = [{
        name: 'idMarca',
        value: req.query.idMarca,
        type: self.model.types.INT
    }, {
        name: 'descripcion',
        value: req.query.descripcion,
        type: self.model.types.STRING
    }
    ];

    self.model.query('[Operacion].[SEL_REFACCION_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

pedidos.prototype.get_MarcaVIN = function (req, res, next) {

    var self = this;

    var params = [{
        name: 'vin',
        value: req.query.vin,
        type: self.model.types.STRING
    }
    ];

    console.log(params);
    self.model.query('[Catalogo].[SEL_MarcaVin_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

pedidos.prototype.post_AltaCotizacion = function (req, res, next) {
    var self = this;

    var params = [{
        name: 'idUsuario',
        value: req.body.idUsuario,
        type: self.model.types.INT
    },
    {
        name: 'idDireccion',
        value: req.body.idDireccion,
        type: self.model.types.INT
    },
    {
        name: 'paquetes',
        value: jsonxml({ paquetes: req.body.paquetes }),
        type: self.model.types.STRING
    }
    ];

    console.log(params);
    //console.log(params);
    this.model.post('[Operacion].[INS_Cotizacion_SP]', params, function (error, result) {

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

pedidos.prototype.get_CancelCotizacion = function (req, res, next) {

    var self = this;

    var params = [{
        name: 'idCotizacion',
        value: req.query.idCotizacion,
        type: self.model.types.INT
    }
    ];

    self.model.query('[Operacion].[DEL_Cotizacion_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

pedidos.prototype.get_DetalleCotizacion = function (req, res, next) {

    var self = this;

    var params = [{
        name: 'idCotizacion',
        value: req.query.idCotizacion,
        type: self.model.types.INT
    }
    ];

    self.model.query('[Operacion].[SEL_CotizacionDetalle_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = pedidos;
