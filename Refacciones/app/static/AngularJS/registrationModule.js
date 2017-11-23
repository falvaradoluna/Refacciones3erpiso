var registrationModule = angular.module("registrationModule", ["ngRoute", "LocalStorageModule", 'ui.grid', 'ui.grid.selection', 'ui.grid.grouping', 'ui.grid.pinning', 'ui.grid.edit'])
    .config(function($routeProvider, $locationProvider) {

        /*cheange the routes*/
        //route /Login
        $routeProvider.when('/', {
            templateUrl: 'AngularJS/Templates/login.html',
            controller: 'loginController'
        });
        //Route /Pedidos
        $routeProvider.when('/Pedidos', {
            templateUrl: 'AngularJS/Templates/Pedidos.html'
            ,controller: 'pedidosController'
        });
        //Route /Cotizaciones
        $routeProvider.when('/Cotizaciones', {
            templateUrl: 'AngularJS/Templates/Cotizaciones.html'
            ,controller: 'cotizacionesController'
        });
        //Route /Historico
        $routeProvider.when('/Histórico', {
            templateUrl: 'AngularJS/Templates/historico.html'
            ,controller: 'historicoController'
        });
        //Route /altadireeciones
        $routeProvider.when('/Altadirecciones', {
            templateUrl: 'AngularJS/Templates/altaDirecciones.html'
            ,controller: 'altaDireccionesController'
        });
        // $routeProvider.when('/AdministracionPrecios', {
        //     templateUrl: 'AngularJS/Templates/administracionPrecios.html'
        //     ,controller: 'administracionPreciosController'
        // });
        $routeProvider.when('/ConfiguracionPrecios', {
            templateUrl: 'AngularJS/Templates/ConfiguracionPrecios.html'
            ,controller: 'configuracionPreciosController'
        });
        $routeProvider.when('/AdministracionClientes', {
            templateUrl: 'AngularJS/Templates/administracionClientes.html'
            ,controller: 'administracionClientesController'
        });
        
        $routeProvider.when('/AdministracionUsuarios', {
            templateUrl: 'AngularJS/Templates/administracionUsuarios.html'
            ,controller: 'administracionUsuariosController'
        });

        //Route /default
        $routeProvider.otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

registrationModule.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        var changeHeight = function() { element.css('height', (w.height() - 20) + 'px'); };
        w.bind('resize', function() {
            changeHeight(); // when window size gets changed
        });
        changeHeight(); // when page loads
    };
});
registrationModule.run(function($rootScope) {
    $rootScope.var = "full";

})
