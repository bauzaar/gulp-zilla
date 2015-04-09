# gulp-fishbone

## Quick Start

  Before get started with gulp-fishbone you must create a package.json into your root folder:

```json

{
  "name": "project_name",
  "dependencies": {
    "require-dir": "^0.3.0",
    "bower": "^1.4.1",
    "gulp": "^3.8.11",
    "gulp-fishbone": "git+https://github.com/gargoyl/gulp-fishbone.git"
  },
  "devDependencies": {}
}

```

Then you must run npm install from terminal

```bash
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
