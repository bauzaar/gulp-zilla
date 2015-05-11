var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('target:dev', function () {
    process.prod = false;
});

$.gulp.task('target:prod', function () {
    process.prod = true;
});