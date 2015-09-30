var config = require('../../lib/config'),
    $ = config.plugins;


$.gulp.task('install:dependecies', function () {
    return $.gulp.src(config.install.src)
        .pipe($.install());
});
