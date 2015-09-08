var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('sass:build', function () {
    return $.gulp.src(config.sass.src['app'])
        .pipe($.changed(config.sass['dest']))
        .pipe($.gulp_if(!process.prod, $.sourcemaps.init()))
        .pipe($.globbing({extensions: ['.scss', '.sass']}))
        .pipe($.sass(config.sass['settings']))
        .on('error', config.lib['errors'])
        .pipe($.rename({basename: config.sass.dist_name['app']}))
        .pipe($.autoprefixer(config.sass['autoprefixer']))
        .pipe($.gulp_if(!process.prod, $.sourcemaps.write({includeContent: true})))
        .pipe($.streamify($.gulp_if(process.prod, $.minify())))
        .pipe($.gulp.dest(config.sass['dest']))
        .pipe($.gulp_if(!process.prod, $.browser_sync.reload({stream: true})))
        .pipe($.size({showFiles: true}))
        .pipe($.gulp_if(!process.prod, $.livereload()));
});


$.gulp.task('sass:gui', function () {
    return $.gulp.src(config.sass.src['gui'])
        .pipe($.changed(config.sass['dest']))
        .pipe($.gulp_if(!process.prod, $.sourcemaps.init()))
        .pipe($.globbing({extensions: ['.scss', '.sass']}))
        .pipe($.sass(config.sass['settings']))
        .on('error', config.lib['errors'])
        .pipe($.rename({basename: config.sass.dist_name['gui']}))
        .pipe($.autoprefixer(config.sass['autoprefixer']))
        .pipe($.gulp_if(!process.prod, $.sourcemaps.write({includeContent: true})))
        .pipe($.streamify($.gulp_if(process.prod, $.minify())))
        .pipe($.gulp.dest(config.sass['dest']))
        .pipe($.gulp_if(!process.prod, $.browser_sync.reload({stream: true})))
        .pipe($.size({showFiles: true}))
        .pipe($.gulp_if(!process.prod, $.livereload()));
});


$.gulp.task('sass:mail', function () {
    return $.gulp.src(config.mail.styles['sass'])
        .pipe($.changed(config.mail.styles['dest']))
        .pipe($.globbing({extensions: ['.scss', '.sass']}))
        .pipe($.sass(config.sass['settings']))
        .on('error', config.lib['errors'])
        .pipe($.gulp.dest(config.mail.styles['dest']))
        .pipe($.gulp_if(!process.prod, $.browser_sync.reload({stream: true})))
        .pipe($.size({showFiles: true}))
        .pipe($.gulp_if(!process.prod, $.livereload()));
});