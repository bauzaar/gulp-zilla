// ---------------------------------------------
// gulp-zilla - A bunch of useful gulp tasks
// ---------------------------------------------

var GZ = process.GZ,
    src = GZ.frontend + GZ.static,
    templates = GZ.frontend + GZ.templates,
    mail = GZ.mail,
    bower_dir = GZ.bower,
    dest = src + '_dist/',
    libs_3rd_name = '3rd',
    libs_name = 'vendor',
    app_name = 'app',
    gui_name = 'gui',
    paths = {
        sass: {
            src: {
                app: src + 'sass/app.sass',
                gui: src + 'sass/gui.sass'
            },
            dist_name: {
                app: app_name,
                gui: gui_name
            }
        },
        js: {
            src: {
                app: src + 'js/app.js'
            },
            dist_name: {
                app: app_name
            }
        },
        vendor: src + 'vendor',
        libs_3rd: src + '3rd'
    };

module.exports = {
    plugins: {
        gulp: GZ.gulp,
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
        run_sequence: require('run-sequence').use(GZ.gulp),
        install: require('gulp-install'),
        gulp_if: require('gulp-if'),
        globbing: require('gulp-css-globbing'),
        argv: require('yargs').argv,
        autoprefixer: require('gulp-autoprefixer'),
        task_listing: require('gulp-task-listing'),
        inline_css: require('gulp-inline-css'),
        inject: require('gulp-inject'),
        sassdoc: require('sassdoc'),
        converter: require('sass-convert'),
        vfs: require('vinyl-fs')
    },
    build: {
        dest: dest,
        vendor: libs_name,
        app: app_name,
        gui: gui_name,
        libs: libs_3rd_name
    },
    html: {
        src: templates
    },
    images: {
        src: src + 'img/',
        dest: src + 'img/'
    },
    bower: {
        src: paths.vendor + '/',
        dest: dest,
        output_name: libs_name,
        order: GZ.vendor.order,
        images: GZ.vendor.images,
        fonts: GZ.vendor.fonts
    },
    libs_3rd: {
        src: paths.libs_3rd + '/',
        dest: dest,
        output_name: libs_3rd_name
    },
    sass: {
        src: {
            all: src + 'sass',
            app: paths.sass.src.app,
            gui: paths.sass.src.gui
        },
        dist_name: {
            app: paths.sass.dist_name.app,
            gui: paths.sass.dist_name.gui
        },
        dest: dest,
        settings: {
            sourceMap: dest,
            includePaths: GZ.vendor.include_paths,
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
            app: paths.js.src.app
        },
        dist_name: {
            app: paths.js.dist_name.app + '.js'
        },
        dest: dest
    },
    serve: {
        styles: src + 'sass/**/*.{sass,scss}',
        scripts: src + 'js/**/*.js',
        markup: templates + '**/*.html',
        mail: {
            templates: mail.templates + '/src/**/*.html',
            styles: mail.styles + '/sass/**/*.{sass,scss}'
        },
        bower: bower_dir + '**/*.*',
        libs_3rd: paths.libs_3rd + '**/*.js'
    },
    prod: {
        dest: dest,
        css: dest + '*.css',
        js: dest + '*.js'
    },
    clean: {
        dist: dest,
        sass:{
          app: dest + '**/' + paths.sass.dist_name.app_name + '.{css,css.map}',
          gui: dest + '**/' + paths.sass.dist_name.gui_name + '.{css,css.map}'
        },
        js: dest + '**/' + app_name + '.{js,js.map}',
        vendor_dist: dest + '**/' + libs_name + '.{js,css}',
        vendor_install: paths.vendor + '/',
        mail_styles: mail.styles + '/_dist',
        mail_templates: mail.templates + '/inlined',
        libs_3rd: dest + '**/' + libs_3rd_name + '.js'
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
            sass: mail.styles + '/sass/*.sass',
            dest: mail.styles + '/_dist'
        },
        templates_src: mail.templates + '/src/**/**/*.html',
        templates_inlined: mail.templates + '/inlined'
    }
};
