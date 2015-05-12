// ---------------------------------------------
// gulp-zilla - A bunch of useful gulp tasks
// ---------------------------------------------

var zilla = process.GULP_ZILLA,
    src = zilla['base'] + zilla['static_src'],
    templates = zilla['base'] + zilla['templates'],
    bower_dir = zilla['bower_dir'],
    dest = src + '_dist/',
    dist_name = 'site',
    libs_name = 'vendor',
    paths = {
        sass: src + 'sass/app.sass',
        js: src + 'js/app.js',
        vendor: src + 'vendor'
    };

module.exports = {
    plugins: {
        gulp: zilla['gulp'],
        util: require('gulp-util'),
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
        transform: require('vinyl-transform'),
        browser_sync: require('browser-sync'),
        minify: require('gulp-minify-css'),
        buffer: require('vinyl-buffer'),
        source: require('vinyl-source-stream'),
        sass: require('gulp-sass'),
        sourcemaps: require('gulp-sourcemaps'),
        rename: require('gulp-rename'),
        run: require('gulp-run'),
        changed: require('gulp-changed'),
        cache: require('gulp-cache'),
        imagemin: require('imagemin'),
        run_sequence: require('run-sequence').use(zilla['gulp']),
        install: require('gulp-install'),
        gulp_if: require('gulp-if'),
        globbing: require('gulp-css-globbing'),
        argv: require('yargs').argv,
        autoprefixer: require('gulp-autoprefixer')
    },
    html: {
        src: templates
    },
    images: {
        src: src + 'img/',
        dest: src + 'img/'
    },
    bower: {
        src: paths['vendor'] + '/',
        dest: dest,
        output_name: libs_name,
        order: zilla.vendor['order'],
        images: zilla.vendor['images'],
        fonts: zilla.vendor['fonts']
    },
    sass: {
        src: paths['sass'],
        dest: dest,
        output_name: dist_name,
        settings: {
            sourceMap: dest,
            includePaths: zilla.vendor['include_paths'],
            indentedSyntax: true,
            precision: 10,
            outputStyle: 'expanded',
            sourceMapContents: true
        },
        autoprefixer: {
            browsers: ['last 3 versions'],
            cascade: false
        }
    },
    browserify: {
        src: paths['js'],
        dest: dest,
        output_name: dist_name + '.js'
    },
    watch: {
        styles: src + 'sass/**/*.{sass,scss}',
        scripts: src + 'js/**/*.js',
        markup: templates + '**/*.html',
        bower: bower_dir + '**/*.*'
    },
    prod: {
        dest: dest,
        css: dest + '*.css',
        js: dest + '*.js'
    },
    clean: {
        dist: dest,
        css: dest + '**/' + dist_name + '.{css,css.map}',
        js: dest + '**/' + dist_name + '.{js,js.map}',
        vendor_dist: dest + '**/' + libs_name + '.{js,css}',
        vendor_install: paths['vendor'] + '/'
    },
    lib: {
        errors: require('./errors')
    },
    install: {
        src: ['./bower.json', './package.json']
    },
    fonts: {
        src: src + 'fonts/',
        dest: dest
    }
};
