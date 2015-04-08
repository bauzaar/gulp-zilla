var config = require('./_config'),
    $ = config.plugins;

$.gulp.task('_dev:debug', ['clean:css', 'clean:js'], function () {
    $.run_sequence(['sass:dev', 'browserify:dev']);
});

$.gulp.task('_dev', ['clean:css', 'clean:js'], function () {
    $.run_sequence(['sass:prod', 'browserify:prod']);
});

$.gulp.task('_prod', ['clean:css', 'clean:js'], function () {
    $.run_sequence(['sass:prod', 'browserify:prod'], 'postcss', ['minify', 'uglify']);
});

$.gulp.task('_vendor', ['clean:vendor_install', 'clean:vendor_dist'], function () {
    $.run('bower-installer').exec(function () {
        $.run_sequence(['bower:js', 'bower:css', 'bower:fonts', 'bower:images']);
    });
});