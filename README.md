# Gulp Fishbone 

A bunch of useful configurable Gulp tasks global to many projects,
to manage development and production tasks with ease.

```bash
(project_name)➜  project_name git:(master) gulp --tasks
 Using gulpfile ~/path/to/project_name/gulpfile.js
 Tasks for ~/path/to/project_name/gulpfile.js
 ├─┬ dev
 │ ├── clean:css
 │ └── clean:js
 ├─┬ prod
 │ ├── clean:css
 │ └── clean:js
 ├─┬ vendor
 │ ├── clean:vendor_install
 │ └── clean:vendor_dist
 ├── install
 ├── watch
 ├── bower:css
 ├── bower:js
 ├── bower:images
 ├── bower:fonts
 ├── browserify:dev
 ├── browserify:prod
 ├── clean:dist
 ├── clean:css
 ├── clean:js
 ├── clean:vendor_dist
 ├── clean:vendor_install
 ├── clean:all
 ├─┬ default
 │ └── clean:all
 ├── html:dev
 ├── images
 ├── install:npm_and_bower
 ├── minify
 ├── postcss
 ├── sass:dev
 ├── sass:prod
 └── uglify
```


## Tasks

### install

Run this task to install bower and npm project's dependencies

``` javascript
$.gulp.task('install', function () {
    $.run('npm cache clean').exec(function () {
        $.run_sequence('install:npm_and_bower');
    });
});
```

### dev

Run this task to:

- clean any already generated JS/CSS file 
- compile your SASS source files to one unified CSS file (with sourcemaps enabled)

and, parallelly:

- compile your JS browserify app file to one unified JS file (with sourcemaps enabled)  

``` javascript
$.gulp.task('dev', ['clean:css', 'clean:js'], function () {
    $.run_sequence(['sass:dev', 'browserify:dev']);
});
```

### prod

Run this task to:

- clean any already generated JS/CSS file 
- compile your SASS source files to one unified and minified CSS file

and, parallelly:

- compile your JS browserify app file to one unified and uglified JS file

then:

- applies 'postcss' to CSS

``` javascript
$.gulp.task('prod', ['clean:css', 'clean:js'], function () {
    $.run_sequence(['sass:prod', 'browserify:prod'], 'postcss', ['minify', 'uglify']);
});
```

### vendor

This task create a vendor folder into your static_src with your plugins 
(images, fonts, and various assets of your choice), then 
create two files vendor.js and vendor.css and exports those (including assets) to dist folder.

``` javascript
$.gulp.task('vendor', ['clean:vendor_install', 'clean:vendor_dist'], function () {
    $.run('bower-installer').exec(function () {
        $.run_sequence(['bower:js', 'bower:css', 'bower:fonts', 'bower:images']);
    });
});
```

### watch

When you run this task, it will watch your project for changes.
To use this you have to install livereload.


``` javascript
$.gulp.task('watch', function () {
    $.gulp.watch(config.watch['sass'], ['clean:css', 'sass:dev']);
    $.gulp.watch(config.watch['js'], ['clean:js', 'browserify:dev']);
    $.gulp.watch(config.watch['html'], ['html:dev']);
    $.gulp.watch(config.watch['bower'], ['vendor']);
});
```


## Install

Before get started with gulp-fishbone, you must verify that gulp and bower are installed globally, 
and install gulp into local project dir

```bash
sudo npm install -g gulp bower
cd path/to/project_root/folder
npm install gulp 
```

Then you can install gulp-fishbone

```bash
sudo npm install -g gulp-fishbone
```

## Usage

To use:

Create a package.json into your root folder:

```json
{
  "name": "project_name",
  "description": "",
  "repository": {
    "type": "git",
    "url": "https://github.com/path/to/project_name"
  },
  "dependencies": {
    "bower": "^1.4.1",
    "glob": "^5.0.5",
    "gulp": "^3.8.11"
  },
  "devDependencies": {}
}
```

And a bower.json at the same level

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
  "overrides": {
    "if-you-use-main-bower-files": "plugin-path-to-override"
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

Then you must run the gulp install that create the node_modules and bower_components dependencies

```bash
gulp install
```

And then you must create a gulpfile.js at the same level

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

process.GULP_FISHBONE_PARAMS = {
  base: root_dir + './path/to/base_folder',
  static_src: '/path/to/static_src_folder/',
  templates: '/path/to/templates_folder/',
  vendor: {
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

process.gulp = require('gulp');
require('gulp-fishbone')();

```


For verify if node_modules need an update install npm-check-updates

``` bash
sudo npm install -g npm-check-updates
```

and then you can update modules version running

``` bash
npm-check-updates -u
```

Now you must simpy include css and js dist into your base template

``` html
<link rel="stylesheet" href="path/to/static_src/_dist/site.css">
<link rel="stylesheet" href="path/to/static_src/_dist/vendor.css">
...
<script src="path/to/static_src/_dist/vendor.js"></script>
<script src="path/to/static_src/_dist/site.js"></script>
```




