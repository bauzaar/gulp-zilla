var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('browserify:dev', function () {

    return $.browserify({entries: [config.browserify.src], debug: true})
        .bundle()
        .on('error', config.lib['errors'])
        .pipe($.source(config.browserify['output_name']))
        .pipe($.gulp.dest(config.browserify['dest']))
        .pipe($.streamify($.size({showFiles: true})))
        .pipe($.livereload());
});

$.gulp.task('browserify:prod', function () {

    return $.browserify({entries: [config.browserify['src']], debug: false})
        .bundle()
        .on('error', config.lib['errors'])
        .pipe($.source(config.browserify['output_name']))
        .pipe($.gulp.dest(config.browserify['dest']))
        .pipe($.streamify($.size({showFiles: true})));
});