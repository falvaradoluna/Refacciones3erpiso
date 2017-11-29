registrationModule.controller('configuradorGruposController', function ($route, $scope, $rootScope, $location, configuradorGruposRepository, userFactory, alertFactory) {
    $scope.Grupos = [];
    $scope.userData = {};

    $scope.init = function () {
        //redirecciona al login si no hay un usuario logeado
        var userData = userFactory.getUserData();
        if(userData==null||userData==undefined)
            location.href = '/';
    
        $scope.userData = userFactory.getUserData();

    };


});