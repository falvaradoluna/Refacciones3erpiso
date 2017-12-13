var altaDireccionesURL = global_settings.urlCORS + 'api/altaDirecciones/';

registrationModule.factory('altaDireccionesRepository', function ($http) {
    return {
        //obtiene las direcciones registradas a un usuario
        getDirecciones: function (idCliente, idTipoDireccion) {
            console.log('En Repository');
            console.log(idCliente);
            return $http({
                url: altaDireccionesURL + 'Direcciones/',
                method: "GET",
                params: {
                    idCliente: idCliente,
                    idTipoDireccion: idTipoDireccion
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        //obtiene los tipos de direcciones
        getTipoDirecciones: function (idUsuario) {
            return $http({
                url: altaDireccionesURL + 'tipoDirecciones/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        //obtiene las colonias asociadas a un cp
        getColonia: function (CodigoPostal) {
            return $http({
                url: altaDireccionesURL + 'colonia/',
                method: "GET",
                params: {
                    CodigoPostal: CodigoPostal
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        //ins para las nuevas direcciones
        insDireccion: function (params) {
            return $http({
                url: altaDireccionesURL + 'insertDir/',
                method: "POST",
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        actDireccion: function (params) {
            return $http({
                url: altaDireccionesURL + 'actDir/',
                method: "POST",
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        elimDireccion: function (idDireccion) {
            return $http({
                url: altaDireccionesURL + 'elimDir/',
                method: "POST",
                data: {
                    idDireccion: idDireccion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    };

});