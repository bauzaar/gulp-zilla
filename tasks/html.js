var config = require('../config'),
    $ = config.plugins;

$.gulp.task('html:dev', function () {
    return $.gulp.src(config.html['src'])
        .pipe($.livereload());
});