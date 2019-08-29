"use strict";

const gulp					= require('gulp'),
			sass					= require('gulp-sass'),
			browserSync		= require('browser-sync').create(),
			concat				= require('gulp-concat'),
			uglify				= require('gulp-uglify'),
			autoprefixer	= require('gulp-autoprefixer'),
			cleanCSS			= require('gulp-clean-css'),
			del						= require('del'),
			imagemin			= require('gulp-imagemin'),
			pug						= require('gulp-pug');

const cssFiles			= [
	'./dev/scss/slick.css',
	'./dev/scss/slick-theme.css',
	'./dev/scss/jquery.modal.min.css',
	'./dev/scss/normalize.css',
	'./dev/scss/main.scss'
]


// html
function views() {
	return gulp.src('./dev/pug/*.pug')
		.pipe(pug({
			pretty:true
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());
}

// styles
function styles() {
	return gulp.src(cssFiles)
		.pipe(sass())
		.pipe(concat('style.css'))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
}


// fonts
function fonts() {
	return gulp.src('./dev/fonts/**/*')
		.pipe(gulp.dest('./dist/fonts'))
		.pipe(browserSync.stream());
}


// js
function scripts() {
	return gulp.src('./dev/js/*.js')
		.pipe(uglify({
			toplevel: true
		}))
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.stream());
}


// minify images
function images() {
	return gulp.src('./dev/images/*')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest('./dist/images'))
		.pipe(browserSync.stream());
};


// clean previos file
function clean() {
	return del(['./dist/*'])
}


// watch changes
function watch() {
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	});
	gulp.watch('dev/scss/**/*.scss', styles);
	gulp.watch('dev/scss/**/*.css', styles);
	gulp.watch('dev/fonts/**/*', fonts);
	gulp.watch('dev/js/**/*.js', scripts);
	gulp.watch('dev/pug/**/*.pug', views);
	gulp.watch('index.html').on('change', browserSync.reload);
}


//Task for pug
gulp.task('views', views);
//Task for styles
gulp.task('styles', styles);
//Task for scripts
gulp.task('scripts', scripts);
//Task for images
gulp.task('images', images);
//Clear build
gulp.task('del', clean);
//Task for watch changes
gulp.task('watch', watch);
//Clear build and opt styles, scripts, images
gulp.task('build', gulp.series(clean, gulp.parallel(styles,fonts,scripts,images,views)));
//Start build and watch
gulp.task('dev', gulp.series('build','watch'));