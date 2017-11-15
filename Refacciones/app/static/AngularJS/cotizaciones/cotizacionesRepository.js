var cotizacionesURL = global_settings.urlCORS + 'api/cotizaciones/';

registrationModule.factory('cotizacionesRepository', function ($http) {
    return {

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
        }
    };
});
