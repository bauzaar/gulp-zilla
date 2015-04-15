var config = require('../lib/config'),
    $ = config.plugins;

$.gulp.task('default', ['clean:all'], function(){
    $.run_sequence(['vendor', 'dev']);
});