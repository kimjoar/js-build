requirejs.config({
    urlArgs: 'v=' + Math.random(),

    paths: {
        'jquery': '../vendor/jquery',
        'underscore': '../vendor/underscore',
        'backbone': '../vendor/backbone',
        'hogan': '../vendor/hogan',
        'hgn': '../vendor/plugin/hgn',
        'text': '../vendor/plugin/text'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

define(function(require) {

    var $ = require('jquery');
    var Backbone = require('backbone');

    var App = require('modules/app/app');

    var app = new App({ el: $("body") });

    app.addSections({
        "nav": "#nav",
        "main": "#main"
    });

    $(document).ready(function() {
        app.run(function() {
            Backbone.history.start();
        });
    });

});

