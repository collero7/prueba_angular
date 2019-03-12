var app = angular.module('PruebaApp.busquedaCtrl',[]);

app.controller('busquedaCtrl', ['$scope', '$rootScope', '$routeParams', 'Funciones', function($scope, $rootScope, $routeParams, Funciones){

	$rootScope.usuarioPadre = $routeParams.usuario; //Para obtener el usuario desde la URL y se la asignamos al scope padre
	$scope.resultado = $routeParams.resultado; //Para obtener el detalle de la pelicula buscada desde la URL
	$scope.resultadoBusqueda = {};
	$scope.inicio = 1;

	//Función que nos muestra la busqueda realizada
	$scope.navegarPagina = () => {
		$scope.resultadoBusqueda = Funciones.mostrarBusqueda($scope.inicio, $scope.resultado);
	}
	
	//Función que nos redirige hasta la página de detalle
	$scope.navegarDetalle = (detalle) => {
	    location.href='#/detalle/' + $rootScope.usuarioPadre + '/' + encodeURI(detalle);
	}

	//Función para añadir a favoritos una pelicula
	$scope.gestionFavorito = (titulo) => {

		//Hacemos llamada al servicio para gestionar el favorito
		Funciones.gestionFavorito($rootScope.usuarioPadre, titulo).then(function(datos){ //Tratamos la promesa

			if(datos.ok === false){
				console.error("Algo salió mal");
			}else{
				Funciones.crearFavorito($rootScope.usuarioPadre, datos.tituloPelicula);
			}

		});
	}

	//Función para pasar a la siguiente página
	$scope.siguiente = () => {

		if ($scope.inicio < 30){
			$scope.inicio += 1;
			$scope.navegarPagina();
		}
		window.scroll(0, 0); //Metodo para volver a la parte superior de la página
	}

	//Función para pasar a la anterior página
	$scope.anterior = () => {

		if ($scope.inicio > 1){
			$scope.inicio -= 1;
			$scope.navegarPagina();
		}
		window.scroll(0, 0); //Metodo para volver a la parte superior de la página
	}

	//Navegamos a la primera página
	$scope.navegarPagina();


	
}]);