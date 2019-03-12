'use strict';
/*
* Dependencias
*/
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const pug = require('gulp-pug');



/*
* Configuración de la tarea para traspilar código a 'es5'
*/
gulp.task('es5', function (done) {
  gulp.src('practica_angular/js/*.js')
  .pipe(babel({
            presets: ['env']
        }))
  .pipe(concat('union.js'))
  .pipe(uglify())
  .pipe(gulp.dest('practica_angular/js/build_ES5/'))
  done();
});



/*
* Configuración de la tarea para traspilar código de 'scss' a 'css'
*/
gulp.task('sass', function () {
  return gulp.src('practica_angular/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('practica_angular/css/css'));
});



/*
* Configuración de la tarea para traspilar código de 'pug' a 'html'
*/
gulp.task('pug', function () {
	gulp.src('./practica_angular/html/*.pug')
    .pipe(pug({
		pretty: true
	}))
    .pipe(gulp.dest('practica_angular/html'));
});



//Tarea que se ejecuta cuando los ficheros sufren algún cambio
gulp.task('watch', function(){
	gulp.watch('practica_angular/scss/*', ['sass']);
	gulp.watch('practica_angular/js/*', ['es5']);
	gulp.watch('practica_angular/html/**/*.pug', ['pug']);
});



//Tarea por defecto que ejecuta las anteriores tareas
gulp.task('default', ['es5', 'watch', 'sass', 'pug']);
