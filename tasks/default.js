var config = require('../lib/config'),
    $ = config.plugins;

$.gulp.task('default', ['clean:all'], function(){
    $.run_sequence(['_vendor', '_dev:debug']);
});