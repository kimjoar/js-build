Building a JavaScript application
=================================

See the accompanying [presentation](http://kjbekkelund.github.com/presentations/js-build/)

The app
-------

* [Require.js](http://requirejs.org/) for loading modules
* [Backbone.js](http://backbonejs.org) for models, views and routers
* [Hogan.js](http://twitter.github.com/hogan.js/) for
  [Mustache](http://mustache.github.com/) templates, which are 
  precompiled to JavaScript in production

Testing
-------

* [Jasmine](http://pivotal.github.com/jasmine/) for tests
* [Sinon](http://sinonjs.org) for test spies, stubs and mocks
* [Karma](http://karma-runner.github.com/) to run tests
* [PhantomJS](http://phantomjs.org/) for headless testing

The tests can by run in IntelliJ. First you need to install the [NodeJS
plugin for IntelliJ](http://plugins.jetbrains.com/plugin/?id=6098), then
you can follow [the setup here](https://raw.github.com/kjbekkelund/js-build/master/setup-tests-intellij.png).

The build process
-----------------

* [ShellJS](http://documentup.com/arturadib/shelljs) for Unix shell
  commands in Node.js
* [r.js](http://requirejs.org/docs/optimization.html) for minified
  JavaScript in production
* [JSHint](http://www.jshint.com/) to detect problems and errors in the
  JavaScript code
* [Less](http://lesscss.org/) for compiling Less to CSS
* [OptiPNG](http://optipng.sourceforge.net/) for optimizing PNGs

Running the build process
-------------------------

```bash
$ node make.js
```

This runs the `all` target.

Optionally, to run a specific target:

```bash
$ node make.js targetName
```

License
-------

Unless otherwise noted, the code in this repo is in the
[public domain](https://github.com/kjbekkelund/js-build/blob/master/UNLICENSE).
