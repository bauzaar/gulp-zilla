var config = require('../lib/config'),
    $ = config.plugins;

function build_scripts(){
    $.gulp.task('build', function () {

        var src_to_build = [
            config.build['dest'] + '/**/' + config.build['vendor'] + '.js',
            config.build['dest'] + '/**/' + config.build['app'] + '.js',
            config.build['dest'] + '/**/' + config.build['libs'] + '.js'
        ];

        $.gulp.src(src_to_build)
            .pipe($.concat('build.js'))
            .pipe($.gulp.dest(config.build['dest']))
            .on('error', config.lib['errors'])
            .pipe($.size({showFiles: true}));

        $.del(src_to_build);
    });
}

$.gulp.task('ls', $.task_listing);

$.gulp.task('install', function () {
    $.run('npm cache clean').exec(function () {
        $.run_sequence('install:dependecies');
    });
});

$.gulp.task('vendor', ['clean:vendor_install', 'clean:vendor_dist'], function () {
    $.run('bower-installer').exec(function () {
        $.run_sequence(['bower:scripts', 'bower:styles', 'bower:fonts', 'bower:images']);
    });
});

$.gulp.task('prod', ['clean:styles', 'clean:scripts'], function () {
    process.prod = true;
    $.run_sequence('vendor', ['sass:build', 'js:build', 'fonts:build', 'sass:gui'], 'mail', '3rd');
});

$.gulp.task('mail', ['clean:mail_styles', 'clean:mail_templates'], function () {
    $.run_sequence('sass:mail', ['mail:inliner'], ['mail:inject']);
});

$.gulp.task('serve', function () {
    $.gulp.watch(config.serve['styles'], {interval: 900}, ['clean:styles', 'sass:build']);
    $.gulp.watch(config.serve['scripts'], {interval: 900}, ['clean:scripts', 'js:build']);
    $.gulp.watch(config.serve['markup'], {interval: 900}, ['html:serve']);
    $.gulp.watch(config.serve['mail'], {interval: 900}, ['mail']);
    $.gulp.watch(config.serve['bower'], {interval: 900}, ['vendor']);
});