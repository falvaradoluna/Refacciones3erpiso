var configuradorGruposURL = global_settings.urlCORS + 'api/configuradorGrupos/';

registrationModule.factory('configuradorGruposRepository', function ($http) {
    return{
          //obtiene Grupos
          getGrupos: function () {
            return $http({
                url: configuradorGruposURL + 'Grupos/',
                method: "GET",
                params: {
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }





    }

});