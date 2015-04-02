var config = require('./_config'),
    $ = config.plugins;

$.gulp.task('images', function () {
    $.gulp.src(config.images.src + '*.{gif,jpg,png,svg}')
        .pipe($.gulp.dest(config.images.dest));
});