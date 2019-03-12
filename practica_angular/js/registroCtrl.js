var app = angular.module('PruebaApp.registroCtrl',[]);

app.controller('registroCtrl', ['$scope', '$http', 'Funciones', function($scope, $http, Funciones){

	$scope.invalido = false;
	$scope.mensaje  = "";
	$scope.datos = {};

$scope.registrar = ( datos ) =>{

	var usuario = escape(datos.nombre);
	var contrasena = btoa(datos.contrasena); //Codificamos la contraseña en base64
	var ok = true;

	$scope.validarNombre = Funciones.validarNombreApellidos(datos.nombre); //Validamos el nombre
	$scope.validarApellidos = Funciones.validarNombreApellidos(datos.apellidos); //Validamos el apellido
	$scope.validarCorreo = Funciones.validarCorreo(datos.email); //Validamos el email
	$scope.validarContrasena = Funciones.validarContrasena(datos.contrasena); //Validamos la contraseña

	if($scope.validarNombre.valido === false){

		$scope.invalido = true;
		$scope.mensaje  = "'Nombre' " + $scope.validarNombre.msgError;
		return;

	}else if ($scope.validarApellidos.valido === false){
		$scope.invalido = true;
		$scope.mensaje  = "'Apellidos' " + $scope.validarApellidos.msgError;
		return;

	}else if($scope.validarCorreo.valido === false){

		$scope.invalido = true;
		$scope.mensaje  =  $scope.validarCorreo.msgError;
		return;

	}else if($scope.validarContrasena.valido === false){
		$scope.invalido = true;
		$scope.mensaje  =  "'Contraseña' " + $scope.validarContrasena.msgError;
		return;
	}
	else{

		document.forma.contrasena.value = contrasena; //Mostramos la contraseña codificada
		
		for(var i = 0; i<sessionStorage.length; i++){ //Recorremos todas las sessions de usuarios

		  var usuarioSesion = sessionStorage.key(i);
		      if(usuarioSesion === usuario){ //Si ya existe el usuario
		         alert("El usuario ya existe");
		         ok = false;
		         break;
		      }
		}

		if(ok === true){ //Si todo es correcto
			sessionStorage.setItem(usuario, contrasena); //Creamos la sesion para registrar al usuario
			alert("Usuario registrado");
			window.location = "/practica_angular/index.html"; //Redireccionamos a la página de inicio
		}

	}


	$scope.invalido = false;
	$scope.mensaje  = "";

}

//Función para volver a la página de login.
$scope.volver = () =>{
	window.location = '/practica_angular/index.html';
}


	
}]);