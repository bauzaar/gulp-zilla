var config = require('../../lib/config'),
    $ = config.plugins;


$.gulp.task('mail:inliner', function () {
    return $.gulp.src(config.mail.templates_src)
        .pipe($.inject(
            $.gulp.src(config.mail.styles.dest + '/base.css', {read: false}), {
                relative: true,
                starttag: '<!-- inject:base:{{ext}} -->'
            }
        ))
        .pipe($.inline_css({
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: true,
            removeLinkTags: true
        }))
        .pipe($.gulp.dest(config.mail.templates_inlined))
        .pipe($.size({showFiles: true}));
});


$.gulp.task('mail:inject', function () {
    return $.gulp.src(config.mail.templates_inlined + '/_extend/base.html')
        .pipe($.inject(
            $.gulp.src(config.mail.styles.dest + '/responsive.css', {read: false}), {
                relative: true,
                starttag: '<!-- inject:responsive:{{ext}} -->'
            }
        ))
        .pipe($.gulp.dest(config.mail.templates_inlined + '/_extend'))
        .pipe($.size({showFiles: true}));
});


$.gulp.task('mail:split_style', function () {
    return $.gulp.src(config.mail.templates_inlined + '/_extend/base.html')
      .pipe($.debug())
        .pipe($.replace(/<link.*?href="(.+?\.css)"[^>]*>/g, function(s, filename) {
          var style = $.fs.readFileSync(filename, 'utf8');
          return '<style>\n' + style + '\n</style>';
        }))
        .pipe($.gulp.dest(config.mail.templates_inlined + '/_extend'))
        .pipe($.size({showFiles: true}));
});
