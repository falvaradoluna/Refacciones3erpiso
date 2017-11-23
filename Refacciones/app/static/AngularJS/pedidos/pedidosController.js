registrationModule.controller('pedidosController', function ($scope, $rootScope, $location, pedidosRepository, alertFactory, $window) {

    var init = function () {

        $scope.id = 1;
        $scope.nuevoPaquete = false;
        $scope.partes = [];
        $scope.paquetes = [];
        $scope.selected = {};

        pedidosRepository.getPedidos($scope.userData.idUsuario).then(function (result) {

            if (result.data.length > 0) {

                $scope.pedidos = result.data;
                console.log($scope.pedidos);
            }
            else
                alertFactory.info('Aun no tiene pedidos solicitados.');
        });
    };

    init();

    $scope.reiniciaBusqueda = function () {
        $scope.busquedaPedido = '';
    };

    $scope.showProcesaPedido = function (pedido) {

        console.log(pedido.idPedido);
        pedidosRepository.getDetallePedido(pedido.idPedido).then(function (result) {
            if (result.data.length > 0) {

                console.log(result.data);

                $scope.partes = result.data;

                $scope.pedidoProcesa = pedido;
                $('#modalProcesaPedido').modal('show');

            } else {
                alertFactory.info('Ocurrio un error al obtener el detalle del pedido.');
            }
        });
    };

    $scope.showNuevoPaquete = function () {

        $scope.nuevo = {
            id: 0,
            nombre: '',
            alto: 0,
            ancho: 0,
            largo: 0,
            peso: 0
        };

        $scope.selected = {};
        $scope.nuevoPaquete = true;
    };

    $scope.cancelarPaquete = function () {

        $scope.nuevoPaquete = false;
    };

    $scope.agregarPaquete = function () {

        $scope.id++;
        console.log($scope.nuevo);
        $scope.nuevo.id = $scope.id;

        $scope.paquetes.push($scope.nuevo);
        console.log($scope.paquetes);
        $scope.nuevoPaquete = false;
    };

    $scope.eliminarPaquete = function (idx) {

        $scope.nuevoPaquete = false;
        $scope.selected = {};
        $scope.paquetes.splice(idx, 1);
    };

    $scope.showModificarPaquete = function (paquete) {

        $scope.nuevoPaquete = false;
        $scope.selected = angular.copy(paquete);
    };

    $scope.cancelarModificacionPaquete = function () {

        $scope.selected = {};
    };

    $scope.modificarPaquete = function (idx) {

        console.log("Saving contact");
        $scope.paquetes[idx] = angular.copy($scope.selected);
        $scope.selected = {};
    };

    $scope.getTemplate = function (paquete) {

        if (paquete.id === $scope.selected.id) return 'edit';
        else return 'display';
    };

    $scope.enviaPedido = function(){

        var paquetes = [];
        angular.forEach($scope.paquetes, function (value, key) {
            paquetes.push({
                paquete: value
            });
        });

        var paqueteAlta = {
            idUsuario: 1,
            idDireccion: 1,
            paquetes: paquetes
        };

        console.log(paqueteAlta);
        pedidosRepository.addPartes(paqueteAlta).then(function(result){
            if(result.data > 0){

            };
        });
    };
});