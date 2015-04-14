var config = require('../config'),
    $ = config.plugins;

$.gulp.task('postcss', function () {
    var processors = [
        $.autoprefix({browsers: ['last 5 version']}),
        $.csswring({
            preserveHacks: true,
            removeAllComments: true
        })
    ];
    return $.gulp.src(config.sass['dest'] + '*.css')
        .pipe($.postcss(processors))
        .pipe($.gulp.dest(config.sass['dest']));
});