var config = require('./_config'),
    $ = config.plugins;

$.gulp.task('bower:css', function () {

    var css_filter = $.filter(function (file) {
        return file.path.match(/\.css$/i);
    });

    return $.gulp.src(config.bower.src + '/**/**.css')
        .pipe(css_filter)
        .pipe($.order([
            'boostrap/bootstrap.css',
            'fuelux/fuelux.css',
            'font-awesome/font-awesome.css',
            '**/*.css'
        ]))
        .pipe($.concat(config.bower.output_name + '.css'))
        .pipe($.minify())
        .pipe($.gulp.dest(config.bower.dest + '/css'))
        .on('error', config.modules.errors)
        .pipe($.size({showFiles: true}));
});

$.gulp.task('bower:js', function () {

    var js_filter = $.filter(function (file) {
        return file.path.match(/\.js$/i);
    });

    return $.gulp.src(config.bower.src + '/**/**.js')
        .pipe(js_filter)
        .pipe($.order([
            'jquery/*.js',
            'modernizr/*.js',
            'bootstrap/*.js',
            'fuelux/*.js',
            'history.js/*.js',
            'owl.carousel/*.js',
            '**/*.js'
        ]))
        .pipe($.concat(config.bower.output_name + '.js'))
        .pipe($.uglify())
        .pipe($.gulp.dest(config.bower.dest + '/js'))
        .on('error', config.modules.errors)
        .pipe($.size({showFiles: true}))
        .pipe(js_filter.restore());
});

$.gulp.task('bower:fonts', function () {
    return $.gulp.src([
        config.bower.src + 'bootstrap/**.ttf',
        config.bower.src + 'bootstrap/**.eot',
        config.bower.src + 'bootstrap/**.svg',
        config.bower.src + 'bootstrap/**.woff',
        config.bower.src + 'bootstrap/**.woff2',
        config.bower.src + 'font-awesome/**.ttf',
        config.bower.src + 'font-awesome/**.eot',
        config.bower.src + 'font-awesome/**.svg',
        config.bower.src + 'font-awesome/**.woff',
        config.bower.src + 'font-awesome/**.woff2',
        config.bower.src + 'fuelux/**.ttf',
        config.bower.src + 'fuelux/**.eot',
        config.bower.src + 'fuelux/**.svg',
        config.bower.src + 'fuelux/**.woff',
        config.bower.src + 'fuelux/**.woff2'
    ])
        .pipe($.gulp.dest(config.bower.dest + '/fonts'))
        .on('error', config.modules.errors)
        .pipe($.size({showFiles: true}))
});