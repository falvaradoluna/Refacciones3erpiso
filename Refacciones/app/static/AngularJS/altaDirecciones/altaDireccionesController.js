registrationModule.controller('altaDireccionesController', function ($scope, $rootScope, $location,altaDireccionesRepository,userFactory) {

    $scope.direcciones = {};
    $scope.userData = {};
    $scope.init = function() {
        $scope.userData = userFactory.getUserData();
        altaDireccionesRepository.getDirecciones( $scope.userData.idUsuario).then(function(result){
            if (result.data.length > 0 )
            $scope.direcciones= result.data;
            else
            alertFactory.info('El usuario no contiene Direcciones registradas');
        });
    };



});