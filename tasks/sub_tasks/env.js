var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('mode:dev', function () {
    process.prod = false;
});

$.gulp.task('mode:prod', function () {
    process.prod = true;
});