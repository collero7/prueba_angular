'use strict';

var app = angular.module('PruebaApp.detalleCtrl', []);

app.controller('detalleCtrl', ['$scope', '$routeParams', '$http', 'Funciones', function ($scope, $routeParams, $http, Funciones) {

	$scope.usuario = $routeParams.usuario; //Para obtener el usuario desde la URL
	$scope.detalle = $routeParams.detalle; //Para obtener el detalle de la pelicula desde la URL

	$scope.contenidoPelicula = {};

	//Obtenemos la pelicula a través del parametro de la URL
	$http.get(Funciones.URL + 't=' + encodeURI($scope.detalle) + Funciones.KEY).success(function (datos) {

		$scope.contenidoPelicula = datos;
	});

	//Función para añadir a favoritos una pelicula
	$scope.gestionFavorito = function () {

		//Hacemos llamada al servicio para gestionar el favorito
		Funciones.gestionFavorito($scope.usuario, $scope.detalle).then(function (datos) {
			//Tratamos la promesa

			if (datos.ok === false) {
				console.error("Algo salió mal");
			} else {
				Funciones.crearFavorito(datos.usuario, datos.tituloPelicula);
			}
		});
	};
}]);