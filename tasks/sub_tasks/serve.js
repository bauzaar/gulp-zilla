var config = require('../../lib/config'),
    $ = config.plugins;


$.gulp.task('browser-sync', function() {
    $.browser_sync.init({
        proxy: "local.dev:8000"
    });
});