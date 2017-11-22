registrationModule.controller('pedidosController', function ($scope, $rootScope, $location, pedidosRepository) {

    var init = function () {

        pedidosRepository.getPedidos($scope.userData.idUsuario).then(function (result) {

            if (result.data.length > 0) {

                $scope.pedidos = result.data;
                console.log($scope.pedidos);
            }
            else
                alertFactory.info('Aun no tiene pedidos solicitados.');
        });
    }

    init();

    $scope.reiniciaBusqueda = function(){
        $scope.busquedaPedido = '';
    }
});