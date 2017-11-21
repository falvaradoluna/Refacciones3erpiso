registrationModule.controller('administracionUsuariosController', function ($route, $scope, $rootScope, $location, administracionUsuariosRepository, userFactory, alertFactory) {

    $scope.usuarios={};
    $scope.roles={};
    $scope.clientes={};

    $scope.init=function(){
        administracionUsuariosRepository.getUsuarios().then(function(result){
            if(result.data.length>0){
                $scope.usuarios=result.data;
            }
            else{
                alertFactory.error('No hay usuarios registrados');
            }
        });
        administracionUsuariosRepository.getRoles().then(function(result){
            if(result.data.length>0){
                $scope.roles=result.data;
            }
            else{
                alertFactory.error('No se pudieron obtener los roles');
            }
        });
        administracionUsuariosRepository.getClientes().then(function(result){
            if(result.data.length>0){
                $scope.clientes=result.data;
            }
            else{
                alertFactory.error('No se pudieron obtener los clientes');
            }
        });
    };

});