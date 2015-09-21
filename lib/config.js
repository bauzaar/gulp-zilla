// ---------------------------------------------
// gulp-zilla - A bunch of useful gulp tasks
// ---------------------------------------------

var zilla = process.GULP_ZILLA,
    src = zilla['base'] + zilla['static_dir'],
    templates = zilla['base'] + zilla['templates'],
    mail = zilla['mail'],
    bower_dir = zilla['bower_dir'],
    dest = src + '_dist/',
    third_party_libs_name = '3rd',
    libs_name = 'vendor',
    dist_name = 'app',
    paths = {
        sass: {
            src: {
                app: src + 'sass/app.sass',
                gui: src + 'sass/gui.sass'
            },
            dist_name: {
                app: dist_name,
                gui: 'gui'
            }
        },
        js: {
            src: {
                app: src + 'js/app.js'
            },
            dist_name: {
                app: dist_name
            }
        },
        vendor: src + 'vendor',
        third_party_libs: src + '3rd'
    };

module.exports = {
    plugins: {
        gulp: zilla['gulp'],
        fs: require('fs'),
        browserify: require('browserify'),
        replace: require('gulp-replace'),
        order: require('gulp-order'),
        concat: require('gulp-concat'),
        size: require('gulp-size'),
        streamify: require('gulp-streamify'),
        uglify: require('gulp-uglifyjs'),
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
        autoprefixer: require('gulp-autoprefixer'),
        task_listing: require('gulp-task-listing'),
        inline_css: require('gulp-inline-css'),
        inject: require('gulp-inject')
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
    third_party_libs: {
        src: paths['third_party_libs'] + '/',
        dest: dest,
        output_name: third_party_libs_name
    },
    sass: {
        src: {
            app: paths.sass.src['app'],
            gui: paths.sass.src['gui']
        },
        dist_name: {
            app: paths.sass.dist_name['app'],
            gui: paths.sass.dist_name['gui']
        },
        dest: dest,
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
        src: {
            app: paths.js.src['app']
        },
        dist_name: {
            app: paths.js.dist_name['app'] + '.js'
        },
        dest: dest
    },
    serve: {
        styles: src + 'sass/**/*.{sass,scss}',
        scripts: src + 'js/**/*.js',
        markup: templates + '**/*.html',
        mail: mail['templates'] + '/src/**/*.html',
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
        vendor_install: paths['vendor'] + '/',
        mail_styles: mail['styles'] + '/_dist',
        mail_templates: mail['templates'] + '/inlined'
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
    },
    mail: {
        styles: {
            sass: mail['styles'] + '/sass/*.sass',
            dest: mail['styles'] + '/_dist'
        },
        templates_src: mail['templates'] + '/src/**/**/*.html',
        templates_inlined: mail['templates'] + '/inlined'
    }
};
