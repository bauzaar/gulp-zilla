var config = require('../../lib/config'),
    $ = config.plugins;

function filter_src(src_regex) {
    return $.filter(function (file) {
        return file.path.match(src_regex);
    });
}

function create_src_stack(vendor_src, vendor_files) {
    var vendor_stack = [];
    for (i = 0; i < vendor_src.length; i++) {
        vendor_stack.push(config.bower['src'] + vendor_src[i] + vendor_files);
    }
    return vendor_stack;
}

$.gulp.task('bower:css', function () {

    var css_filter = filter_src(/\.css$/i);

    return $.gulp.src(config.bower['src'] + '/**/**.css')
        .pipe(css_filter)
        .pipe($.order(config.bower['order']))
        .pipe($.concat(config.bower['output_name'] + '.css'))
        .pipe($.gulp_if(process.prod, $.minify()))
        .pipe($.replace(/([^'"(]*fonts\/|font\/|images\/|img\/)/g, './'))
        .pipe($.gulp.dest(config.bower['dest']))
        .on('error', config.lib['errors'])
        .pipe($.size({showFiles: true}));
});

$.gulp.task('bower:js', function () {

    var js_filter = filter_src(/\.js$/i);

    return $.gulp.src(config.bower['src'] + '/**/**.js')
        .pipe(js_filter)
        .pipe($.order(config.bower['order']))
        .pipe($.concat(config.bower['output_name'] + '.js'))
        .pipe($.gulp_if(process.prod, $.uglify()))
        .pipe($.gulp.dest(config.bower['dest']))
        .on('error', config.lib['errors'])
        .pipe($.size({showFiles: true}))
        .pipe(js_filter.restore());
});

$.gulp.task('bower:images', function () {

    var images_filter = filter_src(/\.gif|png|jpg|jpeg|cur$/i);

    return $.gulp.src(create_src_stack(config.bower['images'], '/**.{gif,png,jpg,jpeg,cur}'))
        .pipe(images_filter)
        .pipe($.gulp.dest(config.bower['dest']))
        .on('error', config.lib['errors'])
        .pipe($.size({showFiles: true}))
});

$.gulp.task('bower:fonts', function () {
    return $.gulp.src(create_src_stack(config.bower['fonts'], '/*.{ttf,eot,svg,woff,woff2}'))
        .pipe($.gulp.dest(config.bower['dest']))
        .on('error', config.lib['errors'])
        .pipe($.size({showFiles: true}))
});