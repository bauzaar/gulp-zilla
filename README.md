# gulp-zilla

A bunch of useful configurable Gulp tasks global to many projects,
to manage development and production tasks with ease.

- Asset pipeline for SASS, JavaScript, images, and HTML that does compilation with souremaps
and syntax checking in development mode and minification for production mode
- Advanced Bower integration
- Watch changed files with [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) integration

```bash
 $ gulp --tasks
 ├─┬ build
 ├─┬ vendor
 │ ├── clean:vendor_install
 │ └── clean:vendor_dist
 ├── install
 ├── watch
 ├── bower:styles
 ├── bower:scripts
 ├── bower:images
 ├── bower:fonts
 ├── clean:dist
 ├── clean:styles
 ├── clean:scripts
 ├── clean:vendor_dist
 ├── clean:vendor_install
 ├── clean:all
 ├─┬ default
 │ └── clean:all
 ├── fonts
 ├── images
 ├── install:dependecies
 ├── markup
 ├── scripts
 └── styles
```


## Tasks

### install

Run this task to install bower and npm project's dependencies

``` javascript
$.gulp.task('install', function () {
    $.run('npm cache clean').exec(function () {
        $.run_sequence('install:dependecies');
    });
});
```

### build

Run this task to:

- clean any already generated JS/CSS file 
- compile your SASS files to one unified file (with sourcemaps enabled) and minified CSS file removing 
sourcemaps if --prod flag is true

and, parallelly:
- compile your JS browserify files to one unified file (with sourcemaps enabled) and uglified JS file removing 
  sourcemaps if --prod flag is true

``` javascript
$.gulp.task('build',['clean:styles', 'clean:scripts'], function () {
    process.prod = !!$.argv.prod;
    $.run_sequence(['styles', 'scripts', 'fonts']);
});
```

### vendor

This task create a vendor folder into your static_src with your plugins 
(images, fonts, and various assets of your choice), then 
create two files vendor.js and vendor.css and exports those (including assets) to dist folder.

``` javascript
$.gulp.task('vendor', ['clean:vendor_install', 'clean:vendor_dist'], function () {
    $.run('bower-installer').exec(function () {
        $.run_sequence(['bower:scripts', 'bower:styles', 'bower:fonts', 'bower:images']);
    });
});
```

### watch

When you run this task, it will watch your project for changes.
To use this you have to install livereload.


``` javascript
$.gulp.task('watch', function () {
    $.gulp.watch(config.watch['styles'], ['clean:css', 'sass:dev']);
    $.gulp.watch(config.watch['scripts'], ['clean:js', 'browserify:dev']);
    $.gulp.watch(config.watch['markup'], ['markup']);
    $.gulp.watch(config.watch['bower'], ['vendor']);
});
```

## Install

Before get started with gulp-zilla, you must verify that gulp and bower are installed globally

```bash
$ sudo npm install -g gulp bower
```

Then you can install gulp-zilla

```bash
$ sudo npm install -g gulp-zilla
```

## Set Global Gulp

You must add to your .bashrc or .zshenv the global node_modules path

``` bash
export NODE_PATH=/path/to/node_modules/
```

## Usage

To use:

Create a bower.json into your project root

```json
{
  "name": "project-name",
  "version": "1.0",
  "authors": [
    "Name-1",
    "Name-2"
  ],
  "description": "",
  "main": "",
  "moduleType": [
    "amd"
  ],
  "keywords": [
    "word-1",
    "word-2"
  ],
  "license": "MIT",
  "homepage": "http://project-name.com",
  "private": true,
  "ignore": [
    "**/.*",
    "*.map",
    "*.json",
    "*.md",
    "*.editorconfig",
    "*.yml",
    "bower_components",
    "node_modules",
    "media",
    "test",
    "tests"
  ],
  "dependencies": {
    "plugin-1": "~number-version",
    "plugin-2": "~number-version"
  },
  "devDependencies": {},
  "resolutions": {
    "shim-plugin-1": "~number-version",
    "shim-plugin-2": "~number-version"
  },
  "install": {
    "base": "path/to/static_src",
    "path": "name_vendor_folder",
    "sources": {
      "plugin-1": [
        "bower_components/path/to/plugin-1.js",
        "bower_components/path/to/plugin-1.css",
        "bower_components/path/to/fonts/*.**",
        "bower_components/path/to/*.{gif,png,jpg,jpeg,svg}"
      ],
      "plugin-2": [
        "bower_components/path/to/plugin-2.js",
        "bower_components/path/to/plugin-2.css",
        "bower_components/path/to/fonts/*.**",
         "bower_components/path/to/*.{gif,png,jpg,jpeg,svg}"
      ]
    },
    "ignore": [
      "plugin-or-dependencies-to-ignore-1",
      "plugin-or-dependencies-to-ignore-2"
    ]
  }
}
```

Then run the gulp install that create the node_modules and bower_components dependencies

```bash
$ gulp install
```

And then create a gulpfile.js at the same level

```javascript
/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in ./tasks. Any files in that directory get
  automatically required below.
  To add a new task, simply add a new task file that directory.
  ./tasks/default.js specifies the default set of tasks to run
  when you run gulp.
*/

var root_dir = process.cwd(),
    bower_dir = './bower_components/';

process.GULP_ZILLA = {
  base: root_dir + './path/to/base_folder',
  static_src: '/path/to/static_src_folder/',
  templates: '/path/to/templates_folder/',
  vendor: {
    gulp: require('gulp'),
    order: [
        'plugin-A/*.js',
        'plugin-B/*.js',
        '**/*.js'
    ],
    include_paths: [
        bower_dir + 'path/to/plugin-A',
        bower_dir + 'path/to/plugin-B'
    ],
    fonts: [
        '/path/to/font-A/without/file',
        '/path/to/font-B/without/file'
    ],
    images: [
        '/path/to/image-A/without/file',
        '/path/to/image-B/without/file'
    ]
  }
};

require('gulp-zilla')();

```


For verify if node_modules need an update install npm-check-updates

``` bash
$ sudo npm install -g npm-check-updates
```

and then you can update modules version running

``` bash
$ npm-check-updates -u
```

Now you must simpy include css and js dist into your base template

``` html
<link rel="stylesheet" href="path/to/static_src/_dist/site.css">
<link rel="stylesheet" href="path/to/static_src/_dist/vendor.css">
...
<script src="path/to/static_src/_dist/vendor.js"></script>
<script src="path/to/static_src/_dist/site.js"></script>
```

## License

This project is released under the BSD license.




