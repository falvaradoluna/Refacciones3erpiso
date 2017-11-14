var altaDireccionesURL = global_settings.urlCORS + 'api/altaDirecciones/';

registrationModule.factory('altaDireccionesRepository', function($http) {
    return {

        getDirecciones: function(idUsuario) {
            return $http({
                url: altaDireccionesURL + 'altaDirecciones/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }

    };

});
