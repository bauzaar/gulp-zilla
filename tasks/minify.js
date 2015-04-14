var config = require('../config'),
    $ = config.plugins;

$.gulp.task('minify', function () {
    return $.gulp.src(config.prod['css'])
        .pipe($.minify({keepBreaks: false}))
        .pipe($.gulp.dest(config.prod['dest']))
        .on('error', config.lib['errors'])
        .pipe($.size({showFiles: true}))
});