registrationModule.controller('cotizacionesController', function ($scope, $rootScope, $location, loginRepository, localStorageService, userFactory, alertFactory) {
    
    // ------------------------------------------ CARGA INICIAL

    $('[data-toggle="tooltip"]').tooltip();

    $scope.cotizaciones = [];
    $scope.partesAgregadas = [];

    $scope.reiniciaBusqueda = function(){
        $scope.busquedaCotizacion = '';
    }

    $scope.getMarcas = function(){
        var data = [
            {
                id: 0,
                nombre:'Selecciona ...'
            },
            {
                id: 1,
                nombre:'NISSAN'
            },
            {
                id: 2,
                nombre:'GM'
            }
        ]
        $scope.marcas = data;
        $scope.marcaSeleccionada = $scope.marcas[0];
    };

    $scope.getMarcas();

    $scope.getDirecciones = function(){
        var data = [
            {
                id: 1,
                nombre:'Calle michoacan sur 28, cp 90980 San pablo del monte Tlaxcala.'
            },
            {
                id: 2,
                nombre:'Calle nahuatlacas 365, cp 04300 Ajusco del coyoacan.'
            }
        ]
        $scope.direcciones = data;
    };

    $scope.getDirecciones();

    $scope.getCotizaciones = function () {
        
        var data = [{
            folio: 12345
        },
        { folio: 5234 },
        { folio: 234 }];
        
        $scope.cotizaciones = data;
        console.log($scope.cotizaciones);
        //TODO falta implementar el servicio para obtener las cotizaciones
    };

    $scope.getCotizaciones();

    // ------------------------------------------ AGREGA PARTE
    
    $scope.showAgregarCotizacion = function () {
        
        $scope.agregaCotizacion = {
            folio: ''
        };

        $scope.refaccionBusquedaPorVIN = '';
        $scope.refaccionBusqueda = '';
        $scope.busquedaActual = []
        $scope.partesAgregadas = [];
        $scope.marcaSeleccionada = $scope.marcas[0];


        $('#modalAgregaParte').modal('show');
    };

    $scope.clearQueryPorVIN = function(){
        $scope.refaccionBusquedaPorVIN = '';
    };

    $scope.buscarRefaccionPorVIN = function(){
        if($scope.refaccionBusquedaPorVIN && $scope.refaccionBusquedaPorVIN.length > 0){
            angular.forEach($scope.marcas, function(marca, key) {
                if(marca.nombre == $scope.refaccionBusquedaPorVIN){
                    $scope.marcaSeleccionada = marca;
                    console.log('si es igual la marca, por eso la va a setear');
                }
              });
            console.log('Busca el VIN para obtener la marca');
        }
    };

$scope.limpiarBusquedaParte = function(){
    $scope.refaccionBusqueda = '';
};

$scope.buscarRefaccion = function(){
    if($scope.refaccionBusqueda.length > 3){
        $scope.busquedaActual = [
            {
                id:1,
                PTS_IDPARTE:'876ASDF',
                PTS_DESPARTE: 'foco para nissan',
                PTS_PCOLISTA:800,
                cantidad: 1
            },
            {
                id:2,
                PTS_IDPARTE:'345HKU',
                PTS_DESPARTE: 'facia para nissan',
                PTS_PCOLISTA:800,
                cantidad:1
            },
            {
                id:2,
                PTS_IDPARTE:'RTU34',
                PTS_DESPARTE: 'toldo para nissan',
                PTS_PCOLISTA:800,
                cantidad:1
            },
            {
                id:3,
                PTS_IDPARTE:'CVNX345',
                PTS_DESPARTE: 'parabrisas para nissan',
                PTS_PCOLISTA:800,
                cantidad:1
            },
        ];
    };
};

$scope.agregarParte = function(parteAgregada){

    var agregado = false;
    
    if($scope.partesAgregadas.length > 0){
        angular.forEach($scope.partesAgregadas, function(parte, key) {
            if(parte.id == parteAgregada.id){
                parte.cantidad += parteAgregada.cantidad;
                agregado = true;
            }
          });
    };

    if(!agregado){
        $scope.partesAgregadas.push(parteAgregada);
    };

    $scope.busquedaActual = []
    $scope.refaccionBusqueda = '';
};

$scope.eliminarParte = function (idx){
    $scope.partesAgregadas.splice(idx, 1);
};

$scope.agregarCotizacionParte = function(){
    $('#modalAgregaDireccion').modal('show');
    //modalModifica
            //$scope.cotizaciones.push($scope.agregaCotizacion);
        };

    // ------------------------------------------ AGREGA DIRECCION

    $scope.backCotizacionParte = function(){
        $('#modalAgregaParte').modal('show');
    }




    $scope.agregarCotizacionConfirma = function (){
        $('#modalAgregaConfirma').modal('show');
    }

    // ------------------------------------------ AGREGA CONFIRMA PEDIDO

    $scope.backCotizacionDireccion = function(){
        $('#modalAgregaDireccion').modal('show');
    }




    $scope.agregarCotizacion = function (){
        
    }

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