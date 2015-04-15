var config = require('../config'),
    $ = config.plugins;

$.gulp.task('default',['clean:all'],function(){
    $.run_sequence(['_vendor', '_dev:debug']);
});