var cotizacionesURL = global_settings.urlCORS + 'api/cotizaciones/';

registrationModule.factory('cotizacionesRepository', function ($http) {
    return {

        // Obtener las cotizaciones por usuario
        getCotizaciones: function (idUser) {
            return $http({
                url: cotizacionesURL + 'Cotizaciones/',
                method: "GET",
                params: {
                    idUser: idUser
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        // Obtener marcas para llenar el combo
        getMarcas: function (idUsuario) {
            return $http({
                url: cotizacionesURL + 'Marcas/',
                method: "GET",
                params: {
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        // Obtener las refacciones por descripcion
        getRefacciones: function (idMarca, descripcion,idCliente) {
            return $http({
                url: cotizacionesURL + 'Refacciones/',
                method: "GET",
                params: {
                    idMarca: idMarca,
                    descripcion: descripcion,
                    idCliente : idCliente
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        // Obtener las refacciones por descripcion
        getMarcaVIN: function (vin) {
            return $http({
                url: cotizacionesURL + 'MarcaVIN/',
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
                url: cotizacionesURL + 'AltaCotizacion/',
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
                url: cotizacionesURL + 'CancelCotizacion/',
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
                url: cotizacionesURL + 'DetalleCotizacion/',
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
