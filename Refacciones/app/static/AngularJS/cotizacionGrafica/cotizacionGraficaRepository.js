var cotizacionGraficaURL = global_settings.urlCORS + 'api/cotizacionGrafica/';

registrationModule.factory('cotizacionGraficaRepository', function ($http) {
    return{        

                    // 1.-Obtener las cotizaciones Por Estatus
                    getCotizacionEstatus: function () {
                        return $http({
                            url: cargaArchivosURL + 'Estatus/',
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json'
                            }
            
                        });
                    }
    



    };
    
    });
