'use strict';

var app = angular.module('PruebaApp.homeCtrl', []);

app.controller('homeCtrl', ['$scope', '$rootScope', '$routeParams', '$http', 'Funciones', function ($scope, $rootScope, $routeParams, $http, Funciones) {

	$rootScope.usuarioPadre = $routeParams.usuario; //Para obtener el usuario desde la URL y se la asignamos al scope padre
	$scope.contenidoPeliculas = [];

	for (var i = 0; i < 8; i++) {
		//Listamos las películas definidas en la funcion peliculasIndex()

		$http.get(Funciones.URL + 't=' + encodeURI(Funciones.peliculasIndex(i)) + Funciones.KEY).success(function (datos) {
			$scope.contenidoPeliculas.push(datos); //Añadimos al array el resultado de cada película
		});
	}

	//Función para navegar al detalle de cada película
	$scope.navegarDetalle = function (detalle) {

		location.href = '#/detalle/' + $rootScope.usuarioPadre + '/' + encodeURI(detalle);
	};

	//Función para tratar la busqueda de una película
	$scope.buscarPelicula = function (datosBusqueda) {

		Funciones.verificarBusquedaPelicula($rootScope.usuarioPadre, datosBusqueda);
	};
}]);