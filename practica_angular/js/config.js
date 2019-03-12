app.config( function($routeProvider){

	//RouteProvider para gestionar las URL en base a la acción realizada
	$routeProvider
		.when('/:usuario',{
			templateUrl: '/practica_angular/html/home.html',
			controller: 'homeCtrl'
		})
		.when('/detalle/:usuario/:detalle',{
			templateUrl: '/practica_angular/html/detalle.html',
			controller: 'detalleCtrl'
		})
		.when('/favoritos/:usuario',{
			templateUrl: '/practica_angular/html/favoritos.html',
			controller: 'favoritosCtrl'
		})
		.when('/busqueda/:usuario/:resultado',{
			templateUrl: '/practica_angular/html/busqueda.html',
			controller: 'busquedaCtrl'
		})
		.when('/salir',{
			templateUrl: './practica_angular/index.html',
			//controller: ''
		})
		.otherwise({
			redirectTo: '/:usuario'
		});


});