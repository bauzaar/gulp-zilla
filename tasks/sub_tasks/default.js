var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('default', ['clean:all'], function(){
    process.prod = false;
    $.run_sequence('vendor', ['sass:build', 'sass:gui', 'js:build', 'fonts:build', 'mail', '3rd'], 'serve');
});