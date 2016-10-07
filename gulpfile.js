var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var wiredep = require('wiredep').stream;
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var notify = require('gulp-notify');
var newer = require('gulp-newer');
var ngAnnotate = require('gulp-ng-annotate');
var sftp = require('gulp-sftp');
var del = require('del');
var htmlmin = require('gulp-htmlmin');


gulp.task('clean', function () {
    var stream = gulp.src('dist/*', {read: false})
        .pipe(clean());
    return stream;
});


gulp.task('bower-files', function () {
    var stream = gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: 'bower_components'
        }))
        .pipe(useref())
        .pipe(gulpif('*.js', ngAnnotate()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.js', gulp.dest('./dist')));
    return stream;
});

gulp.task('bower-files-dev', function () {
    var stream = gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: 'bower_components'
        }))
        .pipe(useref())
        .pipe(gulpif('*.js', gulp.dest('./dist')));
    return stream;
});

gulp.task('css-files', function () {
    var stream = gulp.src('./app/index.html')
        .pipe(useref())
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif('*.css', gulp.dest('./dist')));
    return stream;
});

gulp.task('copy-html-files', function () {
    var stream =  gulp.src('./app/views/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/views/'));
    return stream;
});

gulp.task('image', function () {
    var stream =  gulp.src('./app/img/*.*')
    .pipe(gulp.dest('./dist/img'));
    return stream;

});

gulp.task('font', function () {
    var stream =  gulp.src('./app/font/**/*.*')
    .pipe(gulp.dest('./dist/font/'));
    return stream;
});

gulp.task('initialize', function () {
    var stream =  gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: 'bower_components'
        }))
        .pipe(useref())
        .pipe(gulp.dest('./dist'));
    return stream;
});

gulp.task('dev', function (callback) {
    runSequence(
        'initialize',
        'css-files',
        'bower-files-dev',
        'copy-html-files',
        'image',
        'font',
        'watch',
    callback);
});

gulp.task('prod', function(callback){
    runSequence(
        'initialize',
        'bower-files',
        'css-files',
        'copy-html-files',
        'image',
        'font',
        callback
    );
});

gulp.task('watch', function() {
    gulp.watch('./app/**/**/*.*', function () {
        runSequence('bower-files-dev', 'copy-html-files');
    });
});


gulp.task('default', function () {
    runSequence('clean', 'dev');
});
