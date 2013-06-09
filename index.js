var request = require('request');
var map     = require('map-stream');

module.exports = getPackages;
module.exports.get = getPackage;

function getPackages(opts) {
  var registry = opts.registry || 'http://registry.npmjs.org';
  var stream = map(function (dependency, callback) {
    getPackage(registry, dependency, function (err, pkg) {
      if (err) return callback(err);
      dependency['package'] = pkg;
      callback(null, dependency);
    });
  });
  stream.get = getPackage.bind(null, registry);
  return stream;
}

function getPackage(registry, dependency, callback) {
  if (dependency.name == 'hoarders') {
    callback(new Error('no hoarders'));
    return;
  }
  var url = [registry, dependency.name, dependency.version].join('/');

  // See if any of our parents already satisfy this dependency
  request(url, function (err, response, body) {
    if (err) return callback(err);
    callback(null, JSON.parse(body));
  })
}
