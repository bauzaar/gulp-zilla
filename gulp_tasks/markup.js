var config = require('./_config'),
    $ = config.plugins;

$.gulp.task('markup:dev', function () {
    return $.gulp.src(config.markup.src)
        .pipe($.livereload());
});