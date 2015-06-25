var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('mail:css', function () {
    return gulp.src(config.mail['src'])
        .pipe(inlineCss({
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: true,
            removeLinkTags: true
        }))
        .pipe(gulp.dest(config.mail['dest']));
});