var config = require('../lib/config'),
    $ = config.plugins;

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

$.gulp.task('build',['clean:styles', 'clean:scripts'], function () {
    process.prod = !!$.argv.prod;
    $.run_sequence(['styles', 'scripts', 'fonts']);
});

$.gulp.task('watch', function () {
    $.gulp.watch(config.watch['styles'], ['clean:styles', 'styles']);
    $.gulp.watch(config.watch['scripts'], ['clean:scripts', 'scripts']);
    $.gulp.watch(config.watch['markup'], ['markup']);
    $.gulp.watch(config.watch['bower'], ['vendor']);
});