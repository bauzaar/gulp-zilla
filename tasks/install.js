var config = require('../lib/config'),
    $ = config.plugins;

$.gulp.task('install:npm_and_bower', function () {
    return $.gulp.src(config.install['src'])
        .pipe($.install());
});