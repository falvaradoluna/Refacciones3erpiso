registrationModule.controller('cotizacionesController', function ($scope, $rootScope, $location, loginRepository, localStorageService, userFactory, alertFactory) {
    //funcion que controla el calendario
    $('#popupDatepicker').datepick();
    //controlar la busqueda de los clientes
    $scope.buscCliente = "";

    $scope.cotizaciones = [];

    $scope.busquedaCliente = function (n) {
        if (n == 1)
            $scope.buscCliente = 'nombre';
        if (n == 2)
            $scope.buscCliente = 'id';
        return $scope.buscCliente;
    };
    $scope.cliente = {
        'id': '',
        'nombre': '',
        'rfc': '',
        'colonia': '',
        'delegacion': '',
        'codigoPostal': ''
    };
    $scope.obtenerCliente = function (c) {
        $scope.cliente = c;
        return $scope.cliente;
    };

    $scope.getCotizaciones = function () {
        data = [{
            folio: 12345
        },
        { folio: 5234 },
        { folio: 234 }];
        $scope.cotizaciones = data;
        console.log($scope.cotizaciones);
    }

    $scope.getCotizaciones();

    //array de prueba paar cliente/cotazaciones
    $scope.listaClientes = [{
            'id': '1',
            'nombre': 'cliente 1',
            'rfc': '001121',
            'colonia': 'Colonia Cliente 1',
            'delegacion': 'Delegacion Cliente 1',
            'codigoPostal': '12341'
        },
        {
            'id': '2',
            'nombre': 'cliente 2',
            'rfc': '001122',
            'colonia': 'Colonia Cliente 2',
            'delegacion': 'Delegacion Cliente 2',
            'codigoPostal': '12342'
        },
        {
            'id': '3',
            'nombre': 'cliente 3',
            'rfc': '001123',
            'colonia': 'Colonia Cliente 3',
            'delegacion': 'Delegacion Cliente 3',
            'codigoPostal': '12343'
        },
        {
            'id': '4',
            'nombre': 'cliente 4',
            'rfc': '001124',
            'colonia': 'Colonia Cliente 4',
            'delegacion': 'Delegacion Cliente 4',
            'codigoPostal': '12344'
        }

    ];
});