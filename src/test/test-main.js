var tests = Object.keys(window.__karma__.files).filter(function (file) {
      return /Spec\.js$/.test(file);
});

var preIncluded = ['sinon', 'jasmine-sinon'];

var deps = preIncluded.concat(tests);

requirejs.config({
    urlArgs: 'v=' + Math.random(),
    baseUrl: '/base/src/main/webapp/js',

    paths: {
        'jquery': '../vendor/jquery',
        'underscore': '../vendor/underscore',
        'backbone': '../vendor/backbone',
        'hogan': '../vendor/hogan',
        'hgn': '../vendor/plugin/hgn',
        'text': '../vendor/plugin/text',

        'sinon': '/base/src/test/js/vendor/sinon',
        'jasmine-sinon': '/base/src/test/js/vendor/jasmine-sinon'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'sinon': {
            exports: 'sinon'
        },
        'jasmine-sinon': ['sinon']
    },

    deps: deps,
    callback: window.__karma__.start
});


