'use strict';

var gulp = require('gulp');
var path = require('path');
var server = require('gulp-express');
var plumber = require('gulp-plumber');
var ts = require('gulp-typescript');

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
 */
function exec_typescript(cb) {
    var source = [path.normalize(paths.source + '**/*.ts'), path.normalize('!' + paths.source + 'typing/**/*.ts')];
    var options = {
        declaration: false,
        failOnTypeErrors: false,
        module: "commonjs",
        removeComments: true,
        sourceMap: false,
        target: "es5"
    };

    gulp.src(source)
        .pipe(plumber())
        .pipe(ts(options))
        .pipe(gulp.dest(paths.destination));

    if (cb && typeof cb === 'function') cb();
}

/**
 * @summary Executes server.
 */
function exec_server() {
    // Start the server at the beginning of the task.
    server.run(['dist/app.js']);

    // Restart the server when file changes
    gulp.watch(['src/**/*.ts', '!src/typing/**/*.ts'], exec_typescript);
    gulp.watch(['src/**/*.json', 'src/**/*.scss', 'src/**/*.jade'], exec_copy);

    gulp.watch(['dist/**/*.json', 'dist/**/*.scss', 'dist/**/*.jade', 'dist/**/*.js'], server.run);
}

gulp.task('copy', exec_copy);
gulp.task('server', exec_server);
gulp.task('typescript', exec_typescript);

gulp.task('default', ['typescript', 'copy']);
