var config = require('../../lib/config'),
    $ = config.plugins;

function create_src_stack(vendor_src, vendor_files) {
    var vendor_stack = [];
    for (i = 0; i < vendor_src.length; i++) {
        vendor_stack.push(config.bower['src'] + vendor_src[i] + vendor_files);
    }
    return vendor_stack;
}

$.gulp.task('bower:styles', function () {
    return $.gulp.src(config.bower['src'] + '/**/*.css')
        .pipe($.order(config.bower['order']))
        .pipe($.concat(config.bower['output_name'] + '.css'))
        .pipe($.replace(/([^'"(]*fonts\/|font\/|images\/|img\/)/g, './'))
        .pipe($.minify({
            keepBreaks: false,
            keepSpecialComments: 0,
            shorthandCompacting: true
        }))
        .pipe($.gulp.dest(config.bower['dest']))
        .on('error', config.lib['errors'])
        .pipe($.size({showFiles: true}));
});

$.gulp.task('bower:scripts', function () {
    return $.gulp.src(config.bower['src'] + '/**/*.js')
        .pipe($.order(config.bower['order']))
        .pipe($.concat(config.bower['output_name'] + '.js'))
        .pipe($.gulp_if(!process.prod, $.uglify({
                mangle: true,
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true
                },
                preserveComments: null
            })
        ))
        .pipe($.gulp.dest(config.bower['dest']))
        .on('error', config.lib['errors'])
        .pipe($.size({showFiles: true}));
});

$.gulp.task('bower:images', function () {
    return $.gulp.src(create_src_stack(config.bower['images'], '/*.{gif,png,jpg,jpeg,cur}'))
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