'use strict';

var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

var paths = {
    destination: path.join(__dirname, 'dist/'),
    source: path.join(__dirname, 'src/')
};

/**
 * @summary Copies files.
 */
function exec_copy() {
    var source = [path.normalize(paths.source + '**/*.json'), path.normalize(paths.source + '**/*.jade'), path.normalize(paths.source + '**/*.scss')];
    var destination = path.normalize(paths.destination);

    gulp.src(source).pipe(gulp.dest(destination));
}

/**
 * @summary Compiles TypeScript files to JavaScript files.
 * @param {Function} cb The callback.
 */
function exec_typescript(cb) {
    var source = [path.normalize(paths.source + '**/*.ts'), path.normalize('!' + paths.source + 'typing/**/*.ts')];
    var options = {
        declaration: false,
        failOnTypeErrors: false,
        module: "commonjs",
        removeComments: true,
        sourceMap: false,
        target: "es6"
    };

    gulp.src(source)
        .pipe(plumber())
        .pipe(ts(options))
        .pipe(gulp.dest(paths.destination));

    if (cb && typeof cb === 'function') cb();
}

/**
 * @summary Watches files.
 */
function watch() {
    gulp.watch(['src/**/*.ts', '!src/typing/**/*.ts'], exec_typescript);
    gulp.watch(['src/**/*.json', 'src/**/*.scss', 'src/**/*.jade'], exec_copy);
}

/**
 * @summary Checks the code quality.
 * @param {Function} cb The callback.
 */
function exec_tslint(cb) {
    var source = [path.normalize(paths.source + '**/*.ts'), path.normalize('!' + paths.source + 'typing/**/*.ts')];
    gulp.src(source)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));

    if (cb && typeof cb === 'function') cb();
}

gulp.task('copy', exec_copy);
gulp.task('tslint', exec_tslint);
gulp.task('typescript', exec_typescript);
gulp.task('watch', watch);

gulp.task('default', ['typescript', 'copy']);
