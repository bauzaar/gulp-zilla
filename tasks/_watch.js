var config = require('../lib/config'),
    $ = config.plugins;

$.gulp.task('watch', function () {
    $.gulp.watch(config.watch['sass'], ['clean:css', 'sass:dev']);
    $.gulp.watch(config.watch['js'], ['clean:js', 'browserify:dev']);
    $.gulp.watch(config.watch['html'], ['html:dev']);
    $.gulp.watch(config.watch['bower'], ['vendor']);
});