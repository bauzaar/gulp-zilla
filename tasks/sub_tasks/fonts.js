var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('fonts:build', function () {
    $.gulp.src(config.fonts['src']+ '**/*.{ttf,eot,svg,woff,woff2}')
        .pipe($.gulp.dest(config.fonts['dest']));
});