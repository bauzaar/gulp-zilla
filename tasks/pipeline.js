var config = require('../lib/config'),
    $ = config.plugins;

$.gulp.task('dev', ['clean:css', 'clean:js'], function () {
    $.run_sequence('target_dev', ['styles', 'scripts', 'fonts']);
});

$.gulp.task('prod', ['clean:css', 'clean:js'], function () {
    $.run_sequence('target_prod', ['styles', 'scripts', 'fonts'], 'postcss');
});

$.gulp.task('vendor', ['clean:vendor_install', 'clean:vendor_dist'], function () {
    $.run('bower-installer').exec(function () {
        $.run_sequence(['bower:js', 'bower:css', 'bower:fonts', 'bower:images']);
    });
});

$.gulp.task('install', function () {
    $.run('npm cache clean').exec(function () {
        $.run_sequence('install:dependecies');
    });
});

$.gulp.task('watch', function () {
    $.gulp.watch(config.watch['styles'], ['clean:css', 'sass:dev']);
    $.gulp.watch(config.watch['scripts'], ['clean:js', 'browserify:dev']);
    $.gulp.watch(config.watch['markup'], ['markup']);
    $.gulp.watch(config.watch['bower'], ['vendor']);
});