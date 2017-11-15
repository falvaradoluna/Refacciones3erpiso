registrationModule.controller('cotizacionesController', function ($scope, $rootScope, $location, loginRepository, localStorageService, userFactory, alertFactory, cotizacionesRepository, altaDireccionesRepository) {

    // ------------------------------------------ CARGA INICIAL

    $('[data-toggle="tooltip"]').tooltip();

    $scope.cotizaciones = [];
    $scope.partesAgregadas = [];

    // ----------------------------------------- INICIALIZACION DE CATALOGOS

    $scope.init = function () {

        $scope.userData = userFactory.getUserData();

        cotizacionesRepository.getMarcas().then(function (result) {

            if (result.data.length > 0) {

                $scope.marcas = result.data;

                // inicializacion
                var marca = { idMarca: 0, marca: 'Seleccione una marca.' }
                $scope.marcas.unshift(marca);
                $scope.marcaSeleccionada = $scope.marcas[0];
            }
            else
                alertFactory.info('No se pudieron cargar las marcas');
        });

        // 2 es para las direcciones de entrega
        altaDireccionesRepository.getDirecciones($scope.userData.idUsuario, 2).then(function (result) {

            if (result.data.length > 0) {
                $scope.direcciones = result.data;

                // inicializacion
                $scope.direccionSeleccionada = $scope.direcciones[0];
            }
            else
                alertFactory.info('El usuario no contiene Direcciones registradas');
        });
    };

    $scope.init();

    $scope.getCotizaciones = function () {

        var data = [{
            folio: 12345
        },
        {
            folio: 5234
        },
        {
            folio: 234
        }
        ];

        $scope.cotizaciones = data;
        //TODO falta implementar el servicio para obtener las cotizaciones
    };

    $scope.getCotizaciones();

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
        if ($scope.refaccionBusquedaPorVIN && $scope.refaccionBusquedaPorVIN.length > 0) {
            angular.forEach($scope.marcas, function (marca, key) {
                if (marca.marca == $scope.refaccionBusquedaPorVIN) {
                    $scope.marcaSeleccionada = marca;
                }
            });
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
                }
                else
                    alertFactory.info('No se pudieron cargar las refacciones con esa descripción.');
            });
        };
    };

    $scope.agregarParte = function (parteAgregada) {

        var agregado = false;

        if ($scope.partesAgregadas.length > 0) {
            angular.forEach($scope.partesAgregadas, function (parte, key) {
                if (parte.id == parteAgregada.id) {
                    parte.cantidad += parteAgregada.cantidad;
                    agregado = true;
                }
            });
        };

        if (!agregado) {
            $scope.partesAgregadas.push(parteAgregada);
        };

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
            total += (parte.PTS_PCOLISTA * parte.cantidad);
        }
        return total;
    }

    // ------------------------------------------ AGREGA DIRECCION

    $scope.backCotizacionParte = function () {
        $('#modalAgregaParte').modal('show');
    };

    // no pitufa el modelo del radio
    $scope.elegirDireccion = function (direccion) {
        $scope.direccionSeleccionada = direccion;
    }

    $scope.agregarCotizacionConfirma = function () {
        $('#modalAgregaConfirma').modal('show');
    };

    // ------------------------------------------ AGREGA CONFIRMA PEDIDO

    $scope.backCotizacionDireccion = function () {
        $('#modalAgregaDireccion').modal('show');
    };

    $scope.agregarCotizacion = function () {

    };

    // ------------------------------------------ MODIFICA COTIZACIONES

    $scope.showModificaCotizacion = function (idx) {

        $scope.idxCotizacion = idx;
        $scope.modificaCotizacion = angular.copy($scope.cotizaciones[$scope.idxCotizacion]);
        $('#modalModifica').modal('show');
    };

    $scope.modificarCotizacion = function () {

        $scope.cotizaciones[$scope.idxCotizacion] = $scope.modificaCotizacion;
    };

    // ------------------------------------------ ELIMINA COTIZACIONES

    $scope.showBorrarCotizacion = function (idx) {

        $scope.idxCotizacion = idx;
        $scope.nombreCotizacionEliminar = $scope.cotizaciones[$scope.idxCotizacion].folio
        $('#modalElimina').modal('show')
    };

    $scope.eliminaCotizacion = function () {

        $scope.cotizaciones.splice($scope.idxCotizacion, 1);
        //TODO: Falta implementar la eliminacion
    };
});