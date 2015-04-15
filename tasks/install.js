var config = require('../lib/config'),
    $ = config.plugins;

$.gulp.task('install:modules', function () {
    return $.gulp.src(config.install['src'])
        .pipe($.install());
});