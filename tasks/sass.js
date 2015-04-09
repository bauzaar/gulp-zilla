var config = require('./_config'),
    $ = config.plugins;

$.gulp.task('sass:dev', function () {

    return $.gulp.src(config.sass.src)
        .pipe($.changed(config.sass.dest))
        .pipe($.sourcemaps.init())
        .pipe($.sass(config.sass.settings))
        .on('error', config.modules.errors)
        .pipe($.rename({basename: config.sass.output_name}))
        .pipe($.sourcemaps.write({includeContent: true}))
        .pipe($.gulp.dest(config.sass.dest))
        .pipe($.browser_sync.reload({stream: true}))
        .pipe($.size({showFiles: true}))
        .pipe($.livereload());
});

$.gulp.task('sass:prod', function () {

    return $.gulp.src(config.sass.src)
        .pipe($.changed(config.sass.dest))
        .pipe($.sass(config.sass.settings))
        .on('error', config.modules.errors)
        .pipe($.rename({basename: config.sass.output_name}))
        .pipe($.gulp.dest(config.sass.dest))
        .pipe($.streamify($.size({showFiles: true})));
});
