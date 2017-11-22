registrationModule.controller('administracionUsuariosController', function ($route, $scope, $rootScope, $location, administracionUsuariosRepository, userFactory, alertFactory) {

    $scope.usuarios = {};
    $scope.ModalUsuarioEliminado = {};
    $scope.ModalUsuarioActualizar = {};
    $scope.roles = {};
    $scope.clientes = {};
    $scope.user = {};
    $scope.userData={};
    $scope.init = function () {
        
    //redirecciona al login si no hay un usuario logeado
        var userData = userFactory.getUserData();
        if(userData==null||userData==undefined)
            location.href = '/';
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

        if (inserta == true) {
            $scope.user.usuario = $scope.usuario;
            $scope.user.contrasenia = $scope.contrasenia;
            $scope.user.idRol = $scope.tipoRolSel.idRol;
            $scope.user.nombreCompleto = $scope.nombreCompleto;
            $scope.user.correoElectronico = $scope.correoElectronico;
            $scope.user.id = $scope.clienteSel.id;
            administracionUsuariosRepository.insUsuario($scope.user).then(function (result) {
                if (result.data.length > 0 && (result.data[0].control == 1)) {
                    alertFactory.success('Se agrego correctamente la el nuevo usuario');
                    administracionUsuariosRepository.getUsuarios().then(function (result) {
                        if (result.data.length > 0) {
                            $scope.usuarios = result.data;
                        } else {
                            alertFactory.error('No hay usuarios registrados');
                        }
                    });
                } else
                    alertFactory.error('ocurrio un error durante la insercion de los datos');
            });
            $('#agregarModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        } else {
            alertFactory.error('verifique los campos obligatorios (**) porfavor');
        }
    };
    $scope.modalEliminar = function (c) {
        $scope.ModalUsuarioEliminado = c;
    };
    $scope.elimina = function () {
        console.log($scope.ModalUsuarioEliminado);
        administracionUsuariosRepository.DelUsuario($scope.ModalUsuarioEliminado).then(function (result) {
            if (result.data.length > 0 && (result.data[0].control == 1)) {
                alertFactory.success('El usuario se a eliminado Correctamente');
            } else
                alertFactory.error('ocurrio un error durante la eliminacion de los datos');
        });
        $('#eliminarModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        administracionUsuariosRepository.getUsuarios().then(function (result) {
            if (result.data.length > 0) {
                $scope.usuarios = result.data;
            } else {
                alertFactory.error('No hay usuarios registrados');
            }
        });
    };
    $scope.modalUpdateUsuario = function (u) {
        $scope.ModalUsuarioActualizar = u;
        $scope.tipoRolSel = $scope.roles.find(a => a.idRol == $scope.ModalUsuarioActualizar.idRol);
        $scope.clienteSel = $scope.clientes.find(a => a.id == $scope.ModalUsuarioActualizar.IdCliente);
    };
    $scope.UpdateUsuario = function () {
        var actualiza = true;
        actualiza = $scope.ModalUsuarioActualizar.Usuario == null || $scope.ModalUsuarioActualizar.Usuario == undefined ? false : actualiza;
        //actualiza = $scope.ModalUsuarioActualizar.contrasenia == null || $scope.ModalUsuarioActualizar.contrasenia == undefined ? false : actualiza;

        if (actualiza == true) {
            administracionUsuariosRepository.updUsuario($scope.ModalUsuarioActualizar).then(function (result) {
                if (result.data.length > 0 && (result.data[0].control == 1)) {
                    alertFactory.success('El usuario se a actualizado Correctamente');
                    administracionUsuariosRepository.getUsuarios().then(function (result) {
                        if (result.data.length > 0) {
                            $scope.usuarios = result.data;
                        } else {
                            alertFactory.error('No hay usuarios registrados');
                        }
                    });
                } else
                    alertFactory.error('ocurrio un error durante la actualizacion de los datos');
            });
            $('#actualizarModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        } else {
            alertFactory.error('verifique los campos obligatorios (**) porfavor');
        }
    };
});