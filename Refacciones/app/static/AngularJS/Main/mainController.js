registrationModule.controller('mainController', function ($scope, $rootScope, $location, localStorageService, alertFactory, userFactory) {

    $scope.init = function () {
        //userFactory.ValidaSesion();
        $scope.userData = userFactory.getUserData();
        
        if ($scope.userData != undefined) {

            $rootScope.mostrarMenu = 1;

            var paginaInicio = '/';
            switch ($scope.userData.idRol) {

                case 1:
                case 8:
                    paginaInicio = '/AdministracionUsuarios';
                    break;

                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    paginaInicio = '/Cotizaciones';
                    break;

                case 9:
                    paginaInicio = '/Pedidos';
                    break;

                default:
                    paginaInicio = '/';
                    break;
            }
            $location.path(paginaInicio);
        }
    }

    $scope.salir = function () {
        userFactory.logOut();
    }
});
