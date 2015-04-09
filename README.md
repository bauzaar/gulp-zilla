# gulp-fishbone

## Quick Start

  Before get started with gulp-fishbone you must create a package.json into your root folder:

```json
{
  "name": "project_name",
  "dependencies": {
    "require-dir": "^0.3.0",
    "glob": "^5.0.3",
    "bower": "^1.4.1",
    "gulp": "^3.8.11",
    "gulp-fishbone": "git+https://github.com/gargoyl/gulp-fishbone.git",
    "autoprefixer-core": "^5.1.8",
    "bower-installer": "^1.2.0",
    "browserify": "^9.0.8",
    "browser-sync": "^2.5.3",
    "csswring": "^3.0.3",
    "del": "^1.1.1",
    "gulp-cache": "^0.2.8",
    "gulp-changed": "^1.2.1",
    "gulp-concat": "^2.5.2",
    "gulp-connect": "^2.2.0",
    "gulp-filesize": "^0.0.6",
    "gulp-filter": "^2.0.2",
    "gulp-inline-css": "^2.0.0",
    "gulp-livereload": "^3.8.0",
    "gulp-minify-css": "^1.0.0",
    "gulp-notify": "^2.2.0",
    "gulp-order": "^1.1.1",
    "gulp-postcss": "^5.0.1",
    "gulp-rename": "^1.2.2",
    "gulp-replace": "^0.5.3",
    "gulp-run": "^1.6.7",
    "gulp-sass": "^1.3.3",
    "gulp-size": "^1.2.1",
    "gulp-sourcemaps": "^1.5.1",
    "gulp-streamify": "^0.0.5",
    "gulp-task-listing": "^1.0.0",
    "gulp-uglify": "^1.1.0",
    "gulp-util": "^3.0.4",
    "gulp-watch": "^4.2.4",
    "imagemin": "^3.1.0",
    "postcss": "^4.1.4",
    "pretty-hrtime": "^1.0.0",
    "run-sequence": "^1.0.2",
    "url": "^0.10.3",
    "vinyl-buffer": "^1.0.0",
    "vinyl-paths": "^1.0.0",
    "vinyl-source-stream": "^1.1.0",
    "vinyl-transform": "^1.0.0"
  },
  "devDependencies": {}
}
```

Then you must run npm install from your project_root folder

```bash
cd path/to/project_root/folder
npm cache clean
npm install
```

And then you must create a gulpfile.js at the same level

```javascript
/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.
  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/

var require_dir = require('require-dir');

process.GULP_FISHBONE_PARAMS = {
  base: './path/to/base_folder',
  static_src: '/path/to/static_src_folder/',
  templates: '/path/to/templates_folder/',
  vendor: {
    order: [
        'plugin-A/*.js',
        'plugin-B/*.js',
        '**/*.js'
    ],
    include_paths: [
        './bower_components/plugin-A',
        './bower_components/plugin-B'
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

// Require all tasks in gulp/tasks, including subfolders
require_dir('./node_modules/gulp-fishbone/gulp_tasks', { recurse: true });
```


For verify if node_modules need an update install npm-check-updates

``` bash
sudo npm install -g npm-check-updates
```

and then you can update modules version simply run

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

