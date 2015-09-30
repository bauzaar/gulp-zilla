var config = require('../../lib/config'),
    $ = config.plugins;


$.gulp.task('clean:dist', function () {
    $.del(config.clean.dist);
});


$.gulp.task('clean:app', function () {
    $.del(config.clean.sass.app);
});


$.gulp.task('clean:gui', function () {
    $.del(config.clean.sass.gui);
});


$.gulp.task('clean:scripts', function () {
    $.del(config.clean.js);
});


$.gulp.task('clean:vendor_dist', function () {
    $.del(config.clean.vendor_dist);
});


$.gulp.task('clean:vendor_install', function () {
    $.del(config.clean.vendor_install);
});


$.gulp.task('clean:mail_templates', function () {
    $.del(config.clean.mail_templates);
});


$.gulp.task('clean:mail_styles', function () {
    $.del(config.clean.mail_styles);
});


$.gulp.task('clean:all', function () {
    $.run_sequence(['clean:dist','clean:vendor_install']);
});


$.gulp.task('clean:libs_3rd', function() {
    $.del(config.clean.libs_3rd);
});
