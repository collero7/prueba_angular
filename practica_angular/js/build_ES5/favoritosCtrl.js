'use strict';

var app = angular.module('PruebaApp.favoritosCtrl', []);

app.controller('favoritosCtrl', ['$scope', '$rootScope', '$routeParams', 'Funciones', function ($scope, $rootScope, $routeParams, Funciones) {

	$rootScope.usuarioPadre = $routeParams.usuario; //Para obtener el usuario desde la URL y se la asignamos al scope padre

	$scope.numeroFavoritos = Funciones.numeroFavoritos($rootScope.usuarioPadre); //Obtenemos el número de favoritos
	$scope.obtenerFavoritos = Funciones.obtenerFavoritos($rootScope.usuarioPadre); //Obtenemos todos los favoritos
	$scope.contenidoPeliculas = Funciones.mostrarFavoritos($scope.numeroFavoritos, $scope.obtenerFavoritos); //Mostramos los favoritos

	//Función para eliminar un favorito
	$scope.eliminarFavorito = function (usuario, tituloPelicula) {

		Funciones.eliminarFavorito(usuario, tituloPelicula);
	};
}]);