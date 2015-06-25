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

$.gulp.task('prod', ['clean:styles', 'clean:scripts'], function () {
    process.prod = true;
    $.run_sequence('vendor', ['sass:build', 'js:build', 'fonts:build']);
});

$.gulp.task('serve', function () {
    $.gulp.watch(config.serve['styles'], { interval: 900 }, ['clean:styles', 'sass:build']);
    $.gulp.watch(config.serve['scripts'], { interval: 900 },  ['clean:scripts', 'js:build']);
    $.gulp.watch(config.serve['markup'], { interval: 900 },  ['html:serve']);
    $.gulp.watch(config.serve['bower'], { interval: 900 },  ['vendor']);
});