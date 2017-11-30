var cargaArchivosURL = global_settings.urlCORS + 'api/cargaArchivos/';

registrationModule.factory('cargaArchivosRepository', function ($http) {
    return{


        // 1.-Obtener marcas para llenar el combo
                getMarcas: function () {
                    return $http({
                        url: cargaArchivosURL + 'Marcas/',
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json'
                        }
        
                    });
                },


        // 2.-Obtener posiciones de archivo para llenar el combo
        getCampos: function () {
            return $http({
                url: cargaArchivosURL + 'Campos/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },


    };



});
    