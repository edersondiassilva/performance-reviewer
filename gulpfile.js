var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    useref = require('gulp-useref'),
    del = require('del'),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver')
    protractor = require('gulp-angular-protractor'),
    KarmaServer = require('karma').Server;

var BUILD_DIST = 'dist';
var runDistStream;

gulp.task('useref', ['sass', 'fonts:copy'], function(){
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest(BUILD_DIST));
});

gulp.task('sass', function(){
    return gulp.src('assets/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('css:clean', function(){
    return del.sync('assets/css');
});

gulp.task('html:copy', function(){
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest(BUILD_DIST + '/app'));
});

gulp.task('fonts:copy', function(){
    return gulp.src('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.*')
        .pipe(gulp.dest(BUILD_DIST + '/assets/css'));
});

gulp.task('img:copy', function(){
    return gulp.src('assets/img/**/*')
        .pipe(gulp.dest(BUILD_DIST + '/assets/img'));
});

gulp.task('clean', ['css:clean'], function(){
    return del.sync(BUILD_DIST);
});

gulp.task('copy', ['clean', 'html:copy', 'img:copy']);

gulp.task('build', ['copy', 'useref']);

gulp.task('sass:watch', function(){
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
});

gulp.task('run', ['sass'], function(){
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('run:dist', ['build'], function(){
    runDistStream = gulp.src(BUILD_DIST)
        .pipe(webserver({
            livereload: false,
            directoryListing: false,
            open: false,
            fallback: 'index.html',
            port: 8765
        }));
});

gulp.task('test:unit', function(done){
    new KarmaServer({
        configFile: __dirname + '/tests/config/karma.conf.js',
        basePath: __dirname,
        singleRun: true
    }, done).start();
});

gulp.task('test:e2e', ['run:dist'], function(callback){
    gulp
        .src(["tests/e2e/**/*.spec.js"])
        .pipe(protractor({
            configFile: 'tests/config/protractor.conf.js',
            debug: true,
            autoStartStopServer: true
        }))
        .on('error', function(e){
            console.log(e);
        })
        .on('end', function(){
            callback.apply(this, arguments);
            runDistStream.emit("kill");
        });
});

gulp.task('test', ['test:unit', 'test:e2e']);
