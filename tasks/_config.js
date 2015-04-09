var base = process.GULP_FISHBONE_PARAMS['base'],
    src = base + process.GULP_FISHBONE_PARAMS['static_src'],
    tpl = base + process.GULP_FISHBONE_PARAMS['templates'],
    dest = src + '_dist/',
    dist_name = 'site',
    libs_name = 'vendor',
    bower_components = './bower_components',
    vendor_install = src + 'vendor/',
    paths = {
        sass: src + 'sass/app.sass',
        js: src + 'js/app.js',
        vendor: src + 'vendor'
    };

module.exports = {
    plugins: {
        browserify: require('browserify'),
        replace: require('gulp-replace'),
        filter: require('gulp-filter'),
        order: require('gulp-order'),
        concat: require('gulp-concat'),
        size: require('gulp-size'),
        streamify: require('gulp-streamify'),
        uglify: require('gulp-uglify'),
        livereload: require('gulp-livereload'),
        del: require('del'),
        csswring: require('csswring'),
        postcss: require('gulp-postcss'),
        transform: require('vinyl-transform'),
        autoprefix: require('autoprefixer-core'),
        browser_sync: require('browser-sync'),
        minify: require('gulp-minify-css'),
        buffer: require('vinyl-buffer'),
        run_sequence: require('run-sequence'),
        source: require('vinyl-source-stream'),
        sass: require('gulp-sass'),
        sourcemaps: require('gulp-sourcemaps'),
        rename: require('gulp-rename'),
        run: require('gulp-run'),
        changed: require('gulp-changed'),
        cache: require('gulp-cache'),
        imagemin: require('imagemin'),
        task_listing: require('gulp-task-listing')
    },
    markup: {
        src: tpl
    },
    images: {
        src: src + 'img/',
        dest: src + 'img/'
    },
    bower: {
        src: vendor_install,
        dest: dest,
        vendor: paths.vendor,
        output_name: libs_name,
        vendor_order: process.GULP_FISHBONE_PARAMS.vendor['order']
    },
    sass: {
        src: paths.sass,
        dest: dest,
        output_name: dist_name,
        settings: {
            sourcemap: true,
            indentedSyntax: true,
            precision: 10,
            outputStyle: 'expanded',
            sourceComments: 'sourceMap',
            sourceMapEmbed: true,
            sourceMapContents: true,
            imagePath: '/img/',
            omitSourceMapUrl: true,
            includePaths: process.GULP_FISHBONE_PARAMS.vendor['include_paths']
        }
    },
    browserify: {
        src: paths.js,
        dest: dest,
        output_name: dist_name + '.js'
    },
    watch: {
        sass: src + 'sass/**/*.{sass,scss}',
        js: src + 'js/**/*.js',
        markup: tpl + '**/*.html',
        bower: bower_components + '**/*.*'
    },
    prod: {
        dest: dest,
        css: dest + 'css/*.css',
        js: dest + 'js/*.js'
    },
    clean: {
        dist: dest,
        css: dest + '**/' + dist_name + '.{css,css.map}',
        js: dest + '**/' + dist_name + '.{js,js.map}',
        vendor_dist: dest + '**/' + libs_name + '.{js,css}',
        vendor_install: vendor_install
    },
    modules: {
        errors: require('./errors')
    }
};
