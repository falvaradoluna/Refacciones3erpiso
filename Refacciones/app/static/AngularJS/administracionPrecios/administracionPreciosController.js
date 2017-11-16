registrationModule.controller('administracionPreciosController', function ($route, $scope, $rootScope, $location, administracionPreciosRepository, userFactory, alertFactory) {
    $scope.marcas = {};
    $scope.Usuarios = {};
    //Inicia 
    $scope.init = function () {
        administracionPreciosRepository.getMarcas().then(function (result) {
            if (result.data.length > 0)
                $scope.marcas = result.data;
            else
                alertFactory.error('No hay marcas Registradas en la base de datos');
        });
        administracionPreciosRepository.getUsuarios().then(function (result) {
            if (result.data.length > 0)
                $scope.Usuarios = result.data;
            else
                alertFactory.error('No se pudo obtener los tipos de usuarios');
        });
    };
});