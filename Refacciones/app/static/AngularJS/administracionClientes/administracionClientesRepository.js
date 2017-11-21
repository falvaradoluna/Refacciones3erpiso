var administracionClientesURL = global_settings.urlCORS + 'api/administracionClientes/';

registrationModule.factory('administracionClientesRepository', function ($http) {
    return{
         //obtiene clientes
         getClientes: function (idUsuario) {
            return $http({
                url: administracionClientesURL + 'Clientes/',
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