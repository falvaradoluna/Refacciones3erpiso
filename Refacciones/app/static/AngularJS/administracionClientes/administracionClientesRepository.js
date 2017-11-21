var administracionClientesURL = global_settings.urlCORS + 'api/administracionClientes/';

registrationModule.factory('administracionClientesRepository', function ($http) {
    return{
         //obtiene clientes
         getClientes: function () {
            return $http({
                url: administracionClientesURL + 'Clientes/',
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