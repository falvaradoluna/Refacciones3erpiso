registrationModule.controller('altaDireccionesController', function ($scope, $rootScope, $location,altaDireccionesRepository,userFactory) {

    $scope.direcciones = {};
    $scope.tipoDirecciones = {};
    $scope.colonia = {};
    $scope.userData = {};
    $scope.init = function() {
        $scope.userData = userFactory.getUserData();
        altaDireccionesRepository.getDirecciones( $scope.userData.idUsuario).then(function(result){
            if (result.data.length > 0 )
            $scope.direcciones= result.data;
            else
            alertFactory.info('El usuario no contiene Direcciones registradas');
        });
        altaDireccionesRepository.getTipoDirecciones().then(function(result){
            if (result.data.length > 0 )
            $scope.tipoDirecciones= result.data;
            else
            alertFactory.info('No se pudo cargar el tipo de Direcciones');
        });
    };
    $scope.obtenerColonia = function(cp) {
        altaDireccionesRepository.getColonia(cp).then(function(result){
            if (result.data.length > 0 )
            $scope.colonia =  result.data;
            else
            alertFactory.info('No existe el codigo postal');
        });
    };

});