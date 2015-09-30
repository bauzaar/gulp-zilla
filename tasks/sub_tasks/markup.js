var config = require('../../lib/config'),
    $ = config.plugins;


$.gulp.task('html:serve', function () {
    return $.gulp.src(config.html.src)
        .pipe($.gulp_if(!process.prod, $.livereload()));
});
