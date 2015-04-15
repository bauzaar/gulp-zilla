var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('images', function () {
    $.gulp.src(config.images['src'] + '*.{gif,jpg,png,svg}')
        .pipe($.gulp.dest(config.images['dest']))
        .pipe($.size({showFiles: true}));
});