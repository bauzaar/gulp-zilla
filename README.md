# gulp-fishbone

## Quick Start

  Before get started with gulp-fishbone you must create a gulpfile.js into your root folder
  here an example:

```bash
npm install git+ssh://git@github.com/gargoyl/gulp-fishbone.git
```

```bash
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
  src: '/path/to/src_folder/',
  templates: '/path/to/templates_folder/'
};

// Require all tasks in gulp/tasks, including subfolders
require_dir('./node_modules/gulp-fishbone/gulp_tasks', { recurse: true });
```
