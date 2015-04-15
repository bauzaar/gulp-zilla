# gulp-fishbone

## Quick Start

Before get started with gulp-fishbone, you must verify that gulp and bower are installed globally, 
if not you must run
```bash
sudo npm install -g gulp bower 
```
And install gulp into local project dir
```bash
cd path/to/project_root/folder
npm install gulp
```

Then you must create a package.json into your root folder:

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

If you want that gulp-fishbone is global to many projects, 
you have to set global env variable NODE_PATH like the following 
(depending on your shell of choice)
```bash
export NODE_PATH=/absolute/path/to/dir-parent/
```