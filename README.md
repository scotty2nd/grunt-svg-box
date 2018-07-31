# grunt-svgbox

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svgbox');
```

## svgbox task
Run this task with the `grunt svgbox` command. You have to define which mode you are running. Available are: `scss (default)` and `json`

Example Config
```js
svgbox: {
  default: {
    mode: 'scss',
    src:  'skin/frontend/lia/images/icons.svg',
    dest: 'skin/frontend/lia/private/scss/frameworks/_icons.scss'
  },
  json: {
    mode: 'json',
    src:  'skin/frontend/lia/images/icons.svg',
    dest: 'skin/frontend/lia/private/rte.json'
  }
}
```

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
