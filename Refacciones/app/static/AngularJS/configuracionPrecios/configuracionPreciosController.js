/*configuracionPreciosController */
registrationModule.controller('configuracionPreciosController', function ($route, $scope, $rootScope, $location, configuracionPreciosRepository, userFactory, alertFactory) {
    $scope.confPrecios={};
    $scope.tiposConf={};
    $scope.Base={};
    $scope.Operacion={};
    $scope.Grupo={};

    $scope.init=function(){
        var userData = userFactory.getUserData();
        if(userData==null||userData==undefined)
            location.href = '/';
            //obtengo los dats pa llenar el grid
            configuracionPreciosRepository.getConfPrecios().then(function (result) {
                if (result.data.length > 0) {
                    $scope.confPrecios = result.data;
                } else {
                    alertFactory.error('No hay datos registrados en Configuracion Precios');
                }
            });
            configuracionPreciosRepository.getTiposConf().then(function (result) {
                if (result.data.length > 0) {
                    $scope.tiposConf = result.data;
                } else {
                    alertFactory.error('No hay datos registrados en tipos de Configuracion');
                }
            });
            configuracionPreciosRepository.getBase().then(function (result) {
                if (result.data.length > 0) {
                    $scope.Base = result.data;
                } else {
                    alertFactory.error('No hay Bases de configuracion registradas');
                }
            });
            configuracionPreciosRepository.getOperacion().then(function (result) {
                if (result.data.length > 0) {
                    $scope.Operacion = result.data;
                } else {
                    alertFactory.error('No hay Bases de configuracion registradas');
                }
            });
            configuracionPreciosRepository.getGrupo().then(function (result) {
                if (result.data.length > 0) {
                    $scope.Grupo = result.data;
                } else {
                    alertFactory.error('No hay Bases de configuracion registradas');
                }
            });
    };
});