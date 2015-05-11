var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('styles', function () {
    return $.gulp.src(config.sass['src'])
        .pipe($.changed(config.sass['dest']))
        .pipe($.gulp_if(!process.prod, $.sourcemaps.init()))
        .pipe($.globbing({extensions: ['.scss', '.sass']}))
        .pipe($.sass(config.sass['settings']))
        .on('error', config.lib['errors'])
        .pipe($.rename({basename: config.sass['output_name']}))
        .pipe($.gulp_if(!process.prod, $.sourcemaps.write({includeContent: true})))
        .pipe($.gulp.dest(config.sass['dest']))
        .pipe($.gulp_if(!process.prod, $.browser_sync.reload({stream: true})))
        .pipe($.size({showFiles: true}))
        .pipe($.gulp_if(!process.prod, $.livereload()));
});