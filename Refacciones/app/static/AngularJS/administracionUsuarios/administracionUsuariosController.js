registrationModule.controller('administracionUsuariosController', function ($route, $scope, $rootScope, $location, administracionUsuariosRepository, userFactory, alertFactory) {

    $scope.usuarios = {};
    $scope.roles = {};
    $scope.clientes = {};
    $scope.user={};
    $scope.init = function () {
        administracionUsuariosRepository.getUsuarios().then(function (result) {
            if (result.data.length > 0) {
                $scope.usuarios = result.data;
            } else {
                alertFactory.error('No hay usuarios registrados');
            }
        });
        administracionUsuariosRepository.getRoles().then(function (result) {
            if (result.data.length > 0) {
                $scope.roles = result.data;
            } else {
                alertFactory.error('No se pudieron obtener los roles');
            }
        });
        administracionUsuariosRepository.getClientes().then(function (result) {
            if (result.data.length > 0) {
                $scope.clientes = result.data;
            } else {
                alertFactory.error('No se pudieron obtener los clientes');
            }
        });
    };

    $scope.insertar = function () {
        var inserta = true;
        inserta = $scope.usuario == null || $scope.usuario == undefined ? false : inserta;
        inserta = $scope.contrasenia == null || $scope.contrasenia == undefined ? false : inserta;
        inserta = $scope.tipoRolSel == null || $scope.tipoRolSel == undefined ? false : inserta;
        inserta = $scope.clienteSel == null || $scope.clienteSel == undefined ? false : inserta;

        if (inserta==true) {
            $scope.user.usuario=$scope.usuario;
            $scope.user.contrasenia=$scope.contrasenia;
            $scope.user.idRol=$scope.tipoRolSel.idRol;
            $scope.user.nombreCompleto=$scope.nombreCompleto;
            $scope.user.correoElectronico=$scope.correoElectronico;
            $scope.user.id=$scope.clienteSel.id;
            administracionUsuariosRepository.insUsuario($scope.user).then(function (result) {
                if (result.data.length > 0 && (result.data[0].control == 1)) {
                    alertFactory.success('Se agrego correctamente la el nuevo usuario');       
                } else
                    alertFactory.error('ocurrio un error durante la insercion de los datos');
            });
            $('#agregarModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            administracionUsuariosRepository.getUsuarios().then(function (result) {
                if (result.data.length > 0) {
                    $scope.usuarios = result.data;
                } else {
                    alertFactory.error('No hay usuarios registrados');
                }
            });
                    /*
        	 @usuario varchar(15)
    ,@contrasenia varchar(15)
    ,@idRol int
    ,@nombreCompleto nvarchar(50)**
    ,@correoElectronico nvarchar(50)**
	,@idCliente int = 1 */
        } else {
            alertFactory.error('verifique los campos obligatorios (**) porfavor');
        }
    };

});