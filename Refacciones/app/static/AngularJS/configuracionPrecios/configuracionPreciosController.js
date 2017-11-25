/*configuracionPreciosController */
registrationModule.controller('configuracionPreciosController', function ($route, $scope, $rootScope, $location, configuracionPreciosRepository, userFactory, alertFactory) {
    $scope.confPrecios={};
    $scope.tiposConf={};
    $scope.Base={};
    $scope.Operacion={};
    $scope.Grupo={};
    $scope.Marca={};
    $scope.ClienteAsignados={};
    $scope.Cliente={};
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
            configuracionPreciosRepository.getMarca().then(function (result) {
                if (result.data.length > 0) {
                    $scope.Marca = result.data;
                } else {
                    alertFactory.error('No hay Bases de configuracion registradas');
                }
            });
    };
    $scope.modalInsConfPrecio=function(){
        /*	 
     @idTipoConfiguracion int
	,@idGrupoPartes int = 0
    ,@idBase int
    ,@idOperacion int
    ,@porcentaje numeric(18,2)
	,@limiteInferior numeric(18,2)
    ,@limiteSuperior numeric(18,2)
    ,@idMarca int 
        */
    
    
    };

    $scope.modalUsuario=function(c){
        $scope.ClienteAsignados=undefined;
        $scope.clienteSelec=undefined;
        configuracionPreciosRepository.getUsuariosAsignados(c).then(function (result) {
            if (result.data.length > 0) {
                $scope.ClienteAsignados = result.data;
            } else {
                alertFactory.info('Esta configuracion de precios no tiene clientes Asignados');
            }
        });
        configuracionPreciosRepository.getCliente().then(function (result) {
            if (result.data.length > 0) {
                $scope.Cliente = result.data;
            } else {
                alertFactory.error('NO se pudieron obtener los Clientes');
            }
        });
    };
});