var pedidosURL = global_settings.urlCORS + 'api/pedidos/';

registrationModule.factory('pedidosRepository', function ($http) {
    return {

        // Obtener las cotizaciones por usuario
        getPedidos: function (idUsuario) {
            return $http({
                url: pedidosURL + 'Pedidos/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        // Obtener el detalle del pedido
        getDetallePedido: function (idPedido) {
            return $http({
                url: pedidosURL + 'DetallePedido/',
                method: "GET",
                params: {
                    idPedido: idPedido
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        // Alta de una nueva cotizacion con las refacciones dentro del xml
        addPartes: function (params) {
            return $http({
                url: pedidosURL + 'AltaCotizacion/',
                method: "POST",
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        // Obtener marcas para llenar el combo
        getMarcas: function (idUsuario) {
            return $http({
                url: pedidosURL + 'Marcas/',
                method: "GET",
                params: {
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        // Obtener las refacciones por descripcion
        getRefacciones: function (idMarca, descripcion) {
            return $http({
                url: pedidosURL + 'Refacciones/',
                method: "GET",
                params: {
                    idMarca: idMarca,
                    descripcion: descripcion
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        // Obtener las refacciones por descripcion
        getMarcaVIN: function (vin) {
            return $http({
                url: pedidosURL + 'MarcaVIN/',
                method: "GET",
                params: {
                    vin: vin
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        // Alta de una nueva cotizacion con las refacciones dentro del xml
        addCotizacion: function (params) {
            return $http({
                url: pedidosURL + 'AltaCotizacion/',
                method: "POST",
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        // Cancela la cotizacion
        cancelaCotizacion: function (idCotizacion) {
            return $http({
                url: pedidosURL + 'CancelCotizacion/',
                method: "GET",
                params: {
                    idCotizacion: idCotizacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        // Obtene el desalle de la cotizacion
        getDetalleCotizacion: function (idCotizacion) {
            return $http({
                url: pedidosURL + 'DetalleCotizacion/',
                method: "GET",
                params: {
                    idCotizacion: idCotizacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
