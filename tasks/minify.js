var config = require('./_config'),
    $ = config.plugins;

$.gulp.task('minify', function () {
    return $.gulp.src(config.prod.css)
        .pipe($.minify({keepBreaks: false}))
        .pipe($.gulp.dest(config.prod.dest + '/css'))
        .on('error', config.modules.errors)
        .pipe($.size({showFiles: true}))
});