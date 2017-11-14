registrationModule.controller('cotizacionesController', function ($scope, $rootScope, $location, loginRepository, localStorageService, userFactory, alertFactory) {
    $scope.cotizaciones = [];

    $scope.getCotizaciones = function () {
        data = [{
            folio: 12345
        },
        { folio: 5234 },
        { folio: 234 }];
        $scope.cotizaciones = data;
        console.log($scope.cotizaciones);
        //TODO falta implementar el servicio para obtener las cotizaciones
    };

    $scope.getCotizaciones();

    $scope.showBorrarCotizacion = function (idx){
        $scope.idxCotizacion = idx;
        $scope.nombreCotizacionEliminar = $scope.cotizaciones[$scope.idxCotizacion].folio
        $('#modalElimina').modal('show')
    };

    $scope.eliminaCotizacion = function (){
        $scope.cotizaciones.splice($scope.idxCotizacion,1);
        //TODO: Falta implementar la eliminacion
    };
});