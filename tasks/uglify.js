var config = require('./_config'),
    $ = config.plugins;

$.gulp.task('uglify', function () {
    return $.gulp.src(config.prod.js)
        .pipe($.uglify())
        .pipe($.gulp.dest(config.prod.dest + '/js'))
        .on('error', config.modules.errors)
        .pipe($.size({showFiles: true}))
});