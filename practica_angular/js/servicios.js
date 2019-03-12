var app = angular.module('PruebaApp.servicios',[]);

app.factory('Funciones', ['$http', '$q',  function($http, $q){


	var self = {

		'URL': 'http://www.omdbapi.com/?',

  		'KEY': '&apikey=f1480960',

		peliculasIndex: function(pos){

    		var peliculasRandom = ['Harry Potter', 'Star Wars', 'Game of Thrones', 'The Walking Dead', 'Avengers', 'Gladiator', 'Deadpool', 'Iron Man'];

    		return peliculasRandom[pos]; //Retornamos el nombre de la película según la posición introducida por parámetro
		},

		validarNombreApellidos: function(valorIntroducido){

   			var resultado = {
   				valido: false,
   				msgError: ""
   			}

			if(/^\s+$/.test(valorIntroducido)){  // Comprobamos que no esté compuesto sólo por espacios en blanco
			     resultado.valido = false;
			     resultado.msgError = "no puede contener sólo espacios en blanco";
			}
			else{

			    if(/^\d+$/.test(valorIntroducido)){ // Comprobamos que no sea un número
			      resultado.valido = false;
			      resultado.msgError = "no puede ser un número";
			    }
			    else{

			        if(/^[a-zA-Z]+$/.test(valorIntroducido)){ // Si está compuesto por letras nada más, le damos el ok.
			          resultado.valido = true;
			          resultado.msgError = "";
			        }
			        else{
			           resultado.valido = false;
			           resultado.msgError = "sólo admite texto";
			        }
			    }
			}

   			return resultado;
		},

		validarCorreo: function(correo){

   			var resultado = {
   				valido: false,
   				msgError: ""
   			}

			var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Definimos una variable con la expresión regular para validar correos

			if (!expr.test(correo)){ //Si el correo introducido no es correcto
			  resultado.valido = false;
			  resultado.msgError = "Introduce un correo valido"; //Se indica al usuario
			}
			else{
			  resultado.valido = true;
			  resultado.msgError = "";
			}

			return resultado;
			
		},


		validarContrasena: function(contrasena){

			var resultado = {
   				valido: false,
   				msgError: ""
   			}

			if(/^\s+$/.test(contrasena)){ // Comprobamos que no esté compuesto sólo por espacios en blanco
			     resultado.valido = false;
			     resultado.msgError = "no puede contener sólo espacios en blanco";
			}
			else{
			    resultado.valido = true;
			    resultado.msgError = "";
			}

			return resultado;
		},


		/* Función para gestionar los favoritos */
		gestionFavorito: function(usuarioLogin, peliculaTitulo, pos){

			var d = $q.defer();
			var datos = {
				ok: true,
				usuario: '',
				tituloPelicula: ''
			}

			for(var i = 0; i<localStorage.length; i++){ //Bucle que recorre todas los favoritos
			    var favObtenido = localStorage.getItem(usuarioLogin.concat(i+1));
			    if(favObtenido === peliculaTitulo){ //Si la pelicula ya se encuentra añadida para ese usuario
			        alert("Ya has añadido la pelicula a favoritos");
			        datos.ok = false;
			        break;
			    }
			}

			if(datos.ok === true){ //Si todo es correcto, creamos el favorito
			    datos.usuario = usuarioLogin;
			    datos.tituloPelicula = peliculaTitulo;
			    d.resolve( datos );
			}

			return d.promise;
		},

		/* Función para crear favorito */
		crearFavorito: function(usuario, peliculaTitulo){

		    var usuarioLocal;
		    var posicion = 1;
		
		    for(var i = 0; i<localStorage.length; i++){
		        usuarioLocal = localStorage.key(i); //Obtenemos todos los favoritos del localStore
		        if(usuarioLocal.substr(0, 4) === usuario.substr(0, 4)){
		            posicion = parseInt(usuarioLocal.substr(usuario.length));  //Obtenemos la última posición de la película según el usuario
		            posicion += 1; //Añadimos una posición mas
		        }
		    }
		
		    localStorage.setItem(usuario.concat(posicion), peliculaTitulo); //Guardamos el favorito en el localStorage
		},

		/* Función para saber el número total de favoritos por ususario */
		numeroFavoritos: function(usuarioUrl){

			var usuario;
			var numero = 0;

			for(var i = 0; i < localStorage.length; i++){ //Recorremos todos los favoritos
			    usuario = localStorage.key(i); //Obtenemos todos los favoritos
			    if(usuario.substr(0, 4) === usuarioUrl.substr(0, 4)){ //Comprobamos todos los favoritos según el usuario
			        numero += 1; //Vamos contando
			    }
			}

			return numero;
		},

		/* Función para obtener los favoritos */
		obtenerFavoritos: function(usuarioUrl){
		
		    var usuario;
		    var contenido = [];
		
		    for(i = 0; i<localStorage.length; i++){ //Recorremmos todos los favoritos
		        usuario = localStorage.key(i);
		        if(usuario.substr(0, 4) === usuarioUrl.substr(0, 4)){
		            contenido.push(unescape(localStorage.getItem(usuario))); //Almacenamos en un array todos los favoritos del usuario
		        }
		    }
		    return contenido;
		},

		/* Función para mostrar los favoritos */
		mostrarFavoritos: function(numeroFavoritos, obtenerFavoritos){
		
			var contenidoPeliculas = [];
			
			for(var i = 0; i < numeroFavoritos; i++){ //Listamos las películas definidas en la funcion peliculasIndex()

				        $http.get(self.URL + 't=' + encodeURI(obtenerFavoritos[i]) + self.KEY)
				            .success(function(datos){
				                contenidoPeliculas.push(datos);
				            });
			}

			return contenidoPeliculas;
		},


		/* Función para eliminar los favoritos */
		eliminarFavorito: function(usuarioUrl, nombrePelicula){
		
		    var favorito;
		    var usuario;
		    var contenido = [];

		    for(var i = 0; i<localStorage.length; i++){ //Recorremmos todos los favoritos
		        usuario = localStorage.key(i);
		        if(usuario.substr(0, 4) === usuarioUrl.substr(0, 4)){
		            contenido.push(unescape(localStorage.key(i))); //Almacenamos en un array todos las claves de favorito del usuario
		        }
		    }

			for(var i = 0; i < contenido.length; i++){
				favorito = localStorage.getItem(contenido[i]);
				
				if(favorito === nombrePelicula){
					localStorage.removeItem(contenido[i]); //Eliminamos el favorito
					window.location.reload(); //Actualizamos la página
				}

			}
		
		},

		/* Función para verificar que la película introducida en el buscador es correcta */
		verificarBusquedaPelicula: function(usuarioUrl, peliculaBuscada){
					
			$http.get(self.URL + 't=' + encodeURI(peliculaBuscada) + self.KEY)
			    .success(function(datos){

			    	if(datos.Response === "False"){
			    		alert("Pelicula incorrecta");
			    		document.formu.buscar.value = '';
			    	}
			    	else{
						window.location = '#/busqueda/' + usuarioUrl + '/' + encodeURI(peliculaBuscada); //Redireccionamos a la página de busqueda
			    	}			    	
			    });
		},

		/* Función que muestra el resultado de cada página */
		mostrarBusqueda: function(pagMostrar, peliculaBuscada){
			
			var resultado = {
				'totalRegistros': 0,
				'contenido': []
			}
		
		    window.scroll(0, 0); //Metodo para volver a la parte superior de la página
			
			$http.get(self.URL + 's=' + encodeURI(peliculaBuscada) + '&page=' + pagMostrar + self.KEY)
			    .success(function(datos){

			        resultado.totalRegistros = datos.totalResults;
			        resultado.contenido = datos.Search;

			    });

			return resultado;
		}


	}

	return self;

}])