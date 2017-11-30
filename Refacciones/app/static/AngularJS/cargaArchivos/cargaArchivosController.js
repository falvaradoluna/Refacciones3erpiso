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

        // 2 obtener los campós del archivo a procesar
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


    // ------------------------------------------ ELIMINA COTIZACIONES

    $scope.showCancelaPosicion = function (definicion,idx) {
              
                console.log('Se llama a showCancelaPosicion');
                console.log(definicion);
                console.log('Valor de Index??')
                console.log(idx);
        
                $scope.idCampo = definicion.idCampo;
                $scope.nombreCampoCancela = definicion.campo
                $scope.posicionCampoCancela = definicion.posicion
                $scope.idxCancela = idx;
                $('#modalElimina').modal('show')
            };
        
    $scope.cancelaPosicion = function () {
                console.log('llegue a cancelaPosicion');
                console.log('Valor de Index??');
                //console.log(idx);
                console.log($scope.idxCancela);

                $scope.definiciones.splice($scope.idxCancela, 1);

            };


    $scope.subir = function() {
            console.log('LLegue a Subir Archivo');
            console.log('Nombre del Archivo');
            console.log($scope.archivo.file);

    }   ;         

});