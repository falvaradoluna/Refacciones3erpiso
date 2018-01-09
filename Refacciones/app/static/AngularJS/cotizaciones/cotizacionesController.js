registrationModule.controller('cotizacionesController', function ($scope, $rootScope, $location, loginRepository, localStorageService, userFactory, alertFactory, cotizacionesRepository, altaDireccionesRepository) {
    
        // ------------------------------------------ CARGA INICIAL
    
        $('[data-toggle="tooltip"]').tooltip();
    
        $scope.cotizaciones = [];
        $scope.partesAgregadas = [];
        $scope.modeloVin = {};

        $scope.hasGPS = true;
    
        // ----------------------------------------- INICIALIZACION DE CATALOGOS
    
        $scope.init = function () {
            
            
        //redirecciona al login si no hay un usuario logeado
            var userData = userFactory.getUserData();
            if (userData == null || userData == undefined)
                location.href = '/';
            $scope.userData = userFactory.getUserData();
    
            // obtener las cotizaciones del usuario
            cotizacionesRepository.getCotizaciones($scope.userData.idUsuario).then(function (result) {
    
                if (result.data.length > 0) {
    
                    $scope.cotizaciones = result.data;
                    console.log($scope.cotizaciones);
                } else
                    alertFactory.info('Aun no tiene cotizaciones registradas.');
            });
    
            cotizacionesRepository.getMarcas().then(function (result) {
    
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
    
            // 2 es para las direcciones de entrega
            altaDireccionesRepository.getDirecciones($scope.userData.idCliente, null).then(function (result) {
    
                if (result.data.length > 0) {
                    $scope.direcciones = result.data;
    
                    // inicializacion
                    $scope.direccionSeleccionada = $scope.direcciones[0];
                } else
                    alertFactory.info('El usuario no cuenta con direcciones de embarque registradas');
            });
        };
    
        $scope.init();
    
        $scope.reiniciaBusqueda = function () {
            $scope.busquedaCotizacion = '';
        }
    
        // ------------------------------------------ AGREGA PARTE
    
        $scope.showAgregarCotizacion = function () {
    
            $scope.agregaCotizacion = {
                folio: ''
            };
    
            $scope.refaccionBusquedaPorVIN = '';
            $scope.refaccionBusqueda = '';
            $scope.busquedaActual = [];
            $scope.partesAgregadas = [];
            if ($scope.marcas.length > 0)
                $scope.marcaSeleccionada = $scope.marcas[0];
            if ($scope.direcciones.length > 0)
                $scope.direccionSeleccionada = $scope.direcciones[0];
    
            $('#modalAgregaParte').modal('show');
        };
    
        $scope.clearQueryPorVIN = function () {
            $scope.refaccionBusquedaPorVIN = '';
        };
    
        $scope.buscarRefaccionPorVIN = function () {
            if ($scope.refaccionBusquedaPorVIN.length > 16) {
                if ($scope.refaccionBusquedaPorVIN && $scope.refaccionBusquedaPorVIN.length > 16) {
    
                    cotizacionesRepository.getMarcaVIN($scope.refaccionBusquedaPorVIN).then(function (result) {
                        console.log('RESPUESTA DEL VIN');
                        console.log(result.data);
                        $scope.modeloVin=result.data[0];
                        if (result.data.length > 0) {
                            if (result.data[0].idmarca && result.data[0].idmarca > 0) {
    
                                angular.forEach($scope.marcas, function (marca, key) {
                                    console.log('comparacion');
                                    console.log(marca);
                                    console.log(result.data[0].idmarca);
                                    if (marca.idMarca == result.data[0].idmarca) {
                                        $scope.marcaSeleccionada = marca;
                                    }
                                });
                            } else
                                alertFactory.info('Aun no contamos con refacciones para la marca ' + result.data[0].marca + '.');
                        } else
                            alertFactory.info('El VIN no es valido.');
                    });
                } else {
                    alertFactory.info('Debe colocar un VIN valido.');
                }
            }
        };
    
        $scope.limpiarBusquedaParte = function () {
            $scope.refaccionBusqueda = '';
        };
    
        $scope.buscarRefaccion = function () {
            if ($scope.refaccionBusqueda.length > 2) {
    
                cotizacionesRepository.getRefacciones($scope.marcaSeleccionada.idMarca, $scope.refaccionBusqueda).then(function (result) {
    
                    if (result.data.length > 0) {
                        $scope.busquedaActual = result.data;
                    } else {
                        $scope.busquedaActual = [];
                    }
                    //alertFactory.info('No se pudieron cargar las refacciones con esa descripción.');
                });
            } else {
                $scope.busquedaActual = [];
            };
        };
    
        $scope.agregarParte = function (parteAgregada) {
    
            var agregado = false;
    
            if ($scope.partesAgregadas.length > 0) {
                angular.forEach($scope.partesAgregadas, function (parte, key) {
                    if (parte.id == parteAgregada.id && parte.idMarca == parteAgregada.idMarca) {
                        parte.cantidad += parteAgregada.cantidad;
                        agregado = true;
                    }
                });
            };
    
            if (!agregado) {
                $scope.partesAgregadas.push(parteAgregada);
            };
    
            console.log($scope.partesAgregadas);
            $scope.busquedaActual = []
            $scope.refaccionBusqueda = '';
           
        };
    
        $scope.eliminarParte = function (idx) {
            $scope.partesAgregadas.splice(idx, 1);
        };
    
        $scope.agregarCotizacionParte = function () {
            $('#modalAgregaDireccion').modal('show');
    
            //modalModifica
            //$scope.cotizaciones.push($scope.agregaCotizacion);
        };
    
        $scope.getTotal = function () {
            var total = 0;
            for (var i = 0; i < $scope.partesAgregadas.length; i++) {
                var parte = $scope.partesAgregadas[i];
                total += (parte.precioCliente * parte.cantidad);
            }
            return total;
        }
    
        $scope.getTotalDetalle = function () {
            var total = 0;
            if ($scope.partesCotizacion) {
                for (var i = 0; i < $scope.partesCotizacion.length; i++) {
                    var parte = $scope.partesCotizacion[i];
                    total += (parte.Precio * parte.Cantidad);
                }
            }
            return total;
        }
    
        // ------------------------------------------ AGREGA DIRECCION
    
        $scope.backCotizacionParte = function () {
            $('#modalAgregaParte').modal('show');
        };
    
        // si pitufa el modelo del radio
        $scope.elegirDireccion = function (direccion) {
            $scope.direccionSeleccionada = direccion;
           // $scope.initialize();
        }
    
        $scope.agregarCotizacionConfirma = function () {
            $('#modalAgregaConfirma').modal('show');
        };
    
        // ------------------------------------------ AGREGA CONFIRMA PEDIDO
    
        $scope.backCotizacionDireccion = function () {
            $('#modalAgregaDireccion').modal('show');
        };
    
        $scope.agregarCotizacion = function () {
    
            var partes = [];
            angular.forEach($scope.partesAgregadas, function (value, key) {
                partes.push({
                    refaccion: value
                });
            })
            var cotizacionAlta = {
                idUsuario: $scope.userData.idUsuario,
                idDireccion: $scope.direccionSeleccionada.idDireccion,
                refacciones: partes
            };
            console.log('Lista con el formato solicitad0');
            console.log(partes);
            console.log(cotizacionAlta);
    
            cotizacionesRepository.addCotizacion(cotizacionAlta).then(function (result) {
                console.log(result.data);
    
                if (result.data.length > 0 && result.data[0].control > 0) {
    
                    cotizacionesRepository.getCotizaciones($scope.userData.idUsuario).then(function (result) {
    
                        if (result.data.length > 0) {
    
                            $scope.cotizaciones = result.data;
                            console.log($scope.cotizaciones);
                        } else
                            alertFactory.info('Ocurrio un error al cargar las cotizaciones del usuario.');
                    });
    
                    alertFactory.info('Correcto. Agregó una nueva cotización.');
    
                } else {
                    alertFactory.info('Ocurrio un error al agregar la cotización.');
                }
            });
        };
    
        // ------------------------------------------ VER DETALLE DE COTIZACIONES
    
        $scope.showCotizacion = function (cotizacion) {
    
            $scope.cotizacionDetalle = cotizacion;
    
            cotizacionesRepository.getDetalleCotizacion(cotizacion.idCotizacion).then(function (result) {
    
                console.log('cancela la cotizacion');
                console.log(result.data);
                if (result.data.length > 0) {
    
                    $scope.partesCotizacion = result.data;
                    console.log($scope.cotizaciones);
                } else
                    alertFactory.info('Ocurrio un error al cambiar el estado de la cotización.');
            });
    
            $('#modalDetalleCotizacion').modal('show');
        };
    
        // ------------------------------------------ ELIMINA COTIZACIONES
    
        $scope.showCancelaCotizacion = function (cotizacion) {
    
            $scope.idCotizacionCancela = cotizacion.idCotizacion;
            $scope.nombreCotizacionCancela = cotizacion.cotizacionNumber
            $('#modalElimina').modal('show')
        };
    
        $scope.cancelaCotizacion = function () {
    
            cotizacionesRepository.cancelaCotizacion($scope.idCotizacionCancela).then(function (result) {
    
                console.log('cancela la cotizacion');
                console.log(result.data);
                if (result.data.length > 0 && result.data[0].control > 0) {
    
                    cotizacionesRepository.getCotizaciones($scope.userData.idUsuario).then(function (result) {
    
                        if (result.data.length > 0) {
    
                            $scope.cotizaciones = result.data;
                            console.log($scope.cotizaciones);
                        } else
                            alertFactory.info('Ocurrio un error al cargar las cotizaciones del usuario.');
                    });
    
                    alertFactory.info('Correcto. Cambio el estatus.');
                    //$scope.cotizaciones = result.data;
                    console.log($scope.cotizaciones);
                } else
                    alertFactory.info('Ocurrio un error al cambiar el estado de la cotización.');
            });
    
            //$scope.cotizaciones.splice($scope.idxCotizacion, 1);
            //TODO: Falta implementar la eliminacion
        };
         //FUNCION QUE PINTA EL MAPA CADA DIRECCION
       $scope.initialize = function (direccion) {
        $scope.direccionSeleccionada = direccion;
       
           var myLatlng2 = new google.maps.LatLng(19.4270245,-99.16766469999999);
            var myLatlng = new google.maps.LatLng($scope.direccionSeleccionada.latitud, $scope.direccionSeleccionada.longitud);
            if ($scope.direccionSeleccionada.latitud != null) {
            var myOptions = {
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 12,
            panControl: true,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            overviewMapControl: true,
            rotateControl: true
             // zoom: 8,
              //center: myLatlng,
             // mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map($("#map_canvas").get(0), myOptions);
            var marker = new google.maps.Marker({
              position: myLatlng,
              map: map
          });
          $scope.hasGPS = true
        } else {
          $scope.hasGPS = false
          var myOptions = {
            center: myLatlng2,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 12,
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true
         // zoom: 8,
          //center: myLatlng,
         // mapTypeId: google.maps.MapTypeId.ROADMAP
        };
          var map = new google.maps.Map($("#map_canvas").get(0), myOptions);
          
          }
        };
    });