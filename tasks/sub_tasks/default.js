var config = require('../../lib/config'),
    $ = config.plugins;

$.gulp.task('default', ['clean:all'], function(){
    process.prod = false;
    $.run_sequence('vendor', ['sass:build', 'js:build', 'fonts:build'], 'mail', 'serve');
});