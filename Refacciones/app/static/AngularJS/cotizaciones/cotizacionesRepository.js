var cotizacionesURL = global_settings.urlCORS + 'api/cotizaciones/';

registrationModule.factory('cotizacionesRepository', function($http) {
    return {

        getMarcas: function(idUsuario) {
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
        getTipoDirecciones: function(idUsuario) {
            return $http({
                url: cotizacionesURL + 'tipoDirecciones/',
                method: "GET",
                params: {
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getColonia: function(CodigoPostal) {
            return $http({
                url: cotizacionesURL + 'colonia/',
                method: "GET",
                params: {
                    CodigoPostal:CodigoPostal
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }

    };

});
