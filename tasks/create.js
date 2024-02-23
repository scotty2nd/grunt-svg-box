'use strict';
module.exports = function (grunt) {
  var path = require('path');
  var cheerio = require('cheerio');

  function createScssFile($, targetFilePath) {
    var output = [];

    var fileContent = grunt.file.exists(targetFilePath) ? grunt.file.read(targetFilePath) : ''

    $('symbol').each(function () {
      var $this = $(this);
      var $title = $this.find('title');
      var title = '$icon-' + $title.html() + ': ';
      $title.remove();

      var $output = cheerio.load('<svg>' + $this.html() + '</svg>', {xmlMode: true});
      var $tag = $output('svg').first().attr('xmlns', 'http://www.w3.org/2000/svg').attr('viewBox', this.attribs.viewBox);
      output.push(title + "'" + $output.html() + "';");
    });

    grunt.file.write(targetFilePath, fileContent + output.join('\n'));
  };

  function createJSONFile($, targetFilePath) {
    var output = [];
    $('symbol').each(function () {
      var $this = $(this);
      var title = $this.find('title').html();
      output.push({name: title, file: title + '.svg'});
    });

    grunt.file.write(targetFilePath, JSON.stringify(output));
  };

  grunt.registerMultiTask('svgbox', 'Extracts svgs from sprite file to scss include file', function () {
    this.files.forEach(function (taskConfig) {
      var mode = taskConfig.mode;

      if (mode === 'undefined') {
        grunt.log.warn('No output mode defined, will use default: scss');
      }


      var targetFilePath = taskConfig.dest;

      const path = require('path');

      const absolutePath = path.resolve(process.cwd(), targetFilePath);

      if (grunt.file.exists(absolutePath)) {
        grunt.file.delete(absolutePath, { force: true });
      }

      taskConfig.src.forEach(function (filename) {


        if (!grunt.file.exists(filename)) {
          grunt.log.error(filename + ' does not exists, skipping.');
          return;
        }

        var svgContent = grunt.file.read(filename);
        var $ = cheerio.load(svgContent, {
          normalizeWhitespace: true,
          xmlMode: true
        });

        if (mode === 'json') {
          createJSONFile($, targetFilePath);
        } else {
          createScssFile($, targetFilePath);
        }
      });

    });
  });
}
