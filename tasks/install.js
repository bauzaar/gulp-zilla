var config = require('../config'),
    $ = config.plugins;

$.gulp.task('install', function () {
    return $.gulp.src(config.install['src'])
        .pipe($.install());
});