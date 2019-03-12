'use strict';

var app = angular.module('PruebaApp', ['PruebaApp.loginCtrl', 'PruebaApp.registroCtrl', 'PruebaApp.homeCtrl', 'PruebaApp.servicios', 'PruebaApp.detalleCtrl', 'PruebaApp.favoritosCtrl', 'PruebaApp.busquedaCtrl', 'ngRoute']);

app.controller('mainCtrl', ['$scope', function ($scope) {

						$scope.menuSuperior = '/practica_angular/html/menu.html'; //Para referenciar en el include de index.html el menú superior

}]);