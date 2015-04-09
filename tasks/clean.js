var config = require('./_config'),
    $ = config.plugins;

$.gulp.task('clean:dist', function (callback) {
    $.del(config.clean.dist, callback)
});

$.gulp.task('clean:css', function (callback) {
    $.del(config.clean.css, callback)
});

$.gulp.task('clean:js', function (callback) {
    $.del(config.clean.js, callback)
});

$.gulp.task('clean:vendor_dist', function (callback) {
    $.del(config.clean.vendor_dist, callback)
});

$.gulp.task('clean:vendor_install', function (callback) {
    $.del([config.clean.vendor_install], callback)
});

$.gulp.task('clean:all', function (callback) {
    $.run_sequence(['clean:dist','clean:vendor_install'], callback);
});