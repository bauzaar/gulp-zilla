var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('target_dev', function () {
    process.prod = false;
});

$.gulp.task('target_prod', function () {
    process.prod = true;
});