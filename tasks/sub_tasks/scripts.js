var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('scripts', function () {
    return $.browserify({entries: [config.browserify['src']], debug: !process.prod})
        .bundle()
        .on('error', config.lib['errors'])
        .pipe($.source(config.browserify['output_name']))
        .pipe($.streamify($.gulp_if(process.prod, $.uglify())))
        .pipe($.gulp.dest(config.browserify['dest']))
        .pipe($.streamify($.size({showFiles: true})))
        .pipe($.gulp_if(!process.prod, $.livereload()))
});