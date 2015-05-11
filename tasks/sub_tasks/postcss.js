var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('postcss', function () {

    var processors = [
        $.autoprefix({browsers: ['last 5 version']}),
        $.csswring({
            preserveHacks: true,
            removeAllComments: true
        })
    ];

    return $.gulp.src(config.sass['dest'] + config.sass['output_name'] + '.css')
        .pipe($.postcss(processors))
        .pipe($.streamify($.gulp_if(process.prod, $.minify())))
        .pipe($.gulp.dest(config.sass['dest']))
        .pipe($.size({showFiles: true}));
});