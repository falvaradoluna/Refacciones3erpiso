registrationModule.controller('cotizacionGraficaController', function ($scope, $rootScope, $location, loginRepository, localStorageService, userFactory, alertFactory, cotizacionGraficaRepository) {

    $scope.cotizacionesEstatus = [];
    $scope.cotizacionesMarca = [];
    $scope.totalCotizaciones = 20;
    $scope.totalCotizacionesMonto = 203500;
    
    

    var valuesDonut = [];
    var valuesDonutM = [];
    var colores     = [];

    $scope.init = function () {
        
        //redirecciona al login si no hay un usuario logeado
        var userData = userFactory.getUserData();
        if (userData == null || userData == undefined)
            location.href = '/';
        $scope.userData = userFactory.getUserData();

        console.log('Controler Init de CotizacionGrafica');

        // 1 obtener los datos para la grafica
        


        /// Datos dummy para graficas
        var cotizacionEstatus = {
            estatus : "Registradas",
            cantidad : 3,
            total :20,
            monto :52000,
            montocosto : 35000
        };
        
        $scope.cotizacionesEstatus.push(cotizacionEstatus);
        //valuesDonut.push( { label: cotizacionEstatus.estatus + "\n$" + v, value: cotizacionEstatus.cantidad } );
        valuesDonut.push( { label: cotizacionEstatus.estatus + "\n$", value: cotizacionEstatus.monto } );
        colores.push('#00BFFF');

        var cotizacionEstatus2 = {
            estatus : "Surtidas",
            cantidad : 10,
            total :20,
            monto :92000,
            montocosto : 75000
        };

        $scope.cotizacionesEstatus.push(cotizacionEstatus2);
        //valuesDonut.push( { label: cotizacionEstatus2.estatus + "\n$" + v, value: cotizacionEstatus2.cantidad } );
        valuesDonut.push( { label: cotizacionEstatus2.estatus + "\n$", value: cotizacionEstatus2.monto } );
        colores.push('#074F7D');

        var cotizacionEstatus3 = {
            estatus : "Embarcadas",
            cantidad : 4,
            total :20,
            monto :27500,
            montocosto : 35000
        };

        $scope.cotizacionesEstatus.push(cotizacionEstatus3);
        //valuesDonut.push( { label: cotizacionEstatus3.estatus + "\n$" + v, value: cotizacionEstatus3.cantidad } );
        valuesDonut.push( { label: cotizacionEstatus3.estatus + "\n$", value: cotizacionEstatus3.monto } );
        colores.push('#5B86A6');

        var cotizacionEstatus4 = {
            estatus : "Entregadas",
            cantidad : 2,
            total :20,
            monto :32000,
            montocosto : 1500
        };

        $scope.cotizacionesEstatus.push(cotizacionEstatus4);
        //valuesDonut.push( { label: cotizacionEstatus4.estatus + "\n$" + v, value: cotizacionEstatus4.cantidad } );
        valuesDonut.push( { label: cotizacionEstatus4.estatus + "\n$", value: cotizacionEstatus4.monto } );
        colores.push('#2E2EFE');

        console.log('a Graficar');
        console.log(valuesDonut);

        // Grafica
        $('#morris-donut-citas').empty();
        Morris.Donut({
            element: 'morris-donut-citas',
            data: valuesDonut,
            resize: true,
            colors: colores,
        })


        var cotizacionMarca = {
            marca : "Nissan",
            cantidad : 16,
            total :20,
            monto :65000,
            montocosto : 3500
        };

        var cotizacionMarca1 = {
            marca : "GM",
            cantidad : 4,
            total :20,
            monto :75000,
            montocosto : 9500
        };

        $scope.cotizacionesMarca.push(cotizacionMarca);
        $scope.cotizacionesMarca.push(cotizacionMarca1);

        valuesDonutM.push( { label: cotizacionMarca.marca + "\n$", value: cotizacionMarca.monto } );
        valuesDonutM.push( { label: cotizacionMarca1.marca + "\n$", value: cotizacionMarca1.monto } );


        // Grafica Marcas
        $('#morris-donut-marcas').empty();
        Morris.Donut({
            element: 'morris-donut-marcas',
            data: valuesDonutM,
            resize: true,
            colors: colores,
        })

       console.log($scope.cotizacionesEstatus);

    };

    //$scope.init();  //carga de nuevo todo





    // ---------------- Listado de Cotizaciones
    $scope.agregarDeficionCampo = function () {
        console.log('LLegue a Listado de Cotizaciones');
        console.log('Redirect');
        

    };

    
    
});