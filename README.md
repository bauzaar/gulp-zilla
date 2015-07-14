# gulp-zilla

A bunch of useful configurable Gulp tasks global to many projects,
to manage development and production tasks with ease.

- Asset pipeline for SASS, JavaScript, images, and HTML that does compilation with souremaps
and syntax checking in development mode and minification for production mode
- Advanced Bower integration
- Watch changed files with [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) integration
- Mail inliner 

```bash
 gulp ls
 Using gulpfile ~/path/to/gulpfile.js
 Starting 'ls'...
 
 Main Tasks
 ------------------------------
     default
     install
     ls
     mail
     prod
     serve
     vendor
 
 Sub Tasks
 ------------------------------
    bower:fonts
    bower:images
    bower:scripts
    bower:styles
    clean:all
    clean:dist
    clean:mail_styles
    clean:mail_templates
    clean:scripts
    clean:styles
    clean:vendor_dist
    clean:vendor_install
    fonts:build
    html:serve
    images:build
    install:dependecies
    js:build
    mail:inject_style
    mail:inline_css
    sass:build
    sass:mail
```

## Get Started

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
  "license": "BSD-2-Clause-FreeBSD",
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
    "base": "path/to/static",
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
  gulp: require('gulp'),
  base: root_dir + './path/to/base_folder',
  static_dir: '/path/to/static_folder/',
  templates: '/path/to/templates_folder/',
  bower_dir: bower_dir,
  mail: {
    styles: root_dir + '/path/to/styles_folder',
    templates: root_dir + '/path/to/templates_folder'
  },
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
$ npm-check-updates
```

and then you can update all modules version running

``` bash
$ npm-check-updates -u && npm update
```

Now you must simpy include css and js dist into your base template

``` html
<link rel="stylesheet" href="path/to/static/_dist/site.css">
<link rel="stylesheet" href="path/to/static/_dist/vendor.css">
...
<script src="path/to/static/_dist/vendor.js"></script>
<script src="path/to/static/_dist/site.js"></script>
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

### vendor

This task create a vendor folder into your static with your plugins 
(images, fonts, and various assets of your choice), then 
create two files vendor.js and vendor.css and exports those (including assets) to dist folder.

``` javascript
$.gulp.task('vendor', ['clean:vendor_install', 'clean:vendor_dist'], function () {
    $.run('bower-installer').exec(function () {
        $.run_sequence(['bower:scripts', 'bower:styles', 'bower:fonts', 'bower:images']);
    });
});
```

### default

Run this task to:

- clean any already generated JS/CSS file 
- compile your SASS files to one unified file (with sourcemaps enabled)

and, parallelly:
- compile your JS browserify files to one unified file (with sourcemaps enabled)

``` javascript
$.gulp.task('default', ['clean:all'], function(){
    process.prod = false;
    $.run_sequence('vendor', ['sass:build', 'js:build', 'fonts:build']);
});
```

### prod

Run this task to:

- clean any already generated JS/CSS file 
- compile your SASS files to one unified file and minified CSS file removing 
sourcemaps

and, parallelly:
- compile your JS browserify files to one unified file and uglified JS file removing 
  sourcemaps

``` javascript
$.gulp.task('prod', ['clean:all'], function () {
    process.prod = true;
    $.run_sequence('vendor', ['sass:build', 'js:build', 'fonts:build']);
});
```

### serve

When you run this task, it will watch your project for changes.
To use this you have to install livereload.


``` javascript
$.gulp.task('serve', function () {
    $.gulp.watch(config.serve['styles'], { interval: 900 }, ['clean:styles', 'sass:build']);
    $.gulp.watch(config.serve['scripts'], { interval: 900 }, ['clean:scripts', 'js:build']);
    $.gulp.watch(config.serve['markup'], { interval: 900 }, ['html:serve']);
    $.gulp.watch(config.serve['mail'], { interval: 900 }, ['mail']);
    $.gulp.watch(config.serve['bower'], { interval: 900 }, ['vendor']);
});
```

### mail

Run this task to:

- clean any already generated inlined mail templates
- inline your CSS class to multiple html templates

and, parallelly:
- inject your responsive style after the inliner

``` javascript
$.gulp.task('mail', ['clean:mail_styles', 'clean:mail_templates'], function () {
    $.run_sequence('sass:mail', ['mail:inline_css'], ['mail:inject_style']);
});
```


## License

This project is released under the BSD-2-Clause-FreeBSD license.




