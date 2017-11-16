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
        getRefacciones: function (idMarca, descripcion) {
            return $http({
                url: cotizacionesURL + 'Refacciones/',
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
        }
    };
});
