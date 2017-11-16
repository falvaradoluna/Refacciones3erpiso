registrationModule.controller('altaDireccionesController', function ($route, $scope, $rootScope, $location, altaDireccionesRepository, userFactory, alertFactory) {
    //declaracion de variables
    $scope.modalEliminar = {};
    $scope.modalEditar = {};
    $scope.direcciones = {};
    $scope.nuevaDireccion = {};
    $scope.tipoDirecciones = {};
    $scope.colonia = {};
    $scope.userData = {};
    //init()
    $scope.init = function () {
        $scope.userData = userFactory.getUserData();
        altaDireccionesRepository.getDirecciones($scope.userData.idUsuario, null).then(function (result) {
            if (result.data.length > 0)
                $scope.direcciones = result.data;
            else
                alertFactory.error('El usuario no contiene Direcciones registradas');
        });
        altaDireccionesRepository.getTipoDirecciones().then(function (result) {
            if (result.data.length > 0)
                $scope.tipoDirecciones = result.data;
            else
                alertFactory.error('No se pudo cargar el tipo de Direcciones');
        });
    };
    //obtiene las colonias asociadas al codigo postal
    $scope.obtenerColonia = function (cp) {
        altaDireccionesRepository.getColonia(cp)
            .then(function (result) {
                if (result.data.length > 0)
                    $scope.colonia = result.data;
                else
                    alertFactory.error('No existe el codigo postal');
            });
    };
    //iserta la nueva direccion
    $scope.insDireccion = function () {
        //checa los campos obligatorios
        var insertar = true;
        insertar = $scope.userData.idUsuario == null || $scope.userData.idUsuario == undefined ? false : insertar;
        insertar = $scope.tipoDirSelec == null || $scope.tipoDirSelec == undefined ? false : insertar;
        insertar = $scope.coloniaSel == null || $scope.coloniaSel == undefined ? false : insertar;
        insertar = $scope.Calle == null || $scope.Calle == undefined ? false : insertar;
        insertar = $scope.NumeroExterior == null || $scope.NumeroExterior == undefined ? false : insertar;

        if (insertar == true) {
            $scope.nuevaDireccion.idUsuario = $scope.userData.idUsuario; //obligatorio
            $scope.nuevaDireccion.idTipoDireccion = $scope.tipoDirSelec.idTipoDireccion; //obligatorio
            $scope.nuevaDireccion.idColonia = $scope.coloniaSel.idColonia; //obligatorio
            $scope.nuevaDireccion.Calle = $scope.Calle; //obligatorio
            $scope.nuevaDireccion.NumeroExterior = $scope.NumeroExterior; //obligatorio
            $scope.nuevaDireccion.NumeroInterior = $scope.NumeroInterior == null || $scope.NumeroInterior == undefined ? 'Sin numero interior' : $scope.NumeroInterior;
            $scope.nuevaDireccion.Entre = $scope.Entre == null || $scope.Entre == undefined ? '' : $scope.Entre; //ob
            $scope.nuevaDireccion.Y = $scope.yCalle == null || $scope.yCalle == undefined ? '' : $scope.yCalle; //ob
            $scope.nuevaDireccion.Nota = $scope.Nota == null || $scope.Nota == undefined ? '' : $scope.Nota; //
            //inserta la nueva direccion
            altaDireccionesRepository.insDireccion(
                    $scope.nuevaDireccion)
                .then(function (result) {
                    if (result.data.length > 0 && (result.data[0].control == 1)) {
                        alertFactory.success('Se agrego correctamente la nueva direccion');
                    } else
                        alertFactory.error('ocurrio un error durante la insercion de los datos');
                });
            //se cierra la modal
            $('#modalFormulario').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            altaDireccionesRepository.getDirecciones($scope.userData.idUsuario, null).then(function (result) {
                if (result.data.length > 0)
                    $scope.direcciones = result.data;
                else
                    alertFactory.error('El usuario no contiene Direcciones registradas');
            });
        } else
            alertFactory.error('verifique los campos obligatorios (**) porfavor');

    };
    //eliminar direcciones
    $scope.eliminarDireccionModal = function (d) {
        console.log(d);
        $scope.modalEliminar = d;
    };

    $scope.eliminar = function () {
        altaDireccionesRepository.elimDireccion($scope.modalEliminar.idDireccion).then(function (result) {

            if (result.data.length > 0 && (result.data[0].control == 1)) {
                alertFactory.success('Se elimino la direccion correctaen');
                //se cierra la modal

                $('#modalElimDir').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();

                altaDireccionesRepository.getDirecciones($scope.userData.idUsuario, null).then(function (result) {
                    if (result.data.length > 0)
                        $scope.direcciones = result.data;
                    else
                        alertFactory.error('El usuario no contiene Direcciones registradas');
                });
            } else
                alertFactory.error('ocurrio un error durante la eliminacion');
        });
    };
    //editar Direcciones
    $scope.editarDireccionModal = function (d) {
        $scope.modalEditar = d;
        //obtenemos el tipo direccion

        //obtenemos la colonia
        altaDireccionesRepository.getColonia($scope.modalEditar.codigoPostal)
            .then(function (result) {
                if (result.data.length > 0) {
                    $scope.colonia = result.data;
                    $scope.coloniaSel = $scope.colonia.find(a => a.idColonia == $scope.modalEditar.idColonia);
                    $scope.tipoDirSelec = $scope.tipoDirecciones.find(a => a.idTipoDireccion == $scope.modalEditar.idTipoDireccion);
                } else
                    alertFactory.error('No existe el codigo postal');
            });

    };
    $scope.actualizaDireccion = function () {
        var Actualizar = true;
        Actualizar = $scope.userData.idUsuario == null || $scope.userData.idUsuario == undefined ? false : Actualizar;
        Actualizar = $scope.tipoDirSelec == null || $scope.tipoDirSelec == undefined ? false : Actualizar;
        Actualizar = $scope.coloniaSel == null || $scope.coloniaSel == undefined ? false : Actualizar;
        Actualizar = $scope.modalEditar.Calle == null || $scope.modalEditar.Calle == undefined ? false : Actualizar;
        Actualizar = $scope.modalEditar.NumeroExterior == null || $scope.modalEditar.NumeroExterior == undefined ? false : Actualizar;

        if (Actualizar == true) {
            console.log($scope.coloniaSel.idColonia);
            //$scope.modalEditar.idColonia=$scope.coloniaSel.idColonia;
            altaDireccionesRepository.actDireccion($scope.modalEditar).then(function (result) {

                if (result.data.length > 0 && (result.data[0].control == 1)) {
                    alertFactory.success('Se Acualizao la direccion');
                } else
                    alertFactory.error('ocurrio un error durante la actualizacion');
            });
            //se cierra la modal

            $('#modalEditDir').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

            altaDireccionesRepository.getDirecciones($scope.userData.idUsuario, null).then(function (result) {
                if (result.data.length > 0)
                    $scope.direcciones = result.data;
                else
                    alertFactory.error('El usuario no contiene Direcciones registradas');
            });
        } else
            alertFactory.error('verifique los campos obligatorios (**) porfavor');
        /*
          @idUsuario INT,
          @idTipoDireccion INT,
          @idColonia INT,
          @Calle VARCHAR(MAX),
          @NumeroExterior VARCHAR(50),
          @NumeroInterior VARCHAR(50),
          @Entre VARCHAR(MAX),
          @Y VARCHAR(MAX),
          @Nota VARCHAR(MAX),
          @idDireccion int
         */
    };
});