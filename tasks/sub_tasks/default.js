var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('default', ['clean:all'], function(){
    process.prod = false;
    $.run_sequence('vendor', ['sass:build', 'js:build', 'fonts:build', 'sass:gui', 'mail', '3rd'], 'serve');
});