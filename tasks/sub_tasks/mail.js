var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('mail:inline_css', function () {
    return $.gulp.src(config.mail['templates_src'])
        .pipe($.inline_css({
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: true,
            removeLinkTags: true
        }))
        .pipe($.gulp.dest(config.mail['templates_inlined']))
        .pipe($.size({showFiles: true}));
});

$.gulp.task('mail:inject_style', function () {
    return $.gulp.src(config.mail['templates_inlined'] + '/_extend/base.html')
        .pipe($.inject_style())
        .pipe($.gulp.dest(config.mail['templates_inlined'] + '/_extend'))
        .pipe($.size({showFiles: true}));
});