var config = require('../config'),
    $ = config.plugins;

$.gulp.task('uglify', function () {
    return $.gulp.src(config.prod['js'])
        .pipe($.uglify())
        .pipe($.gulp.dest(config.prod['dest']))
        .on('error', config.lib['errors'])
        .pipe($.size({showFiles: true}))
});