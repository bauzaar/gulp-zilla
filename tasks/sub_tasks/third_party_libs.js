var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('3rd', ['clean:3rd'], function () {
    return $.gulp.src(config.third_party_libs['src'] + '/**/*.js')
        .pipe($.concat(config.third_party_libs['output_name'] + '.js'))
        .pipe($.uglify({mangle:true}))
        .pipe($.gulp.dest(config.third_party_libs['dest']))
        .on('error', config.lib['errors'])
        .pipe($.size({showFiles: true}));
});