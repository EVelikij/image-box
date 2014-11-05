var express = require('express');
var router = express.Router();
var fs = require('fs');

function walk(path, callback) {
  var getFiles = function(path) {
    var paths = [];
    fs.readdirSync(path).forEach(function(f) {
      paths.push(path + '/' + f);
    });

    return paths;
  }

  // stack of files
  var files = getFiles(path);

  // loop on 
  while (files.length)
  {
    var file = files.shift();
    var stat = fs.statSync(file)

    if (stat.isFile())
      callback(file);
    else
      files = files.concat(getFiles(file));
  }
}

/* GET home page. */
router.get('/', function(req, res) {
  var publicPath = __dirname + '/../public';
  var vendorsDir = '/javascripts/vendors/';
  var jsFiles = [];


  // get non vendors js files
  walk(publicPath + '/javascripts', function(fullPath) {
    // file name relative 'public' directory
    var file = fullPath.slice(publicPath.length);

    // save only javascript files
    if (file.split('.').pop() == 'js')
    {
      if (file.indexOf(vendorsDir) != 0)
        jsFiles.push(file);
    }
  });

 console.log(jsFiles);
  res.render('index', { js:jsFiles });
});

module.exports = router;
