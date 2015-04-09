var config = require('./_config'),
    $ = config.plugins;

$.gulp.task('_watch:debug', function() {

    $.gulp.watch(config.watch.sass, ['clean:css', 'sass:dev']);
    $.gulp.watch(config.watch.js, ['clean:js', 'browserify:dev']);
    $.gulp.watch(config.watch.markup, ['markup:dev']);
    $.gulp.watch(config.watch.bower, ['_vendor']);
});

$.gulp.task('_watch', function() {

    $.gulp.watch(config.watch.sass, ['clean:css', 'sass:prod']);
    $.gulp.watch(config.watch.js, ['clean:js', 'browserify:prod']);
    $.gulp.watch(config.watch.markup, ['markup:dev']);
    $.gulp.watch(config.watch.bower, ['_vendor']);
});