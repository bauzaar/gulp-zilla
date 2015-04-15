var config = require('../lib/config'),
    $ = config.plugins;

$.gulp.task('dev', ['clean:css', 'clean:js'], function () {
    $.run_sequence(['sass:dev', 'browserify:dev']);
});

$.gulp.task('prod', ['clean:css', 'clean:js'], function () {
    $.run_sequence(['sass:prod', 'browserify:prod'], 'postcss', ['minify', 'uglify']);
});

$.gulp.task('vendor', ['clean:vendor_install', 'clean:vendor_dist'], function () {
    $.run('bower-installer').exec(function () {
        $.run_sequence(['bower:js', 'bower:css', 'bower:fonts', 'bower:images']);
    });
});

$.gulp.task('install', function () {
    $.run('npm cache clean').exec(function () {
        $.run_sequence('install:npm_and_bower');
    });
});