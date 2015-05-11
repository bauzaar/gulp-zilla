var config = require('../lib/config'),
    $ = config.plugins;

$.gulp.task('install', function () {
    $.run('npm cache clean').exec(function () {
        $.run_sequence('install:dependecies');
    });
});

$.gulp.task('vendor', ['clean:vendor_install', 'clean:vendor_dist'], function () {
    $.run('bower-installer').exec(function () {
        $.run_sequence(['bower:js', 'bower:css', 'bower:fonts', 'bower:images']);
    });
});

$.gulp.task('dev', ['clean:css', 'clean:js'], function () {
    $.run_sequence('target:dev', ['styles', 'scripts', 'fonts']);
});

$.gulp.task('prod', ['clean:all'], function () {
    $.run_sequence('target:prod', 'vendor', ['styles', 'scripts', 'fonts'], 'postcss');
});

$.gulp.task('watch', function () {
    $.gulp.watch(config.watch['styles'], ['clean:css', 'styles']);
    $.gulp.watch(config.watch['scripts'], ['clean:js', 'scripts']);
    $.gulp.watch(config.watch['markup'], ['markup']);
    $.gulp.watch(config.watch['bower'], ['vendor']);
});