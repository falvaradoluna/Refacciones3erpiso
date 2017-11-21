registrationModule.controller('administracionClientesController', function ($route, $scope, $rootScope, $location, administracionClientesRepository, userFactory, alertFactory) {
// variables
$scope.modalEliminar = {};
$scope.modalEditar = {};
$scope.Clientes = [];
$scope.nuevoCliente = {};
$scope.userData = {};

$scope.init = function () {
    $scope.userData = userFactory.getUserData();
    administracionClientesRepository.getClientes().then(function (result) {
        if (result.data.length > 0){
            $scope.Clientes = result.data;
          // console.log($scope.Clientes);
        }
        else
            alertFactory.error('NO SE ENCONTRARON CLIENTES');
    });
};

});
