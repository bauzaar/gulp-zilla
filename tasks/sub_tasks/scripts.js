var config = require('../../lib/config'),
    $ = config.plugins;


$.gulp.task('js:build', function () {
    return $.browserify({entries: [config.browserify.src.app], debug: !process.prod})
        .bundle()
        .on('error', config.lib.errors)
        .pipe($.source(config.browserify.dist_name.app))
        .pipe($.streamify($.gulp_if(process.prod,  $.uglify({mangle:true}))))
        .pipe($.gulp.dest(config.browserify.dest))
        .pipe($.streamify($.size({showFiles: true})))
        .pipe($.gulp_if(!process.prod, $.livereload()));
});


$.gulp.task('js:3rd', ['clean:libs_3rd'], function () {
    return $.gulp.src(config.libs_3rd.src + '/**/*.js')
        .pipe($.concat(config.libs_3rd.output_name + '.js'))
        .pipe($.uglify({mangle:true}))
        .pipe($.gulp.dest(config.libs_3rd.dest))
        .on('error', config.lib.errors)
        .pipe($.size({showFiles: true}));
});
