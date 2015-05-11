var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('target_dev', function () {
    process.dev = true;
    process.prod = false;
});

$.gulp.task('target_prod', function () {
    process.dev = false;
    process.prod = true;
});