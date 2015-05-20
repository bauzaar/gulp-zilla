var config = require('../lib/config'),
    $ = config.plugins;

$.gulp.task('ls', $.task_listing);

$.gulp.task('install', function () {
    $.run('npm cache clean').exec(function () {
        $.run_sequence('install:dependecies');
    });
});

$.gulp.task('vendor', ['clean:vendor_install', 'clean:vendor_dist'], function () {
    $.run('bower-installer').exec(function () {
        $.run_sequence(['bower:scripts', 'bower:styles', 'bower:fonts', 'bower:images']);
    });
});

$.gulp.task('dev', ['clean:styles', 'clean:scripts'], function () {
    process.prod = false;
    $.run_sequence(['styles:build', 'scripts:build', 'fonts:build']);
});

$.gulp.task('prod', ['clean:styles', 'clean:scripts'], function () {
    process.prod = true;
    $.run_sequence(['styles:build', 'scripts:build', 'fonts:build']);
});

$.gulp.task('watch', function () {
    $.gulp.watch(config.watch['styles'], ['clean:styles', 'styles:build']);
    $.gulp.watch(config.watch['scripts'], ['clean:scripts', 'scripts:build']);
    $.gulp.watch(config.watch['markup'], ['markup:watch']);
    $.gulp.watch(config.watch['bower'], ['vendor']);
});