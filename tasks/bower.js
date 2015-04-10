var config = require('./_config'),
    $ = config.plugins;

$.gulp.task('bower:css', function () {

    var css_filter = $.filter(function (file) {
        return file.path.match(/\.css$/i);
    });

    return $.gulp.src(config.bower.src + '/**/**.css')
        .pipe(css_filter)
        .pipe($.order(config.bower['vendor_order']))
        .pipe($.concat(config.bower.output_name + '.css'))
        .pipe($.minify())
        .pipe($.replace(/([^'"(]*fonts\/|font\/|images\/|img\/)/g, './'))
        .pipe($.gulp.dest(config.bower.dest))
        .on('error', config.modules.errors)
        .pipe($.size({showFiles: true}));
});

$.gulp.task('bower:js', function () {

    var js_filter = $.filter(function (file) {
        return file.path.match(/\.js$/i);
    });

    return $.gulp.src(config.bower.src + '/**/**.js')
        .pipe(js_filter)
        .pipe($.order(config.bower['vendor_order']))
        .pipe($.concat(config.bower.output_name + '.js'))
        .pipe($.uglify())
        .pipe($.gulp.dest(config.bower.dest))
        .on('error', config.modules.errors)
        .pipe($.size({showFiles: true}))
        .pipe(js_filter.restore());
});

$.gulp.task('bower:images', function () {

    var images_filter = $.filter(function (file) {
        return file.path.match(/\.gif|png|jpg|jpeg|cur$/i);
    });

    var vendor_images = config.bower['vendor_images'];
    var image_stack = [];

    for (i = 0; i < vendor_images.length; i++) {
        image_stack.push(config.bower.src + vendor_images[i] + '/**.{gif,png,jpg,jpeg,cur}');
    }

    return $.gulp.src(image_stack)
        .pipe(images_filter)
        .pipe($.gulp.dest(config.bower.dest))
        .on('error', config.modules.errors)
        .pipe($.size({showFiles: true}))
});

$.gulp.task('bower:fonts', function () {

    var vendor_fonts = config.bower['vendor_fonts'];
    var fonts_stack = [];

    for (i = 0; i < vendor_fonts.length; i++) {
        fonts_stack.push(config.bower.src + vendor_fonts[i] + '/*.{ttf,eot,svg,woff,woff2}')
    }

    return $.gulp.src(fonts_stack)
        .pipe($.gulp.dest(config.bower.dest))
        .on('error', config.modules.errors)
        .pipe($.size({showFiles: true}))
});