var config = require('../../lib/config'),
    $ = config.plugins;

gulp.task('fonts', function () {
    gulp.src(config.fonts['src']+ '**/*.{ttf,eot,svg,woff,woff2}')
        .pipe(gulp.dest(config.fonts['dest']));
});