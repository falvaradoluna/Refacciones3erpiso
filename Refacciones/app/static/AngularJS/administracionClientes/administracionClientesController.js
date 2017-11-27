registrationModule.controller('administracionClientesController', function ($route, $scope, $rootScope, $location, administracionClientesRepository, userFactory, alertFactory) {
    // variables
    $scope.modalEliminar = {};
    $scope.modalEditar = {};
    $scope.Clientes = [];
    $scope.nuevoCliente = {};
    $scope.cli = {};
    $scope.userData = {};
    
    $scope.init = function () {
        //redirecciona al login si no hay un usuario logeado
        var userData = userFactory.getUserData();
        if(userData==null||userData==undefined)
            location.href = '/';
    
        $scope.userData = userFactory.getUserData();
        administracionClientesRepository.getClientes().then(function (result) {
            if (result.data.length > 0){
                $scope.Clientes = result.data;
               console.log($scope.Clientes);
            }
            else
                alertFactory.error('NO SE ENCONTRARON CLIENTES');
        });
    };
    
     //inserta la nuevo cliente 
     $scope.insertar = function () {
        var inserta = true;
        //inserta = $scope.usuario == null || $scope.usuario == undefined ? false : inserta;
        inserta = $scope.razonSocial == null || $scope.razonSocial == undefined ? false : inserta;
        inserta = $scope.nombreComercial == null || $scope.nombreComercial == undefined ? false : inserta;
        inserta = $scope.contacto == null || $scope.contacto == undefined ? false : inserta;
        inserta = $scope.rfc == null || $scope.rfc == undefined ? false : inserta;
    
        if (inserta == true) {
           // $scope.user.usuario = $scope.usuario;
            $scope.cli.razonSocial = $scope.razonSocial;
            $scope.cli.nombreComercial = $scope.nombreComercial;
            $scope.cli.contacto = $scope.contacto;
            $scope.cli.rfc = $scope.rfc;
            administracionClientesRepository.insClientes($scope.cli).then(function (result) {
                if (result.data.length > 0 && (result.data[0].control == 1)) {
                    alertFactory.success('Se agrego correctamente el nuevo cliente');
                    administracionClientesRepository.getClientes($scope.cli).then(function (result) {
                        if (result.data.length > 0) {
                            $scope.Clientes = result.data;
                        } else {
                            alertFactory.error('No hay clientes registrados');
                        }
                    });
                } else
                    alertFactory.error('ocurrio un error durante la insercion de los datos');
            });
            $('#agregarModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        } else {
            alertFactory.error('verifique los campos ');
        }
    };
    $scope.modalEliminar = function (c) {
        $scope.ModalClienteEliminado = c;
    };
    $scope.elimina = function () {
        console.log($scope.ModalClienteEliminado);
        administracionClientesRepository.DelCliente($scope.ModalClienteEliminado).then(function (result) {
            if (result.data.length > 0 && (result.data[0].control == 1)) {
                alertFactory.success('El cliente se a eliminado Correctamente');
                administracionClientesRepository.getClientes($scope.cli).then(function (result) {
                    if (result.data.length > 0) {
                        $scope.Clientes = result.data;
                    } else {
                        alertFactory.error('No hay clientes registrados');
                    }
                });
            } else
                alertFactory.error('ocurrio un error durante la eliminacion de los datos');
        });
        $('#eliminarModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        administracionClientesRepository.getClientes().then(function (result) {
            if (result.data.length > 0) {
                $scope.Clientes = result.data;
            } else {
                alertFactory.error('No hay usuarios registrados');
            }
        });
    };
     // actualziaCliente
     $scope.modalUpdateCliente = function (c) {
        $scope.modalEditar = c;
    };
    
     $scope.UpdateCliente = function () {
        var Actualizar = true;
        //Actualizar = $scope.userData.idUsuario == null || $scope.userData.idUsuario == undefined ? false : Actualizar;
        Actualizar = $scope.modalEditar.razonSocial == null || $scope.modalEditar.razonSocial == undefined ? false : Actualizar;
        Actualizar = $scope.modalEditar.nombreComercial == null || $scope.modalEditar.nombreComercial == undefined ? false : Actualizar;
        Actualizar = $scope.modalEditar.contacto == null || $scope.modalEditar.contacto == undefined ? false : Actualizar;
        Actualizar = $scope.modalEditar.rfc == null || $scope.modalEditar.rfc == undefined ? false : Actualizar;

        if (Actualizar == true) {
            administracionClientesRepository.updCliente($scope.modalEditar).then(function (result) {
                if (result.data.length > 0 && (result.data[0].control == 1)) {
                    alertFactory.success('El cliente se a modificado Correctamente');
                    administracionClientesRepository.getClientes($scope.cli).then(function (result) {
                        if (result.data.length > 0) {
                            $scope.Clientes = result.data;
                        } else {
                            alertFactory.error('No hay clientes registrados');
                        }
                    });
                } else
                    alertFactory.error('ocurrio un error durante la edicion de los datos');
            });
            //se cierra la modal

            $('#actualizarModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        } else {
            alertFactory.error('verifique los campos ');

        }

    };
   
    });
    