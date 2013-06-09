# get-package-jsons

## Synopsis

```javascript
var getPackageJsons = require('get-package-jsons');
var packageGetter = getPackageJsons({registry: 'http://registry.npm.org'}); // optional

var dependency = {
  name: 'request',
  version: '2.3.10' // requires an *exact* version.
};

packageGetter.get(dependency, function (err) {
  console.log(dependency['package']); // => parsed package.json content
})

// Or use as a through stream

var createDependencyStream = require('create-dependency-stream');
var resolveDependencyVersions = require('resolve-dependency-versions');
var dependencies = createDependencyStream('/path/to/package.json');

dependencies.pipe(resolver).pipe(packageGetter);
```

## Description

Attaches package.json contents from a remote registry to dependency objects.
Note that the dependency object must have an exact version, not a version range.
See
[resolve-package-dependencies](https://github.com/grncdr/resolve-package-dependencies)
for a module that does that.
