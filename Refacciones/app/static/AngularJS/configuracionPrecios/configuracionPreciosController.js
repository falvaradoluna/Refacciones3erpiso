/*configuracionPreciosController */
registrationModule.controller('configuracionPreciosController', function ($route, $scope, $rootScope, $location, configuracionPreciosRepository, userFactory, alertFactory) {
    $scope.confPrecios = {};
    $scope.confClientes = {};
    $scope.tiposConf = {};
    $scope.Base = {};
    $scope.Operacion = {};
    $scope.Grupo = {};
    $scope.Marca = {};
    $scope.ClienteAsignados = {};
    $scope.Cliente = {};
    $scope.ConfPrecioAux = {};
    $scope.ConfiguracionSeleccionada;
 
    $scope.init = function () {
        var userData = userFactory.getUserData();
        if (userData == null || userData == undefined)
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


    $scope.modalInsConfPrecio = function () {
        /*	 
	 @idTipoConfiguracion int
	,@idGrupoPartes int = 0
    ,@idBase int
    ,@idOperacion int
    ,@porcentaje numeric(18,2)
    ,@idMarca int
	,@configuracionNombre nvarchar(50)
    */
        var inserta = true;
        //console.log($scope.marcaSelec);
        inserta = $scope.configuracionNombre == null || $scope.configuracionNombre == undefined ? false : inserta;
        //inserta = $scope.marcaSelec == null || $scope.marcaSelec == undefined ? false : inserta;
        inserta = $scope.tipoConfSelec == null || $scope.tipoConfSelec == undefined ? false : inserta;
        //inserta=$scope.grupoSelec==null||$scope.grupoSelec==undefined?false:inserta;
        inserta = $scope.baseSelec == null || $scope.baseSelec == undefined ? false : inserta;
        inserta = $scope.operacionSelec == null || $scope.operacionSelec == undefined ? false : inserta;
        inserta = $scope.porcentaje == null || $scope.porcentaje == undefined ? false : inserta;
        if (inserta) {
            $scope.ConfPrecioAux.idTipoConfiguracion = $scope.tipoConfSelec.id;
            $scope.ConfPrecioAux.idGrupoPartes = $scope.grupoSelec == undefined || $scope.grupoSelec == null ? 0 : $scope.grupoSelec.id;
            $scope.ConfPrecioAux.idBase = $scope.baseSelec.id;
            $scope.ConfPrecioAux.idOperacion = $scope.operacionSelec.id;
            $scope.ConfPrecioAux.porcentaje = $scope.porcentaje;
           // $scope.ConfPrecioAux.idMarca = $scope.marcaSelec.idMarca;
            $scope.ConfPrecioAux.configuracionNombre = $scope.configuracionNombre;

            configuracionPreciosRepository.insConfPrecios($scope.ConfPrecioAux).then(function (result) {
                if (result.data.length > 0 && (result.data[0].control == 1)) {
                    alertFactory.success('Se agrego correctamente la nueva configuracion de precios');
                    configuracionPreciosRepository.getConfPrecios().then(function (result) {
                        if (result.data.length > 0) {
                            $scope.confPrecios = result.data;
                        } else {
                            alertFactory.info('No hay datos registrados en Configuracion Precios');
                        }
                    });
                } else
                    alertFactory.error('ocurrio un error durante la insercion de los datos');
            });
            $('#modalFormulario').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        } else {
            alertFactory.error('verifique los campos obligatorios (**) porfavor');
        }
    };

    $scope.modalCliente = function (c) {
        console.log('LLamo a modalCliente');
        console.log('el idConfiguracion es');
        console.log(c);
        $scope.ClienteAsignados = undefined;
        $scope.clienteSelec = undefined;
        $scope.ConfiguracionSeleccionada = c.id;
        console.log('Id Configuracion que es del modal')
        console.log('$scope.ConfiguracionSeleccionada');
        console.log($scope.ConfiguracionSeleccionada);
        configuracionPreciosRepository.getClientesAsignados(c).then(function (result) {
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
    $scope.modalInsAsignar = function () {
        var insert = true;
        console.log($scope.marcaSelec);
        console.log($scope.clienteSelec);
        console.log($scope.tiposConf);
        console.log('Voy a Insertar Configuracion');
        console.log('Valor de ConfiguracionSeleccionada');
        console.log($scope.ConfiguracionSeleccionada);


        insert = $scope.marcaSelec == null || $scope.marcaSelec == undefined ? false : insert;
        insert = $scope.clienteSelec == null || $scope.clienteSelec == undefined ? false : insert;
        
       // insert = $scope.tipoConfiguracion == null || $scope.tipoConfiguracion == undefined ? false : insert;
        if (insert) {
            //$scope.confClientes.idConfiguracion = $scope.idConfiguracion.id;
            $scope.confClientes.idCliente = $scope.clienteSelec.id;
            $scope.confClientes.idMarca = $scope.marcaSelec.idMarca;
            $scope.confClientes.idConfiguracion = $scope.ConfiguracionSeleccionada;
            configuracionPreciosRepository.insConfClientes($scope.confClientes).then(function (result) {
                if (result.data.length > 0 && (result.data[0].control == 1)) {
                    alertFactory.success('Se agrego correctamente la nueva configuracion de cliente');
                    configuracionPreciosRepository.getClientesAsignados().then(function (result) {
                        if (result.data.length > 0) {
                            $scope.confClientes = result.data;
                        } else {
                            alertFactory.info('No hay datos registrados en Configuracion cliente');
                        }
                    });
                } else
                    alertFactory.error('ocurrio un error durante la insercion de los datos');
            });
            $('#modalUsers').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        } else {
            alertFactory.error('verifique los campos obligatorios (**) porfavor');
        }
    };
});