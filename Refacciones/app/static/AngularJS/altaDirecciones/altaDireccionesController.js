registrationModule.controller('altaDireccionesController', function ($route, $scope, $rootScope, $location, altaDireccionesRepository, userFactory, alertFactory) {
    //declaracion de variables
    $scope.modalEliminar = {};
    $scope.modalEditar = {};
    $scope.direcciones = [];
    $scope.nuevaDireccion = {};
    $scope.tipoDirecciones = {};
    $scope.colonia = {};
    $scope.userData = {};
    //init()
    $scope.init = function () {
        
    //redirecciona al login si no hay un usuario logeado
        console.log('Entranto a altaDirecciones');
        var userData = userFactory.getUserData();
        if(userData==null||userData==undefined)
            location.href = '/';
        $scope.userData = userFactory.getUserData();
        console.log($scope.userData.idUsuario);
        console.log('voy a LLamar al Repository GetDirecciones');
        console.log($scope.userData.idCliente);
        console.log('$scope.userData.idCliente');
        altaDireccionesRepository.getDirecciones($scope.userData.idCliente, null).then(function (result) {
            if (result.data.length > 0)
                {
                console.log('Regrese con datos');
                console.log(result.data);
                $scope.direcciones = result.data;
                }
            else
                alertFactory.error('El cliente no contiene Direcciones registradas');
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
        if(cp.length==5)
        altaDireccionesRepository.getColonia(cp)
            .then(function (result) {
                if (result.data.length > 0)
                    $scope.colonia = result.data;
                else
                    alertFactory.error('No existe el codigo postal');
            });
    };
    

        // función que se ejecuta al pulsar el botón buscar dirección
$scope.getCoords = function(){
    // Creamos el objeto geodecoder
   var geocoder = new google.maps.Geocoder();
  
   var str = 'calle ' + $scope.Calle + 
   ', municipio ' + $scope.coloniaSel.ciudad +
   ', colonia ' + $scope.coloniaSel.colonia +
   ', numero ' + $scope.NumeroExterior
  
   
  
   //address = document.getElementById('str').value;
   var address = str 
   
   if(address!='')
   {
    // Llamamos a la función geodecode pasandole la dirección que hemos introducido en la caja de texto.
   geocoder.geocode({ 'address': str}, function(results, status)  
  
   {
     if (status == 'OK')
     {
  // Mostramos las coordenadas obtenidas en el p con id coordenadas
     document.getElementById("coordenadas").innerHTML='Coordenadas:   '+results[0].geometry.location.lat()+', '+results[0].geometry.location.lng();
     //document.getElementById("coordenadas").innerHTML='Coordenadas:   '+str ;
  
     $scope.latitud = results[0].geometry.location.lat()
     $scope.longitud = results[0].geometry.location.lng()
     console.log('longitud');
     console.log($scope.longitud);
     console.log('latitud');
     console.log($scope.latitud);
     console.log.apply(str);
  }
    });
   }
   }
   
    //iserta la nueva direccion
    $scope.insDireccion = function () {
        //checa los campos obligatorios
        var insertar = true;
        insertar = $scope.userData.idUsuario == null || $scope.userData.idUsuario == undefined ? false : insertar;
        //insertar = $scope.tipoDirSelec == null || $scope.tipoDirSelec == undefined ? false : insertar;
        insertar = $scope.coloniaSel == null || $scope.coloniaSel == undefined ? false : insertar;
        insertar = $scope.Calle == null || $scope.Calle == undefined ? false : insertar;
        insertar = $scope.NumeroExterior == null || $scope.NumeroExterior == undefined ? false : insertar;

        if (insertar == true) {
            console.log('insDireccion');
            console.log('Voy a Agregar Direccion');
            $scope.nuevaDireccion.idCliente = $scope.userData.idCliente; //obligatorio
            $scope.nuevaDireccion.idTipoDireccion = 2;  //$scope.tipoDirSelec.idTipoDireccion; //obligatorio
            $scope.nuevaDireccion.idColonia = $scope.coloniaSel.idColonia; //obligatorio
            $scope.nuevaDireccion.Calle = $scope.Calle; //obligatorio
            $scope.nuevaDireccion.NumeroExterior = $scope.NumeroExterior; //obligatorio
            $scope.nuevaDireccion.NumeroInterior = $scope.NumeroInterior == null || $scope.NumeroInterior == undefined ? null : $scope.NumeroInterior;
            $scope.nuevaDireccion.Entre = $scope.Entre == null || $scope.Entre == undefined ? ' ' : $scope.Entre; //ob
            $scope.nuevaDireccion.Y = $scope.yCalle == null || $scope.yCalle == undefined ? ' ' : $scope.yCalle; //ob
            $scope.nuevaDireccion.Nota = $scope.Nota == null || $scope.Nota == undefined ? 'Sin observaciones' : $scope.Nota; //
            $scope.nuevaDireccion.latitud = $scope.latitud;
            $scope.nuevaDireccion.longitud = $scope.longitud;
            //inserta la nueva direccion
            console.log('voy a llamar a Repositori');
            altaDireccionesRepository.insDireccion(
                    $scope.nuevaDireccion)
                .then(function (result) {
                    if (result.data.length > 0 && (result.data[0].control == 1)) {

                        alertFactory.success('Se agrego correctamente la nueva direccion');
                        altaDireccionesRepository.getDirecciones($scope.userData.idUsuario, null).then(function (result) {
                            if (result.data.length > 0)
                                $scope.direcciones = result.data;
                            else
                                alertFactory.error('El usuario no contiene Direcciones registradas');
                        });
                    } else
                        {
                            console.log('Error');
                        alertFactory.error('ocurrio un error durante la insercion de los datos');
                        }
                });
            //se cierra la modal
            $('#modalFormulario').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        } else {
            console.log($scope.coloniaSel);
            alertFactory.error('verifique los campos obligatorios (**) porfavor');
        }

    };
    //eliminar direcciones
    $scope.eliminarDireccionModal = function (d) {
        console.log(d);
        $scope.modalEliminar = d;
    };

    $scope.eliminar = function () {
        altaDireccionesRepository.elimDireccion($scope.modalEliminar.idDireccion).then(function (result) {

            if (result.data.length > 0 && (result.data[0].control == 1)) {
                alertFactory.success('Se elimino la direccion correctamente');
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
        $scope.codigoPostal=d.codigoPostal;
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
        Actualizar = $scope.modalEditar.idColonia == null || $scope.modalEditar.idColonia == undefined ? false : Actualizar;
        Actualizar = $scope.modalEditar.Calle == null || $scope.modalEditar.Calle == undefined ? false : Actualizar;
        Actualizar = $scope.modalEditar.NumeroExterior == null || $scope.modalEditar.NumeroExterior == undefined ? false : Actualizar;

        if (Actualizar == true) {
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
        } else {
            alertFactory.error('verifique los campos obligatorios (**) porfavor');

        }
    };



});