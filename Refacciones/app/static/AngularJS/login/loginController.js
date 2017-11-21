registrationModule.controller('loginController', function($scope, $rootScope, $location, loginRepository, localStorageService, userFactory, alertFactory) {

    //*******************************Variables*******************************
    $scope.userData = {};
    //**************************Init del controller**************************
    $scope.init = function() {
        $rootScope.mostrarMenu = 0;
        $scope.userData = userFactory.getUserData();
        if ($rootScope.userData == null || $rootScope.userData == undefined) {
            if (!($('#lgnUser').val().indexOf('[') > -1)) {
                var user = $('#lgnUser').val();
                $rootScope.userData = userFactory.getUsuario(user);
                $rootScope.mostrarMenu = 1;
            } else if (($('#lgnUser').val().indexOf('[') > -1) && !localStorageService.get('lgnUser')) {
                //alert('Debe iniciar sesión primero');

            }
        }
    };

    // ************************* Función para logueo *************************
    $scope.iniciaSesion = function(rfc, contrasena) {
        loginRepository.getIdUsuario(rfc, contrasena).then(function(result) {
            if (result.data.length > 0 ) {
                 $rootScope.userData = result.data[0];
                 console.log($rootScope.userData);
                 localStorageService.set('userData', $rootScope.userData);
                 $rootScope.mostrarMenu = 1;
                 location.href = '/Cotizaciones';
            } else{
                alertFactory.info('Valide el usuario y/o contraseña');
            }
        });
    };
});
