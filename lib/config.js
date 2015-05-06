// ---------------------------------------------
// gulp-fishbone - A bunch of useful gulp tasks
// ---------------------------------------------

var fishbone = process.GULP_FISHBONE_PARAMS,
    src = fishbone['base'] + fishbone['static_src'],
    templates = fishbone['base'] + fishbone['templates'],
    bower_dir = fishbone['bower_dir'],
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
        gulp: fishbone['gulp'],
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
        csswring: require('csswring'),
        postcss: require('gulp-postcss'),
        transform: require('vinyl-transform'),
        autoprefix: require('autoprefixer-core'),
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
        run_sequence: require('run-sequence').use(fishbone['gulp']),
        install: require('gulp-install'),
        gulp_if: require('gulp-if'),
        globbing: require('gulp-css-globbing')
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
        order: fishbone.vendor['order'],
        images: fishbone.vendor['images'],
        fonts: fishbone.vendor['fonts']
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
            includePaths: fishbone.vendor['include_paths']
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
        html: templates + '**/*.html',
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
