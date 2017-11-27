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
        },
        insClientes: function (params) {
            return $http({
                url: administracionClientesURL + 'insertCli/',
                method: "POST",
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        updCliente: function (params) {
            return $http({
                url: administracionClientesURL + 'updCli/',
                method: "POST",
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        DelCliente: function (params) {
            return $http({
                url: administracionClientesURL + 'DeleteCli/',
                method: "POST",
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        
    };
});