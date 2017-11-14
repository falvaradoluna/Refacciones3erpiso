var altaDireccionesURL = global_settings.urlCORS + 'api/altaDirecciones/';

registrationModule.factory('altaDireccionesRepository', function($http) {
    return {

        getDirecciones: function(idUsuario) {
            return $http({
                url: altaDireccionesURL + 'Direcciones/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getTipoDirecciones: function(idUsuario) {
            return $http({
                url: altaDireccionesURL + 'tipoDirecciones/',
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
                url: altaDireccionesURL + 'colonia/',
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
