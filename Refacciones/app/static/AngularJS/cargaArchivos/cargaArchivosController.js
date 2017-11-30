registrationModule.controller('cargaArchivosController', function ($route, $scope, $rootScope, $location, cargaArchivosRepository, userFactory, alertFactory) {

    $scope.definiciones = [];    
    $scope.configuracionNombre;

    $scope.init = function () {
        
    //redirecciona al login si no hay un usuario logeado
        var userData = userFactory.getUserData();
        if (userData == null || userData == undefined)
            location.href = '/';
        $scope.userData = userFactory.getUserData();

        // obtener las marcas
       
        cargaArchivosRepository.getMarcas().then(function (result) {

            if (result.data.length > 0) {

                $scope.marcas = result.data;

                // inicializacion
                var marca = {
                    idMarca: 0,
                    marca: 'Seleccione una marca.'
                }
                $scope.marcas.unshift(marca);
                $scope.marcaSeleccionada = $scope.marcas[0];
            } else
                alertFactory.info('No se pudieron cargar las marcas');
        });

        // 2 los campós 
        cargaArchivosRepository.getCampos().then(function (result) {
            
                        if (result.data.length > 0) {
            
                            $scope.campos = result.data;
                            console.log($scope.campos);
            
                            // inicializacion
                            var campo = {
                                idCampo: 0,
                                campo: 'Seleccione un campo.'
                            }
                            $scope.campos.unshift(campo);
                            $scope.campoSeleccionado = $scope.campos[0];
                        } else
                            alertFactory.info('No se pudieron cargar los campos');
                    });
        
    };

    $scope.init();

    $scope.reiniciaBusqueda = function () {
        $scope.busquedaCotizacion = '';
    }



    // ------------------------------------------ AGREGA CAMPO Definition
    $scope.agregarDeficionCampo = function () {
        console.log('Posicion');
        console.log($scope.posicion);
        var definicion = {
            idCampo: 1,
            campo: $scope.campoSeleccionado.campo,
            posicion: $scope.posicion
        }
        $scope.definiciones.unshift(definicion);

    }


    // ------------------------------------------ Eliminar CAMPO Definition
    $scope.eliminarPosicion = function (idx) {
        $scope.definiciones.splice(idx, 1);
    };

});