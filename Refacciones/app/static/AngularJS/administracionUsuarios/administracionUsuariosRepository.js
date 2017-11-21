/*administracionUsuariosRepository */
var administracionUsuariosURL = global_settings.urlCORS + 'api/administracionUsuarios/';

registrationModule.factory('administracionUsuariosRepository', function ($http) {
    return{
        getUsuarios: function () {
            return $http({
                url: administracionUsuariosURL + 'Usuarios/',
                method: "GET",
                params: {
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getRoles: function () {
            return $http({
                url: administracionUsuariosURL + 'Roles/',
                method: "GET",
                params: {
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getClientes: function () {
            return $http({
                url: administracionUsuariosURL + 'Clientes/',
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