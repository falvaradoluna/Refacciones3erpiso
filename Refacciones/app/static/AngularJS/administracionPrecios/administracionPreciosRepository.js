var administracionPreciosURL = global_settings.urlCORS + 'api/administracionPrecios/';

registrationModule.factory('administracionPreciosRepository', function ($http) {
    return {
        getMarcas: function () {
            return $http({
                url: administracionPreciosURL + 'marcas/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getUsuarios: function () {
            return $http({
                url: administracionPreciosURL + 'Usuarios/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }

    };

});