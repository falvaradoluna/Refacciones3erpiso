var loginURL = global_settings.urlCORS + 'api/login/';

registrationModule.factory('loginRepository', function($http) {
    return {
        // getUsuario: function(idUsuario) {
        //     return $http({
        //         url: loginURL + 'usuario/',
        //         method: "GET",
        //         params: {
        //             idUsuario: idUsuario
        //         },
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }

        //     });
        // },
        getIdUsuario: function(rfc, contrasena) {
            return $http({
                url: loginURL + 'Usuario/',
                method: "GET",
                params: {
                    rfc: rfc,
                    Pwd: contrasena
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }

    };

});
