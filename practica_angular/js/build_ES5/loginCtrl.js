'use strict';

var app = angular.module('PruebaApp.loginCtrl', []);

app.controller('loginCtrl', ['$scope', 'Funciones', function ($scope, Funciones) {

	$scope.invalido = false;
	$scope.mensaje = "";
	$scope.datos = {};

	//Función para validar los datos de login
	$scope.redireccionar = function (datos) {

		var usuario = escape(datos.nombre); //Para escapar/convertir caracteres extraños
		var contrasena = btoa(datos.contrasena); //Codificamos la contraseña en base64
		var ok = false;
		var usuSesion = '',
		    passSesion = '';

		$scope.validarNombre = Funciones.validarNombreApellidos(datos.nombre); //Validamos nombre
		$scope.validarContrasena = Funciones.validarContrasena(datos.contrasena); //Validamos contraseña

		//Si el resultado de validar el nombre es inválido
		if ($scope.validarNombre.valido === false) {

			$scope.invalido = true;
			$scope.mensaje = "'Nombre' " + $scope.validarNombre.msgError;
			return;

			//Si el resultado de validar la contraseña es inválido
		} else if ($scope.validarContrasena.valido === false) {
			$scope.invalido = true;
			$scope.mensaje = "'Contraseña' " + $scope.validarContrasena.msgError;
			return;
		} else {

			//Si es correcto...
			for (var i = 0; i < sessionStorage.length; i++) {
				//Recorremos todas las sessions de usuarios

				usuSesion = sessionStorage.key(i); //Obtenemos la sesion por posicion
				if (usuSesion === usuario) {
					//Si ya existe el usuario
					passSesion = sessionStorage.getItem(usuSesion); //Obtenemos la contraseña para ese usuario
					ok = passSesion === contrasena; //Comprobamos si existe
					document.formL.contrasena.value = '';
				}
			}
			//Si el usuario y contraseña es incorrecto
			if (!ok) {
				$scope.invalido = true;
				$scope.mensaje = "Usuario y/o contraseña incorrectos";
				return;
			} else {
				window.location = '/practica_angular/html/#/' + usuario; //En caso de ser correcto, navegamos hasta la página principal.
			}
		}

		$scope.invalido = false;
		$scope.mensaje = "";
	};

	//Función que nos redirirecciona a la página de registro
	$scope.registrar = function () {
		window.location = '/practica_angular/html/registro.html';
	};
}]);