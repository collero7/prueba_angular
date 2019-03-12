# Prueba Técnica

La prueba consiste en la obtención de datos de un API REST para visualizar información sobre películas. Dicha prueba se consolida en una página web realizada en AngularJS, la cual es necesario la autentificación del usuario. 
Por otra parte la página está desarrollada en ES6 por lo que se ha realizado el traspilado de los ficheros .js a ES5. Estos se encuetran en la ruta .\js\build_ES5.

## Comenzando 🚀

_Estas instrucciones permiten obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de pruebas._


### Pre-requisitos 📋

_Es necesaria la instalación de un servidor web, como por ejemplo XAMPP_


### Instalación 🔧

_Para tener un entorno de desarrollo en ejecución debemos seguir los siguientes pasos_

+ Tener una instalación de XAMPP
+ Un navegador web
+ Conexión a internet

_Se deben dejar todos los ficheros de la prueba en una carpeta dentro del directorio web del servidor. Posterior a esto debemos abrir el navegador
y dirigirnos a la URL donde está alojado dicho proyecto y navegar hasta la página index.html_

_Directorio web: C:\xampp\htdocs\practica_angular_

_URL del navegador: localhost/practica_angular_

## Despliegue 📦

+ Página index.html

_Está página está compuesta por un formulario de acceso con dos botones, uno para acceder y otro para registrarnos_

+ Página html\index.html

_Está es la página principal del proyecto, en está página se muestra el contenido de las películas. Está compuesta por un menú superior el cual tiene tres 
botones: "Inicio", "Mis favoritos" y "Salir". Por otra parte esta página se compone de un buscador de películas el cual nos mostrará el resultado en 
la página html\busqueda.html. Esta página es dinámica por los que se incluye fragmentos de otros documentos .html para su construcción_

+ Página html\home.html

_Fragmento que se incluye en la página html\index.html. Esta página muestra el cuerpo de html\index.html_

+ Página html\menu.html

_Fragmento que se incluye en la página html\index.html. Esta página muestra el menú de opciones en html\index.html_

+ Página html\registro.html

_Está página está compuesta por un formulario de registro, el cual debemos completar antes de hacer login en index.html_

+ Página html\busqueda.html

_Está página nos muestra el resultado de la búsqueda de películas. Nos muestra información de cada película así como la opción de añadirla a favoritos. Podemos
pasar de página para con los botones inferiores de "Siguiente" y "Anterior"_

+ Página html\detalle.html

_Nos muestra información detallada de cada película, ademas tenemos la posibilidad de añadirla a favoritos.

+ Página html\favoritos.html	

_Esta página muestra una lista de todas las películas que hemos añadido a favoritos.

## Herramientas 🛠️

_Para el desarrollo de esta prueba se ha utilizado las siguientes herramientas_

* Sublime Text 3- Editor de texto y código fuente
* Chrome - Navegador web


## Autor ✒️

* **Cristopher Ollero Ortiz**



