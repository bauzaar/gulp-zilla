var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('markup', function () {
    return $.gulp.src(config.html['src'])
        .pipe($.gulp_if(!process.prod, $.livereload()))
});