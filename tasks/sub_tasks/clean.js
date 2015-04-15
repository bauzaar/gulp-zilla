var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('clean:dist', function () {
    $.del(config.clean.dist)
});

$.gulp.task('clean:css', function () {
    $.del(config.clean.css)
});

$.gulp.task('clean:js', function () {
    $.del(config.clean.js)
});

$.gulp.task('clean:vendor_dist', function () {
    $.del(config.clean.vendor_dist)
});

$.gulp.task('clean:vendor_install', function () {
    $.del([config.clean.vendor_install])
});

$.gulp.task('clean:all', function () {
    $.run_sequence(['clean:dist','clean:vendor_install']);
});