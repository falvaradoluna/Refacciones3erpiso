var configuracionPreciosURL = global_settings.urlCORS + 'api/configuracionPrecios/';

registrationModule.factory('configuracionPreciosRepository', function ($http) {
    return{
        getConfPrecios: function () {
            return $http({
                url: configuracionPreciosURL + 'ConfPrecios/',
                method: "GET",
                params: {
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getTiposConf: function () {
            return $http({
                url: configuracionPreciosURL + 'TiposConf/',
                method: "GET",
                params: {
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getBase: function () {
            return $http({
                url: configuracionPreciosURL + 'Base/',
                method: "GET",
                params: {
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getOperacion: function () {
            return $http({
                url: configuracionPreciosURL + 'Operacion/',
                method: "GET",
                params: {
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getGrupo: function () {
            return $http({
                url: configuracionPreciosURL + 'Grupo/',
                method: "GET",
                params: {
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }
    };
});